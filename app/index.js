import * as buttons from './buttons';
import { MmmTracker } from './tracker';
import { MmmTrackerPath } from './modes';

import * as views from './views';
import clock from 'clock';
import { me } from 'appbit';
import { initArcs } from './arcs';

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

views.updateModeImage(tracker);

clock.granularity = 'minutes';

// Update current time
clock.addEventListener('tick', (evt) => {
  views.updateDateTimeOnTick(evt.date);
  updateHelper();
});

function updateHelper() {
  tracker.updateModesOnTick();
  views.updateOnTick(tracker);
}

// Add Listner to Buttons
buttons.monk.addEventListener('activate', (evt) => {
  tracker.setCurrentMode('Monk');
  updateHelper();
  views.updateModeImage(tracker);
});

buttons.monster.addEventListener('activate', (evt) => {
  tracker.setCurrentMode('Monster');
  updateHelper();
  views.updateModeImage(tracker);
});

buttons.marshmallow.addEventListener('activate', (evt) => {
  tracker.setCurrentMode('Marshmallow');
  updateHelper();
  views.updateModeImage(tracker);
});

buttons.pause.addEventListener('activate', (evt) => {
  tracker.setCurrentMode('Pause');
  updateHelper();
  views.updateModeImage(tracker);
});
