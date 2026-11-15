# Orbital Architect 3D

**NASA Space Apps Challenge 2026 · Space Mission Design Game · Team CyberSects**

Design a spacecraft, launch it, and fly a real mission to Earth orbit, the Moon or Mars. Every choice costs something: weight, power, money, data, radio time and build time all trade against each other, and a friendly flight engineer, Kap, explains why your mission worked or failed.

## Play it

```bash
npm install
npm run dev        # http://localhost:5173
```

New players get Kap's guided first flight automatically (the **?** button replays it).

## What you do

1. **Choose a mission.** Orbit Earth (easiest), Space telescope, Land on the Moon, Land on Mars (hardest).
2. **Build the spacecraft.** 8 parts (frame, power, battery, computer, steering, heat control, science tool, rocket). Every part shows its upside and its trade-off, or let Kap build it.
3. **Pick a launch site.** 9 real sites. Earth's spin gives an eastward push that is strongest near the equator.
4. **Set up mission control.** Choose NASA Deep Space Network dishes and a radio band fast enough to bring your science home.
5. **Fly.** A real-time 3D flight: liftoff, stage separation, orbit, and science sent home through the radio dishes.
6. **Results.** A plain-language report on each resource, with fixes when something went wrong.

**Beginner** mode uses plain words and an autopilot. **Realistic** mode shows the full engineering numbers and lets you steer (W/S pitch, A/D yaw, Z/X engine power, Space to drop stage 1).

## The science

The flight runs on real equations from the team's Project TALA research notes (`project-tala-research.md`): the Tsiolkovsky rocket equation, thrust-to-weight ratio, orbital mechanics (Velocity-Verlet integration with Earth/Moon/Mars gravity), atmospheric drag, eclipses and battery drain, downlink capacity, and Earth's rotation. Tap any resource light in the game to see the formula behind it.

The solar system is **scaled down** so a mission fits in a few minutes: Earth's radius is 600 km and a day lasts 4 hours, with orbit speeds and the rotation boost scaled to keep the real-world proportions (see `CLAUDE.md` for the constants).

## Built with

React 18, Three.js, Zustand, TypeScript, Vite. Sound and music are synthesized live with the Web Audio API (no audio files). Tests: Vitest (`npm run test`) and Playwright (`npm run test:e2e`).

## Credits

- Team CyberSects
- Planet surface maps: [Solar System Scope](https://www.solarsystemscope.com/textures/), CC BY 4.0 (`public/textures/CREDITS.txt`)
- Mission design resources from the NASA Space Apps 2026 challenge: NASA's science mission design overview, GMAT, JPL Concept Maturity Levels, Goddard Mission Design Lab, NASA Mission Viz, and CubeSat 101
