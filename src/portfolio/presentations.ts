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
]
