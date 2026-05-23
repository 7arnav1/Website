import uwLogo from '../WORK/uw madison cdis.jpeg';
import atrilityLogo from '../WORK/atrility.jpeg';
import regenmedsLogo from '../WORK/regen meds.jpeg';
import sailLogo from '../WORK/SAIL.jpeg';
import openAiLogo from '../WORK/Open AI.png';
import yesuwLogo from '../WORK/download.png';
import unionLogo from '../WORK/download.jpeg';

export { uwLogo };

export const experienceLogos = {
  atrility: atrilityLogo,
  regenmeds: regenmedsLogo,
  sail: [sailLogo, openAiLogo],
  ta: uwLogo,
  yesuw: yesuwLogo,
  union: unionLogo,
};

/** @returns {string | string[] | null} */
export function getExperienceLogo(jobId) {
  return experienceLogos[jobId] ?? null;
}
