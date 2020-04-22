import * as buttons from './buttons';
import { MmmTracker, MmmMode } from './tracker';
import * as views from './views';
import clock from 'clock';
import { updateClock } from './analog-pointers';

let tracker = new MmmTracker();
if (!tracker) {
  // Failed to create tracker; trying again...
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
  views.updateArcsOnTick(tracker);
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
