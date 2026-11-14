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
    simpleGoal: 'Fly from Earth to the Moon, touch down softly without crashing, and radio 400 MB of science data back home.',
    targetExplanation: 'The Moon is about 240,000 miles away. It has NO air/atmosphere, meaning your rocket won\'t burn up, but you also have no parachutes! You have to slow down using your rocket engines and land on shock-absorbing legs.',
    rocketTip: 'Falcon-M (Medium) or Ares-H (Heavy) — The small Vega rocket is too weak and will run out of fuel halfway to the Moon.',
    frameTip: 'Reinforced Lander Chassis — MANDATORY! It has 4 springy, shock-absorbing legs. Thin satellite frames will smash into pieces on touchdown.',
    heatshieldTip: 'Active Heat Pipes & Louvers — The Moon has no air to burn you, but temperatures swing between 250°F baking hot and -200°F freezing cold.',
    powerTip: 'Large Deployable Solar Arrays or RTG Nuclear — Sunlight is bright near the Moon during daytime.',
    batteryTip: 'Dual-Bus (520 Wh) or Solid-State Bank — The Moon casts a 15-minute shadow (night). Without a big battery, your heaters shut down and the spacecraft freezes to death.',
    computerTip: 'Rad-Hardened Flight OBC — Normal computer chips freeze and glitch from cosmic radiation in deep space.',
    steeringTip: 'Reaction Wheels — Earth\'s magnetic compass field does not reach the Moon. Only spinning gyro wheels can steer your ship in deep space.',
    payloadTip: 'Autonomous Drill & ChemCam Lab — You are going to the lunar surface to drill polar ice, so you must bring a surface drill, not a camera.',
    groundTip: 'Select all 3 Earth DSN dishes PLUS the Lunar Orbital Relay with X-Band radio. The Moon can block direct line-of-sight to Earth, so the relay is a lifesaver.',
    fatalTraps: [
      {
        title: 'Picking a fragile satellite frame',
        explanation: 'If you choose the MicroSat or Hex frame, your lander will hit the lunar rocks and smash into pieces. Always use the Reinforced Lander Chassis.',
      },
      {
        title: 'Using magnetic steering coils (Magnetorquers)',
        explanation: 'Magnetorquers steer using Earth\'s magnetic field. Outside Earth orbit, there is no magnetic field! Your rocket won\'t be able to turn or steer.',
      },
      {
        title: 'Bringing a tiny 35 Wh battery',
        explanation: 'When the Moon blocks the sun, solar panels output zero watts. A small battery will go flat in minutes, turning your ship into space junk.',
      },
      {
        title: 'Using slow S-Band radio',
        explanation: 'Your drill produces science faster than a slow radio can download it. Memory overflows and throws away your hard-earned lunar samples.',
      },
    ],
  },
  MARS_LANDING: {
    badge: 'DESTINATION: MARS',
    badgeColor: '#f97316',
    simpleGoal: 'Travel 50 million miles to Mars, survive atmospheric fireball entry, land softly on the red surface, and beam 500 MB of astrobiology data home.',
    targetExplanation: 'Mars is the ultimate challenge. It has a thin atmosphere (air) starting at 45 km altitude. Entering that air at 10,000 mph creates a fireball hotter than lava. Plus, Mars is so far from the Sun that sunlight is too weak for normal solar panels!',
    rocketTip: 'Ares-H Heavy Interplanetary Booster — Mars is huge distances away. Only the colossal Ares-H has the massive fuel tanks needed to push your lander all the way there.',
    frameTip: 'Reinforced Lander Chassis — You must land on the surface with shock-absorbing legs. Any other chassis will crush upon impact.',
    heatshieldTip: 'PICA-X Aeroshell & Heatshield — 100% LIFE-OR-DEATH ESSENTIAL! When slamming into Martian air at 45 km, without this shield, your entire rocket burns into ashes in seconds.',
    powerTip: 'Multi-Mission RTG Nuclear Battery — ESSENTIAL! Mars is so far from the Sun that sunlight drops to only 43%. Solar panels produce less than half power and will brown out. The RTG nuclear battery produces steady 280 W day and night!',
    batteryTip: 'Dual-Bus Li-Ion Bank (520 Wh) — Keeps systems stable during landing bursts and long 20-minute Martian night shadows.',
    computerTip: 'Deep-Space AI Edge Processor or Rad-Hard OBC — Mars is so far that radio signals take minutes to arrive. The computer must be radiation-proof and capable of landing itself autonomously.',
    steeringTip: 'Reaction Wheels — Gyroscope steering is required. Magnetic steering is completely useless away from Earth.',
    payloadTip: 'Autonomous Drill & ChemCam Lab — Martian astrobiology lab to search for signs of past water and microbial life.',
    groundTip: 'Select 3 DSN dishes + X-Band or Ka-Band radio. Signals across 50 million miles are weak, so fast radio is mandatory to download 500 MB.',
    fatalTraps: [
      {
        title: 'Missing the PICA-X Heat Shield',
        explanation: 'This is the #1 mistake new players make. Mars has an atmosphere. Hitting it without the heatshield means instant vaporization at 45 km altitude.',
      },
      {
        title: 'Using Solar Panels on Mars',
        explanation: 'Mars receives less than half the sunlight Earth does. Solar wings won\'t generate enough electricity to keep your instruments running. Use the Nuclear RTG battery!',
      },
      {
        title: 'Using a Light or Medium Rocket',
        explanation: 'Vega or Falcon-M simply do not carry enough fuel. Your rocket will run out of propellant halfway between Earth and Mars.',
      },
      {
        title: 'Missing Landing Legs',
        explanation: 'A satellite frame with no landing legs will crash at 25 m/s and be obliterated on the Martian rocks.',
      },
    ],
  },
  EARTH_OBSERVATION: {
    badge: 'DESTINATION: LOW EARTH ORBIT',
    badgeColor: '#34d399',
    simpleGoal: 'Place a high-resolution climate camera in a stable orbit 150 km above Earth, survive night passes, and beam 300 MB of photos back.',
    targetExplanation: 'Earth Observation is a great introductory mission! You stay close to Earth (150 km high), where solar energy is 100% strong and gravity keeps you in orbit.',
    rocketTip: 'Vega-L SmallSat Launcher — Earth orbit is close, so the affordable light rocket has plenty of muscle to reach space.',
    frameTip: 'MicroSat Composite Frame — Lightweight carbon frame; you are orbiting, not landing, so you don\'t need heavy landing legs.',
    heatshieldTip: 'Passive MLI Gold Blankets — Keeps satellite warm in the mild climate of Low Earth Orbit.',
    powerTip: 'Compact Solar Wings — You get 100% full sunlight when in the sunlit half of your orbit.',
    batteryTip: 'Dual-Bus Li-Ion Bank (520 Wh) — Earth blocks the sun for about 9 minutes every lap. You need enough stored juice to survive night passes.',
    computerTip: 'Rad-Hardened Flight OBC — Keeps systems reliable during long orbital mapping operations.',
    steeringTip: 'Reaction Wheels or Magnetorquers — Both work here because you are close to Earth\'s magnetic field.',
    payloadTip: 'Multispectral Earth Imager — The climate camera required for this mission.',
    groundTip: 'All 3 DSN dishes + Svalbard Polar Station with X-Band radio. The high-res camera outputs 28 Mbps, so free S-Band radio is too slow and will overflow memory.',
    fatalTraps: [
      {
        title: 'Orbiting too low (below 80 km)',
        explanation: 'Earth\'s air extends up to 80 km. If your orbit dips below that, air drag acts like a giant brake, slowing you down until you crash into the ocean.',
      },
      {
        title: 'Using slow S-Band radio for a fast camera',
        explanation: 'The camera shoots 28 MB of data per second, but basic S-Band radio can only send 8 MB per second. Memory fills up and drops valuable photos. Pick X-Band!',
      },
      {
        title: 'Tiny battery in Earth\'s shadow',
        explanation: 'Every 90 minutes, your satellite spends 9 minutes in the dark behind Earth. A 35 Wh battery runs out and kills the satellite.',
      },
      {
        title: 'Wrong payload',
        explanation: 'Bringing a Moon surface drill to an Earth camera mission will fail validation. Match the camera to the climate mission!',
      },
    ],
  },
  SPACE_TELESCOPE: {
    badge: 'DESTINATION: HIGH EARTH ORBIT (1,800 KM)',
    badgeColor: '#a855f7',
    simpleGoal: 'Boost a giant infrared space telescope 1,800 km high above Earth\'s atmosphere, lock onto distant galaxies with laser-sharp gyros, and beam 600 MB home.',
    targetExplanation: 'Space telescopes need to be high above Earth (1,800 km) to escape atmosphere blur. Because deep-space mirrors are huge and sensitive, the telescope must stay rock-steady without the slightest vibration.',
    rocketTip: 'Falcon-M Medium Lift — Has plenty of two-stage power to boost the heavy telescope into high 1,800 km orbit.',
    frameTip: 'Modular Hex Bus — Rigid titanium-aluminum frame built specifically to support giant telescope mirrors without flexing.',
    heatshieldTip: 'Active Heat Pipes & Louvers — Deep-space infrared cameras must be kept super cold to detect faint heat from baby galaxies.',
    powerTip: 'High-Area Deployable Arrays — Giant wings providing 560 W to power the hungry sensors and gyroscopes.',
    batteryTip: 'Dual-Bus Li-Ion Bank (520 Wh) — High orbits have very short shadows, so a standard bank easily lasts through.',
    computerTip: 'Deep-Space AI Edge Processor or Rad-Hard OBC — At 1,800 km, the spacecraft passes through the harsh Van Allen radiation belts. Normal chips will crash.',
    steeringTip: 'Dual CMG + Laser IMU (Tier 3 Gyros) — MANDATORY! Standard reaction wheels wobble slightly, which ruins telescope photos. Only Control Moment Gyros (CMG) are still enough for sharp pictures.',
    payloadTip: 'Cryogenic IR Space Telescope — The cooled mirror payload.',
    groundTip: '3 DSN dishes with ultra-fast Ka-Band Radio (120 Mbps). The telescope creates 75 Mbps of data—only blazing Ka-Band can download it fast enough!',
    fatalTraps: [
      {
        title: 'Using standard Reaction Wheels instead of CMGs',
        explanation: 'Telescopes require sub-millidegree stillness. Regular reaction wheels vibrate and produce blurry photos that fail the science requirement.',
      },
      {
        title: 'Using unshielded computer chips',
        explanation: 'At 1,800 km altitude, cosmic radiation bombards the craft. Cheap unshielded microcontrollers will crash and freeze.',
      },
      {
        title: 'Slow radio (S-Band or X-Band)',
        explanation: 'The telescope mirror outputs 75 megabits every second. S-Band (8 Mbps) and X-Band (45 Mbps) are too slow, causing memory buffer overflow.',
      },
      {
        title: 'Fragile MicroSat frame',
        explanation: 'The 210 kg telescope mirror is too heavy for the small MicroSat frame (max 180 kg) and will crack the structural mounts.',
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
                    <div className="concept-title">Horsepower &amp; Gas Range (TWR and Δv)</div>
                    <div className="concept-sub">How to avoid staying stuck on the launchpad</div>
                  </div>
                </div>
                <p className="concept-body">
                  Think of <strong>TWR (Thrust-to-Weight)</strong> like engine horsepower. If your rocket is too heavy for its engine, it won’t lift off the ground! It must be above <strong>1.05</strong>. Think of <strong>Delta-V (Δv)</strong> as your fuel tank range: Earth orbit only needs a small tank, but the Moon and Mars are far away and need medium or massive heavy booster tanks!
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">🔥</span>
                  <div>
                    <div className="concept-title">Atmospheric Fireball (Why Mars needs a Heat Shield)</div>
                    <div className="concept-sub">Friction with planetary air</div>
                  </div>
                </div>
                <p className="concept-body">
                  When a rocket plunges into air at 10,000 mph, air friction creates a fireball hotter than volcanic lava. <strong>Mars has air!</strong> If you don’t equip the <strong>PICA-X Aeroshell Heatshield</strong>, your ship will catch fire and vaporize at 45 km altitude. (The Moon has no air, so no heatshield is needed there!).
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">🦵</span>
                  <div>
                    <div className="concept-title">Landing Legs vs. Fragile Frames</div>
                    <div className="concept-sub">Preventing your spacecraft from shattering</div>
                  </div>
                </div>
                <p className="concept-body">
                  Normal satellites are fragile cubes wrapped in foil. If you try to land one on the Moon or Mars, it will hit the hard rock and shatter. You <strong>MUST pick the Reinforced Lander Chassis</strong>—it comes with 4 spring-loaded shock legs to absorb the touchdown bump!
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">🌑</span>
                  <div>
                    <div className="concept-title">Shadows in Space (Zero Sunlight!)</div>
                    <div className="concept-sub">Surviving planetary night without freezing</div>
                  </div>
                </div>
                <p className="concept-body">
                  Whenever you fly behind the Earth or Moon, you enter total darkness. Solar panels produce <strong>0 Watts</strong>! If your battery is too small, your ship dies in minutes. Bring a <strong>big battery</strong>. On Mars, sunlight is always weak (43%), so pick the <strong>RTG Nuclear Battery</strong> which generates heat and electricity 24/7 without needing sunlight!
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">🧭</span>
                  <div>
                    <div className="concept-title">How Rockets Turn in Deep Space</div>
                    <div className="concept-sub">Why compasses stop working outside Earth</div>
                  </div>
                </div>
                <p className="concept-body">
                  Near Earth, you can steer using Earth\'s magnetic field (like a compass). But once you leave Earth for the Moon or Mars, there is <strong>no magnetic field</strong>! Magnetorquers will fail. You must use <strong>Reaction Wheels</strong> (spinning heavy wheels inside the rocket that twist the ship).
                </p>
              </div>

              <div className="concept-card">
                <div className="concept-header">
                  <span className="concept-emoji">📡</span>
                  <div>
                    <div className="concept-title">Space Wi-Fi (Radio Bandwidth)</div>
                    <div className="concept-sub">Preventing camera memory overflows</div>
                  </div>
                </div>
                <p className="concept-body">
                  Science instruments take high-definition photos fast. If you use slow radio (like basic S-Band), your computer fills up like a full phone and starts throwing away photos! Upgrade to <strong>X-Band or Ka-Band</strong> radio so your data downloads cleanly to Earth.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'RULES' && (
            <div className="tutorial-rules-list">
              <div className="rule-card">
                <div className="rule-header">
                  <span className="rule-num">1</span>
                  <span className="rule-title">STEP 1: PICK 8 SLOTS IN THE HANGAR</span>
                </div>
                <p className="rule-body">
                  Click each of the 8 bottom buttons: Frame, Power, Battery, Computer, Steering, Thermal, Payload, and Rocket. Look for parts with green checkmarks or use our checklist tab.
                </p>
              </div>

              <div className="rule-card">
                <div className="rule-header">
                  <span className="rule-num">2</span>
                  <span className="rule-title">STEP 2: WATCH KAP\'S HELMET ALERTS</span>
                </div>
                <p className="rule-body">
                  Kap is your AI flight engineer. If his helmet turns <strong>RED (ALERT)</strong>, you have a critical conflict (like an engine too weak to lift off). Click the red message to see what to change until Kap turns <strong>GREEN (HAPPY)</strong>!
                </p>
              </div>

              <div className="rule-card">
                <div className="rule-header">
                  <span className="rule-num">3</span>
                  <span className="rule-title">STEP 3: GROUND CONTROL ANTENNAS</span>
                </div>
                <p className="rule-body">
                  Before launch, choose Earth radio dish stations (Goldstone, Madrid, Canberra) and select <strong>X-Band</strong> or <strong>Ka-Band</strong> radio so your scientific photos don’t get dropped. Then click <strong>Greenlight Liftoff</strong>!
                </p>
              </div>

              <div className="rule-card">
                <div className="rule-header">
                  <span className="rule-num">4</span>
                  <span className="rule-title">STEP 4: LAUNCH &amp; BEAM SCIENCE HOME</span>
                </div>
                <p className="rule-body">
                  Hit <strong>IGNITE LAUNCH</strong>! In Beginner Mode, your autopilot automatically handles liftoff, staging, and trajectory. Reach your destination, land safely, and watch your science progress bar reach 100% for <strong>MISSION ACCOMPLISHED</strong>!
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
