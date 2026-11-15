# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Orbital Architect 3D** — A NASA Space Apps-inspired space mission design game built with React + Three.js + TypeScript. Players design spacecraft, configure ground stations, and fly real-time 3D orbital simulations across 4 mission types: Earth Observation (LEO), Space Telescope (1,800 km HEO), Moon Landing, and Mars Landing.

## Architecture

### Core Layers

| Layer | Directory | Responsibility |
|-------|-----------|----------------|
| **Types** | `src/core/types.ts` | All TypeScript interfaces: `GamePhase`, `MissionId`, `SpacecraftConfig`, `FlightState`, `ResourceKey`, subsystem specs, validation results, debrief reports |
| **Constants & Data** | `src/core/constants.ts` | Mission specs, spacecraft parts catalog (7 subsystems × 4 tiers incl. Tier 4), launch vehicles (5), DSN ground stations (6), comms bands (3), recommended loadouts per mission |
| **Physics Engine** | `src/core/physicsEngine.ts` | Orbital mechanics (Velocity-Verlet), gravity (Earth/Moon/Mars SOI), atmospheric drag (Earth/Mars), eclipses, power, science generation, DSN line-of-sight, stage separation, landing logic, auto time-warp step-down |
| **Spacecraft Validator** | `src/core/spacecraftValidator.ts` | 30+ conflict checks: mass/Δv, power/battery, computer bus/rad-hard, ADCS pointing tier, thermal/heatshield, payload match, TWR, budget, schedule, Tier 4 parts |
| **Ground Segment** | `src/core/groundSegment.ts` | Contact coverage calculation, downlink vs. science generation, buffer overflow risk, total campaign cost/schedule |
| **Debrief Analyzer** | `src/core/debriefAnalyzer.ts` | Post-flight resource-by-resource assessment (mass, power, budget, data, comms, time) with beginner/realistic notes |
| **Robot Assistant** | `src/core/robotAssistant.ts` | Deterministic AI for failure analysis; appears only on DEBRIEF for failed missions; analyzes root cause and suggests specific fixes |
| **State Store** | `src/store/useMissionStore.ts` | Zustand store managing all game phases, spacecraft config, ground config, flight state, flight controls, debrief |
| **3D Scenes** | `src/three/scenes/` | `SceneController` interface + 4 implementations: `SolarSelectScene` (title/objective select), `HangarScene` (VAB), `GroundGlobeScene` (DSN config), `FlightScene` (real-time flight) |
| **Procedural Assets** | `src/three/meshes/ProceduralAssets.ts` | Geometry generators for rockets, planets, exhaust plumes, particle systems, cones, orbit lines, starfields |
| **HUD Components** | `src/hud/` | `PhaseHudOverlay.tsx` (5 phase UIs), `TopResourceStrip.tsx`, `KapCommsBubble.tsx` (top-left AI assistant), `RobotAssistant.tsx` (failure analysis), `TutorialOverlay.tsx` |

### Game Phase Flow

```
TITLE → OBJECTIVE_SELECT → HANGAR → GROUND_SEGMENT → FLIGHT → DEBRIEF
          ↑ (back button)      ↑_______________________| (restart or return)
```

- **TITLE**: Difficulty selection (BEGINNER/REALISTIC), start singleplayer
- **OBJECTIVE_SELECT**: Choose Moon Landing, Mars Landing, or Explore Space (→ Earth Obs or Space Telescope); back button returns to TITLE
- **HANGAR**: Drag-drop 7 subsystem slots + launcher; Kap auto-engineer applies recommended loadout; validation runs live
- **GROUND_SEGMENT**: Toggle 6 DSN stations, pick comms band (S/X/Ka-Band), set ops lifetime (1/3/5 yr); greenlight requires zero CRITICAL conflicts
- **FLIGHT**: Real-time 3D sim with autopilot (BEGINNER) or manual (REALISTIC); throttle, staging, time warp 1–500x; chase camera
- **DEBRIEF**: 6-resource scorecard with OPTIMAL/WARNING/CRITICAL status, beginner tips, realistic telemetry; Robot Assistant analyzes failures

### AI Assistants

**KapComms Bubble (Top-Left)** — Active in all phases except TITLE
- Provides real-time guidance during spacecraft building (HANGAR)
- Displays validation conflicts and engineering tips
- Shows flight telemetry and warnings during FLIGHT phase
- Mood-based visual feedback: HAPPY (green), CONCERNED (orange), ALERT (red)

**Robot Assistant (Bottom-Right)** — Appears ONLY on failed missions during DEBRIEF
- Deterministic rule-based AI (no API tokens)
- Root cause analysis of mission failures
- Specific fix recommendations (e.g., "Install BIGGER BATTERY or add RTG")
- 4 robot moods: Happy, Thinking, Love, Bulb (stored in `public/Robot/`)
- Priority levels: CRITICAL (red), HIGH (orange), MEDIUM (blue), LOW (green)

## Commands

```bash
# Development
npm run dev          # Start Vite dev server on port 5173
npm run build        # TypeScript build + Vite production build
npm run preview      # Preview production build on port 4173
npm run typecheck    # TypeScript compile check (no emit)

# Testing
npm run test         # Run all Vitest unit tests once
npm run test:watch   # Vitest watch mode
npm run test:e2e     # Playwright E2E tests
```

### Running a Single Test

```bash
# Unit test file
npx vitest run src/core/__tests__/physicsEngine.test.ts

# Single test by name
npx vitest run -t "maintains circular orbit stability"
```

## Key Data Structures

### SpacecraftConfig (7 subsystems + launcher)
```typescript
{
  structureId, powerId, batteryId, computerId, adcsId, thermalId, payloadId, launcherId
}
```

### Validation Result (SpacecraftValidation)
```typescript
{
  isComplete, isLaunchable, kapMood, kapHeadline, conflicts[],
  mass: { spacecraftDryKg, padTwr, totalDeltaVMs, ... },
  power: { sunlitGenerationW, totalDrawW, batteryWh, requiredEclipseWh, ... },
  data: { payloadDataRateMbps, cpuMaxMbps, storageMaxMb },
  budget: { craftCostM, launcherCostM, totalCraftAndLauncherM },
  schedule: { buildMonths },
  coupledMetrics: { ... }  // NEW: Live resource calculations with margins
}
```

### FlightState (real-time simulation)
```typescript
{
  position, velocity, heading, throttle, activeStageIndex,
  stage1PropKg, stage2PropKg, batteryWh, batteryMaxWh,
  onboardDataMb, storageMaxMb, deliveredDataMb, droppedDataMb,
  observationProgress, targetAchieved, elapsedFlightSec, timeWarp,
  flightAssistEnabled, status, failureReason, inEclipse,
  activeDsnStationIds, currentPowerGenW, currentPowerDrawW,
  deltaVRemainingMs, deltaVExpendedMs, orbitalElements, targetPhaseStatus, events[],
  propellantBoilOffKg, thermalTempC, thermalMarginC, minBatteryPct, peakPowerDrawW  // NEW: Thermal & boil-off tracking
}
```

## Important Physics Constants (Scaled for Gameplay)

```typescript
EARTH_RADIUS_M = 600_000           // 600 km (vs real 6,371 km)
EARTH_MU = 3.84e12                 // Scaled μ
EARTH_ATM_TOP_M = 80_000           // 80 km atmosphere
MOON_ORBIT_M = 3_200_000           // 3,200 km
MARS_TRANSFER_M = 6_500_000        // 6,500 km
EARTH_ROT_RATE = 2π / 14400        // 4-hour scaled Earth day (about 7 low orbits per day)
WORLD_SCALE = 1 / 10_000           // Three.js units (1 unit = 10 km)
```

## Validation Conflict Categories

| Category | Typical CRITICAL Checks |
|----------|------------------------|
| **structure** | Payload overload, missing landing legs (Tier < 2) |
| **power** | Sunlit deficit, low margin (<15%) |
| **battery** | Eclipse blackout, tight DoD (>80%) |
| **computer** | Bus bottleneck, non-rad-hard in deep space |
| **adcs** | Magnetorquers beyond LEO, pointing tier insufficient |
| **thermal** | Missing heatshield (Mars), thermal tier too low |
| **payload** | Mission mismatch |
| **launcher** | TWR < 1.05, Δv shortfall vs mission target |
| **budget** | Craft+launcher > cap, total campaign > cap |
| **schedule** | Build months > launch window |

## Flight Phase State Machine (PhysicsEngine)

```
PRELAUNCH → ASCENT → ORBIT → [TRANSIT → TARGET_CAPTURE → LANDING] → SUCCESS
                ↓                                                         ↓
              FAILED ←────────────── (impact, blackout, burn-up, decay) ←
```

- **EARTH_OBSERVATION**: Target achieved in ORBIT at 150 km
- **SPACE_TELESCOPE**: ORBIT → TRANSIT (Hohmann to 1,800 km) → ORBIT → SUCCESS
- **MOON_LANDING**: ORBIT → TRANSIT (TLI) → TARGET_CAPTURE → LANDING → SUCCESS
- **MARS_LANDING**: ORBIT → TRANSIT (TMI) → TARGET_CAPTURE → LANDING → SUCCESS

## Flight Controls (REALISTIC Mode)

| Key | Action |
|-----|--------|
| W/S / ↑/↓ | Pitch |
| A/D / ←/→ | Yaw |
| Z / Shift | Throttle +15% |
| X / Ctrl | Throttle -15% |
| Space | Stage separation |
| 1–5 | Time warp (1×, 5×, 25×, 100×, 500×) |

## Testing Strategy

- **Unit tests** (`src/core/__tests__/*.test.ts`): Physics engine orbital mechanics, spacecraft validator conflict rules, Tsiolkovsky Δv math, eclipse geometry, DSN visibility
- **E2E tests** (`e2e/`): Playwright browser automation for full phase flows
- **No component/integration tests** for React/Three.js — visual correctness verified manually via `npm run dev`

## Common Patterns

### Adding a New Spacecraft Part
1. Add entry to `SPACECRAFT_PARTS` in `constants.ts` with all required fields
2. Update `RECOMMENDED_LOADOUTS` if it belongs in a default mission
3. Add validation logic in `spacecraftValidator.ts` if it introduces new conflict types
4. Add mesh generation in `ProceduralAssets.ts` if visually distinct

### Adding a New Mission
1. Add `MissionSpec` to `MISSIONS` in `constants.ts`
2. Add `RECOMMENDED_LOADOUTS` and `RECOMMENDED_GROUND` entries
3. Add target type handling in `physicsEngine.ts` (flight phase logic, science collection conditions)
4. Add debrief metrics in `debriefAnalyzer.ts`
5. Add mission guidance to `MISSION_GUIDES` in `TutorialOverlay.tsx`

### Adding Robot Assistant Hints
1. Identify failure pattern in `generateDebriefAnalysis()` (`robotAssistant.ts`)
2. Parse `flightState.failureReason` for specific error strings
3. Map to specific fix recommendations (part upgrades, configuration changes)
4. Set appropriate `RobotMood` (happy/thinking/love/bulb) and priority level

### Hot Module Replacement Notes
- Zustand store persists via `window.__MISSION_STORE__` reference
- Three.js scenes dispose on phase change via `SceneController.dispose()`
- Canvas renderer created once in `Viewport3D.tsx` useEffect (empty deps)

## Performance Notes

- Physics runs at max 0.25s sub-steps for numerical stability at 500× warp
- 3D scene rebuilds only when spacecraft config signature changes (`JSON.stringify` comparison)
- DSN visuals pooled (preallocated 6 station meshes, reused via Map)
- Orbit trajectory line uses persistent `Float32Array` buffer with `setDrawRange`
- Battery/power calculations use Wh and W consistently; eclipse energy = drainW × durationSec / 3600

## File Naming Conventions

- Core logic: `camelCase.ts` (e.g., `physicsEngine.ts`, `spacecraftValidator.ts`)
- React components: `PascalCase.tsx` (e.g., `PhaseHudOverlay.tsx`)
- Three.js scenes: `PascalCase.ts` + `Scene` suffix (e.g., `FlightScene.ts`)
- Tests: `*.test.ts` alongside source or in `__tests__` folder

## Important Notes

- **Smart Quotes**: Avoid curly quotes (`'` `'`) in JSX/TSX files; use ASCII quotes (`'`) to prevent TypeScript errors
- **Robot Images**: Located in `public/Robot/` (Robot-Happy.png, Robot-Thinking.png, Robot-Love.png, Robot-Bulb.png)
- **Tutorial Content**: Keep concise (~60 words per section max); players prefer scannable bullet points over paragraphs
- **Back Navigation**: All phases support back button except FLIGHT (abort returns to debrief)