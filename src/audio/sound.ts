// Synthesized sound design: every sound is generated with the Web Audio API,
// so there are no audio files to load, license, or fail during a demo.
import { create } from 'zustand';

const MUTE_KEY = 'orbital-architect-muted';

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

interface SoundState {
  muted: boolean;
  toggleMuted: () => void;
}

export const useSoundStore = create<SoundState>((set, get) => ({
  muted: readMuted(),
  toggleMuted: () => {
    const muted = !get().muted;
    try {
      localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
    } catch {
      /* storage blocked: the setting just won't persist */
    }
    set({ muted });
    engine.setMuted(muted);
  },
}));

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private rumble: { gain: GainNode; filter: BiquadFilterNode; nodes: AudioScheduledSourceNode[] } | null = null;
  private muted = readMuted();

  /** Browsers only allow audio after a user gesture, so the context is created lazily. */
  unlock(): void {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.55;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  }

  get ready(): boolean {
    return this.ctx !== null && this.ctx.state === 'running';
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.55, this.ctx.currentTime, 0.05);
    }
  }

  private noise(): AudioBuffer | null {
    if (!this.ctx) return null;
    if (!this.noiseBuffer) {
      const len = this.ctx.sampleRate * 2;
      const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuffer = buf;
    }
    return this.noiseBuffer;
  }

  /** One enveloped oscillator note. */
  private tone(freq: number, start: number, dur: number, opts: { type?: OscillatorType; vol?: number; glideTo?: number } = {}): void {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime + start;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = opts.type ?? 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (opts.glideTo) osc.frequency.exponentialRampToValueAtTime(opts.glideTo, t0 + dur);
    const vol = opts.vol ?? 0.2;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  /** A burst of filtered noise (whooshes, thumps). */
  private burst(start: number, dur: number, opts: { from: number; to: number; vol?: number; q?: number }): void {
    const buf = this.noise();
    if (!this.ctx || !this.master || !buf) return;
    const t0 = this.ctx.currentTime + start;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.Q.value = opts.q ?? 1.2;
    f.frequency.setValueAtTime(opts.from, t0);
    f.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);
    const g = this.ctx.createGain();
    const vol = opts.vol ?? 0.25;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(t0);
    src.stop(t0 + dur + 0.05);
  }

  click(): void {
    this.tone(1320, 0, 0.05, { type: 'triangle', vol: 0.07 });
  }

  select(): void {
    this.tone(660, 0, 0.07, { type: 'triangle', vol: 0.09 });
    this.tone(990, 0.05, 0.09, { type: 'triangle', vol: 0.08 });
  }

  phaseChange(): void {
    this.burst(0, 0.55, { from: 300, to: 2400, vol: 0.12 });
    this.tone(392, 0.08, 0.35, { vol: 0.06 });
    this.tone(587, 0.16, 0.4, { vol: 0.05 });
  }

  kap(mood: 'HAPPY' | 'CONCERNED' | 'ALERT'): void {
    if (mood === 'ALERT') {
      this.tone(330, 0, 0.12, { type: 'square', vol: 0.05 });
      this.tone(247, 0.15, 0.16, { type: 'square', vol: 0.05 });
    } else if (mood === 'CONCERNED') {
      this.tone(784, 0, 0.06, { type: 'sine', vol: 0.07 });
      this.tone(659, 0.08, 0.08, { type: 'sine', vol: 0.06 });
    } else {
      this.tone(880, 0, 0.05, { type: 'sine', vol: 0.06 });
      this.tone(1175, 0.06, 0.07, { type: 'sine', vol: 0.06 });
    }
  }

  stage(): void {
    this.burst(0, 0.3, { from: 900, to: 120, vol: 0.35, q: 0.8 });
    this.tone(90, 0, 0.25, { vol: 0.25, glideTo: 45 });
  }

  milestone(): void {
    [523, 659, 784].forEach((f, i) => this.tone(f, i * 0.09, 0.3, { vol: 0.07 }));
  }

  success(): void {
    [523, 659, 784, 1047].forEach((f, i) => this.tone(f, i * 0.12, 0.6, { type: 'triangle', vol: 0.1 }));
    this.tone(1568, 0.5, 0.9, { vol: 0.04 });
  }

  failure(): void {
    this.tone(392, 0, 0.35, { type: 'sawtooth', vol: 0.06, glideTo: 370 });
    this.tone(311, 0.3, 0.45, { type: 'sawtooth', vol: 0.06, glideTo: 290 });
    this.tone(233, 0.65, 0.9, { type: 'sawtooth', vol: 0.06, glideTo: 196 });
  }

  // ---------------------------------------------------------------------
  // Background music: a generative ambient score, written in code.
  // The old drone sat at 55-110 Hz, below what laptop speakers can play,
  // so players heard nothing. This one lives at 110-1300 Hz.
  // ---------------------------------------------------------------------
  private music: {
    bus: GainNode;
    delayIn: GainNode;
    timer: number;
    nextBar: number;
    bar: number;
  } | null = null;
  private intensity = 0.4;

  /** Chord progression (MIDI note numbers): Am9 - Fmaj7#11 - Cmaj7/G - Gsus. Spacious, hopeful. */
  private static readonly CHORDS: number[][] = [
    [57, 60, 64, 67, 71],
    [53, 57, 60, 64, 71],
    [55, 60, 64, 67, 71],
    [55, 60, 62, 67, 69],
  ];

  private static readonly BAR_SEC = 60 / 72 * 4; // 72 BPM, 4/4

  private static midi(n: number): number {
    return 440 * Math.pow(2, (n - 69) / 12);
  }

  startMusic(): void {
    if (!this.ctx || !this.master || this.music) return;
    const ctx = this.ctx;
    const bus = ctx.createGain();
    bus.gain.setValueAtTime(0.0001, ctx.currentTime);
    bus.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 3);
    bus.connect(this.master);

    // A feedback delay gives the arpeggio its "space" echo.
    const delayIn = ctx.createGain();
    delayIn.gain.value = 0.5;
    const delay = ctx.createDelay(2);
    delay.delayTime.value = (60 / 72) * 0.75;
    const fb = ctx.createGain();
    fb.gain.value = 0.38;
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 2600;
    delayIn.connect(delay).connect(tone).connect(fb).connect(delay);
    tone.connect(bus);

    const music = { bus, delayIn, timer: 0, nextBar: ctx.currentTime + 0.1, bar: 0 };
    this.music = music;
    // Look-ahead scheduler: queue each bar a little before it starts.
    music.timer = window.setInterval(() => {
      if (!this.ctx || this.music !== music) return;
      while (music.nextBar < this.ctx.currentTime + 1.2) {
        this.scheduleBar(music.bar, music.nextBar);
        music.nextBar += SoundEngine.BAR_SEC;
        music.bar += 1;
      }
    }, 250);
  }

  stopMusic(): void {
    if (!this.ctx || !this.music) return;
    const m = this.music;
    this.music = null;
    window.clearInterval(m.timer);
    m.bus.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.6);
  }

  /** 0 = calm menus, 1 = in flight. Changes the arpeggio density and adds a pulse. */
  setMusicIntensity(level: number): void {
    this.intensity = Math.max(0, Math.min(1, level));
  }

  private scheduleBar(bar: number, t0: number): void {
    if (!this.ctx || !this.music) return;
    const ctx = this.ctx;
    const { bus, delayIn } = this.music;
    const chord = SoundEngine.CHORDS[Math.floor(bar / 2) % SoundEngine.CHORDS.length];
    const firstOfChord = bar % 2 === 0;
    const len = SoundEngine.BAR_SEC;

    // Pad: soft detuned saws through a low-pass, held for the whole chord.
    if (firstOfChord) {
      const padLen = len * 2;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(700, t0);
      lp.frequency.linearRampToValueAtTime(1400, t0 + padLen * 0.5);
      lp.frequency.linearRampToValueAtTime(800, t0 + padLen);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.05, t0 + 1.6);
      g.gain.setValueAtTime(0.05, t0 + padLen - 1.2);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + padLen + 0.8);
      lp.connect(g).connect(bus);
      for (const n of chord.slice(1, 5)) {
        for (const det of [-7, 7]) {
          const o = ctx.createOscillator();
          o.type = 'sawtooth';
          o.frequency.value = SoundEngine.midi(n);
          o.detune.value = det;
          o.connect(lp);
          o.start(t0);
          o.stop(t0 + padLen + 1);
        }
      }

      // Bass: root plus its octave, so small speakers still carry it.
      const root = SoundEngine.midi(chord[0] - 12);
      for (const [mult, vol] of [[1, 0.09], [2, 0.035]] as const) {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = root * mult;
        const bg = ctx.createGain();
        bg.gain.setValueAtTime(0.0001, t0);
        bg.gain.exponentialRampToValueAtTime(vol, t0 + 0.8);
        bg.gain.exponentialRampToValueAtTime(0.0001, t0 + padLen);
        o.connect(bg).connect(bus);
        o.start(t0);
        o.stop(t0 + padLen + 0.1);
      }
    }

    // Arpeggio: bell-like plucks an octave up, sparser when calm.
    const beat = len / 4;
    const steps = this.intensity > 0.6 ? 8 : 4;
    const stepLen = len / steps;
    const pattern = [0, 2, 4, 3, 1, 3, 2, 4];
    for (let i = 0; i < steps; i++) {
      if (this.intensity < 0.6 && i % 2 === 1 && (bar + i) % 3 === 0) continue;
      const note = chord[pattern[(i + bar) % pattern.length] % chord.length] + 12;
      const t = t0 + i * stepLen;
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = SoundEngine.midi(note);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.045, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      o.connect(g);
      g.connect(bus);
      g.connect(delayIn);
      o.start(t);
      o.stop(t + 1);
    }

    // Flight pulse: a muted heartbeat on each beat that rises with intensity.
    if (this.intensity > 0.6) {
      for (let i = 0; i < 4; i++) {
        const t = t0 + i * beat;
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(150, t);
        o.frequency.exponentialRampToValueAtTime(60, t + 0.18);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.09 * this.intensity, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g).connect(bus);
        o.start(t);
        o.stop(t + 0.25);
      }
    }
  }

  /** Engine rumble that follows the throttle while the rocket burns. */
  setRumble(level: number): void {
    if (!this.ctx || !this.master) return;
    if (level <= 0.001) {
      if (this.rumble) {
        const { gain, nodes } = this.rumble;
        this.rumble = null;
        const t = this.ctx.currentTime;
        gain.gain.setTargetAtTime(0.0001, t, 0.25);
        nodes.forEach((n) => n.stop(t + 1.5));
      }
      return;
    }
    if (!this.rumble) {
      const buf = this.noise();
      if (!buf) return;
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 200;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.0001;
      const sub = this.ctx.createOscillator();
      sub.type = 'sawtooth';
      sub.frequency.value = 38;
      const subGain = this.ctx.createGain();
      subGain.gain.value = 0.25;
      src.connect(filter);
      sub.connect(subGain).connect(filter);
      filter.connect(gain).connect(this.master);
      src.start();
      sub.start();
      this.rumble = { gain, filter, nodes: [src, sub] };
    }
    const t = this.ctx.currentTime;
    this.rumble.gain.gain.setTargetAtTime(0.32 * level, t, 0.15);
    this.rumble.filter.frequency.setTargetAtTime(140 + 420 * level, t, 0.2);
  }
}

export const engine = new SoundEngine();
