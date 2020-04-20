import * as buttons from './buttons';
import { MmmTracker, MmmMode } from './MmmTracker';
import * as views from './views';

let tracker = new MmmTracker();
if (!tracker) {
  console.log('Failed to create tracker; trying again...');
  tracker = new MmmTracker();
}

buttons.marshmallow().addEventListener('activate', (evt) => {
  console.log('Marshmallow btn pressed');
});

buttons.monk().addEventListener('activate', (evt) => {
  tracker.update(MmmMode.monk);
  views.arcHandler(tracker);
  console.log('Monk btn pressed: ', tracker.getCount(MmmMode.monk));
});

buttons.monster().addEventListener('activate', (evt) => {
  console.log('Monster btn pressed');
});
buttons.pause().addEventListener('activate', (evt) => {
  console.log('Pause btn pressed');
});
