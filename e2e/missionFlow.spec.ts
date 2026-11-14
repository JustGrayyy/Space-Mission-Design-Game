import { expect, test } from '@playwright/test';

test.describe('Orbital Architect 3D End-to-End Campaign', () => {
  test('full 5-phase mission campaign with 3D viewport, Kap alerts, flight physics, and design-preserving debrief', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      pageErrors.push(err.message);
    });

    await page.goto('/');

    // 1. Viewport & Canvas & Zero-Scrollbar assertions
    const canvas = page.getByTestId('game-viewport-canvas');
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.width)).toBe(1440);
    expect(Math.round(box!.height)).toBe(900);

    const dims = await page.evaluate(() => ({
      scrollH: document.documentElement.scrollHeight,
      innerH: window.innerHeight,
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
    }));
    expect(dims.scrollH).toBe(dims.innerH);
    expect(dims.scrollW).toBe(dims.innerW);

    // 2. Title Screen: Multiplayer locked, Difficulty toggle works, Singleplayer starts campaign
    const mpBtn = page.getByTestId('btn-multiplayer');
    await expect(mpBtn).toBeDisabled();

    await page.getByTestId('title-mode-realistic').click();
    let storeDifficulty = await page.evaluate(
      () =>
        (window as unknown as { __MISSION_STORE__: { getState: () => { difficulty: string } } })
          .__MISSION_STORE__.getState().difficulty
    );
    expect(storeDifficulty).toBe('REALISTIC');

    await page.getByTestId('title-mode-beginner').click();
    storeDifficulty = await page.evaluate(
      () =>
        (window as unknown as { __MISSION_STORE__: { getState: () => { difficulty: string } } })
          .__MISSION_STORE__.getState().difficulty
    );
    expect(storeDifficulty).toBe('BEGINNER');

    await page.getByTestId('btn-singleplayer').click();
    await expect(page.getByTestId('objective-select-hud')).toBeVisible();

    // 3. Phase 1: Objective Select (Moon, Mars, Explore Space -> Telescope / Earth Observation)
    await page.getByTestId('obj-moon-landing').click();
    await expect(page.getByTestId('objective-select-hud')).toContainText('Artemis');

    await page.getByTestId('obj-mars-landing').click();
    await expect(page.getByTestId('objective-select-hud')).toContainText('Ares');

    await page.getByTestId('obj-explore-space').click();
    await expect(page.getByTestId('explore-subchoice')).toBeVisible();

    await page.getByTestId('subobj-space-telescope').click();
    await expect(page.getByTestId('objective-select-hud')).toContainText('Infrared Observatory');

    await page.getByTestId('subobj-earth-observation').click();
    await expect(page.getByTestId('objective-select-hud')).toContainText('Earth Climate');

    await page.getByTestId('enter-hangar-btn').click();
    await expect(page.getByTestId('hangar-hud')).toBeVisible();

    // 4. Phase 2: Hangar deliberate conflict detection -> Kap ALERT -> Auto-Engineer -> HAPPY
    await page.getByTestId('slot-btn-payload').click();
    await page.getByTestId('part-chip-payload-ir-telescope').click();

    const kapBubble = page.getByTestId('kap-comms-bubble');
    await expect(kapBubble).toHaveAttribute('data-kap-mood', 'ALERT');
    await expect(page.getByTestId('kap-message')).toContainText(/wrong instrument|does not satisfy/i);

    await page.getByTestId('kap-auto-engineer-btn').click();
    await expect(kapBubble).toHaveAttribute('data-kap-mood', 'HAPPY');

    const rolloutBtn = page.getByTestId('rollout-ground-btn');
    await expect(rolloutBtn).toBeEnabled();
    await rolloutBtn.click();

    // 5. Phase 3: Ground Segment - switch band & station, verify greenlight
    await expect(page.getByTestId('ground-segment-hud')).toBeVisible();

    // Default S_BAND should trigger buffer overflow alert for 28 Mbps camera
    await expect(kapBubble).toHaveAttribute('data-kap-mood', 'ALERT');
    await page.getByTestId('station-btn-svalbard').click();
    await page.getByTestId('band-btn-X_BAND').click();

    await expect(kapBubble).toHaveAttribute('data-kap-mood', 'HAPPY');
    const liftoffBtn = page.getByTestId('greenlight-liftoff-btn');
    await expect(liftoffBtn).toBeEnabled();
    await liftoffBtn.click();

    // 6. Phase 4: Flight - ignite, warp, verify ascent/staging/orbit & reach DEBRIEF
    await expect(page.getByTestId('flight-hud')).toBeVisible();
    await page.getByTestId('ignite-launch-btn').click();
    await page.getByTestId('warp-btn-500').click();

    // Wait for mission completion -> automatic DEBRIEF transition
    await expect(page.getByTestId('debrief-hud')).toBeVisible({ timeout: 35_000 });

    // 7. Phase 5: Debrief - verify outcome, 6 resource sections, and design preservation
    await expect(page.getByTestId('debrief-outcome')).toHaveText('MISSION ACCOMPLISHED');

    for (const key of ['mass', 'power', 'budget', 'data', 'comms', 'time']) {
      const cell = page.getByTestId(`debrief-res-${key}`);
      await expect(cell).toBeVisible();
      await expect(cell).toContainText('RIGHT:');
      await expect(cell).toContainText('ISSUE:');
    }

    const savedBefore = await page.evaluate(
      () =>
        (window as unknown as { __MISSION_STORE__: { getState: () => { spacecraft: Record<string, string | null> } } })
          .__MISSION_STORE__.getState().spacecraft
    );

    await page.getByTestId('return-hangar-keep-btn').click();
    await expect(page.getByTestId('hangar-hud')).toBeVisible();

    const savedAfter = await page.evaluate(
      () =>
        (window as unknown as { __MISSION_STORE__: { getState: () => { spacecraft: Record<string, string | null> } } })
          .__MISSION_STORE__.getState().spacecraft
    );
    expect(savedAfter).toEqual(savedBefore);

    // Zero scrollbars maintained throughout
    const finalDims = await page.evaluate(() => ({
      scrollH: document.documentElement.scrollHeight,
      innerH: window.innerHeight,
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
    }));
    expect(finalDims.scrollH).toBe(finalDims.innerH);
    expect(finalDims.scrollW).toBe(finalDims.innerW);

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
});
