import * as buttons from './buttons';
import { MmmTracker, MmmMode } from './MmmTracker';
import * as views from './views';

let tracker = new MmmTracker();
if (!tracker) {
  console.log('Failed to create tracker; trying again...');
  tracker = new MmmTracker();
}

buttons.monk().addEventListener('activate', (evt) => {
  tracker.update(MmmMode.monk);
  views.arcHandler(tracker);
});

buttons.marshmallow().addEventListener('activate', (evt) => {
  tracker.update(MmmMode.marshmallow);
  views.arcHandler(tracker);
});

buttons.monster().addEventListener('activate', (evt) => {
  tracker.update(MmmMode.monster);
  views.arcHandler(tracker);
});
buttons.pause().addEventListener('activate', (evt) => {
  tracker.update(MmmMode.pause);
  views.arcHandler(tracker);
});
