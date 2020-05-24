import * as buttons from './buttons';
import { MmmTracker } from './tracker';
import { MmmTrackerPath } from './modes';

import * as views from './views';
import clock from 'clock';
import { me } from 'appbit';
import { initArcs, updateAllArcs } from './arcs';

me.addEventListener('unload', (evt) => {
  tracker.saveToFile(MmmTrackerPath);
});

// import * as fs from 'fs';
// try {
//   let store = fs.readFileSync(MmmTrackerPath, 'cbor');
//   console.log('from test load:' + store.currents.length);
// } catch (e) {
//   console.log('Failed file test' + e);
// }

initArcs();

const tracker = new MmmTracker.loadFromFile(MmmTrackerPath);
const currentMode = tracker.getCurrentMode();
if (currentMode.name === 'Pause' && currentMode.initTime === 0)
  currentMode.initTime = Date.now() / 1000;

clock.granularity = 'minutes';

// Update current time
clock.addEventListener('tick', (evt) => {
  tracker.updateModesOnTick();
  views.updateDateTimeOnTick(evt.date);
  views.updateOnTick(tracker);
});

// Add Listner to Buttons
buttons.monk.addEventListener('activate', (evt) => {
  tracker.setCurrentMode('Monk');
  views.updateModeImage(tracker);
});

buttons.monster.addEventListener('activate', (evt) => {
  tracker.setCurrentMode('Monster');
  views.updateModeImage(tracker);
});

buttons.marshmallow.addEventListener('activate', (evt) => {
  tracker.setCurrentMode('Marshmallow');
  views.updateModeImage(tracker);
});

buttons.pause.addEventListener('activate', (evt) => {
  tracker.setCurrentMode('Pause');
  views.updateModeImage(tracker);
});
