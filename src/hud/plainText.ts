import type { MissionId } from '../core/types';

/** What a first-time player sees instead of the engineering mission titles. */
export const MISSION_PLAIN: Record<MissionId, { name: string; level: string; goal: (mb: number) => string }> = {
  EARTH_OBSERVATION: {
    name: 'Orbit Earth',
    level: 'Easiest',
    goal: (mb) => `Put a camera in orbit around Earth and send ${mb} MB of photos home.`,
  },
  SPACE_TELESCOPE: {
    name: 'Space telescope',
    level: 'Medium',
    goal: (mb) => `Fly a telescope high above Earth and send ${mb} MB of star pictures home.`,
  },
  MOON_LANDING: {
    name: 'Land on the Moon',
    level: 'Hard',
    goal: (mb) => `Fly to the Moon, land gently, and send ${mb} MB of science home.`,
  },
  MARS_LANDING: {
    name: 'Land on Mars',
    level: 'Hardest',
    goal: (mb) => `Cross to Mars, survive the landing, and send ${mb} MB of science home.`,
  },
};

export const MISSION_ORDER: MissionId[] = ['EARTH_OBSERVATION', 'SPACE_TELESCOPE', 'MOON_LANDING', 'MARS_LANDING'];
