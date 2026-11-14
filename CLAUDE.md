# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this folder is

A NASA Space Apps Challenge entry — "Space Mission Design Game" — titled **Orbital Architect 3D**. A single-player space mission design and flight simulation game where the player picks a mission objective, assembles a spacecraft and ground segment, flies the mission in real-time 3D, and receives a post-mission debrief grading engineering trade-offs.

## Commands

All run from the repo root:

```bash
npm install            # install dependencies
npm run dev            # Vite dev server on :5173 (Playwright e2e uses this)
npm run build          # tsc -b then vite build -> dist/
npm run test           # vitest run (unit tests, src/**/*.test.ts)
npm run test:e2e       # Playwright test (runs dev server, full campaign flow)
npx tsc --noEmit       # typecheck only
```

Run a single test file: `npx vitest run src/core/__tests__/spacecraftValidator.test.ts`

## High-level architecture

The app is one page (`index.html` -> `src/main.tsx` -> `src/App.tsx`). All game state lives in a single Zustand store at `src/store/useMissionStore.ts`; UI reads from it via selectors and mutates it via exported actions.

Game phases (store field `phase`, type `GamePhase`): `TITLE` -> `OBJECTIVE_SELECT` -> `HANGAR` -> `GROUND_SEGMENT` -> `FLIGHT` -> `DEBRIEF`.

**Data layer** — `src/core/constants.ts` defines all gameplay data: `MISSIONS` (4 mission specs with Δv target, budget cap, schedule, science target, subsystem requirements), `SPACECRAFT_PARTS` (21 parts across structure/power/battery/computer/adcs/thermal/payload), `LAUNCH_VEHICLES` (3 vehicles with 2-stage params), `GROUND_STATIONS` (DSN sites + lunar relay), `COMMS_BANDS` (S/X/Ka), recommended loadouts, and physical constants (Earth μ/radius/atmosphere, Moon/Mars SOI, etc.). The two difficulty modes (`BEGINNER` vs `REALISTIC`) only change flight assist on/off and plain-English vs engineering message tone — physics is identical.

**Validation** — `src/core/spacecraftValidator.ts` runs at build time (hangar + ground segment). Computes mass, 2-stage Tsiolkovsky Δv, pad TWR, power budget, battery eclipse endurance, data bus throughput, ADCS pointing tier, thermal/heat-shield fit, payload-mission match, budget and schedule caps. Emits `EngineeringConflict[]` with beginner and realistic messages; `isLaunchable` requires zero critical conflicts.

**Ground segment** — `src/core/groundSegment.ts` computes DSN contact coverage, downlink capacity vs. science generation per orbit, buffer-overflow risk, campaign cost/schedule, and `canGreenlight`.

**Flight simulation** — `src/core/physicsEngine.ts` runs inside the rAF loop via `tickFlight`. Velocity-Verlet integration with Earth/Moon/Mars gravity, atmospheric drag & Max Q, eclipse shadow, staging, pad TWR pin-check, suicide-burn landing, science observation + DSN downlink, and success/failure determination. `src/core/debriefAnalyzer.ts` produces the post-mission `DebriefReport` grading 6 resources (mass, power, budget, data, comms, time).

**Rendering** — `src/Viewport3D.tsx` owns the Three.js renderer, camera, input listeners, and rAF loop. It swaps a `SceneController` per phase:
- `SolarSelectScene` — title + objective-select 3D (Earth/Moon/Mars beacons)
- `HangarScene` — VAB rocket stack assembly with drag-to-equip parts
- `GroundGlobeScene` — Earth with clickable DSN dishes + target orbit ring
- `FlightScene` — planets, spacecraft, exhaust plume, DSN beams, orbit trajectory lines

**UI layer** — `src/hud/` holds `PhaseHudOverlay.tsx` (per-phase HUD: title, objective select, hangar part chips, ground segment console, flight instruments, debrief grid), `TopResourceStrip.tsx` (6 resource gauges), and `KapCommsBubble.tsx` (the KAP flight-engineer avatar showing the top engineering conflict). Styles are custom CSS in `src/index.css` (no Tailwind, no UI component library).

**Tests** — unit tests in `src/core/__tests__/` (vitest). E2E campaign test at `e2e/missionFlow.spec.ts` (Playwright, drives the full 5-phase flow against the dev server).

## Constraints / notes

- The `dist/` folder is a prebuilt artifact; do not edit it directly — rebuild via `npm run build`.
- Multiplayer is a disabled stub (`MULTIPLAYER (LOCKED — COMING SOON)`); the challenge supports up to 4 participants but only single-player is implemented.
- No NASA data is fetched at runtime — all physical constants are hardcoded in `constants.ts` and sourced from NASA references documented in `project-tala-research.md`. Incorporating a live NASA resource (e.g., LSP performance curves or JPL planetary data) is the primary outstanding NASA-compliance gap.
- The repo root's separate `CLAUDE.md` (in the parent college workspace) describes an unrelated `birthday-serenade` app and does not apply here.
