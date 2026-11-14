import React from 'react';
import { KapCommsBubble } from './hud/KapCommsBubble';
import { PhaseHudOverlay } from './hud/PhaseHudOverlay';
import { TopResourceStrip } from './hud/TopResourceStrip';
import { TutorialOverlay } from './hud/TutorialOverlay';
import { Viewport3D } from './three/Viewport3D';

export const App: React.FC = () => {
  return (
    <main className="game-root">
      <Viewport3D />
      <TopResourceStrip />
      <KapCommsBubble />
      <TutorialOverlay />
      <PhaseHudOverlay />
    </main>
  );
};

export default App;
