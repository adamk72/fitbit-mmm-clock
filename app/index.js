import * as buttons from './buttons';
import { MmmTracker } from './tracker';
import { MmmMode } from './modes';

import * as views from './views';
import clock from 'clock';
import { updateClock } from './analog-pointers';
import { CONFIG } from './config';
import { me } from 'appbit';

// me.addEventListener('unload', (evt) => {
//   //tracker.saveToFile(CONFIG.MmmTrackerPath);
// });

//let tracker = new MmmTracker.loadFromFile(CONFIG.MmmTrackerPath);
let tracker = new MmmTracker();
if (!tracker) {
  console.log(
    ' Failed to load tracker from file; trying again with new tracker'
  );
  tracker = new MmmTracker();
}

clock.granularity = 'seconds';

// Update current time
clock.addEventListener('tick', (evt) => {
  views.updateDateTimeOnTick(evt.date);
  views.updateModeAndImages(tracker);
  updateClock(tracker);
});

clock.addEventListener('tick', (evt) => {
  tracker.updateOnTick();
  views.updateArcsOnTick(tracker, evt.date);
});

buttons.monk().addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode.monk);
  views.updateModeAndImages(tracker);
});

buttons.marshmallow().addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode.marshmallow);
  views.updateModeAndImages(tracker);
});

buttons.monster().addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode.monster);
  views.updateModeAndImages(tracker);
});

buttons.pause().addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode.pause);
  views.updateModeAndImages(tracker);
});
