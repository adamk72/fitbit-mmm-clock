import * as buttons from './buttons';
import { MmmTracker } from './tracker';
import { MmmMode, MmmIndex, MmmTrackerPath } from './modes';

import * as views from './views';
import clock from 'clock';
import { updateClock } from './analog-pointers';
import { me } from 'appbit';

me.addEventListener('unload', (evt) => {
  tracker.saveToFile(MmmTrackerPath);
});

// import * as fs from 'fs';
// try {
//   let store = fs.readFileSync(MmmTrackerPath, 'cbor');
//   console.log(store.modes[1].name);
//   console.log(store.current.name);
// } catch (e) {
//   console.log('Failed file test' + e);
// }

let tracker = new MmmTracker.loadFromFile(MmmTrackerPath);

clock.granularity = 'seconds';

// Update current time
clock.addEventListener('tick', (evt) => {
  views.updateDateTimeOnTick(evt.date);
  views.updateModeImage(tracker);
  updateClock(tracker);
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
