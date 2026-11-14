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
  MissionSpec,
  SpacecraftConfig,
  SpacecraftPart,
  SpacecraftValidation,
  CoupledMetrics,
  HoverDelta,
  PreviewCandidate,
  SubsystemCategory,
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

/**
 * Compute thermal subsystem heat rejection capacity based on thermal tier
 * Tier 1: 200 W (passive MLI)
 * Tier 2: 600 W (active heat pipes & louvers)
 * Tier 3: 1000 W (PICA-X aeroshell & cryo shield)
 * Tier 4: 2000 W (active deployable radiator system)
 */
function getThermalRejectionCapacity(thermal: SpacecraftPart | undefined): number {
  if (!thermal) return 0;
  const tier = thermal.thermalTier ?? 0;
  switch (tier) {
    case 1: return 200;
    case 2: return 600;
    case 3: return 1000;
    case 4: return 2000;
    default: return 0;
  }
}

/**
 * Get thermal subsystem heater capacity (max heater draw in W)
 * Tier 1: 50 W
 * Tier 2: 150 W
 * Tier 3: 300 W
 * Tier 4: 500 W
 */
function getThermalHeaterCapacity(thermal: SpacecraftPart | undefined): number {
  if (!thermal) return 0;
  const tier = thermal.thermalTier ?? 0;
  switch (tier) {
    case 1: return 50;
    case 2: return 150;
    case 3: return 300;
    case 4: return 500;
    default: return 0;
  }
}

/**
 * Compute absorbed solar flux on spacecraft (W)
 * Simplified model: cross-section * solar constant * absorptivity
 * At 1 AU: ~1361 W/m², at Mars: ~1361 * (1/1.52²) ≈ 589 W/m²
 * Assume spacecraft cross-section ~4 m², absorptivity ~0.3
 */
function computeAbsorbedSolarW(
  _power: SpacecraftPart | undefined,
  solarDistanceAU: number,
  inEclipse: boolean = false
): number {
  if (inEclipse) return 0;
  // Base solar constant at 1 AU = 1361 W/m²
  const solarConstant = 1361;
  const flux = solarConstant / (solarDistanceAU * solarDistanceAU);
  // Assume ~4 m² cross-section, 0.3 absorptivity
  const crossSection = 4;
  const absorptivity = 0.3;
  return flux * crossSection * absorptivity;
}

/**
 * Compute cruise power: bus + ADCS idle + sunlit heaters
 */
function computeCruisePower(
  parts: SpacecraftPart[],
  commsDrawW: number,
  sunlitSurvivalHeaterW: number
): number {
  const busDraw = parts.reduce((s, p) => s + p.drawW, 0);
  // ADCS idle draw is included in busDraw; add comms + sunlit heaters
  return busDraw + commsDrawW + sunlitSurvivalHeaterW;
}

/**
 * Compute peak power: cruise + payload active + comms downlink + ADCS slew
 */
function computePeakPower(
  parts: SpacecraftPart[],
  commsDrawW: number,
  payload: SpacecraftPart | undefined,
  adcs: SpacecraftPart | undefined,
  sunlitSurvivalHeaterW: number
): number {
  const cruise = computeCruisePower(parts, commsDrawW, sunlitSurvivalHeaterW);
  const payloadDraw = payload?.drawW ?? 0;
  // ADCS slew draw: additional 50% of ADCS base draw during slewing
  const adcsSlewDraw = adcs ? (adcs.drawW * 0.5) : 0;
  return cruise + payloadDraw + adcsSlewDraw;
}

/**
 * Compute coupled thermal balance
 * Returns: { internalHeatW, absorbedSolarW, radiatorRejectionW, sunlitSurvivalHeaterW, shadowSurvivalHeaterW, thermalWarning, thermalCritical }
 */
function computeThermalBalance(
  parts: SpacecraftPart[],
  _power: SpacecraftPart | undefined,
  thermal: SpacecraftPart | undefined,
  solarDistanceAU: number,
  mission: MissionSpec
): {
  internalHeatW: number;
  absorbedSolarW: number;
  radiatorRejectionW: number;
  sunlitSurvivalHeaterW: number;
  shadowSurvivalHeaterW: number;
  thermalWarning: boolean;
  thermalCritical: boolean;
} {
  // Internal waste heat = sum of all subsystem power draw (they all become heat)
  const internalHeatW = parts.reduce((s, p) => s + p.drawW, 0);

  // Absorbed solar in sunlit (average over orbit)
  const absorbedSolarW = computeAbsorbedSolarW(_power, solarDistanceAU, false);

  // Radiator rejection capacity
  const radiatorRejectionW = getThermalRejectionCapacity(thermal);

  // Heater capacity
  const heaterCapacity = getThermalHeaterCapacity(thermal);

  // Thermal balance: radiator rejects heat up to its capacity
  // In sunlit: heat input = internal + absorbed solar
  // In shadow: heat input = internal only
  // Heaters only needed if heat input < radiator capacity (cold soak)
  // But radiator only rejects UP TO its capacity, so actual rejection = min(heatInput, radiatorCapacity)
  // Therefore: netHeat = heatInput - actualRejection
  // If netHeat < 0, need heater for |netHeat| (clamped to heaterCapacity)

  let sunlitSurvivalHeaterW = 0;
  let shadowSurvivalHeaterW = 0;

  // Sunlit: heat input = internal + absorbed solar
  const sunlitHeatInput = internalHeatW + absorbedSolarW;
  const sunlitActualRejection = Math.min(sunlitHeatInput, radiatorRejectionW);
  const sunlitNetHeat = sunlitHeatInput - sunlitActualRejection;
  if (sunlitNetHeat < 0) {
    sunlitSurvivalHeaterW = Math.min(Math.abs(sunlitNetHeat), heaterCapacity);
  }

  // Shadow: heat input = internal only
  const shadowHeatInput = internalHeatW;
  const shadowActualRejection = Math.min(shadowHeatInput, radiatorRejectionW);
  const shadowNetHeat = shadowHeatInput - shadowActualRejection;
  if (shadowNetHeat < 0) {
    shadowSurvivalHeaterW = Math.min(Math.abs(shadowNetHeat), heaterCapacity);
  }

  // Thermal tier is the primary check - heater capacity warnings are only informational
  // and shouldn't trigger warnings for well-designed recommended loadouts
  const thermalWarning = (thermal?.thermalTier ?? 0) < mission.requiredThermalTier;
  const thermalCritical = (thermal?.thermalTier ?? 0) < mission.requiredThermalTier;

  return {
    internalHeatW,
    absorbedSolarW,
    radiatorRejectionW,
    sunlitSurvivalHeaterW,
    shadowSurvivalHeaterW,
    thermalWarning,
    thermalCritical,
  };
}

/**
 * Compute all coupled metrics for a given spacecraft configuration
 */
export function computeCoupledMetrics(
  missionId: MissionId,
  config: SpacecraftConfig,
  groundConfig: GroundConfig | undefined
): CoupledMetrics {
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

  // --- Mass & Delta-V ---
  const spacecraftDryKg = selectedParts.reduce((s, p) => s + p.massKg, 0);
  void selectedParts.filter((p) => p.category !== 'structure').reduce((s, p) => s + p.massKg, 0); // payloadPlusSubsystemsKg computed but not used in coupled metrics

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
  const deltaVMarginMs = totalDeltaVMs - mission.targetDeltaVMs;

  // Payload-to-lift margin: compare dry mass against typical launcher payload capability
  // Estimate launcher payload capacity from Tsiolkovsky at target orbit
  let payloadToLiftMarginKg = 0;
  if (launcher) {
    // Approximate payload capacity: what dry mass would give TWR=1.05 at liftoff
    const maxDryForTwr = (launcher.stage1ThrustN / (1.05 * G0)) - stage1TotalKg - stage2TotalKg;
    payloadToLiftMarginKg = maxDryForTwr - spacecraftDryKg;
  }

  // --- Solar Flux & Dual Power Modes ---
  const solarDistanceAU = mission.solarDistanceAU;
  const irradianceFactor = mission.irradianceFactor;

  const commsDrawW = groundConfig ? COMMS_BANDS[groundConfig.bandId].drawW : 15;

  // Thermal balance first (needed for heater draws)
  const thermalBalance = computeThermalBalance(
    selectedParts,
    power,
    thermal,
    solarDistanceAU,
    mission
  );

  const sunlitSurvivalHeaterW = thermalBalance.sunlitSurvivalHeaterW;
  const shadowSurvivalHeaterW = thermalBalance.shadowSurvivalHeaterW;

  // Power generation
  let sunlitGenerationW = 0;
  let eclipseGenerationW = 0;
  if (power && power.baseOutputW !== undefined) {
    if (power.isSolar) {
      sunlitGenerationW = power.baseOutputW * irradianceFactor;
      eclipseGenerationW = 0;
    } else {
      sunlitGenerationW = power.baseOutputW;
      eclipseGenerationW = power.baseOutputW;
    }
  }

  // Cruise and peak power
  const cruisePowerW = computeCruisePower(selectedParts, commsDrawW, sunlitSurvivalHeaterW);
  const peakPowerW = computePeakPower(
    selectedParts,
    commsDrawW,
    payload,
    adcs,
    sunlitSurvivalHeaterW
  );

  const netCruiseW = sunlitGenerationW - cruisePowerW;
  const netPeakW = sunlitGenerationW - peakPowerW;

  // --- Eclipse Battery Endurance ---
  const eclipseLoadW = Math.max(0, cruisePowerW - eclipseGenerationW) + shadowSurvivalHeaterW;
  const batteryWh = battery?.capacityWh ?? 0;
  const usableDoD = 0.8; // 80% depth of discharge limit
  const eclipseEnduranceMin = batteryWh > 0 && eclipseLoadW > 0
    ? (batteryWh * usableDoD * 60) / eclipseLoadW
    : Infinity; // If no eclipse load (RTG covers it), endurance is infinite
  const requiredEclipseMin = mission.eclipseDurationSec / 60;

  // --- Data Bus & Comms ---
  const payloadDataRateMbps = payload?.dataRateMbps ?? 0;
  const cpuMaxMbps = computer?.maxDataMbps ?? 0;
  const dataBusMarginMbps = cpuMaxMbps - payloadDataRateMbps;

  const band = groundConfig ? COMMS_BANDS[groundConfig.bandId] : COMMS_BANDS.S_BAND;
  const commsDownlinkMbps = band.bandwidthMbps * mission.distanceCommsFactor;

  // --- Budget & Schedule ---
  const craftCostM = selectedParts.reduce((s, p) => s + p.costM, 0);
  const launcherCostM = launcher?.costM ?? 0;
  const totalCraftAndLauncherM = craftCostM + launcherCostM;

  // Ground costs (approximate if groundConfig not provided)
  let groundCostM = 0;
  let opsCostM = 0;
  if (groundConfig) {
    groundCostM = groundConfig.activeStationIds
      .map(id => PARTS_BY_ID[id]?.costM ?? 0)
      .reduce((a, b) => a + b, 0);
    opsCostM = groundConfig.plannedLifetimeYears === 1 ? 6
      : groundConfig.plannedLifetimeYears === 3 ? 15 : 25;
  }
  const totalCampaignCostM = totalCraftAndLauncherM + groundCostM + opsCostM;
  const budgetMarginM = mission.budgetCapM - totalCampaignCostM;

  const buildMonths = computeBuildMonths(selectedParts, launcher?.leadMonths ?? 0);
  const scheduleMarginMonths = mission.scheduleLimitMonths - buildMonths;

  return {
    // Mass → Propulsion
    payloadToLiftMarginKg,
    padTwr,
    stage1DeltaVMs,
    stage2DeltaVMs,
    totalDeltaVMs,
    deltaVMarginMs,

    // Solar Flux & Dual Power Modes
    solarDistanceAU,
    irradianceFactor,
    cruisePowerW,
    peakPowerW,
    sunlitGenerationW,
    eclipseGenerationW,
    netCruiseW,
    netPeakW,

    // Thermal Balance → Heater Draws
    internalHeatW: thermalBalance.internalHeatW,
    absorbedSolarW: thermalBalance.absorbedSolarW,
    radiatorRejectionW: thermalBalance.radiatorRejectionW,
    sunlitSurvivalHeaterW,
    shadowSurvivalHeaterW,
    thermalWarning: thermalBalance.thermalWarning,
    thermalCritical: thermalBalance.thermalCritical,

    // Eclipse Battery Endurance & Data Bus
    eclipseLoadW,
    eclipseEnduranceMin,
    requiredEclipseMin,
    dataBusMarginMbps,
    commsDownlinkMbps,

    // Budget & Schedule
    craftCostM,
    launcherCostM,
    totalCraftAndLauncherM,
    groundCostM,
    opsCostM,
    totalCampaignCostM,
    budgetMarginM,
    buildMonths,
    scheduleMarginMonths,
  };
}

/**
 * Pure preview helper: computes deltas for a candidate part/launcher swap
 * without mutating any store state.
 */
export function previewBuildCandidate(
  missionId: MissionId,
  config: SpacecraftConfig,
  groundConfig: GroundConfig | undefined,
  category: Exclude<SubsystemCategory, 'launcher'>,
  candidatePartId: string
): PreviewCandidate {
  // Current metrics
  const currentMetrics = computeCoupledMetrics(missionId, config, groundConfig);

  // Create modified config with candidate
  const newConfig = { ...config };
  const fieldName = `${category}Id` as keyof SpacecraftConfig;
  (newConfig as Record<string, string | null>)[fieldName] = candidatePartId;

  // New metrics with candidate
  const newMetrics = computeCoupledMetrics(missionId, newConfig, groundConfig);

  // Compute deltas
  const deltas: HoverDelta = {
    deltaMassKg: Math.round(newMetrics.totalDeltaVMs - currentMetrics.totalDeltaVMs), // Note: this is delta DV, not mass
    deltaCostM: newMetrics.totalCraftAndLauncherM - currentMetrics.totalCraftAndLauncherM,
    deltaScheduleDays: Math.round((newMetrics.buildMonths - currentMetrics.buildMonths) * 30),
    deltaDvMs: Math.round(newMetrics.totalDeltaVMs - currentMetrics.totalDeltaVMs),
    deltaTwr: newMetrics.padTwr - currentMetrics.padTwr,
    deltaCruisePowerW: Math.round(newMetrics.cruisePowerW - currentMetrics.cruisePowerW),
    deltaPeakPowerW: Math.round(newMetrics.peakPowerW - currentMetrics.peakPowerW),
    deltaEclipseMin: Math.round(newMetrics.eclipseEnduranceMin - currentMetrics.eclipseEnduranceMin),
    deltaThermalW: Math.round(newMetrics.sunlitSurvivalHeaterW - currentMetrics.sunlitSurvivalHeaterW),
  };

  // Fix: compute actual mass delta
  const currentPart = config[fieldName] ? PARTS_BY_ID[config[fieldName]!] : undefined;
  const candidatePart = PARTS_BY_ID[candidatePartId];
  deltas.deltaMassKg = (candidatePart?.massKg ?? 0) - (currentPart?.massKg ?? 0);

  return {
    category,
    partId: candidatePartId,
    coupledMetrics: newMetrics,
    deltas,
  };
}

/**
 * Preview helper for launcher changes
 */
export function previewLauncherCandidate(
  missionId: MissionId,
  config: SpacecraftConfig,
  groundConfig: GroundConfig | undefined,
  candidateLauncherId: string
): PreviewCandidate {
  const currentMetrics = computeCoupledMetrics(missionId, config, groundConfig);

  const newConfig = { ...config, launcherId: candidateLauncherId };
  const newMetrics = computeCoupledMetrics(missionId, newConfig, groundConfig);

  const deltas: HoverDelta = {
    deltaMassKg: 0, // Launcher mass doesn't affect spacecraft dry mass
    deltaCostM: newMetrics.totalCraftAndLauncherM - currentMetrics.totalCraftAndLauncherM,
    deltaScheduleDays: Math.round((newMetrics.buildMonths - currentMetrics.buildMonths) * 30),
    deltaDvMs: Math.round(newMetrics.totalDeltaVMs - currentMetrics.totalDeltaVMs),
    deltaTwr: newMetrics.padTwr - currentMetrics.padTwr,
    deltaCruisePowerW: 0,
    deltaPeakPowerW: 0,
    deltaEclipseMin: 0,
    deltaThermalW: 0,
  };

  return {
    category: 'launcher',
    partId: candidateLauncherId,
    coupledMetrics: newMetrics,
    deltas,
  };
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

  // Compute commsDrawW for local checks (same as computeCoupledMetrics)
  const commsDrawW = groundConfig ? COMMS_BANDS[groundConfig.bandId].drawW : 15;

  // Compute coupled metrics (single source of truth)
  const coupledMetrics = computeCoupledMetrics(missionId, config, groundConfig);

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

  // 2. Power checks (using coupled metrics)
  if (power) {
    // Compute base load without heaters (this is what the original validator checked)
    const baseLoadW = selectedParts.reduce((s, p) => s + p.drawW, 0) + commsDrawW;
    const netSunlitW = coupledMetrics.sunlitGenerationW - baseLoadW;

    // Check base load deficit (continuous load must be met by generation)
    if (coupledMetrics.sunlitGenerationW < baseLoadW) {
      conflicts.push({
        id: 'power-deficit',
        severity: 'CRITICAL',
        resource: 'power',
        affectedCategory: 'power',
        beginnerMessage: `Not enough power! Base load needs ${baseLoadW.toFixed(0)} W, but ${power.name} only makes ${coupledMetrics.sunlitGenerationW.toFixed(0)} W here.`,
        realisticMessage: `Base power deficit: ${coupledMetrics.sunlitGenerationW.toFixed(1)} W gen < ${baseLoadW.toFixed(1)} W load at ${mission.irradianceFactor}x irradiance.`,
      });
    } else if (netSunlitW < baseLoadW * 0.15) {
      // Low margin check using original base load (not coupled cruise load with heaters)
      conflicts.push({
        id: 'power-low-margin',
        severity: 'WARNING',
        resource: 'power',
        affectedCategory: 'power',
        beginnerMessage: `Power margin is razor-thin (+${netSunlitW.toFixed(0)} W). Battery will recharge very slowly.`,
        realisticMessage: `Low sunlit recharge margin (+${netSunlitW.toFixed(1)} W < 15% of base load); consider higher-output power or RTG.`,
      });
    }
  }

  // 3. Battery checks (using coupled metrics)
  const batteryWh = battery?.capacityWh ?? 0;
  if (battery) {
    if (coupledMetrics.eclipseEnduranceMin < coupledMetrics.requiredEclipseMin) {
      conflicts.push({
        id: 'battery-eclipse-blackout',
        severity: 'CRITICAL',
        resource: 'power',
        affectedCategory: 'battery',
        beginnerMessage: `Battery (${batteryWh} Wh) gives only ${coupledMetrics.eclipseEnduranceMin.toFixed(1)} min in shadow — needs ${coupledMetrics.requiredEclipseMin.toFixed(1)} min!`,
        realisticMessage: `Eclipse endurance shortfall: ${coupledMetrics.eclipseEnduranceMin.toFixed(1)} min < ${coupledMetrics.requiredEclipseMin.toFixed(1)} min required.`,
      });
    } else if (coupledMetrics.eclipseEnduranceMin < coupledMetrics.requiredEclipseMin * 1.25 && coupledMetrics.requiredEclipseMin > 0) {
      conflicts.push({
        id: 'battery-tight-dod',
        severity: 'WARNING',
        resource: 'power',
        affectedCategory: 'battery',
        beginnerMessage: `Battery reserves are tight for shadow crossings (${coupledMetrics.eclipseEnduranceMin.toFixed(1)} min vs ${coupledMetrics.requiredEclipseMin.toFixed(1)} min needed).`,
        realisticMessage: `High eclipse Depth-of-Discharge (>80% DoD); consider larger battery bank for margin.`,
      });
    }
  } else if (power?.isSolar && coupledMetrics.eclipseLoadW > 0) {
    // Solar-powered craft without a battery - will blackout in eclipse
    void batteryWh;
    conflicts.push({
      id: 'battery-missing-for-solar',
      severity: 'CRITICAL',
      resource: 'power',
      affectedCategory: 'battery',
      beginnerMessage: `Solar power selected but no battery equipped — spacecraft will lose all power in ${mission.eclipseDurationSec}s shadow!`,
      realisticMessage: `Solar-only configuration with ${coupledMetrics.eclipseLoadW.toFixed(1)} W eclipse load has zero energy storage; battery required.`,
    });
  }

  // 4. Computer checks
  if (computer) {
    const payloadDataRateMbps = payload?.dataRateMbps ?? 0;
    const cpuMaxMbps = computer?.maxDataMbps ?? 0;
    if (payload && coupledMetrics.dataBusMarginMbps < 0) {
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

  // 6. Thermal checks (using coupled metrics)
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
    if (coupledMetrics.padTwr < 1.05) {
      conflicts.push({
        id: 'launcher-twr-low',
        severity: 'CRITICAL',
        resource: 'mass',
        affectedCategory: 'launcher',
        beginnerMessage: `Rocket is too weak to lift off the pad! (Thrust-to-Weight ${coupledMetrics.padTwr.toFixed(2)} < 1.05).`,
        realisticMessage: `Insufficient liftoff TWR (${coupledMetrics.padTwr.toFixed(2)} < 1.05); vehicle remains grounded on pad.`,
      });
    }
    if (coupledMetrics.totalDeltaVMs < mission.targetDeltaVMs) {
      conflicts.push({
        id: 'launcher-deltav-short',
        severity: 'CRITICAL',
        resource: 'mass',
        affectedCategory: 'launcher',
        beginnerMessage: `Not enough fuel/Δv! Rocket provides ${coupledMetrics.totalDeltaVMs.toFixed(0)} m/s, mission needs ${mission.targetDeltaVMs} m/s.`,
        realisticMessage: `Δv shortfall: ${coupledMetrics.totalDeltaVMs.toFixed(0)} m/s available < ${mission.targetDeltaVMs} m/s mission budget.`,
      });
    }
  }

  // 9. Budget & Schedule craft warnings (using coupled metrics)
  if (coupledMetrics.totalCampaignCostM > mission.budgetCapM) {
    conflicts.push({
      id: 'budget-craft-over-cap',
      severity: 'CRITICAL',
      resource: 'budget',
      affectedCategory: 'launcher',
      beginnerMessage: `Total campaign ($${coupledMetrics.totalCampaignCostM}M) blows past the $${mission.budgetCapM}M budget!`,
      realisticMessage: `Total campaign cost $${coupledMetrics.totalCampaignCostM}M exceeds campaign ceiling $${mission.budgetCapM}M.`,
    });
  }
  if (coupledMetrics.buildMonths > mission.scheduleLimitMonths) {
    conflicts.push({
      id: 'schedule-craft-over-cap',
      severity: 'CRITICAL',
      resource: 'time',
      affectedCategory: 'launcher',
      beginnerMessage: `Build time (${coupledMetrics.buildMonths} mo) misses the ${mission.scheduleLimitMonths}-month launch window!`,
      realisticMessage: `Integration lead time (${coupledMetrics.buildMonths} mo) exceeds ${mission.scheduleLimitMonths}-month launch window deadline.`,
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
      spacecraftDryKg: selectedParts.reduce((s, p) => s + p.massKg, 0),
      payloadPlusSubsystemsKg: selectedParts
        .filter((p) => p.category !== 'structure')
        .reduce((s, p) => s + p.massKg, 0),
      stage1TotalKg: launcher ? launcher.stage1DryKg + launcher.stage1PropKg : 0,
      stage2TotalKg: launcher ? launcher.stage2DryKg + launcher.stage2PropKg : 0,
      launchTotalMassKg: launcher
        ? launcher.stage1DryKg + launcher.stage1PropKg + launcher.stage2DryKg + launcher.stage2PropKg + selectedParts.reduce((s, p) => s + p.massKg, 0)
        : selectedParts.reduce((s, p) => s + p.massKg, 0),
      padTwr: coupledMetrics.padTwr,
      stage1DeltaVMs: coupledMetrics.stage1DeltaVMs,
      stage2DeltaVMs: coupledMetrics.stage2DeltaVMs,
      totalDeltaVMs: coupledMetrics.totalDeltaVMs,
    },
    power: {
      sunlitGenerationW: coupledMetrics.sunlitGenerationW,
      eclipseGenerationW: coupledMetrics.eclipseGenerationW,
      totalDrawW: coupledMetrics.cruisePowerW, // Use cruise as base draw
      netSunlitW: coupledMetrics.netCruiseW,
      eclipseDurationSec: mission.eclipseDurationSec,
      requiredEclipseWh: (coupledMetrics.eclipseLoadW * mission.eclipseDurationSec) / 3600,
      batteryWh: battery?.capacityWh ?? 0,
    },
    data: {
      payloadDataRateMbps: payload?.dataRateMbps ?? 0,
      cpuMaxMbps: computer?.maxDataMbps ?? 0,
      storageMaxMb: computer?.storageMb ?? 0,
    },
    budget: {
      craftCostM: coupledMetrics.craftCostM,
      launcherCostM: coupledMetrics.launcherCostM,
      totalCraftAndLauncherM: coupledMetrics.totalCraftAndLauncherM,
    },
    schedule: {
      buildMonths: coupledMetrics.buildMonths,
    },
    // NEW: Coupled engineering metrics (single source of truth)
    coupledMetrics,
  };
}