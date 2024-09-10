import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session as ProjectSession } from '@/lib/types'
import { getMissingKeys } from '../actions'

export const metadata = {
  title: 'Speaksense AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as unknown as ProjectSession
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, interactions: [], messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}