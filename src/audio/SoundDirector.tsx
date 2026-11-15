import { useEffect, type FC } from 'react';
import { useMissionStore } from '../store/useMissionStore';
import { engine } from './sound';

const MILESTONE_STATUSES = new Set(['TRANSIT', 'TARGET_CAPTURE', 'LANDING']);
const BURN_STATUSES = new Set(['ASCENT', 'ORBIT', 'TRANSIT', 'TARGET_CAPTURE', 'LANDING']);

/** Renders nothing: listens to the game and plays the matching sounds and music. */
export const SoundDirector: FC = () => {
  // UI clicks: one listener for every button, so no component needs sound code.
  // The first click also starts the music (browsers block audio until a gesture).
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      engine.unlock();
      engine.startMusic();
      engine.setMusicIntensity(useMissionStore.getState().phase === 'FLIGHT' ? 1 : 0.4);
      const btn = (e.target as HTMLElement | null)?.closest('button');
      if (!btn || btn.disabled) return;
      if (btn.classList.contains('primary-cta-btn')) engine.select();
      else engine.click();
    };
    const onKeyDown = () => {
      engine.unlock();
      engine.startMusic();
    };
    window.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, []);

  useEffect(() => {
    return useMissionStore.subscribe((s, prev) => {
      if (!engine.ready) return;

      if (s.phase !== prev.phase) {
        if (s.phase === 'DEBRIEF' && s.debrief) {
          s.debrief.outcome === 'SUCCESS' ? engine.success() : engine.failure();
        } else {
          engine.phaseChange();
        }
        engine.setMusicIntensity(s.phase === 'FLIGHT' ? 1 : 0.4);
        if (s.phase !== 'FLIGHT') engine.setRumble(0);
      }

      if (s.phase === 'HANGAR' && prev.phase === 'HANGAR' && s.spacecraft !== prev.spacecraft) {
        const keys = Object.keys(s.spacecraft) as (keyof typeof s.spacecraft)[];
        const changed = keys.filter((k) => s.spacecraft[k] !== prev.spacecraft[k] && s.spacecraft[k]).length;
        if (changed >= 3) engine.assembled();
        else if (changed > 0) engine.equip();
      }

      const f = s.flight;
      const pf = prev.flight;
      if (s.phase === 'FLIGHT' && f) {
        if (pf && f.activeStageIndex > pf.activeStageIndex) engine.stage();
        if (pf && f.status !== pf.status) {
          if (MILESTONE_STATUSES.has(f.status) || (f.status === 'ORBIT' && pf.status === 'ASCENT')) {
            engine.milestone();
          }
        }
        const prop = f.activeStageIndex === 0 ? f.stage1PropKg : f.stage2PropKg;
        const burning = BURN_STATUSES.has(f.status) && prop > 0 ? f.throttle : 0;
        engine.setRumble(burning);
      }
    });
  }, []);

  return null;
};
