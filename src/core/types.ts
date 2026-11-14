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
  irradianceFactor: number;
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
