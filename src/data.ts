export const SAI = {
  name: 'Sai Krishna',
  role: 'Director of Engineering',
  company: 'TestMu AI',
  location: 'Bengaluru, India',
  email: 'saidotkrishna@gmail.com',
  roles: [
    'Maintainer',
    'Speaker',
    'Author',
    'Open-source contributor',
    'Engineer',
    'Teacher',
    'Test automation nerd',
  ],
  tagline:
    'I build tools that make test automation feel like a power tool, not a chore.',
  bio:
    "I've spent the last decade writing, breaking, and re-writing the infrastructure that lets teams test software at scale \u2014 mobile, web, and everything in between. Appium core contributor, Selenium and Taiko alum, and currently obsessed with what happens when autonomous AI agents meet test automation.",
  socials: {
    github: 'https://github.com/saikrishna321',
    linkedin: 'https://www.linkedin.com/in/sai-krishna-3755407b/',
    twitter: 'https://twitter.com/saikrisv',
    email: 'mailto:saidotkrishna@gmail.com',
  },
  stats: [
    { k: '50+', v: 'Conference talks' },
    { k: '10+', v: 'Years in automation' },
    { k: '8', v: 'OSS projects maintained' },
    { k: '1', v: 'Book, Apress' },
  ],
} as const;

export type Project = {
  title: string;
  tag: string;
  category: 'infra' | 'ai' | 'plugin' | 'upstream';
  tech: string[];
  blurb: string;
  stars: string;
  lang: string;
  url: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'Appium Device Farm',
    tag: 'Maintainer',
    category: 'infra',
    tech: ['TypeScript', 'Appium 2', 'Node'],
    blurb:
      'An Appium 2.0 plugin that discovers, manages, and orchestrates parallel driver sessions across every connected Android & iOS device on your rack.',
    stars: '1.2k',
    lang: 'TypeScript',
    url: 'https://github.com/AppiumTestDistribution/appium-device-farm',
  },
  {
    title: 'Appium Test Distribution',
    tag: 'Maintainer',
    category: 'infra',
    tech: ['Java', 'TestNG', 'Gradle'],
    blurb:
      'Parallel Appium test execution across real devices, simulators, and emulators. The thing every team rediscovers halfway into their test infra build.',
    stars: '610',
    lang: 'Java',
    url: 'https://github.com/AppiumTestDistribution/AppiumTestDistribution',
  },
  {
    title: 'AppClaw',
    tag: 'Creator',
    category: 'ai',
    tech: ['TypeScript', 'Claude', 'Appium', 'MCP'],
    blurb:
      'An AI-powered mobile automation agent for Android and iOS. Tell it what to do in plain English — it figures out what to tap, type, and swipe. Pluggable LLM backends (Claude, GPT, Gemini, Groq, Ollama) and a VS Code extension for interactive runs.',
    stars: '45',
    lang: 'TypeScript',
    url: 'https://github.com/AppiumTestDistribution/AppClaw',
  },
  {
    title: 'MCP WebDriverAgent',
    tag: 'Creator',
    category: 'ai',
    tech: ['TypeScript', 'MCP', 'WebDriverAgent'],
    blurb:
      'Model Context Protocol server that hands an LLM a real, live iOS device. Plug it into Claude or any MCP client and watch the agent tap.',
    stars: '340',
    lang: 'TypeScript',
    url: 'https://github.com/AppiumTestDistribution/mcp-webdriveragent',
  },
  {
    title: 'Jarvis Appium',
    tag: 'Creator',
    category: 'ai',
    tech: ['Python', 'LLM', 'Appium'],
    blurb:
      'AI co-pilot for Appium. Natural-language goals → executed test steps. The start of an answer to "why is so much testing still manual in 2026?"',
    stars: '280',
    lang: 'Python',
    url: 'https://github.com/AppiumTestDistribution/jarvis-appium',
  },
  {
    title: 'Appium Wait Plugin',
    tag: 'Creator',
    category: 'plugin',
    tech: ['JavaScript', 'Appium Plugin'],
    blurb:
      'Deterministic waits as a first-class primitive. The plugin that killed Thread.sleep(2000) in thousands of test files.',
    stars: '150',
    lang: 'JavaScript',
    url: 'https://github.com/AppiumTestDistribution/appium-wait-plugin',
  },
  {
    title: 'Appium Gestures Plugin',
    tag: 'Creator',
    category: 'plugin',
    tech: ['JavaScript', 'W3C Actions'],
    blurb:
      'W3C Actions-based gestures as one-liners. Pinch, scroll, swipe-to-dismiss — without writing a single TouchAction.',
    stars: '120',
    lang: 'JavaScript',
    url: 'https://github.com/AppiumTestDistribution/appium-gestures-plugin',
  },
  {
    title: 'Appium',
    tag: 'Core contributor',
    category: 'upstream',
    tech: ['TypeScript', 'Node'],
    blurb:
      "The de-facto open-source framework for cross-platform app automation. I've been writing and reviewing PRs against it longer than some of its users have been testing.",
    stars: '19.8k',
    lang: 'TypeScript',
    url: 'https://github.com/appium/appium',
  },
  {
    title: 'Taiko',
    tag: 'Contributor',
    category: 'upstream',
    tech: ['JavaScript', 'Node', 'CDP'],
    blurb:
      "ThoughtWorks' free browser automation tool. Contributed to its core when the web needed a saner alternative to WebDriver protocol ceremony.",
    stars: '3.5k',
    lang: 'JavaScript',
    url: 'https://github.com/getgauge/taiko',
  },
];

export type Talk = {
  year: string;
  title: string;
  venue: string;
  place: string;
  upcoming?: boolean;
};

export const TALKS: Talk[] = [
  { year: '2026', title: "Testing Autonomous AI Agents: A QA Practitioner's Guide", venue: 'Automation Guild', place: 'Virtual', upcoming: true },
  { year: '2024', title: 'Beyond DOM: Leveraging Open-Source LLMs in an AI-Powered Appium Plugin', venue: 'AppiumConf', place: 'Online' },
  { year: '2024', title: 'Mobile Testing Strategies with Appium + Selenium', venue: 'SeleniumConf', place: 'Chicago' },
  { year: '2023', title: 'Advanced Mobile Automation Techniques', venue: 'AppiumConf', place: 'Online' },
  { year: '2022', title: 'Appium 2.0', venue: 'Global Testing Summit', place: 'Online' },
  { year: '2022', title: 'Parallel Mobile Test', venue: 'TestAutomationDays', place: 'Utrecht' },
  { year: '2021', title: 'Build your own Appium Plugin', venue: 'AppiumConf', place: 'Online' },
  { year: '2021', title: "Appium 2.0: What's Next", venue: 'Future of Testing APAC', place: 'Applitools' },
  { year: '2019', title: 'Life Cycle of an Appium Command', venue: 'AppiumConf', place: 'Bangalore' },
  { year: '2019', title: 'Native Mobile Commands in Appium', venue: 'AppiumConf', place: 'Bangalore' },
  { year: '2018', title: 'Code Once Test Anywhere — On-Demand Private Appium Device Cloud with ATD', venue: 'SeleniumConf', place: 'Bangalore' },
  { year: '2018', title: 'Advanced Appium Workshop', venue: 'SeleniumConf', place: 'London' },
];

export type Workshop = {
  title: string;
  length: string;
  blurb: string;
  audience: string;
  stack: string[];
  track: 'ai' | 'automation' | 'platform';
  highlights?: string[];
};

export const WORKSHOPS: Workshop[] = [
  {
    title: 'AI for QA Teams — Using It Without Breaking Your Test Suite',
    length: '2 days',
    blurb:
      "A hands-on, tool-agnostic look at how LLMs and AI agents actually fit into a QA workflow. When they help, when they lie, how to keep humans in the loop, and how to evaluate agent output so you're not shipping hallucinations.",
    audience: 'QA leads, SDETs, test managers',
    stack: ['LLMs', 'MCP', 'Evals', 'Prompting'],
    track: 'ai',
    highlights: ['AI'],
  },
  {
    title: 'AI-Assisted Development for Engineers',
    length: '1 day',
    blurb:
      'Practical patterns for developers working with AI coding assistants and agents — prompt design, guardrails, when to trust and when to verify, and how to weave agents into your day without letting them quietly wreck your codebase.',
    audience: 'Software engineers, tech leads',
    stack: ['Claude', 'Cursor', 'MCP', 'Agent design'],
    track: 'ai',
    highlights: ['AI-Assisted'],
  },
  {
    title: 'Test Automation Foundations — Web + Mobile',
    length: '2 days',
    blurb:
      'Cross-platform test automation taught without the tribal religion. Playwright for web, Appium for mobile, with the common principles (locators, waits, flakiness, parallelism, CI) that apply to both.',
    audience: 'Engineers new to automation, or switching stacks',
    stack: ['Playwright', 'Appium', 'Selenium', 'CI'],
    track: 'automation',
    highlights: ['Web + Mobile'],
  },
  {
    title: 'Modern Web Automation with Playwright',
    length: '1 day',
    blurb:
      'From zero to a reliable Playwright suite. Auto-waits, network mocking, tracing, visual testing, and the patterns that make Playwright tests fast and not flaky in CI.',
    audience: 'Web engineers, QA teams',
    stack: ['Playwright', 'TypeScript', 'CI'],
    track: 'automation',
    highlights: ['Playwright'],
  },
  {
    title: 'Agentic Testing with MCP',
    length: '1 day',
    blurb:
      'Learn the Model Context Protocol from scratch and build an agent that can drive a real device or browser. Covers MCP servers, tool design, WebDriverAgent, and how to write evals so your agent is measurable, not just impressive.',
    audience: 'QA engineers and developers curious about AI agents',
    stack: ['MCP', 'WebDriverAgent', 'Playwright', 'Claude'],
    track: 'ai',
    highlights: ['Agentic', 'MCP'],
  },
  {
    title: 'Advanced Appium 2.0',
    length: '2 days',
    blurb: 'Architecture, drivers, plugins, Java client internals, end-to-end. The depth session for teams already running Appium in production.',
    audience: 'Mobile QA engineers',
    stack: ['Appium 2.0', 'WebDriver', 'Java', 'TypeScript'],
    track: 'platform',
    highlights: ['Appium 2.0'],
  },
  {
    title: 'Build Your Own Appium Plugin',
    length: '1 day',
    blurb: 'From zero to a published plugin. Extend Appium to fit your app — custom commands, gestures, and internal tooling.',
    audience: 'Mobile QA engineers, platform teams',
    stack: ['Appium Plugin API', 'Node', 'TypeScript'],
    track: 'platform',
    highlights: ['Appium Plugin'],
  },
  {
    title: 'Drivers & Plugins, Deep Dive',
    length: '2 days',
    blurb: 'Appium 2.0 architecture. Build custom drivers for niche platforms — TV, kiosks, IoT devices, embedded browsers.',
    audience: 'Platform engineers, infra teams',
    stack: ['Appium 2.0', 'WebDriver', 'Node'],
    track: 'platform',
    highlights: ['Drivers & Plugins'],
  },
];

export type Writing = {
  title: string;
  kind: 'Book' | 'Essay';
  year: string;
  blurb: string;
  source?: string;
};

export const WRITING: Writing[] = [
  { title: 'Appium Insights — a book from Apress', kind: 'Book', year: '2024', blurb: 'Strategies for Successful Mobile Automation — the mobile slice of a broader automation practice. Written for senior engineers who already know Appium works, and want it to stop surprising them.' },
  { title: "What's New in Appium Java Client 8.0.0", kind: 'Essay', year: '2023', blurb: 'The breaking-change list nobody wanted, with opinions on each one.', source: 'Applitools' },
  { title: 'How to Build Your Own Appium Plugin', kind: 'Essay', year: '2022', blurb: 'A walkthrough of the plugin API from the perspective of someone maintaining it.', source: 'Applitools' },
  { title: 'Appium vs Espresso vs XCUITest', kind: 'Essay', year: '2022', blurb: 'A clear-eyed comparison without the usual sales gloss.', source: 'Applitools' },
  { title: 'Getting Started with Appium 2.0 Beta', kind: 'Essay', year: '2021', blurb: 'The bridge between Appium 1.x assumptions and the 2.0 mental model.', source: 'Applitools' },
  { title: 'Consumer Driven Contract Testing — the Ultimate Guide', kind: 'Essay', year: '2020', blurb: 'Why microservices teams should test what they promise, not what they do.', source: 'TestProject' },
  { title: 'Custom Audits Using Lighthouse', kind: 'Essay', year: '2020', blurb: 'Writing Lighthouse audits for app-specific quality metrics.', source: 'TestProject' },
];

export type Presentation = {
  id: string;
  title: string;
  url: string;
  event?: string;
  year?: string;
  description?: string;
};

export const PRESENTATIONS: Presentation[] = [
  {
    id: 'techxpresso',
    title: 'Appium MCP Local Agent — Your AI Co-Pilot That Takes Action',
    url: '/presentation-techxpresso.html',
    event: 'TechXpresso · IDFC First Bank',
    year: '2026',
    description: 'From code suggestions to real execution — running a local MCP agent against real devices with Appium.',
  },
  {
    id: 'appclaw',
    title: 'Building an Autonomous Mobile Agent with LLMs and the Model Context Protocol',
    url: '/presentation-appclaw.html',
    event: 'AppClaw',
    year: '2026',
    description: 'AppClaw: an AI-powered mobile QA agent that autonomously controls Android & iOS devices through natural-language goals.',
  },
];

export type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration?: string;
  publishedAt: string;
  tags: string[];
};

export const VIDEOS: Video[] = [
  {
    id: '1',
    title: "Appium 2.0 — What's New and Migration Guide",
    description:
      'Learn about the new features in Appium 2.0 and how to migrate your existing Appium tests to the new version.',
    url: 'https://www.youtube.com/watch?v=kkJabDETi70',
    thumbnail: 'https://img.youtube.com/vi/kkJabDETi70/maxresdefault.jpg',
    duration: '45:30',
    publishedAt: '2023-05-15',
    tags: ['Appium', 'Mobile Testing', 'Automation', 'Testing'],
  },
  {
    id: '2',
    title: 'Appium Conference 2023 — Advanced Mobile Automation Techniques',
    description: 'Deep dive into advanced mobile automation techniques presented at Appium Conference 2023.',
    url: 'https://www.youtube.com/watch?v=9mHfvGN7FwU',
    thumbnail: 'https://img.youtube.com/vi/9mHfvGN7FwU/maxresdefault.jpg',
    duration: '39:44',
    publishedAt: '2023-09-20',
    tags: ['Appium', 'Conference', 'Mobile Testing', 'Automation'],
  },
  {
    id: '3',
    title: 'Building Scalable Mobile Test Frameworks',
    description:
      'How to build scalable and maintainable mobile test automation frameworks using Appium and best practices.',
    url: 'https://www.youtube.com/watch?v=tGTJ_g2egXs',
    thumbnail: 'https://img.youtube.com/vi/tGTJ_g2egXs/maxresdefault.jpg',
    duration: '52:15',
    publishedAt: '2023-11-10',
    tags: ['Appium', 'Framework', 'Testing', 'Architecture'],
  },
  {
    id: '4',
    title: 'Appium Device Farm — Distributed Mobile Testing',
    description:
      'Learn how to set up and use Appium Device Farm for distributed mobile testing across multiple devices.',
    url: 'https://www.youtube.com/watch?v=JpYpLM--atE',
    thumbnail: 'https://img.youtube.com/vi/JpYpLM--atE/maxresdefault.jpg',
    duration: '41:20',
    publishedAt: '2024-01-05',
    tags: ['Appium', 'Device Farm', 'Mobile Testing', 'Distributed Testing'],
  },
  {
    id: '5',
    title: 'Mobile Test Automation with Appium',
    description:
      'Learn how to automate mobile applications using Appium framework with practical examples and best practices.',
    url: 'https://www.youtube.com/watch?v=aqys1ZOjgVk',
    thumbnail: 'https://img.youtube.com/vi/aqys1ZOjgVk/maxresdefault.jpg',
    duration: '35:50',
    publishedAt: '2024-02-12',
    tags: ['Appium', 'Mobile Testing', 'Automation', 'Testing'],
  },
  {
    id: '6',
    title: 'Appium Gestures Plugin — Advanced Mobile Interactions',
    description: 'Deep dive into Appium Gestures Plugin for advanced mobile interactions and touch gestures automation.',
    url: 'https://www.youtube.com/watch?v=b6yWXfLpazc',
    thumbnail: 'https://img.youtube.com/vi/b6yWXfLpazc/maxresdefault.jpg',
    duration: '48:30',
    publishedAt: '2024-03-18',
    tags: ['Appium', 'Gestures', 'Mobile Testing', 'Plugin'],
  },
  {
    id: '7',
    title: 'Selenium Conference 2024 — Mobile Testing Strategies',
    description:
      'Presentation at Selenium Conference 2024 about effective mobile testing strategies using Appium and Selenium.',
    url: 'https://www.youtube.com/watch?v=vk4LL59-tVU',
    thumbnail: 'https://img.youtube.com/vi/vk4LL59-tVU/maxresdefault.jpg',
    duration: '39:46',
    publishedAt: '2024-04-22',
    tags: ['Selenium', 'Conference', 'Appium', 'Mobile Testing'],
  },
  {
    id: '8',
    title: 'Appium Wait Plugin — Efficient Test Synchronization',
    description: 'How to use Appium Wait Plugin for efficient test synchronization and reduced flakiness in mobile tests.',
    url: 'https://www.youtube.com/watch?v=DWoqcZc3D5Y',
    thumbnail: 'https://img.youtube.com/vi/DWoqcZc3D5Y/maxresdefault.jpg',
    duration: '42:15',
    publishedAt: '2024-05-10',
    tags: ['Appium', 'Wait Plugin', 'Test Synchronization', 'Mobile Testing'],
  },
  {
    id: '9',
    title: 'Beyond DOM: Leveraging Open-Source LLMs in an AI-Powered Appium Plugin',
    description:
      'Sri Sekar & Sai Krishna present how to leverage open-source LLMs in an AI-powered Appium plugin for advanced mobile testing capabilities.',
    url: 'https://www.youtube.com/watch?v=f5s6goLje0E',
    thumbnail: 'https://img.youtube.com/vi/f5s6goLje0E/maxresdefault.jpg',
    duration: '45:30',
    publishedAt: '2024-06-05',
    tags: ['Appium', 'AI', 'LLM', 'Plugin', 'Mobile Testing'],
  },
  {
    id: '10',
    title: 'Mobile Testing Talk',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=_MPp7DDueUI',
    thumbnail: 'https://img.youtube.com/vi/_MPp7DDueUI/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '11',
    title: 'Mobile Testing Talk',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=Mh80FseDxTI',
    thumbnail: 'https://img.youtube.com/vi/Mh80FseDxTI/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '12',
    title: 'Mobile Testing Talk',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=VrPrYtVyRyw',
    thumbnail: 'https://img.youtube.com/vi/VrPrYtVyRyw/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '13',
    title: 'Mobile Testing Talk',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=UqxTXkhjjYQ',
    thumbnail: 'https://img.youtube.com/vi/UqxTXkhjjYQ/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '14',
    title: 'Mobile Testing Talk',
    description: 'Mobile testing and automation content.',
    url: 'https://www.youtube.com/watch?v=gMPMBenIjCE',
    thumbnail: 'https://img.youtube.com/vi/gMPMBenIjCE/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Mobile Testing', 'Automation'],
  },
  {
    id: '15',
    title: 'Short · Mobile Tip',
    description: 'Quick mobile testing tip.',
    url: 'https://www.youtube.com/shorts/FGSD7sbfYoc',
    thumbnail: 'https://img.youtube.com/vi/FGSD7sbfYoc/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Shorts', 'Mobile Testing'],
  },
  {
    id: '16',
    title: 'Short · Mobile Tip',
    description: 'Quick mobile testing tip.',
    url: 'https://www.youtube.com/shorts/glWOVOyCgxM',
    thumbnail: 'https://img.youtube.com/vi/glWOVOyCgxM/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Shorts', 'Mobile Testing'],
  },
  {
    id: '17',
    title: 'Short · Mobile Tip',
    description: 'Quick mobile testing tip.',
    url: 'https://www.youtube.com/shorts/L4YNC0ogPx0',
    thumbnail: 'https://img.youtube.com/vi/L4YNC0ogPx0/maxresdefault.jpg',
    publishedAt: '2024-10-28',
    tags: ['Appium', 'Shorts', 'Mobile Testing'],
  },
  {
    id: '18',
    title: 'Shared Video',
    description: 'Shared video link.',
    url: 'https://www.youtube.com/watch?v=qcoKFS6VI0A',
    thumbnail: 'https://img.youtube.com/vi/qcoKFS6VI0A/maxresdefault.jpg',
    publishedAt: '2025-11-01',
    tags: ['YouTube', 'Video'],
  },
  {
    id: '19',
    title: 'Shared Video',
    description: 'Shared video link.',
    url: 'https://www.youtube.com/watch?v=lugEm6j1Nl8',
    thumbnail: 'https://img.youtube.com/vi/lugEm6j1Nl8/maxresdefault.jpg',
    publishedAt: '2025-11-01',
    tags: ['YouTube', 'Video'],
  },
  {
    id: '20',
    title: 'Short · Mobile Tip',
    description: 'Quick mobile testing tip.',
    url: 'https://www.youtube.com/shorts/7MoJrRvB6No',
    thumbnail: 'https://img.youtube.com/vi/7MoJrRvB6No/maxresdefault.jpg',
    publishedAt: '2025-01-15',
    tags: ['YouTube', 'Shorts', 'Video'],
  },
  {
    id: '21',
    title: "Testing Autonomous AI Agents: A QA Practitioner's Guide",
    description:
      'Exploring how autonomous AI agents challenge conventional testing approaches. Examines real production failures from voice, phone, and chat agents, and provides practical QA strategies for non-deterministic systems.',
    url: 'https://testguild.com/automation-guild-2026/',
    thumbnail: 'https://testguild.com/wp-content/uploads/2025/11/AG2026-speakers-grid.png',
    publishedAt: '2026-02-11',
    tags: ['AI', 'Testing', 'Conference', 'Automation Guild'],
  },
];

