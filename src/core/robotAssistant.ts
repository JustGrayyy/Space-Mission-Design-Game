/**
 * Robot Assistant AI System
 * Provides contextual hints during spacecraft building and post-flight analysis
 * Uses deterministic rule-based AI (no API tokens required)
 */

import type {
  CoupledMetrics,
  DebriefReport,
  DifficultyMode,
  EngineeringConflict,
  FlightState,
  MissionId,
  SpacecraftValidation,
} from './types';
import { MISSIONS } from './constants';

export type RobotMood = 'happy' | 'thinking' | 'love' | 'bulb';

export interface RobotHint {
  mood: RobotMood;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'mass' | 'power' | 'thermal' | 'data' | 'comms' | 'general' | 'success';
}

/**
 * Generate hangar hints based on spacecraft validation and conflicts
 */
export function generateHangarHints(
  validation: SpacecraftValidation,
  conflicts: EngineeringConflict[],
  coupled: CoupledMetrics | null,
  missionId: MissionId,
  difficulty: DifficultyMode
): RobotHint | null {
  const mission = MISSIONS[missionId];
  const isBeginner = difficulty === 'BEGINNER';

  // Priority 1: CRITICAL conflicts
  const criticals = conflicts.filter((c) => c.severity === 'CRITICAL');
  if (criticals.length > 0) {
    const top = criticals[0];
    return generateConflictHint(top, isBeginner);
  }

  // Priority 2: Mission readiness - all slots filled?
  if (!validation.isComplete) {
    return {
      mood: 'thinking',
      message: isBeginner
        ? "You're missing some parts! Every slot needs to be filled before we can fly. Try the Auto-Engineer button if you need help!"
        : 'Incomplete spacecraft configuration detected. All 7 subsystem slots must be populated before rollout.',
      priority: 'high',
      category: 'general',
    };
  }

  // Priority 3: Not launchable (has warnings but complete)
  if (!validation.isLaunchable && coupled) {
    return generateReadinessHint(coupled, mission, isBeginner);
  }

  // Priority 4: WARNING conflicts - gentle nudges
  const warnings = conflicts.filter((c) => c.severity === 'WARNING');
  if (warnings.length > 0) {
    const top = warnings[0];
    return {
      mood: 'thinking',
      message: isBeginner ? top.beginnerMessage : top.realisticMessage,
      priority: 'medium',
      category: getCategoryFromConflict(top),
    };
  }

  // Priority 5: Optimization hints when ready to launch
  if (validation.isLaunchable && coupled) {
    return generateOptimizationHint(coupled, mission, isBeginner);
  }

  // All good!
  return {
    mood: 'love',
    message: isBeginner
      ? "Looking great! Your spacecraft is ready to roll out. Hit that green button when you're ready!"
      : 'All systems nominal. Spacecraft cleared for ground segment configuration.',
    priority: 'low',
    category: 'success',
  };
}

/**
 * Generate conflict-specific hints with helpful direction
 */
function generateConflictHint(
  conflict: EngineeringConflict,
  isBeginner: boolean
): RobotHint {
  const category = getCategoryFromConflict(conflict);
  let mood: RobotMood = 'thinking';
  let hint = '';

  // Craft contextual hints based on conflict resource and affected category
  const resource = conflict.resource;
  const affected = conflict.affectedCategory;

  if (resource === 'mass' || affected === 'launcher' || affected === 'structure') {
    mood = 'bulb';
    hint = isBeginner
      ? `💡 Hint: ${conflict.beginnerMessage} Try a bigger rocket or lighter parts!`
      : `${conflict.realisticMessage} → Check launcher TWR and Δv margins.`;
  } else if (resource === 'power' || affected === 'power') {
    mood = 'bulb';
    hint = isBeginner
      ? `💡 Hint: ${conflict.beginnerMessage} Solar panels charge batteries in sunlight!`
      : `${conflict.realisticMessage} → Review solar array output vs. bus draw.`;
  } else if (affected === 'battery') {
    mood = 'bulb';
    hint = isBeginner
      ? `💡 Hint: ${conflict.beginnerMessage} Batteries keep you alive in the dark!`
      : `${conflict.realisticMessage} → Verify battery capacity vs. eclipse duration.`;
  } else if (affected === 'thermal') {
    mood = 'bulb';
    hint = isBeginner
      ? `💡 Hint: ${conflict.beginnerMessage} Better thermal systems handle more heat!`
      : `${conflict.realisticMessage} → Thermal rejection capacity vs. internal heat.`;
  } else if (affected === 'payload') {
    mood = 'thinking';
    hint = isBeginner
      ? `💡 Hint: ${conflict.beginnerMessage} Each mission needs the right camera or sensor!`
      : `${conflict.realisticMessage} → Payload type must match mission requirements.`;
  } else if (affected === 'computer' || resource === 'data') {
    mood = 'bulb';
    hint = isBeginner
      ? `💡 Hint: ${conflict.beginnerMessage} Faster computers process more data!`
      : `${conflict.realisticMessage} → Check CPU throughput vs. payload data rate.`;
  } else if (affected === 'adcs') {
    mood = 'bulb';
    hint = isBeginner
      ? `💡 Hint: ${conflict.beginnerMessage} Better ADCS = better pointing!`
      : `${conflict.realisticMessage} → ADCS tier and deep-space capability required.`;
  } else {
    // Generic conflict
    mood = 'thinking';
    hint = isBeginner ? conflict.beginnerMessage : conflict.realisticMessage;
  }

  return {
    mood,
    message: hint,
    priority: 'critical',
    category,
  };
}

/**
 * Generate readiness hints when spacecraft is complete but not launchable
 */
function generateReadinessHint(
  coupled: CoupledMetrics,
  _mission: any,
  isBeginner: boolean
): RobotHint {
  // Check multiple readiness factors
  if (coupled.padTwr < 1.05) {
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Your rocket can't lift off! TWR is ${coupled.padTwr.toFixed(2)} but needs 1.05+. Pick a stronger rocket or drop weight.`
        : `Pad TWR insufficient: ${coupled.padTwr.toFixed(2)} < 1.05. Increase thrust or reduce mass.`,
      priority: 'critical',
      category: 'mass',
    };
  }

  if (coupled.deltaVMarginMs < 0) {
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Not enough fuel! You're ${Math.abs(coupled.deltaVMarginMs).toFixed(0)} m/s short. Need a bigger rocket or lighter parts.`
        : `Δv deficit: ${coupled.deltaVMarginMs.toFixed(0)} m/s below mission target. Insufficient propellant budget.`,
      priority: 'critical',
      category: 'mass',
    };
  }

  if (coupled.netCruiseW < 0) {
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Power shortage! Your solar panels make ${coupled.sunlitGenerationW.toFixed(0)}W but you need ${coupled.cruisePowerW.toFixed(0)}W. Get bigger panels!`
        : `Cruise power deficit: ${coupled.netCruiseW.toFixed(0)}W margin. Solar/RTG output insufficient.`,
      priority: 'critical',
      category: 'power',
    };
  }

  if (coupled.eclipseEnduranceMin < 1) {
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Battery too small! You'll run out of power in shadows. Get a bigger battery to survive the dark.`
        : `Eclipse survival: ${coupled.eclipseEnduranceMin.toFixed(1)} min < mission eclipse duration. Battery insufficient.`,
      priority: 'critical',
      category: 'power',
    };
  }

  // Generic not ready
  return {
    mood: 'thinking',
    message: isBeginner
      ? "Hmm, something's not quite right yet. Check the warnings above for clues!"
      : 'Configuration incomplete. Review engineering conflicts for launch clearance.',
    priority: 'high',
    category: 'general',
  };
}

/**
 * Generate optimization hints when spacecraft is ready but could be better
 */
function generateOptimizationHint(
  coupled: CoupledMetrics,
  _mission: any,
  isBeginner: boolean
): RobotHint {
  // Check for thin margins that could be improved
  if (coupled.deltaVMarginMs > 0 && coupled.deltaVMarginMs < 200) {
    return {
      mood: 'thinking',
      message: isBeginner
        ? `You're good to go, but your fuel margin is tight (${coupled.deltaVMarginMs.toFixed(0)} m/s). A bit more would be safer!`
        : `Δv margin slim: ${coupled.deltaVMarginMs.toFixed(0)} m/s. Consider +10% reserve for maneuvers.`,
      priority: 'low',
      category: 'mass',
    };
  }

  if (coupled.netCruiseW > 0 && coupled.netCruiseW < 50) {
    return {
      mood: 'thinking',
      message: isBeginner
        ? `Your power is barely enough (${coupled.netCruiseW.toFixed(0)}W extra). More solar panels = safer mission!`
        : `Cruise power margin: ${coupled.netCruiseW.toFixed(0)}W. Recommend 15%+ margin for anomalies.`,
      priority: 'low',
      category: 'power',
    };
  }

  if (coupled.eclipseEnduranceMin < coupled.requiredEclipseMin + 5) {
    return {
      mood: 'thinking',
      message: isBeginner
        ? `Your battery will survive shadows, but barely. A bit more capacity = peace of mind!`
        : `Eclipse survival: ${coupled.eclipseEnduranceMin.toFixed(1)} min. Recommend +20% margin.`,
      priority: 'low',
      category: 'power',
    };
  }

  // All margins good!
  return {
    mood: 'love',
    message: isBeginner
      ? "Perfect build! All your margins look healthy. Let's roll out and set up the ground dishes!"
      : 'Excellent engineering. All subsystems within optimal margins. Cleared for rollout.',
    priority: 'low',
    category: 'success',
  };
}

/**
 * Generate debrief analysis after flight completion
 * Analyzes WHY the mission failed and suggests specific fixes
 */
export function generateDebriefAnalysis(
  debrief: DebriefReport,
  flightState: FlightState,
  difficulty: DifficultyMode
): RobotHint {
  const isBeginner = difficulty === 'BEGINNER';

  if (debrief.outcome === 'SUCCESS') {
    return {
      mood: 'love',
      message: isBeginner
        ? `🎉 Mission success! You nailed it! All systems performed perfectly and you achieved the objective. Great piloting!`
        : `Mission success. All flight phases completed nominally. Target achieved with positive margins across all subsystems.`,
      priority: 'low',
      category: 'success',
    };
  }

  // FAILURE analysis - determine root cause and suggest fixes
  const failureReason = flightState.failureReason ?? 'Unknown failure';

  // Power blackout
  if (failureReason.includes('Power blackout') || failureReason.includes('battery')) {
    const minBattery = flightState.minBatteryPct;
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Analysis: Battery died during shadow (hit ${minBattery.toFixed(0)}%). Fix: Install a BIGGER BATTERY or add an RTG (nuclear battery) that works in the dark!`
        : `Root cause: Battery depletion during eclipse (${minBattery.toFixed(1)}% SoC minimum). Recommendation: Increase battery capacity by 50% or add RTG baseline power. Review ${debrief.resources.power.realisticMetrics}`,
      priority: 'critical',
      category: 'power',
    };
  }

  // Thermal failure
  if (failureReason.includes('thermal') || failureReason.includes('Overheated') || failureReason.includes('temperature')) {
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Analysis: Spacecraft overheated! Fix: Upgrade to a BETTER THERMAL SYSTEM (higher tier) to reject more heat.`
        : `Root cause: Thermal rejection capacity exceeded. Heat load: ${flightState.thermalTempC.toFixed(1)}°C. Recommendation: Upgrade thermal subsystem tier or reduce power draw. Review ${debrief.resources.power.realisticMetrics}`,
      priority: 'critical',
      category: 'thermal',
    };
  }

  // TWR / Launch failure
  if (failureReason.includes('TWR') || failureReason.includes('Thrust-to-weight')) {
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Analysis: Rocket too weak to lift off! Fix: Pick a STRONGER ROCKET or use LIGHTER PARTS.`
        : `Root cause: Pad TWR < 1.05. Recommendation: Increase launcher thrust or reduce spacecraft dry mass by 15%. Review structural tier vs. payload mass.`,
      priority: 'critical',
      category: 'mass',
    };
  }

  // Crash / Impact
  if (failureReason.includes('crash') || failureReason.includes('impact') || failureReason.includes('shock')) {
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Analysis: Landing too hard! Fix: Need LANDING LEGS (Structure Tier 2+) and save more fuel for the final descent.`
        : `Root cause: Surface impact velocity excessive or structure tier insufficient. Recommendation: Upgrade structure to Tier 2+ (landing legs) and reserve 300+ m/s Δv for landing burn.`,
      priority: 'critical',
      category: 'mass',
    };
  }

  // Orbital decay / insufficient velocity
  if (failureReason.includes('Orbital decay') || failureReason.includes('Suborbital') || failureReason.includes('Burned up')) {
    const dvShort = flightState.deltaVRemainingMs < 0 ? Math.abs(flightState.deltaVRemainingMs) : 0;
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Analysis: Ran out of fuel before reaching orbit! Fix: Pick a BIGGER ROCKET with more fuel or use LIGHTER PARTS.`
        : `Root cause: Insufficient Δv budget. Shortfall: ~${dvShort.toFixed(0)} m/s. Recommendation: Upgrade launcher or reduce payload mass 20%. Verify staging timing.`,
      priority: 'critical',
      category: 'mass',
    };
  }

  // Data buffer overflow
  if (failureReason.includes('buffer') || flightState.droppedDataMb > 10) {
    return {
      mood: 'bulb',
      message: isBeginner
        ? `💡 Analysis: Camera filled up memory and dropped ${flightState.droppedDataMb.toFixed(0)}MB! Fix: Add MORE GROUND DISHES or use FASTER COMMS (X-Band or Ka-Band).`
        : `Root cause: Onboard storage overflow. Data loss: ${flightState.droppedDataMb.toFixed(1)}MB. Recommendation: Increase DSN coverage 30% or upgrade to X/Ka-Band. Review science generation rate vs. downlink capacity.`,
      priority: 'high',
      category: 'comms',
    };
  }

  // Generic failure
  return {
    mood: 'thinking',
    message: isBeginner
      ? `💡 Analysis: ${failureReason}. Check the numbers above to see what went wrong - red means critical problem!`
      : `Flight failure: ${failureReason}. Review debrief metrics for subsystem that reached CRITICAL status. Cross-reference validation conflicts.`,
    priority: 'high',
    category: 'general',
  };
}

/**
 * Helper: Determine resource category from conflict
 */
function getCategoryFromConflict(conflict: EngineeringConflict): RobotHint['category'] {
  const resource = conflict.resource;
  const affected = conflict.affectedCategory;

  if (resource === 'mass' || affected === 'structure' || affected === 'launcher') return 'mass';
  if (resource === 'power' || affected === 'power') return 'power';
  if (affected === 'battery') return 'power';
  if (affected === 'thermal') return 'thermal';
  if (affected === 'computer' || resource === 'data') return 'data';
  if (resource === 'comms' || affected === 'ground') return 'comms';
  if (resource === 'time') return 'general';
  return 'general';
}

/**
 * Get robot image filename based on mood
 */
export function getRobotImage(mood: RobotMood): string {
  switch (mood) {
    case 'happy':
      return '/Robot/Robot-Happy.png';
    case 'thinking':
      return '/Robot/Robot-Thinking.png';
    case 'love':
      return '/Robot/Robot-Love.png';
    case 'bulb':
      return '/Robot/Robot-Bulb.png';
    default:
      return '/Robot/Robot-Happy.png';
  }
}
