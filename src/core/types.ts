export type GamePhase =
  | 'TITLE'
  | 'OBJECTIVE_SELECT'
  | 'HANGAR'
  | 'GROUND_SEGMENT'
  | 'FLIGHT'
  | 'DEBRIEF';

export type DifficultyMode = 'BEGINNER' | 'REALISTIC';

export type MissionId =
  | 'MOON_LANDING'
  | 'MARS_LANDING'
  | 'SPACE_TELESCOPE'
  | 'EARTH_OBSERVATION';

export type SubsystemCategory =
  | 'structure'
  | 'power'
  | 'battery'
  | 'computer'
  | 'adcs'
  | 'thermal'
  | 'payload'
  | 'launcher';

export type ResourceKey = 'mass' | 'power' | 'budget' | 'data' | 'comms' | 'time';

export type CommsBandId = 'S_BAND' | 'X_BAND' | 'KA_BAND';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface SpacecraftPart {
  id: string;
  name: string;
  category: Exclude<SubsystemCategory, 'launcher'>;
  massKg: number;
  costM: number;
  leadMonths: number;
  drawW: number;
  beginnerDesc: string;
  realisticDesc: string;
  // Subsystem-specific specs
  maxPayloadKg?: number;
  structuralIntegrity?: number;
  baseOutputW?: number;
  isSolar?: boolean;
  capacityWh?: number;
  maxDataMbps?: number;
  storageMb?: number;
  radHardened?: boolean;
  pointingTier?: number;
  deepSpaceCapable?: boolean;
  thermalTier?: number;
  heatShield?: boolean;
  dataRateMbps?: number;
  missionMatch?: MissionId | 'SURFACE_LANDER';
}

export interface LaunchVehicle {
  id: string;
  name: string;
  costM: number;
  leadMonths: number;
  stage1DryKg: number;
  stage1PropKg: number;
  stage1ThrustN: number;
  stage1IspS: number;
  stage2DryKg: number;
  stage2PropKg: number;
  stage2ThrustN: number;
  stage2IspS: number;
  beginnerDesc: string;
  realisticDesc: string;
}

export interface MissionSpec {
  id: MissionId;
  title: string;
  subtitle: string;
  targetType: 'LEO' | 'DEEP_SPACE_ORBIT' | 'MOON_SURFACE' | 'MARS_SURFACE';
  targetDeltaVMs: number;
  budgetCapM: number;
  scheduleLimitMonths: number;
  solarDistanceAU: number;            // 1.0 (Earth/Moon), 1.52 (Mars) for 1/r^2 solar flux
  irradianceFactor: number;           // 1/solarDistanceAU^2 (precomputed)
  eclipseDurationSec: number;
  requiredPayloadMatch: MissionId | 'SURFACE_LANDER';
  requiredAdcsTier: number;
  requiresDeepSpaceAdcs: boolean;
  requiresRadHardCpu: boolean;
  requiredThermalTier: number;
  requiresHeatShield: boolean;
  requiresLanderStructure: boolean;
  targetScienceMb: number;
  orbitAltitudeTargetM: number;
  distanceCommsFactor: number;
  observationDutyCycle: number;
  referencePeriodSec: number;
  pros: string[];
  challenges: string[];
  beginnerBrief: string;
  realisticBrief: string;
}

export interface GroundStationSpec {
  id: string;
  name: string;
  latDeg: number;
  lonDeg: number;
  costM: number;
  leadMonths: number;
  isOrbitalRelay?: boolean;
  minElevationDeg: number;
  beginnerDesc: string;
  realisticDesc: string;
}

export interface CommsBandSpec {
  id: CommsBandId;
  name: string;
  bandwidthMbps: number;
  costM: number;
  leadMonths: number;
  drawW: number;
  beginnerDesc: string;
  realisticDesc: string;
}

export interface SpacecraftConfig {
  structureId: string | null;
  powerId: string | null;
  batteryId: string | null;
  computerId: string | null;
  adcsId: string | null;
  thermalId: string | null;
  payloadId: string | null;
  launcherId: string | null;
}

export interface GroundConfig {
  activeStationIds: string[];
  bandId: CommsBandId;
  plannedLifetimeYears: 1 | 3 | 5;
}

export interface EngineeringConflict {
  id: string;
  severity: 'CRITICAL' | 'WARNING';
  resource: ResourceKey;
  affectedCategory: SubsystemCategory | 'ground';
  beginnerMessage: string;
  realisticMessage: string;
}

export interface CoupledMetrics {
  // Mass → Propulsion
  payloadToLiftMarginKg: number;     // launcher payload cap - spacecraft dry mass
  padTwr: number;                    // TWR at liftoff
  stage1DeltaVMs: number;
  stage2DeltaVMs: number;
  totalDeltaVMs: number;
  deltaVMarginMs: number;            // totalDeltaVMs - mission.targetDeltaVMs

  // Solar Flux & Dual Power Modes
  solarDistanceAU: number;           // 1.0 (Earth/Moon), 1.52 (Mars)
  irradianceFactor: number;          // 1/r^2 = 1.0 at Earth, ~0.43 at Mars
  cruisePowerW: number;              // bus + ADCS idle + sunlit heaters
  peakPowerW: number;                // cruise + payload + comms + ADCS slew
  sunlitGenerationW: number;         // solar * irradianceFactor (or RTG)
  eclipseGenerationW: number;        // 0 (solar) or RTG output
  netCruiseW: number;                // sunlitGenerationW - cruisePowerW
  netPeakW: number;                  // sunlitGenerationW - peakPowerW

  // Thermal Balance → Heater Draws
  internalHeatW: number;             // sum of subsystem waste heat (drawW)
  absorbedSolarW: number;            // solar flux absorbed by spacecraft
  radiatorRejectionW: number;        // thermal subsystem heat rejection capacity
  sunlitSurvivalHeaterW: number;     // heater draw when radiative cooling > heat input (sunlit)
  shadowSurvivalHeaterW: number;     // heater draw in eclipse (clamped to thermal capacity)
  thermalWarning: boolean;           // true if heater capacity exceeded
  thermalCritical: boolean;          // true if cold-soak risk

  // Eclipse Battery Endurance & Data Bus
  eclipseLoadW: number;              // totalDrawW - eclipseGenerationW + shadowSurvivalHeaterW
  eclipseEnduranceMin: number;       // (batteryWh * usableDoD * 60) / eclipseLoadW
  requiredEclipseMin: number;        // mission.eclipseDurationSec / 60
  dataBusMarginMbps: number;         // cpuMaxMbps - payloadDataRateMbps
  commsDownlinkMbps: number;         // band.bandwidthMbps * mission.distanceCommsFactor

  // Budget & Schedule
  craftCostM: number;
  launcherCostM: number;
  totalCraftAndLauncherM: number;
  groundCostM: number;
  opsCostM: number;
  totalCampaignCostM: number;
  budgetMarginM: number;             // mission.budgetCapM - totalCampaignCostM
  buildMonths: number;
  scheduleMarginMonths: number;      // mission.scheduleLimitMonths - buildMonths
}

export interface HoverDelta {
  deltaMassKg: number;
  deltaCostM: number;
  deltaScheduleDays: number;
  deltaDvMs: number;
  deltaTwr: number;
  deltaCruisePowerW: number;
  deltaPeakPowerW: number;
  deltaEclipseMin: number;
  deltaThermalW: number;
}

export interface PreviewCandidate {
  category: SubsystemCategory;
  partId: string;
  coupledMetrics: CoupledMetrics;
  deltas: HoverDelta;
}

export interface SpacecraftValidation {
  isComplete: boolean;
  isLaunchable: boolean;
  kapMood: 'HAPPY' | 'CONCERNED' | 'ALERT';
  kapHeadline: string;
  conflicts: EngineeringConflict[];
  mass: {
    spacecraftDryKg: number;
    payloadPlusSubsystemsKg: number;
    stage1TotalKg: number;
    stage2TotalKg: number;
    launchTotalMassKg: number;
    padTwr: number;
    stage1DeltaVMs: number;
    stage2DeltaVMs: number;
    totalDeltaVMs: number;
  };
  power: {
    sunlitGenerationW: number;
    eclipseGenerationW: number;
    totalDrawW: number;
    netSunlitW: number;
    eclipseDurationSec: number;
    requiredEclipseWh: number;
    batteryWh: number;
  };
  data: {
    payloadDataRateMbps: number;
    cpuMaxMbps: number;
    storageMaxMb: number;
  };
  budget: {
    craftCostM: number;
    launcherCostM: number;
    totalCraftAndLauncherM: number;
  };
  schedule: {
    buildMonths: number;
  };
  // NEW: Coupled engineering metrics (single source of truth)
  coupledMetrics: CoupledMetrics;
}

export interface GroundEvaluation {
  contactCoveragePct: number;
  contactSecPerOrbit: number;
  dataGeneratedPerOrbitMb: number;
  downlinkCapacityPerOrbitMb: number;
  bufferOverflowRisk: 'NONE' | 'WARNING' | 'CRITICAL';
  groundCostM: number;
  opsCostM: number;
  totalCampaignCostM: number;
  groundLeadMonths: number;
  totalCampaignMonths: number;
  canGreenlight: boolean;
  conflicts: EngineeringConflict[];
  kapRecommendation: string;
}

export type FlightStatus =
  | 'PRELAUNCH'
  | 'ASCENT'
  | 'ORBIT'
  | 'TRANSIT'
  | 'TARGET_CAPTURE'
  | 'LANDING'
  | 'SUCCESS'
  | 'FAILED';

export interface OrbitalElements {
  semiMajorAxisM: number;
  eccentricity: number;
  apoapsisAltM: number;
  periapsisAltM: number;
  periodSec: number;
  speedMs: number;
  altitudeM: number;
  isDecaying: boolean;
}

export interface TargetPhaseStatus {
  moonDistanceM: number;
  marsDistanceM: number;
  lunarCaptureProgress: number;
  marsCaptureProgress: number;
  landedOnTarget: boolean;
  targetOrbitAchieved: boolean;
}

export interface FlightEvent {
  timeSec: number;
  kind: 'INFO' | 'WARN' | 'CRITICAL' | 'MILESTONE';
  message: string;
}

export interface AnomalyEvent {
  timeSec: number;
  type: 'RADIATION_SPIKE' | 'ATTITUDE_DISTURBANCE' | 'THERMAL_SOAK' | 'SOLAR_FLARE';
  severity: 'MINOR' | 'MAJOR' | 'CRITICAL';
  subsystemsAffected: SubsystemCategory[];
  mitigated: boolean;
  message: string;
  recoveryTimeSec: number;
}

export interface FlightState {
  position: Vec3;
  velocity: Vec3;
  heading: Vec3;
  throttle: number;
  activeStageIndex: 0 | 1;
  stage1PropKg: number;
  stage2PropKg: number;
  batteryWh: number;
  batteryMaxWh: number;
  onboardDataMb: number;
  storageMaxMb: number;
  deliveredDataMb: number;
  droppedDataMb: number;
  observationProgress: number;
  targetAchieved: boolean;
  elapsedFlightSec: number;
  timeWarp: number;
  flightAssistEnabled: boolean;
  status: FlightStatus;
  failureReason: string | null;
  inEclipse: boolean;
  activeDsnStationIds: string[];
  currentPowerGenW: number;
  currentPowerDrawW: number;
  deltaVRemainingMs: number;
  deltaVExpendedMs: number;
  orbitalElements: OrbitalElements;
  targetPhaseStatus: TargetPhaseStatus;
  events: FlightEvent[];
  // Telemetry peaks for debrief
  minBatteryPct: number;
  peakDynamicPressurePa: number;
  enteredOrbitAtSec: number | null;
  reachedTargetAtSec: number | null;
  // NEW: Live in-flight resource telemetry
  propellantBoilOffKg: number;          // cumulative cryogenic boil-off
  propellantBoilOffRateKgPerSec: number; // current boil-off rate
  thermalTempC: number;                 // spacecraft internal temperature
  thermalMarginC: number;               // margin to cold-soak limit
  peakPowerDrawW: number;               // peak instantaneous power draw
  anomaliesHandled: number;             // count of mid-flight anomalies mitigated
  anomalyEvents: AnomalyEvent[];        // detailed anomaly log
}

export interface FlightControls {
  throttle: number; // 0..1
  pitchInput: number; // -1..1
  yawInput: number; // -1..1
  stageRequested?: boolean;
  autoGuidance?: boolean;
}

export interface ResourceDebrief {
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
  whatWentRight: string;
  whatWentWrong: string;
  beginnerNote: string;
  realisticMetrics: string;
}

export interface DebriefReport {
  outcome: 'SUCCESS' | 'FAILED';
  headline: string;
  kapSummary: string;
  resources: Record<ResourceKey, ResourceDebrief>;
}
