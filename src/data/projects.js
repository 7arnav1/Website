import spontaHome from '../assets/sponta-home.png';

const SPONTA_SCREENSHOT_BASE =
  'https://raw.githubusercontent.com/7arnav1/SPONTA/final-main/docs/screenshots';

export const flagshipProject = {
  id: 'sponta',
  title: 'SPONTA',
  role: 'Product owner & full-stack',
  period: 'Sep 2025 – Present',
  description:
    'Daily challenges, streaks, and leaderboards — Gemini checks your photo when you complete one. I built the React Native app and the Express API (auth, events, challenges, AI generation).',
  metrics: ['150+ beta users', '65% completion', '600+ AI challenges', '40% daily engagement'],
  tags: ['React Native', 'Node.js', 'Express', 'Firebase', 'Gemini', 'RAG'],
  href: 'https://github.com/7arnav1/SPONTA',
  demo: 'https://drive.google.com/file/d/19U4dkXC9ATxkyc4FfaTeYzb9XG-ODZko/view?usp=sharing',
  accent: '#b24bf3',
  flagship: true,
  images: [
    spontaHome,
    `${SPONTA_SCREENSHOT_BASE}/02.png`,
    `${SPONTA_SCREENSHOT_BASE}/03.png`,
    `${SPONTA_SCREENSHOT_BASE}/04.png`,
  ],
};

export const projects = [
  flagshipProject,
  {
    id: 'aivestor',
    title: 'AIvestor',
    role: 'Solo build',
    period: 'Dec 2024 – Present',
    description:
      'Backtests multi-asset portfolios with real commission and slippage, trains a PPO policy on the first 70% of dates, and compares baselines on held-out data. Ships as CLI, FastAPI, and a TypeScript dashboard — Docker and Azure included. Research only; not financial advice.',
    metrics: ['PPO + Gymnasium', 'FastAPI + Vite UI', 'Train/test split', 'Docker · Azure'],
    tags: ['Python', 'Stable-Baselines3', 'FastAPI', 'TypeScript', 'Gymnasium', 'Docker'],
    href: 'https://github.com/7arnav1/AIvestor',
    demo: 'https://github.com/7arnav1/AIvestor/raw/main/demoVideos/demo-2-dashboard.mp4',
    demoVideo: 'https://github.com/7arnav1/AIvestor/raw/main/demoVideos/demo-2-dashboard.mp4',
    accent: '#50e3a4',
    featured: true,
  },
  {
    id: 'justgo',
    title: 'JustGo',
    role: 'AI travel planner',
    period: 'Jun 2025 – Aug 2025',
    description:
      'Talk or type a trip; GPT-4o calls Maps, Skyscanner, and Viator to build an itinerary. Whisper handles voice input.',
    metrics: ['300+ users', '800+ trips', '5k+ API calls'],
    tags: ['React', 'Node.js', 'GPT-4o', 'Whisper', 'FastAPI'],
    href: 'https://github.com/7arnav1/justgo.ai',
    demo: 'https://justgoai.netlify.app',
    accent: '#4da6ff',
    featured: true,
  },
  {
    id: 'hive',
    title: 'Hive',
    role: 'Open source',
    period: 'Ongoing',
    description:
      'Open-source multi-agent framework — human-in-the-loop flows, observability, and graphs that grow as agents run.',
    metrics: ['Apache 2.0', 'Multi-agent', 'Production-ready'],
    tags: ['Python', 'AI Agents', 'MCP'],
    href: 'https://github.com/7arnav1/hive',
    accent: '#ff9f43',
    featured: true,
  },
];
