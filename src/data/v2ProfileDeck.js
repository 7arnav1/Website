import { site } from './site';
import arnavPhoto from '../Arnav.jpg';
import gradPhoto from '../IMG_8577.JPG';
import portfolioPhoto from '../portfolio.png';
import centralParkPhoto from '../DD8E046E-D8E5-469F-9EA1-C677D952258F.JPG';

export const ROLE_FILTERS = ['AI', 'SWE', 'TPM', 'Data'];

/** Profile photos (scroll order): 1 bench · 2 graduation · 3 portfolio · 4 Central Park snow */
export const profileDeck = [
  {
    id: 'photo-headshot',
    kind: 'photo',
    image: arnavPhoto,
    alt: 'Arnav Srivastav',
    roles: ['AI', 'SWE', 'TPM', 'Data'],
    alwaysShow: true,
  },
  {
    id: 'prompt-looking-for',
    kind: 'prompt',
    question: "I'm looking for",
    answer: site.openTo.replace('Looking for ', ''),
    roles: ['AI', 'SWE', 'TPM', 'Data'],
  },
  {
    id: 'photo-graduation',
    kind: 'photo',
    image: gradPhoto,
    alt: 'Arnav at UW–Madison graduation',
    roles: ['AI', 'SWE', 'TPM', 'Data'],
    alwaysShow: true,
  },
  {
    id: 'prompt-weirdly-attracted',
    kind: 'prompt',
    question: "I'm weirdly attracted to",
    answer: 'a side project that actually ships',
    roles: ['SWE', 'TPM'],
  },
  {
    id: 'photo-portfolio',
    kind: 'photo',
    image: portfolioPhoto,
    alt: 'Arnav',
    roles: ['AI', 'SWE', 'TPM', 'Data'],
    alwaysShow: true,
  },
  {
    id: 'prompt-simple-pleasures',
    kind: 'prompt',
    question: 'My simple pleasures',
    answer: 'Coffee, clean git history, and demos that load on the first try',
    roles: ['SWE', 'TPM', 'Data'],
  },
  {
    id: 'photo-central-park',
    kind: 'photo',
    image: centralParkPhoto,
    alt: 'Arnav in Central Park — winter',
    roles: ['AI', 'SWE', 'TPM', 'Data'],
    alwaysShow: true,
  },
  {
    id: 'prompt-green-flag',
    kind: 'prompt',
    question: 'Green flags I look for',
    answer: 'Kind teammates, clear scope, and a README that runs',
    roles: ['TPM', 'SWE'],
  },
  {
    id: 'prompt-together',
    kind: 'prompt',
    question: 'Together we could',
    answer: 'Ship mobile, ML, or full-stack — something people open daily',
    roles: ['AI', 'SWE', 'Data'],
  },
  {
    id: 'prompt-typical-sunday',
    kind: 'prompt',
    question: 'Typical Sunday',
    answer: 'CS540 prep, a SPONTA deploy, and calling family',
    roles: ['AI', 'TPM'],
  },
  {
    id: 'prompt-win-me-over',
    kind: 'prompt',
    question: 'The way to win me over',
    answer: 'Show me a working demo with real users',
    roles: ['SWE', 'TPM', 'Data'],
  },
  {
    id: 'prompt-life-goal',
    kind: 'prompt',
    question: 'A life goal of mine',
    answer: 'Graduate May 2026 and build products that matter outside a notebook',
    roles: ['AI', 'SWE', 'TPM', 'Data'],
  },
];

/** Pic · text · pic · text — every photo gets a prompt for the active filter. */
export function buildProfileFeed(deck, filter) {
  const feed = [];
  const usedPromptIds = new Set();
  const promptPool = deck.filter(
    (card) => card.kind === 'prompt' && card.roles.includes(filter),
  );

  const claim = (prompt) => {
    if (!prompt || usedPromptIds.has(prompt.id)) return null;
    usedPromptIds.add(prompt.id);
    return prompt;
  };

  const claimNext = () => {
    const prompt = promptPool.find((card) => !usedPromptIds.has(card.id));
    if (prompt) usedPromptIds.add(prompt.id);
    return prompt ?? null;
  };

  for (let i = 0; i < deck.length; i += 1) {
    const card = deck[i];
    if (card.kind !== 'photo') continue;

    feed.push(card);
    const next = deck[i + 1];
    const prompt =
      next?.kind === 'prompt' && next.roles.includes(filter)
        ? claim(next)
        : claimNext();
    if (prompt) feed.push(prompt);
  }

  return feed;
}
