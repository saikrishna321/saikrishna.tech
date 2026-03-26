export interface Presentation {
  id: string
  title: string
  url: string
  event?: string
  description?: string
}

export const presentations: Presentation[] = [
  {
    id: '1',
    title: 'Appium MCP Local Agent — TechXpresso',
    url: '/presentation-techxpresso.html',
    event: 'TechXpresso',
    description: 'Your AI Co-Pilot That Takes Action — from code suggestions to real execution.',
  },
  {
    id: '2',
    title: 'Building an Autonomous Mobile Agent with LLMs and the Model Context Protocol',
    url: '/presentation-appclaw.html',
    description: 'AppClaw: an AI-powered mobile QA agent that autonomously controls Android & iOS devices through natural language goals.',
  },
]
