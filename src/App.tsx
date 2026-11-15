import React from 'react';
import { SoundDirector } from './audio/SoundDirector';
import { KapCommsBubble } from './hud/KapCommsBubble';
import { KapTour } from './hud/KapTour';
import { PhaseHudOverlay } from './hud/PhaseHudOverlay';
import { RobotAssistant } from './hud/RobotAssistant';
import { TopResourceStrip } from './hud/TopResourceStrip';
import { TutorialOverlay } from './hud/TutorialOverlay';
import { Viewport3D } from './three/Viewport3D';

export const App: React.FC = () => {
  return (
    <main className="game-root">
      <Viewport3D />
      <SoundDirector />
      <TopResourceStrip />
      <KapCommsBubble />
      <TutorialOverlay />
      <RobotAssistant />
      <PhaseHudOverlay />
      <KapTour />
    </main>
  );
};

export default App;
