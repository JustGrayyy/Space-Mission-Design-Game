import React, { useState } from 'react';
import { MISSIONS } from '../core/constants';
import { useMissionStore } from '../store/useMissionStore';
import type { MissionId } from '../core/types';

interface MissionGuidance {
  badge: string;
  badgeColor: string;
  simpleGoal: string;
  targetExplanation: string;
  rocketTip: string;
  frameTip: string;
  heatshieldTip: string;
  powerTip: string;
  batteryTip: string;
  computerTip: string;
  steeringTip: string;
  payloadTip: string;
  groundTip: string;
  fatalTraps: { title: string; explanation: string }[];
}

const MISSION_GUIDES: Record<MissionId, MissionGuidance> = {
  MOON_LANDING: {
    badge: 'DESTINATION: THE MOON',
    badgeColor: '#38bdf8',
    simpleGoal: 'Fly to the Moon, land safely, and send 400 MB of science data home.',
    targetExplanation: 'The Moon is 240,000 miles away with NO atmosphere. Use your rocket engines to slow down and land on shock-absorbing legs.',
    rocketTip: 'Falcon-M or Ares-H — Small rockets run out of fuel.',
    frameTip: 'Reinforced Lander Chassis — Must have landing legs!',
    heatshieldTip: 'Active Heat Pipes — Temperature swings from +250°F to -200°F.',
    powerTip: 'Large Solar Arrays or RTG Nuclear',
    batteryTip: 'Dual-Bus (520 Wh) — Survive 15-min shadow.',
    computerTip: 'Rad-Hardened OBC — Radiation protection.',
    steeringTip: 'Reaction Wheels — No magnetic field at Moon.',
    payloadTip: 'Autonomous Drill & ChemCam Lab',
    groundTip: '3 DSN dishes + Lunar Relay + X-Band',
    fatalTraps: [
      {
        title: 'No landing legs',
        explanation: 'Satellite frames smash on impact. Use Reinforced Lander Chassis.',
      },
      {
        title: 'Magnetic steering',
        explanation: 'Magnetorquers need Earth\'s magnetic field. They don\'t work at the Moon!',
      },
      {
        title: 'Small battery',
        explanation: 'Solar panels = 0W in shadow. Tiny batteries die in minutes.',
      },
      {
        title: 'Slow S-Band radio',
        explanation: 'Science data fills up memory faster than download speed. Use X-Band.',
      },
    ],
  },
  MARS_LANDING: {
    badge: 'DESTINATION: MARS',
    badgeColor: '#f97316',
    simpleGoal: 'Travel to Mars, survive atmospheric entry, land safely, and send 500 MB of data home.',
    targetExplanation: 'Mars is 50M miles away with thin atmosphere. Entering at 10,000 mph creates a fireball! Mars sunlight is only 43% of Earth.',
    rocketTip: 'Ares-H Heavy — Only big rocket reaches Mars.',
    frameTip: 'Reinforced Lander Chassis — Landing legs required.',
    heatshieldTip: 'PICA-X Aeroshell — 100% ESSENTIAL! Protects from fireball.',
    powerTip: 'RTG Nuclear Battery — ESSENTIAL! Solar too weak at Mars.',
    batteryTip: 'Dual-Bus (520 Wh) — Survive 20-min night.',
    computerTip: 'Deep-Space AI Processor or Rad-Hard OBC',
    steeringTip: 'Reaction Wheels — Required for deep space.',
    payloadTip: 'Autonomous Drill & ChemCam Lab',
    groundTip: '3 DSN dishes + X-Band or Ka-Band',
    fatalTraps: [
      {
        title: 'No heat shield',
        explanation: '#1 mistake! Mars has atmosphere. You\'ll vaporize at 45 km without PICA-X.',
      },
      {
        title: 'Solar panels',
        explanation: 'Mars gets <50% sunlight. Solar panels fail. Use RTG Nuclear!',
      },
      {
        title: 'Small rocket',
        explanation: 'Vega or Falcon-M run out of fuel halfway to Mars.',
      },
      {
        title: 'No landing legs',
        explanation: 'Satellite frames crash and break. Use Reinforced Lander Chassis.',
      },
    ],
  },
  EARTH_OBSERVATION: {
    badge: 'DESTINATION: LOW EARTH ORBIT',
    badgeColor: '#34d399',
    simpleGoal: 'Orbit Earth at 150 km, take climate photos, and send 300 MB home.',
    targetExplanation: 'Great starter mission! Stay close to Earth (150 km) where solar is 100% and gravity keeps you in orbit.',
    rocketTip: 'Vega-L SmallSat — Light rocket is enough.',
    frameTip: 'MicroSat Frame — Lightweight; no landing needed.',
    heatshieldTip: 'Passive MLI Gold Blankets',
    powerTip: 'Compact Solar Wings — 100% sunlight.',
    batteryTip: 'Dual-Bus (520 Wh) — Survive 9-min shadow.',
    computerTip: 'Rad-Hardened OBC',
    steeringTip: 'Reaction Wheels or Magnetorquers',
    payloadTip: 'Multispectral Earth Imager',
    groundTip: '3 DSN + Svalbard + X-Band',
    fatalTraps: [
      {
        title: 'Orbit too low',
        explanation: 'Below 80 km, air drag crashes you into ocean.',
      },
      {
        title: 'Slow S-Band radio',
        explanation: 'Camera: 28 Mbps. S-Band: 8 Mbps. Memory overflows. Use X-Band.',
      },
      {
        title: 'Tiny battery',
        explanation: '9 minutes in shadow every 90 minutes. Small battery dies.',
      },
      {
        title: 'Wrong payload',
        explanation: 'Must use Earth Imager camera, not drill.',
      },
    ],
  },
  SPACE_TELESCOPE: {
    badge: 'DESTINATION: HIGH EARTH ORBIT (1,800 KM)',
    badgeColor: '#a855f7',
    simpleGoal: 'Launch telescope 1,800 km high, lock onto galaxies, and send 600 MB home.',
    targetExplanation: 'High orbit escapes atmosphere blur. Giant mirrors need rock-steady gyros with zero vibration.',
    rocketTip: 'Falcon-M Medium — Has power for high orbit.',
    frameTip: 'Modular Hex Bus — Rigid frame for mirrors.',
    heatshieldTip: 'Active Heat Pipes — Keep sensors cold.',
    powerTip: 'High-Area Deployable Arrays — 560W power.',
    batteryTip: 'Dual-Bus (520 Wh)',
    computerTip: 'Deep-Space AI Processor or Rad-Hard OBC',
    steeringTip: 'Dual CMG + Laser IMU (Tier 3) — REQUIRED for sharp photos!',
    payloadTip: 'Cryogenic IR Space Telescope',
    groundTip: '3 DSN + Ka-Band (120 Mbps)',
    fatalTraps: [
      {
        title: 'Standard wheels',
        explanation: 'Regular wheels vibrate. Use CMG gyros for sharp telescope photos.',
      },
      {
        title: 'Unshielded computer',
        explanation: 'Radiation at 1,800 km crashes cheap chips. Use rad-hardened.',
      },
      {
        title: 'Slow radio',
        explanation: 'Telescope: 75 Mbps. S-Band/X-Band too slow. Use Ka-Band (120 Mbps).',
      },
      {
        title: 'Fragile frame',
        explanation: '210 kg mirror too heavy for MicroSat (180 kg max). Use Hex Bus.',
      },
    ],
  },
};

export const TutorialOverlay: React.FC = () => {
  const tutorialOpen = useMissionStore((s) => s.tutorialOpen);
  const phase = useMissionStore((s) => s.phase);
  const missionId = useMissionStore((s) => s.missionId);
  const closeTutorial = useMissionStore((s) => s.closeTutorial);
  const acknowledgeTutorialAndEnterHangar =
    useMissionStore((s) => s.acknowledgeTutorialAndEnterHangar);

  const [activeTab, setActiveTab] = useState<'MISSION' | 'RULES' | 'CONCEPTS'>('MISSION');

  if (!tutorialOpen) return null;

  const mission = MISSIONS[missionId];
  const guide = MISSION_GUIDES[missionId];
  const isInsideHangar = phase === 'HANGAR';

  return (
    <div className="tutorial-modal-backdrop" data-testid="tutorial-overlay">
      <div className="tutorial-modal-card">
        {/* Header Ribbon */}
        <div className="tutorial-modal-header">
          <div className="tutorial-badge-row">
            <span className="tutorial-kicker">MISSION BRIEFING // HOW TO WIN</span>
            <span
              className="tutorial-mission-pill"
              style={{ borderColor: guide.badgeColor, color: guide.badgeColor }}
            >
              {guide.badge}
            </span>
          </div>

          <h2 className="tutorial-title">{guide.simpleGoal}</h2>

          <div className="tutorial-tab-row">
            <button
              type="button"
              className={`tutorial-tab-btn ${activeTab === 'MISSION' ? 'active' : ''}`}
              onClick={() => setActiveTab('MISSION')}
              data-testid="tutorial-tab-mission"
            >
              🎯 Build Checklist for {mission.title.split(' ')[0]}
            </button>
            <button
              type="button"
              className={`tutorial-tab-btn ${activeTab === 'CONCEPTS' ? 'active' : ''}`}
              onClick={() => setActiveTab('CONCEPTS')}
              data-testid="tutorial-tab-concepts"
            >
              🧠 Rocket Science Made Simple
            </button>
            <button
              type="button"
              className={`tutorial-tab-btn ${activeTab === 'RULES' ? 'active' : ''}`}
              onClick={() => setActiveTab('RULES')}
              data-testid="tutorial-tab-rules"
            >
              ⭐ 4 Steps to Win the Game
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="tutorial-modal-body">
          {activeTab === 'MISSION' && (
            <div className="tutorial-blueprint-grid">
              {/* Plain-English Target Explanation */}
              <div className="tutorial-concept-banner">
                <span className="banner-icon">💡</span>
                <div className="banner-text">
                  <strong>WHAT YOU NEED TO KNOW ABOUT THIS TARGET:</strong> {guide.targetExplanation}
                </div>
              </div>

              {/* Critical Warnings */}
              <div className="tutorial-danger-box">
                <div className="danger-title">⚠️ TOP WAYS TO CRASH OR FAIL ON THIS MISSION:</div>
                <div className="danger-grid">
                  {guide.fatalTraps.map((trap, idx) => (
                    <div key={idx} className="danger-card">
                      <div className="danger-card-title">❌ {trap.title}</div>
                      <div className="danger-card-body">{trap.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exact Recommended Subsystem Checklist in plain English */}
              <div className="tutorial-spec-table">
                <div className="spec-table-header">WHAT TO PICK IN THE 8 HANGAR SLOTS:</div>

                <div className="spec-row">
                  <div className="spec-col-label">🚀 1. ROCKET ENGINE</div>
                  <div className="spec-col-val">{guide.rocketTip}</div>
                </div>

                <div className="spec-row">
                  <div className="spec-col-label">🏗️ 2. BODY FRAME</div>
                  <div className="spec-col-val">{guide.frameTip}</div>
                </div>

                <div className="spec-row">
                  <div className="spec-col-label">🛡️ 3. HEAT &amp; SHIELDING</div>
                  <div className="spec-col-val">{guide.heatshieldTip}</div>
                </div>

                <div className="spec-row">
                  <div className="spec-col-label">⚡ 4. POWER GENERATOR</div>
                  <div className="spec-col-val">{guide.powerTip}</div>
                </div>

                <div className="spec-row">
                  <div className="spec-col-label">🔋 5. BATTERY</div>
                  <div className="spec-col-val">{guide.batteryTip}</div>
                </div>

                <div className="spec-row">
                  <div className="spec-col-label">💻 6. ONBOARD COMPUTER</div>
                  <div className="spec-col-val">{guide.computerTip}</div>
                </div>

                <div className="spec-row">
                  <div className="spec-col-label">🧭 7. STEERING GYROS</div>
                  <div className="spec-col-val">{guide.steeringTip}</div>
                </div>

                <div className="spec-row">
                  <div className="spec-col-label">🔬 8. SCIENCE TOOL</div>
                  <div className="spec-col-val">{guide.payloadTip}</div>
                </div>

                <div className="spec-row highlight-row">
                  <div className="spec-col-label">📡 GROUND RADIO (NEXT STAGE)</div>
                  <div className="spec-col-val">{guide.groundTip}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CONCEPTS' && (
            <div className="tutorial-concepts-grid">
              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">🚀</span>
                  <div>
                    <div className="concept-title">TWR and Δv (Thrust & Fuel)</div>
                    <div className="concept-sub">Can your rocket lift off?</div>
                  </div>
                </div>
                <p className="concept-body">
                  <strong>TWR (Thrust-to-Weight)</strong> = engine power. Must be above <strong>1.05</strong> to lift off! <strong>Δv (Delta-V)</strong> = fuel range. Earth orbit = small tank. Moon/Mars = massive tank.
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">🔥</span>
                  <div>
                    <div className="concept-title">Heat Shields (Mars Only!)</div>
                    <div className="concept-sub">Prevent vaporization</div>
                  </div>
                </div>
                <p className="concept-body">
                  Mars has atmosphere. Entering at 10,000 mph = fireball. <strong>PICA-X Aeroshell</strong> protects you. Without it, you vaporize at 45 km. Moon has no air, so no shield needed.
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">🦵</span>
                  <div>
                    <div className="concept-title">Landing Legs</div>
                    <div className="concept-sub">Don’t shatter on impact</div>
                  </div>
                </div>
                <p className="concept-body">
                  Satellites are fragile. Landing one = instant shatter. <strong>Reinforced Lander Chassis</strong> has 4 shock-absorbing legs for soft landings.
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">🌑</span>
                  <div>
                    <div className="concept-title">Shadows (No Sunlight!)</div>
                    <div className="concept-sub">Solar panels produce 0W in dark</div>
                  </div>
                </div>
                <p className="concept-body">
                  Behind Earth/Moon = total darkness. Solar = <strong>0W</strong>! Bring <strong>big battery</strong>. Mars is always weak (43% sunlight) so use <strong>RTG Nuclear</strong> instead.
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">🧭</span>
                  <div>
                    <div className="concept-title">Steering in Space</div>
                    <div className="concept-sub">Compasses don’t work outside Earth</div>
                  </div>
                </div>
                <p className="concept-body">
                  Earth orbit: magnetic steering works. Moon/Mars: <strong>no magnetic field</strong>! Magnetorquers fail. Use <strong>Reaction Wheels</strong> (spinning gyros).
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">📡</span>
                  <div>
                    <div className="concept-title">Radio Speed</div>
                    <div className="concept-sub">Prevent data overflow</div>
                  </div>
                </div>
                <p className="concept-body">
                  Camera shoots fast. Slow radio = memory overflows = lost photos! S-Band = slow. <strong>X-Band or Ka-Band</strong> = fast downloads.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'RULES' && (
            <div className="tutorial-rules-list">
              <div className="rule-card">
                <div className="rule-header">
                  <span className="rule-num">1</span>
                  <span className="rule-title">PICK 8 PARTS</span>
                </div>
                <p className="rule-body">
                  Click 8 slots: Frame, Power, Battery, Computer, Steering, Thermal, Payload, Rocket. Look for green checkmarks or use our checklist.
                </p>
              </div>

              <div className="rule-card">
                <div className="rule-header">
                  <span className="rule-num">2</span>
                  <span className="rule-title">WATCH KAP’S HELMET</span>
                </div>
                <p className="rule-body">
                  <strong>RED</strong> = critical problem. <strong>GREEN</strong> = ready to launch! Click red messages to see what to fix.
                </p>
              </div>

              <div className="rule-card">
                <div className="rule-header">
                  <span className="rule-num">3</span>
                  <span className="rule-title">SET UP GROUND DISHES</span>
                </div>
                <p className="rule-body">
                  Pick Earth stations + <strong>X-Band</strong> or <strong>Ka-Band</strong> radio. Then click <strong>Greenlight Liftoff</strong>!
                </p>
              </div>

              <div className="rule-card">
                <div className="rule-header">
                  <span className="rule-num">4</span>
                  <span className="rule-title">LAUNCH!</span>
                </div>
                <p className="rule-body">
                  Hit <strong>IGNITE LAUNCH</strong>! Beginner Mode autopilot handles everything. Reach target, land safely, collect science = <strong>WIN</strong>!
                </p>
              </div>
            </div>
          )}

          {/* Kap Assistant Callout */}
          <div className="tutorial-kap-tip">
            <span className="kap-tip-icon">🤖</span>
            <div className="kap-tip-text">
              <strong>KAP\'S SHORTCUT FOR BEGINNERS:</strong> If you ever feel overwhelmed or don\'t know what parts to choose, just click the <strong>KAP AUTO-ENGINEER</strong> button in the hangar! I will instantly assemble the perfect, 100% winning rocket tailored for your mission!
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="tutorial-modal-footer">
          {isInsideHangar ? (
            <button
              type="button"
              className="primary-cta-btn ready"
              onClick={closeTutorial}
              data-testid="tutorial-close-btn"
            >
              CLOSE GUIDE &amp; CONTINUE BUILDING
            </button>
          ) : (
            <button
              type="button"
              className="primary-cta-btn ready pulse-btn"
              onClick={acknowledgeTutorialAndEnterHangar}
              data-testid="tutorial-ack-btn"
            >
              I UNDERSTAND HOW TO WIN — ENTER VAB HANGAR ➔
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
