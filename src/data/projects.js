const SPONTA_SCREENSHOT_BASE =
  'https://raw.githubusercontent.com/7arnav1/SPONTA/final-main/docs/screenshots';

export const flagshipProject = {
  id: 'sponta',
  title: 'SPONTA',
  role: 'Product owner & full-stack',
  period: 'Sep 2025 – Present',
  description:
    'Gamified spontaneity app with daily micro-challenges, streaks, leaderboards, and Gemini-powered camera verification. Built the Express API end-to-end—auth, challenges, events, and AI generation.',
  metrics: ['150+ beta users', '65% completion', '600+ AI challenges', '40% daily engagement'],
  tags: ['React Native', 'Node.js', 'Express', 'Firebase', 'Gemini', 'RAG'],
  href: 'https://github.com/7arnav1/SPONTA',
  demo: 'https://drive.google.com/file/d/19U4dkXC9ATxkyc4FfaTeYzb9XG-ODZko/view?usp=sharing',
  accent: '#b24bf3',
  flagship: true,
  images: [
    `${SPONTA_SCREENSHOT_BASE}/01.png`,
    `${SPONTA_SCREENSHOT_BASE}/02.png`,
    `${SPONTA_SCREENSHOT_BASE}/03.png`,
    `${SPONTA_SCREENSHOT_BASE}/04.png`,
  ],
};

export const projects = [
  flagshipProject,
  {
    id: 'justgo',
    title: 'JustGo',
    role: 'AI travel planner',
    period: 'Jun 2025 – Aug 2025',
    description:
      'Agentic travel assistant with GPT-4o function-calling, Whisper voice, and live data from Maps, Skyscanner, and Viator.',
    metrics: ['300+ users', '800+ trips', '5k+ API calls'],
    tags: ['React', 'Node.js', 'GPT-4o', 'Whisper', 'FastAPI'],
    href: 'https://github.com/7arnav1',
    demo: 'https://justgoai.netlify.app',
    accent: '#4da6ff',
    featured: true,
  },
  {
    id: 'aivestor',
    title: 'AIvestor',
    role: 'Solo project',
    period: 'Dec 2024 – Present',
    description:
      'PPO reinforcement learning on historical market data to model risk, allocation, and portfolio stability.',
    metrics: ['PPO agent', 'Yahoo Finance', 'Plotly dashboard'],
    tags: ['Python', 'Stable-Baselines3', 'PPO', 'RL'],
    href: 'https://github.com/7arnav1/AIvestor',
    accent: '#50e3a4',
    featured: true,
  },
  {
    id: 'hive',
    title: 'Hive',
    role: 'Open source',
    period: 'Ongoing',
    description:
      'Contributing to a self-evolving multi-agent framework with HITL, observability, and dynamic graph generation.',
    metrics: ['Apache 2.0', 'Multi-agent', 'Production-ready'],
    tags: ['Python', 'AI Agents', 'MCP'],
    href: 'https://github.com/7arnav1/hive',
    accent: '#ff9f43',
    featured: true,
  },
];
