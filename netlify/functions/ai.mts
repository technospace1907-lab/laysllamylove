import type { Context } from '@netlify/functions'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { messages, max_tokens = 900 } = await req.json()

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens,
    messages,
  })

  const text = message.content.map((i: Anthropic.ContentBlock) => ('text' in i ? i.text : '')).join('\n')

  return Response.json({ text })
}

export const config = {
  path: '/api/ai',
}
