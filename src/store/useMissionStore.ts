import { create } from 'zustand';
import {
  MISSIONS,
  RECOMMENDED_GROUND,
  RECOMMENDED_LOADOUTS,
} from '../core/constants';
import { generateDebrief } from '../core/debriefAnalyzer';
import {
  createInitialFlightState,
  stepFlightSimulation,
} from '../core/physicsEngine';
import { computeCoupledMetrics } from '../core/spacecraftValidator';
import type {
  CommsBandId,
  CoupledMetrics,
  DebriefReport,
  DifficultyMode,
  FlightState,
  GamePhase,
  GroundConfig,
  MissionId,
  PreviewCandidate,
  SpacecraftConfig,
  SubsystemCategory,
} from '../core/types';

export type TopObjectiveChoice = 'MOON_LANDING' | 'MARS_LANDING' | 'EXPLORE_SPACE';

export interface StoreFlightControls {
  throttle: number;
  pitchInput: number;
  yawInput: number;
  autoGuidance: boolean;
  autoStage: boolean;
  stageRequested: boolean;
}

const EMPTY_SPACECRAFT: SpacecraftConfig = {
  structureId: null,
  powerId: null,
  batteryId: null,
  computerId: null,
  adcsId: null,
  thermalId: null,
  payloadId: null,
  launcherId: null,
};

const DEFAULT_GROUND: GroundConfig = {
  activeStationIds: ['goldstone', 'madrid', 'canberra'],
  bandId: 'S_BAND',
  plannedLifetimeYears: 1,
};

export interface MissionStoreState {
  phase: GamePhase;
  difficulty: DifficultyMode;
  selectedObjective: TopObjectiveChoice | null;
  missionId: MissionId;
  exploreSubChoiceOpen: boolean;
  spacecraft: SpacecraftConfig;
  activeSnapCategory: SubsystemCategory | null;
  ground: GroundConfig;
  flight: FlightState | null;
  flightControls: StoreFlightControls;
  debrief: DebriefReport | null;
  // NEW: Hover preview state for HANGAR
  hoveredCandidate: PreviewCandidate | null;
  // NEW: Live coupled metrics (recomputed on every build change)
  coupledMetrics: CoupledMetrics | null;
  // NEW: Launch-time coupled metrics snapshot for FLIGHT/DEBRIEF
  launchCoupledMetrics: CoupledMetrics | null;

  // Navigation & Setup Actions
  startSingleplayer: () => void;
  setDifficulty: (mode: DifficultyMode) => void;
  selectTopObjective: (choice: TopObjectiveChoice) => void;
  selectExploreSubMission: (id: 'SPACE_TELESCOPE' | 'EARTH_OBSERVATION') => void;
  enterHangar: () => void;
  requestEnterHangar: () => void;
  openTutorial: () => void;
  closeTutorial: () => void;

  // Hangar Actions
  setActiveSnapCategory: (category: SubsystemCategory | null) => void;
  equipPart: (category: SubsystemCategory, partId: string) => void;
  clearSlot: (category: SubsystemCategory) => void;
  applyRecommendedLoadout: () => void;
  rolloutToGround: () => void;
  backToHangar: () => void;

  // Ground Segment Actions
  toggleStation: (stationId: string) => void;
  setCommsBand: (bandId: CommsBandId) => void;
  setPlannedLifetime: (years: 1 | 3 | 5) => void;
  applyRecommendedGround: () => void;
  greenlightLiftoff: () => void;

  // Flight Actions
  igniteLaunch: () => void;
  tickFlight: (dtRealSec: number) => void;
  setThrottle: (t: number) => void;
  setPitchYaw: (pitch: number, yaw: number) => void;
  requestStage: () => void;
  setTimeWarp: (w: number) => void;
  toggleFlightAssist: () => void;
  toggleAutoStage: () => void;
  abortMission: () => void;

  // Tutorial State & Actions
  tutorialOpen: boolean;
  tutorialAcknowledged: boolean;
  acknowledgeTutorialAndEnterHangar: () => void;

  // Debrief Actions
  returnToHangarKeepDesign: () => void;
  restartCampaign: () => void;

  // NEW: Coupled metrics & hover actions
  setHoveredCandidate: (candidate: PreviewCandidate | null) => void;
  recomputeCoupledMetrics: () => void;
}

const CATEGORY_TO_FIELD: Record<SubsystemCategory, keyof SpacecraftConfig> = {
  structure: 'structureId',
  power: 'powerId',
  battery: 'batteryId',
  computer: 'computerId',
  adcs: 'adcsId',
  thermal: 'thermalId',
  payload: 'payloadId',
  launcher: 'launcherId',
};

export const useMissionStore = create<MissionStoreState>((set, get) => ({
  phase: 'TITLE',
  difficulty: 'BEGINNER',
  selectedObjective: null,
  missionId: 'EARTH_OBSERVATION',
  exploreSubChoiceOpen: false,
  spacecraft: { ...EMPTY_SPACECRAFT },
  activeSnapCategory: 'structure',
  ground: { ...DEFAULT_GROUND, activeStationIds: [...DEFAULT_GROUND.activeStationIds] },
  flight: null,
  flightControls: {
    throttle: 0,
    pitchInput: 0,
    yawInput: 0,
    autoGuidance: true,
    autoStage: true,
    stageRequested: false,
  },
  debrief: null,
  tutorialOpen: false,
  tutorialAcknowledged: false,
  // NEW: Coupled metrics state
  hoveredCandidate: null,
  coupledMetrics: null,
  launchCoupledMetrics: null,

  startSingleplayer: () => {
    set({
      phase: 'OBJECTIVE_SELECT',
      selectedObjective: null,
      exploreSubChoiceOpen: false,
      tutorialOpen: false,
      tutorialAcknowledged: false,
    });
  },

  setDifficulty: (mode) => {
    const { flight, flightControls } = get();
    set({
      difficulty: mode,
      flight: flight
        ? { ...flight, flightAssistEnabled: mode === 'BEGINNER' }
        : null,
      flightControls: {
        ...flightControls,
        autoGuidance: mode === 'BEGINNER',
        autoStage: mode === 'BEGINNER',
      },
    });
  },

  selectTopObjective: (choice) => {
    if (choice === 'EXPLORE_SPACE') {
      const currentMission = get().missionId;
      const nextMission: MissionId =
        currentMission === 'SPACE_TELESCOPE' ? 'SPACE_TELESCOPE' : 'EARTH_OBSERVATION';
      set({
        selectedObjective: 'EXPLORE_SPACE',
        exploreSubChoiceOpen: true,
        missionId: nextMission,
      });
    } else {
      set({
        selectedObjective: choice,
        exploreSubChoiceOpen: false,
        missionId: choice,
      });
    }
  },

  selectExploreSubMission: (id) => {
    set({
      selectedObjective: 'EXPLORE_SPACE',
      exploreSubChoiceOpen: true,
      missionId: id,
    });
  },

  enterHangar: () => {
    set({
      phase: 'HANGAR',
      activeSnapCategory: 'structure',
      debrief: null,
      flight: null,
      tutorialOpen: false,
    });
  },

  requestEnterHangar: () => {
    const { tutorialAcknowledged } = get();
    if (!tutorialAcknowledged) {
      set({ tutorialOpen: true });
    } else {
      get().enterHangar();
    }
  },

  openTutorial: () => {
    set({ tutorialOpen: true });
  },

  closeTutorial: () => {
    set({ tutorialOpen: false });
  },

  acknowledgeTutorialAndEnterHangar: () => {
    set({
      tutorialOpen: false,
      tutorialAcknowledged: true,
      phase: 'HANGAR',
      activeSnapCategory: 'structure',
      debrief: null,
      flight: null,
    });
  },

  setActiveSnapCategory: (category) => {
    set({ activeSnapCategory: category });
  },

  equipPart: (category, partId) => {
    const field = CATEGORY_TO_FIELD[category];
    set((state) => ({
      spacecraft: {
        ...state.spacecraft,
        [field]: partId,
      },
    }));
    // Recompute coupled metrics after state update
    get().recomputeCoupledMetrics();
  },

  clearSlot: (category) => {
    const field = CATEGORY_TO_FIELD[category];
    set((state) => ({
      spacecraft: {
        ...state.spacecraft,
        [field]: null,
      },
    }));
    // Recompute coupled metrics after state update
    get().recomputeCoupledMetrics();
  },

  applyRecommendedLoadout: () => {
    const { missionId } = get();
    set({
      spacecraft: { ...RECOMMENDED_LOADOUTS[missionId] },
    });
    // Recompute coupled metrics after state update
    get().recomputeCoupledMetrics();
  },

  rolloutToGround: () => {
    set({
      phase: 'GROUND_SEGMENT',
    });
  },

  backToHangar: () => {
    set({
      phase: 'HANGAR',
      activeSnapCategory: 'structure',
    });
  },

  toggleStation: (stationId) => {
    set((state) => {
      const exists = state.ground.activeStationIds.includes(stationId);
      const nextIds = exists
        ? state.ground.activeStationIds.filter((id) => id !== stationId)
        : [...state.ground.activeStationIds, stationId];
      return {
        ground: {
          ...state.ground,
          activeStationIds: nextIds,
        },
      };
    });
  },

  setCommsBand: (bandId) => {
    set((state) => ({
      ground: {
        ...state.ground,
        bandId,
      },
    }));
  },

  setPlannedLifetime: (years) => {
    set((state) => ({
      ground: {
        ...state.ground,
        plannedLifetimeYears: years,
      },
    }));
  },

  applyRecommendedGround: () => {
    const { missionId } = get();
    const rec = RECOMMENDED_GROUND[missionId];
    set({
      ground: {
        activeStationIds: [...rec.activeStationIds],
        bandId: rec.bandId,
        plannedLifetimeYears: rec.plannedLifetimeYears,
      },
    });
    get().recomputeCoupledMetrics();
  },

  // NEW: Recompute live coupled metrics
  recomputeCoupledMetrics: () => {
    const { missionId, spacecraft, ground } = get();
    const metrics = computeCoupledMetrics(missionId, spacecraft, ground);
    set({ coupledMetrics: metrics });
  },

  // NEW: Set hover preview candidate
  setHoveredCandidate: (candidate: PreviewCandidate | null) => {
    set({ hoveredCandidate: candidate });
  },

  greenlightLiftoff: () => {
    const { missionId, spacecraft, ground, difficulty, coupledMetrics } = get();
    const assist = difficulty === 'BEGINNER';
    const initialFlight = createInitialFlightState(
      missionId,
      spacecraft,
      ground,
      assist
    );
    set({
      phase: 'FLIGHT',
      flight: initialFlight,
      debrief: null,
      flightControls: {
        throttle: 0,
        pitchInput: 0,
        yawInput: 0,
        autoGuidance: assist,
        autoStage: assist,
        stageRequested: false,
      },
      // Snapshot launch-time coupled metrics for FLIGHT/DEBRIEF
      launchCoupledMetrics: coupledMetrics,
    });
  },

  igniteLaunch: () => {
    const { flight, flightControls, difficulty } = get();
    if (!flight) return;
    const assist = difficulty === 'BEGINNER' || flightControls.autoGuidance;
    set({
      flight: {
        ...flight,
        flightAssistEnabled: assist,
      },
      flightControls: {
        ...flightControls,
        throttle: 1,
        autoGuidance: assist,
      },
    });
  },

  tickFlight: (dtRealSec) => {
    const state = get();
    if (state.phase !== 'FLIGHT' || !state.flight) return;
    if (state.flight.status === 'SUCCESS' || state.flight.status === 'FAILED') return;

    const clampedRealDt = Math.min(Math.max(dtRealSec, 0), 0.1);
    if (clampedRealDt <= 0) return;

    const simDt = clampedRealDt * state.flight.timeWarp;
    const { flightControls, missionId, spacecraft, ground, difficulty } = state;

    const isPrelaunch = state.flight.status === 'PRELAUNCH';
    const effectiveAutoGuidance = isPrelaunch ? false : flightControls.autoGuidance;

    const nextFlight = stepFlightSimulation(
      {
        ...state.flight,
        flightAssistEnabled: effectiveAutoGuidance,
      },
      missionId,
      spacecraft,
      ground,
      {
        throttle: flightControls.throttle,
        pitchInput: flightControls.pitchInput,
        yawInput: flightControls.yawInput,
        autoGuidance: effectiveAutoGuidance,
        stageRequested: flightControls.stageRequested,
      },
      simDt,
      difficulty
    );

    const consumedStage = flightControls.stageRequested;

    if (nextFlight.status === 'SUCCESS' || nextFlight.status === 'FAILED') {
      const report = generateDebrief(
        missionId,
        spacecraft,
        ground,
        nextFlight,
        difficulty,
        state.launchCoupledMetrics ?? undefined
      );
      set({
        flight: nextFlight,
        debrief: report,
        phase: 'DEBRIEF',
        flightControls: consumedStage
          ? { ...flightControls, stageRequested: false }
          : flightControls,
      });
    } else {
      // Apply suggested time warp from physics engine (for auto step-down during landing)
      const newTimeWarp = nextFlight.timeWarp ?? state.flight.timeWarp;
      set({
        flight: { ...nextFlight, timeWarp: newTimeWarp },
        flightControls: consumedStage
          ? { ...flightControls, stageRequested: false }
          : flightControls,
      });
    }
  },

  setThrottle: (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    set((state) => ({
      flightControls: {
        ...state.flightControls,
        throttle: clamped,
      },
    }));
  },

  setPitchYaw: (pitch, yaw) => {
    set((state) => ({
      flightControls: {
        ...state.flightControls,
        pitchInput: Math.max(-1, Math.min(1, pitch)),
        yawInput: Math.max(-1, Math.min(1, yaw)),
      },
    }));
  },

  requestStage: () => {
    set((state) => ({
      flightControls: {
        ...state.flightControls,
        stageRequested: true,
      },
    }));
  },

  setTimeWarp: (w) => {
    set((state) => ({
      flight: state.flight ? { ...state.flight, timeWarp: w } : null,
    }));
  },

  toggleFlightAssist: () => {
    set((state) => {
      const next = !state.flightControls.autoGuidance;
      return {
        flightControls: {
          ...state.flightControls,
          autoGuidance: next,
        },
        flight: state.flight
          ? { ...state.flight, flightAssistEnabled: next }
          : null,
      };
    });
  },

  toggleAutoStage: () => {
    set((state) => ({
      flightControls: {
        ...state.flightControls,
        autoStage: !state.flightControls.autoStage,
      },
    }));
  },

  abortMission: () => {
    const state = get();
    if (!state.flight) return;
    const failedFlight: FlightState = {
      ...state.flight,
      status: 'FAILED',
      failureReason: 'Flight terminated by Flight Director abort command.',
      events: [
        ...state.flight.events,
        {
          timeSec: state.flight.elapsedFlightSec,
          kind: 'CRITICAL',
          message: `Mission aborted for ${MISSIONS[state.missionId].title}.`,
        },
      ],
    };
    const report = generateDebrief(
      state.missionId,
      state.spacecraft,
      state.ground,
      failedFlight,
      state.difficulty,
      state.launchCoupledMetrics ?? undefined
    );
    set({
      flight: failedFlight,
      debrief: report,
      phase: 'DEBRIEF',
    });
  },

  returnToHangarKeepDesign: () => {
    set({
      phase: 'HANGAR',
      activeSnapCategory: 'structure',
      flight: null,
      debrief: null,
      flightControls: {
        throttle: 0,
        pitchInput: 0,
        yawInput: 0,
        autoGuidance: true,
        autoStage: true,
        stageRequested: false,
      },
      // Clear launch snapshot and hover when returning to hangar
      launchCoupledMetrics: null,
      hoveredCandidate: null,
    });
    // Recompute live metrics
    get().recomputeCoupledMetrics();
  },

  restartCampaign: () => {
    set({
      phase: 'OBJECTIVE_SELECT',
      selectedObjective: null,
      exploreSubChoiceOpen: false,
      spacecraft: { ...EMPTY_SPACECRAFT },
      ground: {
        ...DEFAULT_GROUND,
        activeStationIds: [...DEFAULT_GROUND.activeStationIds],
      },
      flight: null,
      debrief: null,
      tutorialOpen: false,
      tutorialAcknowledged: false,
      // Clear all coupled metrics state
      coupledMetrics: null,
      launchCoupledMetrics: null,
      hoveredCandidate: null,
    });
  },
}));

if (typeof window !== 'undefined') {
  (
    window as unknown as { __MISSION_STORE__?: typeof useMissionStore }
  ).__MISSION_STORE__ = useMissionStore;
}
