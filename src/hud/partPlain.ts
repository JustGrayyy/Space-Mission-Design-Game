import { create } from 'zustand';

/**
 * Beginner names and trade-offs for every part. One clear upside, one clear cost,
 * so a player can compare options without knowing the engineering.
 */

/** The part the player is looking at or just picked, so Kap can talk about it. */
export const usePartFocus = create<{ partId: string | null; setPart: (id: string | null) => void }>((set) => ({
  partId: null,
  setPart: (partId) => set({ partId }),
}));

export interface PlainPart {
  name: string;
  good: string;
  bad: string;
}

export const PART_PLAIN: Record<string, PlainPart> = {
  // Frame
  'struct-micro-bus': { name: 'Small frame', good: 'Light and cheap', bad: 'Carries only 180 kg, and cannot land' },
  'struct-modular-bus': { name: 'Medium frame', good: 'Fits most satellites', bad: 'Cannot land on a planet' },
  'struct-lander-chassis': { name: 'Lander frame', good: 'Has legs for landing', bad: 'Heavy, so needs a bigger rocket' },
  'struct-heavy-landing-platform': { name: 'Big lander frame', good: 'Lands the heaviest gear', bad: 'Very heavy and slow to build' },

  // Power
  'power-small-solar': { name: 'Small solar panels', good: 'Light and cheap', bad: 'Not much power' },
  'power-large-solar': { name: 'Big solar panels', good: 'Lots of power near Earth', bad: 'Weak far from the Sun' },
  'power-multi-junction-solar': { name: 'Super solar panels', good: 'The most solar power', bad: 'Pricey, still weak at Mars' },
  'power-rtg': { name: 'Nuclear generator', good: 'Works in the dark and far away', bad: 'Expensive' },
  'power-enhanced-rtg': { name: 'Big nuclear generator', good: 'Strong power anywhere', bad: 'The most expensive power' },

  // Battery
  'bat-liion-small': { name: 'Tiny battery', good: 'Featherweight', bad: 'Dies fast in shadow' },
  'bat-liion-med': { name: 'Medium battery', good: 'Lasts through Earth shadow', bad: 'Not enough for long nights' },
  'bat-solid-state': { name: 'Big battery', good: 'Lasts much longer in shadow', bad: 'Heavier' },
  'bat-ultra-solid-state': { name: 'Huge battery', good: 'Survives a long lunar night', bad: 'Heavy and expensive' },

  // Computer
  'cpu-basic-mcu': { name: 'Basic computer', good: 'Cheap, low power', bad: 'Radiation breaks it far from Earth' },
  'cpu-radhard-obc': { name: 'Tough computer', good: 'Survives space radiation', bad: 'Handles medium data only' },
  'cpu-ai-edge': { name: 'Smart computer', good: 'Handles lots of data', bad: 'Uses more power' },
  'cpu-radhard-autonomous': { name: 'Super computer', good: 'Handles the most data', bad: 'Power-hungry and slow to build' },

  // Steering
  'adcs-magnetorquer': { name: 'Magnet steering', good: 'Cheap and light', bad: 'Only works near Earth' },
  'adcs-reaction-wheels': { name: 'Spinning-wheel steering', good: 'Works anywhere in space', bad: 'Medium pointing accuracy' },
  'adcs-cmg-precision': { name: 'Precise steering', good: 'Points very accurately', bad: 'Heavier, more power' },
  'adcs-cmg-optical-nav': { name: 'Self-driving steering', good: 'Most accurate, finds its own way', bad: 'Heavy and expensive' },

  // Heat control
  'thermal-passive-mli': { name: 'Gold blankets', good: 'Light and cheap', bad: 'Only basic temperature control' },
  'thermal-active-louvers': { name: 'Heat vents', good: 'Handles hot and cold swings', bad: 'Uses some power' },
  'thermal-heavy-rad-shield': { name: 'Heat shield', good: 'Survives the fiery Mars entry', bad: 'Heavy' },
  'thermal-deployable-radiator': { name: 'Big radiators', good: 'Dumps the most heat', bad: 'Heavy and power-hungry' },

  // Science tool
  'payload-eo-camera': { name: 'Earth camera', good: 'Made for Earth orbit', bad: 'Only useful around Earth' },
  'payload-ir-telescope': { name: 'Space telescope', good: 'Sees faint, distant stars', bad: 'Heavy, needs lots of power' },
  'payload-hyperspectral-imager': { name: 'Super telescope camera', good: 'The sharpest pictures', bad: 'Heaviest, makes huge data' },
  'payload-surface-lander': { name: 'Drill and lab', good: 'Studies rocks after landing', bad: 'Only useful on a surface' },
  'payload-deep-space-lander-science': { name: 'Full science lab', good: 'The most surface science', bad: 'Very heavy and power-hungry' },

  // Rocket
  'launcher-light': { name: 'Small rocket', good: 'Cheapest ride to Earth orbit', bad: 'Too weak for the Moon or Mars' },
  'launcher-medium': { name: 'Medium rocket', good: 'Enough to reach the Moon', bad: 'Costs nearly twice the small one' },
  'launcher-medium-heavy': { name: 'Large rocket', good: 'Extra muscle for heavy builds', bad: 'Pricey' },
  'launcher-heavy': { name: 'Heavy rocket', good: 'Can reach Mars', bad: 'Expensive' },
  'launcher-super-heavy': { name: 'Giant rocket', good: 'Lifts almost anything anywhere', bad: 'Very expensive' },
};
