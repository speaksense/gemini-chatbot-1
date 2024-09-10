// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  createStreamableValue
} from 'ai/rsc'

import { BotCard, BotMessage } from '@/components/stocks'

import { nanoid, sleep } from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat } from '../types'
import { auth } from '@/auth'

import { ListVideos } from '@/components/videos/ListVideos'
import { TopicGenerator } from '@/components/videos/TopicGenerator'
import { ThemeAnalyzer } from '@/components/videos/ThemeAnalyzer'
import { SEOOptimizer } from '@/components/videos/SEOOptimizer'

import { CheckIcon, SpinnerIcon } from '@/components/ui/icons'
import { format } from 'date-fns'
import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'
import { Video } from '@/components/media/video'
import { rateLimit } from './ratelimit'

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

async function describeImage(imageBase64: string) {
  'use server'

  await rateLimit()

  const aiState = getMutableAIState()
  const spinnerStream = createStreamableUI(null)
  const messageStream = createStreamableUI(null)
  const uiStream = createStreamableUI()

  uiStream.update(
    <BotCard>
      <Video isLoading />
    </BotCard>
  )
  ;(async () => {
    try {
      let text = ''

      // attachment as video for demo purposes,
      // add your implementation here to support
      // video as input for prompts.
      if (imageBase64 === '') {
        await new Promise(resolve => setTimeout(resolve, 5000))

        text = `
      The books in this image are:

      1. The Little Prince by Antoine de Saint-Exupéry
      2. The Prophet by Kahlil Gibran
      3. Man's Search for Meaning by Viktor Frankl
      4. The Alchemist by Paulo Coelho
      5. The Kite Runner by Khaled Hosseini
      6. To Kill a Mockingbird by Harper Lee
      7. The Catcher in the Rye by J.D. Salinger
      8. The Great Gatsby by F. Scott Fitzgerald
      9. 1984 by George Orwell
      10. Animal Farm by George Orwell
      `
      } else {
        const imageData = imageBase64.split(',')[1]

        const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })
        const prompt = 'List the books in this image.'
        const image = {
          inlineData: {
            data: imageData,
            mimeType: 'image/png'
          }
        }

        const result = await model.generateContent([prompt, image])
        text = result.response.text()
        console.log(text)
      }

      spinnerStream.done(null)
      messageStream.done(null)

      uiStream.done(
        <BotCard>
          <Video />
        </BotCard>
      )

      aiState.done({
        ...aiState.get(),
        interactions: [text]
      })
    } catch (e) {
      console.error(e)

      const error = new Error(
        'The AI got rate limited, please try again later.'
      )
      uiStream.error(error)
      spinnerStream.error(error)
      messageStream.error(error)
      aiState.done()
    }
  })()

  return {
    id: nanoid(),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value
  }
}

async function submitUserMessage(content: string) {
  'use server'

  await rateLimit()

  const aiState = getMutableAIState()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: `${aiState.get().interactions.join('\n\n')}\n\n${content}`
      }
    ]
  })

  const history = aiState.get().messages.map(message => ({
    role: message.role,
    content: message.content
  }))

  const textStream = createStreamableValue('')
  const spinnerStream = createStreamableUI(<SpinnerMessage />)
  const messageStream = createStreamableUI(null)
  const uiStream = createStreamableUI()


  const getUserData = async (userId, requesterId, role) => {
    if (role === 'user' && userId !== requesterId) {
      throw new Error('Unauthorized access');
    }
    const userData = await db.collection('user_data').findOne({ userId });
    return userData;
  };

  

  ;(async () => {
    try {
      const userId = getAuthenticatedUserId(); // Replace with actual logic to get the user ID from session/auth
      const userData = await getUserDataForAI(userId); // Replace with logic to fetch the user-specific data

      const result = await streamText({
        model: google('models/gemini-1.5-flash'),
        temperature: 0,
        tools: {
          // Tool to list YouTube videos
          showVideos: {
            description:
              "List the most popular YouTube videos, showing top 3 that match the user's query.",
            parameters: z.object({
              videoTitle: z.string().describe('Title of the YouTube video'),
              videoLink: z.string().describe('Link to the YouTube video'),
              publishDate: z.string().describe(
                "Date the video was published, example format: 6 April, 1998"
              ),
              viewCount: z.number().describe('Number of views for the video'),
              likeCount: z.number().describe('Number of likes for the video')
            })
          },

          // Tool for SEO keyword suggestions
          seoOptimizer: {
            description:
              "Suggest SEO keywords to help increase video visibility and reach.",
            parameters: z.object({
              keywords: z.array(
                z.string().describe('Suggested SEO keyword for better visibility')
              )
            })
          },

          // Tool for topic generation suggestions
          generateTopics: {
            description:
              "Generate a list of potential topics to focus on to increase viewership and engagement.",
            parameters: z.object({
              topics: z.array(
                z.string().describe('Suggested topics to focus on for content creation')
              )
            })
          },

          // Tool for analyzing the overall theme of the channel
          analyzeTheme: {
            description: "Analyze the overall theme of the user's YouTube channel.",
            parameters: z.object({
              themeSummary: z.string().describe('Summary of the channel theme based on analysis')
            })
          }
        },
        system: `
        You are an AI assistant that helps YouTube creators understand and optimize their channels. The user is ${userId}, and here is their data: ${JSON.stringify(userData)}. You provide insightful answers to any questions they have about their channel, including video performance, audience engagement, content strategies, SEO, and growth opportunities.

        Your main goal is to assist this user by:
        1. Answering their specific questions about their YouTube channel's data and performance.
        2. Offering suggestions on how to improve video visibility, grow their audience, and increase engagement.
        3. Guiding the user on how to interact with you, explaining what kind of information or insights you can provide.
        4. Responding with clear, actionable steps when the user seeks advice on optimizing their content or strategies.
        5. Adapting your answers to any question the user asks, without following a rigid flow, and being open to user-driven exploration.

        Be conversational, helpful, and encouraging, while providing detailed insights to guide them in making informed decisions about their channel's growth.
      `,
        messages: [...history] // Use the user's chat history for context
      })

      let textContent = ''
      spinnerStream.done(null)

      for await (const delta of result.fullStream) {
        const { type } = delta

        if (type === 'text-delta') {
          const { textDelta } = delta

          textContent += textDelta
          messageStream.update(<BotMessage content={textContent} />)

          aiState.update({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: textContent
              }
            ]
          })
        } else if (type === 'tool-call') {
          const { toolName, args } = delta

          if (toolName === 'showVideos') {
            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content:
                    "Here's a list of your most viewed videos. Choose one and we can break down its contents.",
                  display: {
                    name: 'showVideos',
                    props: {
                      summary: args
                    }
                  }
                }
              ]
            })

            uiStream.update(
              <BotCard>
                <ListVideos summary={args} />
              </BotCard>
            )
          } else if (toolName === 'seoOptimizer') {
            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content:
                    "Here are some SEO keywords that will help improve the visibility of your videos.",
                  display: {
                    name: 'seoOptimizer',
                    props: {
                      keywords: args.keywords
                    }
                  }
                }
              ]
            })

            uiStream.update(
              <BotCard>
                <SEOOptimizer keywords={args.keywords} />
              </BotCard>
            )
          } else if (toolName === 'generateTopics') {
            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content:
                    "Here are some trending topics that could help increase your viewership.",
                  display: {
                    name: 'generateTopics',
                    props: {
                      topics: args.topics
                    }
                  }
                }
              ]
            })

            uiStream.update(
              <BotCard>
                <TopicGenerator topics={args.topics} />
              </BotCard>
            )
          } else if (toolName === 'analyzeTheme') {
            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content:
                    "Here's the overall theme of your YouTube channel based on the analysis.",
                  display: {
                    name: 'analyzeTheme',
                    props: {
                      themeSummary: args.themeSummary
                    }
                  }
                }
              ]
            })

            uiStream.update(
              <BotCard>
                <ThemeAnalyzer themeSummary={args.themeSummary} />
              </BotCard>
            )
          }
        }
      }

      uiStream.done()
      textStream.done()
      messageStream.done()
    } catch (e) {
      console.error(e)

      const error = new Error('The AI got rate limited, please try again later.')
      uiStream.error(error)
      textStream.error(error)
      messageStream.error(error)
      aiState.done()
    }
  })()

  return {
    id: nanoid(),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value
  }
}

export async function requestCode() {
  'use server'

  const aiState = getMutableAIState()

  aiState.done({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        role: 'assistant',
        content:
          "A code has been sent to user's phone. They should enter it in the user interface to continue."
      }
    ]
  })

  const ui = createStreamableUI(
    <div className="animate-spin">
      <SpinnerIcon />
    </div>
  )

  ;(async () => {
    await sleep(2000)
    ui.done()
  })()

  return {
    status: 'requires_code',
    display: ui.value
  }
}

export async function validateCode() {
  'use server'

  const aiState = getMutableAIState()

  const status = createStreamableValue('in_progress')
  const ui = createStreamableUI(
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-zinc-500">
      <div className="animate-spin">
        <SpinnerIcon />
      </div>
      <div className="text-sm text-zinc-500">
        Please wait while we fulfill your order.
      </div>
    </div>
  )

  ;(async () => {
    await sleep(2000)

    ui.done(
      <div className="flex flex-col items-center text-center justify-center gap-3 p-4 text-emerald-700">
        <CheckIcon />
        <div>Payment Succeeded</div>
        <div className="text-sm text-zinc-600">
          Thanks for your purchase! You will receive an email confirmation
          shortly.
        </div>
      </div>
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages.slice(0, -1),
        {
          role: 'assistant',
          content: 'The purchase has completed successfully.'
        }
      ]
    })

    status.done('completed')
  })()

  return {
    status: status.value,
    display: ui.value
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id?: string
  name?: string
  display?: {
    name: string
    props: Record<string, any>
  }
}

export type AIState = {
  chatId: string
  interactions?: string[]
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
  spinner?: React.ReactNode
  attachments?: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    requestCode,
    validateCode,
    describeImage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] },
  unstable_onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  unstable_onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`
      const title = messages[0].content.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'assistant' ? (
          message.display?.name === 'showVideos' ? (
            <BotCard>
              <ListVideos summary={message.display.props.summary} />
            </BotCard>
          ) : message.display?.name === 'seoOptimizer' ? (
            <BotCard>
              <SEOOptimizer keywords={message.display.props.keywords} />
            </BotCard>
          ) : message.display?.name === 'generateTopics' ? (
            <BotCard>
              <TopicGenerator topics={message.display.props.topics} />
            </BotCard>
          ) : message.display?.name === 'analyzeTheme' ? (
            <BotCard>
              <ThemeAnalyzer themeSummary={message.display.props.themeSummary} />
            </BotCard>
          ) : (
            <BotMessage content={message.content} />
          )
        ) : message.role === 'user' ? (
          <UserMessage content={message.content} />
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}

