import * as buttons from './buttons';
import { MmmTracker } from './tracker';
import { MmmMode, MmmIndex, MmmTrackerPath } from './modes';

import * as views from './views';
import clock from 'clock';
import { me } from 'appbit';
import { me as device } from 'device';
import { initArcs, updateOuterArcs } from './arcs';

if (!device.screen) device.screen = { width: 348, height: 250 };
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

initArcs();
updateOuterArcs(2, 1, device.screen);

const tracker = new MmmTracker.loadFromFile(MmmTrackerPath);
const mode = tracker.getCurrentMode();
if (mode.name === 'Initialize')
  tracker.setCurrentMode(tracker.getModeByName('Pause')); // initial time if first time loading app.

clock.granularity = 'seconds';

// Update current time
clock.addEventListener('tick', (evt) => {
  views.updateDateTimeOnTick(evt.date);
  views.updateModeImage(tracker);
  views.updateArcsOnTick(tracker, evt.date);
});

buttons.monk.addEventListener('activate', (evt) => {
  tracker.setCurrentMode(tracker.getModeByName('Monk'));
  views.updateModeImage(tracker);
});

buttons.marshmallow.addEventListener('activate', (evt) => {
  tracker.setCurrentMode(tracker.getModeByName('Marshmallow'));
  views.updateModeImage(tracker);
});

buttons.monster.addEventListener('activate', (evt) => {
  tracker.setCurrentMode(tracker.getModeByName('Monster'));
  views.updateModeImage(tracker);
});

buttons.pause.addEventListener('activate', (evt) => {
  tracker.setCurrentMode(tracker.getModeByName('Pause'));
  views.updateModeImage(tracker);
});
