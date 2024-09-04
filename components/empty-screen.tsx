import { ExternalLink } from '@/components/external-link'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-sm sm:text-base">
        <h1 className="text-2xl sm:text-3xl tracking-tight font-semibold max-w-fit inline-block">
          Speaksense Chatbot
        </h1>
        <p className="leading-normal text-zinc-900">
          Discover the power of <ExternalLink href="https://speaksense.io">Speaksense</ExternalLink>, an AI-driven chatbot tailor-made for YouTube creators.
        </p>
        <p className="leading-normal text-zinc-900">
          Enhance your YouTube strategy with real-time analytics and actionable insights, directly accessible through this chatbot.
        </p>
      </div>
    </div>
  )
}
