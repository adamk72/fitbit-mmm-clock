import * as buttons from './buttons';
import { MmmTracker } from './tracker';
import { MmmMode, MmmIndex } from './modes';

import * as views from './views';
import clock from 'clock';
import { updateClock } from './analog-pointers';
import { CONFIG } from './config';
import { me } from 'appbit';

me.addEventListener('unload', (evt) => {
  tracker.saveToFile(CONFIG.MmmTrackerPath);
});

// import * as fs from 'fs';
// try {
//   let store = fs.readFileSync(CONFIG.MmmTrackerPath, 'cbor');
//   console.log(store.settings.currentMode);
//   console.log(store.settings.monkMinCnt);
// } catch (e) {
//   console.log('Failed file test' + e);
// }

let tracker = new MmmTracker.loadFromFile(CONFIG.MmmTrackerPath);

//let tracker = new MmmTracker(CONFIG.settings);
if (!tracker) {
  console.log(
    ' Failed to load tracker from file; trying again with new tracker'
  );
  tracker = new MmmTracker(CONFIG.settings);
}

clock.granularity = 'seconds';

// Update current time
clock.addEventListener('tick', (evt) => {
  views.updateDateTimeOnTick(evt.date);
  views.updateModeImage(tracker);
  updateClock(tracker);
  tracker.updateModeCountOnTick();
  views.updateArcsOnTick(tracker, evt.date);
});

buttons.monk.addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode[MmmIndex.monk]);
  views.updateModeImage(tracker);
});

buttons.marshmallow.addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode[MmmIndex.marshmallow]);
  views.updateModeImage(tracker);
});

buttons.monster.addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode[MmmIndex.monster]);
  views.updateModeImage(tracker);
});

buttons.pause.addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode[MmmIndex.pause]);
  views.updateModeImage(tracker);
});
