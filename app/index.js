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
  views.datetime(evt.date);
  views.update(tracker);
  updateClock();
});

clock.addEventListener('tick', (evt) => {
  tracker.update();
  views.arcHandler(tracker);
});

buttons.monk().addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode.monk);
});

buttons.marshmallow().addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode.marshmallow);
});

buttons.monster().addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode.monster);
});

buttons.pause().addEventListener('activate', (evt) => {
  tracker.setCurrentMode(MmmMode.pause);
});
