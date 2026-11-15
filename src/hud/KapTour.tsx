import React, { useEffect, useLayoutEffect, useState } from 'react';
import { create } from 'zustand';
import type { GamePhase } from '../core/types';
import { useMissionStore } from '../store/useMissionStore';
import { KapFace } from './KapFace';

/**
 * Kap's first-flight tour: a spotlight walks a brand-new player through one
 * whole mission, one sentence at a time. Runs once; the ? button replays it.
 */

const DONE_KEY = 'orbital-architect-tour-done';

function readDone(): boolean {
  try {
    return localStorage.getItem(DONE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeDone(): void {
  try {
    localStorage.setItem(DONE_KEY, '1');
  } catch {
    /* storage blocked: the tour just shows again next time */
  }
}

interface TourStep {
  phase: GamePhase;
  /** CSS selector of the thing to spotlight; none = a centered message. */
  target?: string;
  title: string;
  text: string;
  /** 'next' shows a Next button; 'click' waits for the player to press the target. */
  mode: 'next' | 'click';
}

const STEPS: TourStep[] = [
  {
    phase: 'OBJECTIVE_SELECT',
    title: "Hi, I'm Kap!",
    text: "I'm your flight engineer. In this game you build a spacecraft and fly it to space. You don't need to know any science. I'll show you everything.",
    mode: 'next',
  },
  {
    phase: 'OBJECTIVE_SELECT',
    target: '[data-testid=mission-cards]',
    title: 'Pick a mission',
    text: 'Each mission is a trip to a different place. Orbit Earth is the easiest, so it is already picked for you.',
    mode: 'next',
  },
  {
    phase: 'OBJECTIVE_SELECT',
    target: '[data-testid=enter-hangar-btn]',
    title: "Let's build",
    text: 'Press this to open the hangar, where spacecraft are put together.',
    mode: 'click',
  },
  {
    phase: 'HANGAR',
    target: '[data-testid=tutorial-kap-build-btn]',
    title: 'I can build it for you',
    text: 'Building is the tricky part, so let me pick the parts this time. Press the orange button.',
    mode: 'click',
  },
  {
    phase: 'HANGAR',
    target: '.slot-dock-row',
    title: 'Every spacecraft has 8 parts',
    text: 'Power, a battery, a computer, a camera and more. Tap any part later to swap it and see what changes.',
    mode: 'next',
  },
  {
    phase: 'HANGAR',
    target: '[data-testid=resource-row]',
    title: 'Watch these lights',
    text: 'Green means good. Red means something needs fixing. Tap any light to learn what it means.',
    mode: 'next',
  },
  {
    phase: 'HANGAR',
    target: '[data-testid=rollout-ground-btn]',
    title: 'All green!',
    text: 'Your spacecraft is ready. Press this to choose where it launches from.',
    mode: 'click',
  },
  {
    phase: 'LAUNCH_SITE',
    target: '[data-testid=confirm-launch-site-btn]',
    title: 'Pick a launch site',
    text: 'Rockets launch from special sites around the world. Kennedy Space Center in Florida is a great first choice. Press Next.',
    mode: 'click',
  },
  {
    phase: 'GROUND_SEGMENT',
    target: '.station-chip-grid',
    title: 'Radio dishes on Earth',
    text: 'Your spacecraft sends photos home by radio. These giant dishes in California, Spain and Australia catch them.',
    mode: 'next',
  },
  {
    phase: 'GROUND_SEGMENT',
    target: '[data-testid=greenlight-liftoff-btn]',
    title: 'Ready for launch',
    text: 'Everything checks out. Press Go for launch!',
    mode: 'click',
  },
  {
    phase: 'FLIGHT',
    target: '[data-testid=ignite-launch-btn]',
    title: 'Light the engines',
    text: 'Press Launch. The autopilot flies the rocket for you.',
    mode: 'click',
  },
  {
    phase: 'FLIGHT',
    target: '[data-testid=flight-goal]',
    title: 'Fill this bar to win',
    text: 'Once you reach orbit, your camera takes photos. Each time you pass over a radio dish, they get sent home.',
    mode: 'next',
  },
  {
    phase: 'FLIGHT',
    target: '.warp-group',
    title: 'Speed up time',
    text: 'One trip around Earth takes a while. Press 100x or 500x to fast-forward.',
    mode: 'next',
  },
  {
    phase: 'DEBRIEF',
    target: '.debrief-frame',
    title: 'Mission report',
    text: 'Here is how each part of your mission did. Now try building your own spacecraft, or a harder mission!',
    mode: 'next',
  },
];

interface TourState {
  active: boolean;
  index: number;
  start: () => void;
  next: () => void;
  end: () => void;
}

export const useTourStore = create<TourState>((set, get) => ({
  active: !readDone(),
  index: 0,
  start: () => set({ active: true, index: 0 }),
  next: () => {
    const index = get().index + 1;
    if (index >= STEPS.length) {
      writeDone();
      set({ active: false, index: 0 });
    } else {
      set({ index });
    }
  },
  end: () => {
    writeDone();
    set({ active: false, index: 0 });
  },
}));

/** True while Kap's tour card is on screen (the regular Kap bubble steps aside). */
export function useTourVisible(): boolean {
  const active = useTourStore((s) => s.active);
  const index = useTourStore((s) => s.index);
  const phase = useMissionStore((s) => s.phase);
  return active && STEPS[index]?.phase === phase;
}

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PAD = 8;

export const KapTour: React.FC = () => {
  const { active, index, next, end } = useTourStore();
  const phase = useMissionStore((s) => s.phase);
  const step = STEPS[index];
  const visible = active && step?.phase === phase;
  const [box, setBox] = useState<Box | null>(null);

  // Follow the target every frame: panels animate and the 3D view resizes.
  useLayoutEffect(() => {
    if (!visible || !step?.target) {
      setBox(null);
      return;
    }
    let raf = 0;
    const tick = () => {
      const el = document.querySelector(step.target!);
      if (el) {
        const r = el.getBoundingClientRect();
        setBox((prev) =>
          prev && prev.top === r.top && prev.left === r.left && prev.width === r.width && prev.height === r.height
            ? prev
            : { top: r.top, left: r.left, width: r.width, height: r.height }
        );
      } else {
        setBox(null);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [visible, step]);

  // If the player moves ahead on their own, the tour catches up instead of stalling.
  useEffect(() => {
    if (!active || !step) return;
    const order: GamePhase[] = ['TITLE', 'OBJECTIVE_SELECT', 'HANGAR', 'LAUNCH_SITE', 'GROUND_SEGMENT', 'FLIGHT', 'DEBRIEF'];
    if (order.indexOf(step.phase) < order.indexOf(phase) && phase !== 'TITLE') next();
  }, [active, step, phase, next]);

  // A spotlight target that never appears (the player took another path) is skipped.
  useEffect(() => {
    if (!visible || !step?.target || box) return;
    const t = window.setTimeout(() => {
      if (!document.querySelector(step.target!)) next();
    }, 1500);
    return () => window.clearTimeout(t);
  }, [visible, step, box, next]);

  // 'click' steps advance when the player presses the spotlighted thing.
  useEffect(() => {
    if (!visible || step?.mode !== 'click' || !step.target) return;
    const onClick = (e: MouseEvent) => {
      const el = document.querySelector(step.target!);
      if (el && e.target instanceof Node && el.contains(e.target)) next();
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [visible, step, next]);

  if (!visible || !step) return null;
  if (step.target && !box) return null; // target not on screen yet

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cardW = Math.min(380, vw - 32);
  let cardStyle: React.CSSProperties;
  if (!box) {
    cardStyle = { left: (vw - cardW) / 2, top: vh * 0.3, width: cardW };
  } else {
    const below = box.top + box.height + PAD + 16;
    const roomBelow = vh - below;
    const left = Math.max(16, Math.min(vw - cardW - 16, box.left + box.width / 2 - cardW / 2));
    cardStyle =
      roomBelow > 230
        ? { left, top: below, width: cardW }
        : { left, bottom: vh - (box.top - PAD - 16), width: cardW };
  }

  return (
    <div className="kap-tour" data-testid="kap-tour" aria-live="polite">
      {box ? (
        <div
          className="kap-tour-spot"
          style={{
            top: box.top - PAD,
            left: box.left - PAD,
            width: box.width + PAD * 2,
            height: box.height + PAD * 2,
          }}
        />
      ) : (
        <div className="kap-tour-dim" />
      )}
      <div className="kap-tour-card" style={cardStyle} role="dialog" aria-labelledby="kap-tour-title">
        <div className="kap-tour-head">
          <KapFace mood="HAPPY" size={44} />
          <div>
            <div className="kap-tour-count">
              {index + 1} of {STEPS.length}
            </div>
            <h2 className="kap-tour-title" id="kap-tour-title">
              {step.title}
            </h2>
          </div>
        </div>
        <p className="kap-tour-text">{step.text}</p>
        <div className="kap-tour-actions">
          <button type="button" className="kap-tour-skip" onClick={end}>
            Skip tutorial
          </button>
          {step.mode === 'next' ? (
            <button type="button" className="primary-cta-btn kap-tour-next" onClick={next} autoFocus>
              {index === 0 ? "Let's go" : index === STEPS.length - 1 ? 'Finish' : 'Next'}
            </button>
          ) : (
            <span className="kap-tour-waiting">Press the highlighted button</span>
          )}
        </div>
      </div>
    </div>
  );
};
