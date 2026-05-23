import { projects } from './projects';
import spontaLogo from '../assets/sponta-logo.png';
import aivestorLogo from '../assets/aivestor-logo.svg';
import justgoScreen from '../assets/justgo-screenshot.png';
import hiveLogo from '../assets/hive-logo.png';

const PROMPTS = [
  'The way to win me over',
  'My most controversial opinion',
  'Together we could',
  "I'm weirdly attracted to",
];

const projectMedia = {
  sponta: { logo: spontaLogo },
  aivestor: { logo: aivestorLogo },
  justgo: { image: justgoScreen },
  hive: { logo: hiveLogo },
};

export const projectDeck = projects.map((p, i) => {
  const media = projectMedia[p.id] ?? {};
  return {
    id: p.id,
    title: p.title,
    role: p.role,
    period: p.period,
    description: p.description,
    metrics: p.metrics,
    tags: p.tags,
    href: p.href,
    demo: p.demo,
    accent: p.accent,
    image: media.image ?? null,
    logo: media.logo ?? null,
    prompt: PROMPTS[i % PROMPTS.length],
    promptAnswer:
      i === 0
        ? '150+ beta users and a Gemini photo check when you complete a challenge'
        : p.description.split('.')[0],
  };
});
