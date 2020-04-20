import * as buttons from './buttons';
import { MMMTracker, MMMMode } from './MMMTracker';

let tracker = new MMMTracker();
if (!tracker) {
  console.log('Failed to create tracker; trying again...');
  tracker = new MMMTracker();
}

buttons.marshmallow().addEventListener('activate', (evt) => {
  console.log('Marshmallow btn pressed');
});

buttons.monk().addEventListener('activate', (evt) => {
  tracker.update(MMMMode.monk);
  console.log('Monk btn pressed: ', tracker.getCount(MMMMode.monk));
});

buttons.monster().addEventListener('activate', (evt) => {
  console.log('Monster btn pressed');
});
buttons.pause().addEventListener('activate', (evt) => {
  console.log('Pause btn pressed');
});
