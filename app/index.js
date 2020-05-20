import * as buttons from './buttons';
import { MmmTracker } from './tracker';
import { MmmModes, MmmIndex, MmmTrackerPath } from './modes';

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
//   console.log('from test load:' + store.currents.length);
// } catch (e) {
//   console.log('Failed file test' + e);
// }

initArcs();
updateOuterArcs(2, 1, device.screen);

const tracker = new MmmTracker.loadFromFile(MmmTrackerPath);

clock.granularity = 'minutes';

// Update current time
clock.addEventListener('tick', (evt) => {
  views.updateDateTimeOnTick(evt.date);
  views.updateOnTick(tracker, evt.date);
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
