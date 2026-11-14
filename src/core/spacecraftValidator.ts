import {
  COMMS_BANDS,
  G0,
  LAUNCHERS_BY_ID,
  MISSIONS,
  PARTS_BY_ID,
} from './constants';
import type {
  DifficultyMode,
  EngineeringConflict,
  GroundConfig,
  MissionId,
  SpacecraftConfig,
  SpacecraftPart,
  SpacecraftValidation,
} from './types';

export function computeBuildMonths(
  parts: SpacecraftPart[],
  launcherLeadMonths: number
): number {
  if (parts.length === 0) return launcherLeadMonths;
  const maxPart = Math.max(...parts.map((p) => p.leadMonths));
  const sumPart = parts.reduce((acc, p) => acc + p.leadMonths, 0);
  return maxPart + Math.ceil(sumPart * 0.2) + launcherLeadMonths;
}

export function validateSpacecraft(
  missionId: MissionId,
  config: SpacecraftConfig,
  _mode: DifficultyMode,
  groundConfig?: GroundConfig
): SpacecraftValidation {
  const mission = MISSIONS[missionId];

  const structure = config.structureId ? PARTS_BY_ID[config.structureId] : undefined;
  const power = config.powerId ? PARTS_BY_ID[config.powerId] : undefined;
  const battery = config.batteryId ? PARTS_BY_ID[config.batteryId] : undefined;
  const computer = config.computerId ? PARTS_BY_ID[config.computerId] : undefined;
  const adcs = config.adcsId ? PARTS_BY_ID[config.adcsId] : undefined;
  const thermal = config.thermalId ? PARTS_BY_ID[config.thermalId] : undefined;
  const payload = config.payloadId ? PARTS_BY_ID[config.payloadId] : undefined;
  const launcher = config.launcherId ? LAUNCHERS_BY_ID[config.launcherId] : undefined;

  const selectedParts = [structure, power, battery, computer, adcs, thermal, payload].filter(
    (p): p is SpacecraftPart => Boolean(p)
  );

  const isComplete = selectedParts.length === 7 && Boolean(launcher);
  const conflicts: EngineeringConflict[] = [];

  // Mass & Delta-V
  const spacecraftDryKg = selectedParts.reduce((s, p) => s + p.massKg, 0);
  const payloadPlusSubsystemsKg = selectedParts
    .filter((p) => p.category !== 'structure')
    .reduce((s, p) => s + p.massKg, 0);

  let stage1TotalKg = 0;
  let stage2TotalKg = 0;
  let launchTotalMassKg = spacecraftDryKg;
  let padTwr = 0;
  let stage1DeltaVMs = 0;
  let stage2DeltaVMs = 0;

  if (launcher) {
    stage1TotalKg = launcher.stage1DryKg + launcher.stage1PropKg;
    stage2TotalKg = launcher.stage2DryKg + launcher.stage2PropKg;
    launchTotalMassKg = stage1TotalKg + stage2TotalKg + spacecraftDryKg;
    padTwr = launcher.stage1ThrustN / (launchTotalMassKg * G0);

    const m0_s1 = launchTotalMassKg;
    const mf_s1 = launchTotalMassKg - launcher.stage1PropKg;
    stage1DeltaVMs = launcher.stage1IspS * G0 * Math.log(m0_s1 / mf_s1);

    const m0_s2 = stage2TotalKg + spacecraftDryKg;
    const mf_s2 = launcher.stage2DryKg + spacecraftDryKg;
    stage2DeltaVMs = launcher.stage2IspS * G0 * Math.log(m0_s2 / mf_s2);
  }

  const totalDeltaVMs = stage1DeltaVMs + stage2DeltaVMs;

  // Power
  const commsDrawW = groundConfig ? COMMS_BANDS[groundConfig.bandId].drawW : 15;
  const baseDrawW = selectedParts.reduce((s, p) => s + p.drawW, 0);
  const totalDrawW = baseDrawW + commsDrawW;

  let sunlitGenerationW = 0;
  let eclipseGenerationW = 0;
  if (power && power.baseOutputW !== undefined) {
    if (power.isSolar) {
      sunlitGenerationW = power.baseOutputW * mission.irradianceFactor;
      eclipseGenerationW = 0;
    } else {
      // RTG outputs continuously regardless of sunlight/distance
      sunlitGenerationW = power.baseOutputW;
      eclipseGenerationW = power.baseOutputW;
    }
  }

  const netSunlitW = sunlitGenerationW - totalDrawW;
  const eclipseDrainW = Math.max(0, totalDrawW - eclipseGenerationW);
  const requiredEclipseWh = (eclipseDrainW * mission.eclipseDurationSec) / 3600;
  const batteryWh = battery?.capacityWh ?? 0;

  // Data
  const payloadDataRateMbps = payload?.dataRateMbps ?? 0;
  const cpuMaxMbps = computer?.maxDataMbps ?? 0;
  const storageMaxMb = computer?.storageMb ?? 0;

  // Budget & Schedule
  const craftCostM = selectedParts.reduce((s, p) => s + p.costM, 0);
  const launcherCostM = launcher?.costM ?? 0;
  const totalCraftAndLauncherM = craftCostM + launcherCostM;
  const buildMonths = computeBuildMonths(selectedParts, launcher?.leadMonths ?? 0);

  // --- CONFLICT CHECKS ---

  // 1. Structure checks
  if (structure) {
    const cap = structure.maxPayloadKg ?? 0;
    if (payload && payload.massKg > cap) {
      conflicts.push({
        id: 'struct-payload-overload',
        severity: 'CRITICAL',
        resource: 'mass',
        affectedCategory: 'structure',
        beginnerMessage: `Instrument (${payload.massKg} kg) is too heavy for ${structure.name} (max ${cap} kg).`,
        realisticMessage: `Payload mass ${payload.massKg} kg exceeds ${structure.name} structural rating (${cap} kg).`,
      });
    }
    if (mission.requiresLanderStructure && (structure.structuralIntegrity ?? 0) < 2) {
      conflicts.push({
        id: 'struct-no-landing-legs',
        severity: 'CRITICAL',
        resource: 'mass',
        affectedCategory: 'structure',
        beginnerMessage: `${structure.name} has no landing legs — it will smash on ${mission.targetType === 'MOON_SURFACE' ? 'the Moon' : 'Mars'}!`,
        realisticMessage: `Surface touchdown requires Tier >= 2 landing-strut chassis; ${structure.name} is Tier 1.`,
      });
    }
  }

  // 2. Power checks
  if (power) {
    if (sunlitGenerationW < totalDrawW) {
      conflicts.push({
        id: 'power-deficit',
        severity: 'CRITICAL',
        resource: 'power',
        affectedCategory: 'power',
        beginnerMessage: `Not enough power! Subsystems need ${totalDrawW} W, but ${power.name} only makes ${sunlitGenerationW.toFixed(0)} W here.`,
        realisticMessage: `Sunlit power deficit: ${sunlitGenerationW.toFixed(1)} W gen < ${totalDrawW} W load at ${mission.irradianceFactor}x irradiance.`,
      });
    } else if (netSunlitW < totalDrawW * 0.15) {
      conflicts.push({
        id: 'power-low-margin',
        severity: 'WARNING',
        resource: 'power',
        affectedCategory: 'power',
        beginnerMessage: `Power margin is razor-thin (+${netSunlitW.toFixed(0)} W). Battery will recharge very slowly.`,
        realisticMessage: `Low sunlit recharge margin (+${netSunlitW.toFixed(1)} W < 15% of load); consider higher-output power or RTG.`,
      });
    }
  }

  // 3. Battery checks
  if (battery) {
    if (batteryWh < requiredEclipseWh) {
      conflicts.push({
        id: 'battery-eclipse-blackout',
        severity: 'CRITICAL',
        resource: 'power',
        affectedCategory: 'battery',
        beginnerMessage: `Battery (${batteryWh} Wh) will run flat during the ${mission.eclipseDurationSec}s shadow (needs ${requiredEclipseWh.toFixed(0)} Wh)!`,
        realisticMessage: `Eclipse energy shortfall: ${batteryWh} Wh < ${requiredEclipseWh.toFixed(1)} Wh required for ${mission.eclipseDurationSec}s umbra.`,
      });
    } else if (batteryWh < requiredEclipseWh * 1.25 && requiredEclipseWh > 0) {
      conflicts.push({
        id: 'battery-tight-dod',
        severity: 'WARNING',
        resource: 'power',
        affectedCategory: 'battery',
        beginnerMessage: `Battery reserves are tight for shadow crossings (${batteryWh} Wh vs ${requiredEclipseWh.toFixed(0)} Wh needed).`,
        realisticMessage: `High eclipse Depth-of-Discharge (>80% DoD); consider larger battery bank for margin.`,
      });
    }
  }

  // 4. Computer checks
  if (computer) {
    if (payload && payloadDataRateMbps > cpuMaxMbps) {
      conflicts.push({
        id: 'cpu-bottleneck',
        severity: 'CRITICAL',
        resource: 'data',
        affectedCategory: 'computer',
        beginnerMessage: `${payload.name} pumps ${payloadDataRateMbps} Mbps, choking ${computer.name} (${cpuMaxMbps} Mbps max)!`,
        realisticMessage: `Data bus bottleneck: payload ${payloadDataRateMbps} Mbps > ${computer.name} ${cpuMaxMbps} Mbps DMA limit.`,
      });
    }
    if (mission.requiresRadHardCpu && !computer.radHardened) {
      conflicts.push({
        id: 'cpu-radiation-risk',
        severity: 'CRITICAL',
        resource: 'data',
        affectedCategory: 'computer',
        beginnerMessage: `${computer.name} isn't radiation-shielded and will crash in deep space!`,
        realisticMessage: `Non-rad-hard COTS MCU exposed to Van Allen / deep-space SEU faults; rad-hard OBC required.`,
      });
    }
  }

  // 5. ADCS checks
  if (adcs) {
    if (mission.requiresDeepSpaceAdcs && !adcs.deepSpaceCapable) {
      conflicts.push({
        id: 'adcs-no-mag-field',
        severity: 'CRITICAL',
        resource: 'comms',
        affectedCategory: 'adcs',
        beginnerMessage: `Magnetorquers only steer near Earth's magnetic field — useless for this deep-space flight!`,
        realisticMessage: `${adcs.name} requires planetary magnetosphere; ineffective beyond LEO.`,
      });
    } else if ((adcs.pointingTier ?? 0) < mission.requiredAdcsTier) {
      conflicts.push({
        id: 'adcs-pointing-insufficient',
        severity: 'CRITICAL',
        resource: 'comms',
        affectedCategory: 'adcs',
        beginnerMessage: `Pointing isn't steady enough! This mission needs Tier ${mission.requiredAdcsTier} precision (${mission.id === 'SPACE_TELESCOPE' ? 'CMG Gyros' : 'Reaction Wheels'}).`,
        realisticMessage: `ADCS Tier ${adcs.pointingTier ?? 0} fails mission pointing jitter limit (requires Tier ${mission.requiredAdcsTier}).`,
      });
    }
  }

  // 6. Thermal checks
  if (thermal) {
    if (mission.requiresHeatShield && !thermal.heatShield) {
      conflicts.push({
        id: 'thermal-missing-heatshield',
        severity: 'CRITICAL',
        resource: 'mass',
        affectedCategory: 'thermal',
        beginnerMessage: `Mars entry burns at thousands of degrees — you MUST equip the PICA-X Heatshield!`,
        realisticMessage: `Mars EDL atmospheric entry at 45 km without ablative heatshield causes catastrophic structural burn-up.`,
      });
    } else if ((thermal.thermalTier ?? 0) < mission.requiredThermalTier) {
      conflicts.push({
        id: 'thermal-insufficient',
        severity: 'CRITICAL',
        resource: 'power',
        affectedCategory: 'thermal',
        beginnerMessage: `${thermal.name} cannot survive deep-space temperature extremes here.`,
        realisticMessage: `Thermal control Tier ${thermal.thermalTier ?? 0} below mission Tier ${mission.requiredThermalTier} requirement.`,
      });
    }
  }

  // 7. Payload mission match
  if (payload && payload.missionMatch !== mission.requiredPayloadMatch) {
    conflicts.push({
      id: 'payload-mismatch',
      severity: 'CRITICAL',
      resource: 'data',
      affectedCategory: 'payload',
      beginnerMessage: `${payload.name} is the wrong instrument for ${mission.title}!`,
      realisticMessage: `Payload ${payload.id} (${payload.missionMatch}) does not satisfy mission objective (${mission.requiredPayloadMatch}).`,
    });
  }

  // 8. Launcher checks
  if (launcher) {
    if (padTwr < 1.05) {
      conflicts.push({
        id: 'launcher-twr-low',
        severity: 'CRITICAL',
        resource: 'mass',
        affectedCategory: 'launcher',
        beginnerMessage: `Rocket is too weak to lift off the pad! (Thrust-to-Weight ${padTwr.toFixed(2)} < 1.05).`,
        realisticMessage: `Insufficient liftoff TWR (${padTwr.toFixed(2)} < 1.05); vehicle remains grounded on pad.`,
      });
    }
    if (totalDeltaVMs < mission.targetDeltaVMs) {
      conflicts.push({
        id: 'launcher-deltav-short',
        severity: 'CRITICAL',
        resource: 'mass',
        affectedCategory: 'launcher',
        beginnerMessage: `Not enough fuel/Δv! Rocket provides ${totalDeltaVMs.toFixed(0)} m/s, mission needs ${mission.targetDeltaVMs} m/s.`,
        realisticMessage: `Δv shortfall: ${totalDeltaVMs.toFixed(0)} m/s available < ${mission.targetDeltaVMs} m/s mission budget.`,
      });
    }
  }

  // 9. Budget & Schedule craft warnings
  if (totalCraftAndLauncherM > mission.budgetCapM) {
    conflicts.push({
      id: 'budget-craft-over-cap',
      severity: 'CRITICAL',
      resource: 'budget',
      affectedCategory: 'launcher',
      beginnerMessage: `Spacecraft + Rocket ($${totalCraftAndLauncherM}M) already blows past the $${mission.budgetCapM}M budget!`,
      realisticMessage: `Hardware capex $${totalCraftAndLauncherM}M exceeds campaign ceiling $${mission.budgetCapM}M before ground segment.`,
    });
  }
  if (buildMonths > mission.scheduleLimitMonths) {
    conflicts.push({
      id: 'schedule-craft-over-cap',
      severity: 'CRITICAL',
      resource: 'time',
      affectedCategory: 'launcher',
      beginnerMessage: `Build time (${buildMonths} mo) misses the ${mission.scheduleLimitMonths}-month launch window!`,
      realisticMessage: `Integration lead time (${buildMonths} mo) exceeds ${mission.scheduleLimitMonths}-month launch window deadline.`,
    });
  }

  const criticalCount = conflicts.filter((c) => c.severity === 'CRITICAL').length;
  const warningCount = conflicts.filter((c) => c.severity === 'WARNING').length;

  let kapMood: 'HAPPY' | 'CONCERNED' | 'ALERT' = 'HAPPY';
  let kapHeadline = 'All subsystems green! Ready for Ground Segment & Launch.';

  if (!isComplete) {
    kapMood = criticalCount > 0 ? 'ALERT' : 'CONCERNED';
    kapHeadline =
      criticalCount > 0
        ? `${criticalCount} critical issue(s) spotted — finish selecting all parts and resolve alerts.`
        : `Select all 7 spacecraft subsystems plus a Launch Vehicle to complete assembly.`;
  } else if (criticalCount > 0) {
    kapMood = 'ALERT';
    kapHeadline = `${criticalCount} critical engineering conflict(s) detected — fix before launch!`;
  } else if (warningCount > 0) {
    kapMood = 'CONCERNED';
    kapHeadline = `Launchable with ${warningCount} margin warning(s) — check Kap's telemetry notes.`;
  }

  const isLaunchable = isComplete && criticalCount === 0;

  return {
    isComplete,
    isLaunchable,
    kapMood,
    kapHeadline,
    conflicts,
    mass: {
      spacecraftDryKg,
      payloadPlusSubsystemsKg,
      stage1TotalKg,
      stage2TotalKg,
      launchTotalMassKg,
      padTwr,
      stage1DeltaVMs,
      stage2DeltaVMs,
      totalDeltaVMs,
    },
    power: {
      sunlitGenerationW,
      eclipseGenerationW,
      totalDrawW,
      netSunlitW,
      eclipseDurationSec: mission.eclipseDurationSec,
      requiredEclipseWh,
      batteryWh,
    },
    data: {
      payloadDataRateMbps,
      cpuMaxMbps,
      storageMaxMb,
    },
    budget: {
      craftCostM,
      launcherCostM,
      totalCraftAndLauncherM,
    },
    schedule: {
      buildMonths,
    },
  };
}
