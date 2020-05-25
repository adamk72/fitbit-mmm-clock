import document from 'document';
import { renderArcByIndex, resetArcsExcept } from './arcs';
import * as utils from './utils.js';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* Mode Views */

// let modeText = document.getElementById('mmm-mode-text');
let modeImages = document.getElementsByClassName('mmm-mode-image');

export function updateModeImage(tracker) {
  let currentMode = tracker.getCurrentMode();

  if (currentMode) {
    modeImages.forEach((img) => {
      if (currentMode.name === img.id) img.style.display = 'inline';
      else img.style.display = 'none';
    });
  }
}

export function updateOnTick(tracker) {
  const currentMode = tracker.getCurrentMode();
  resetArcsExcept(currentMode.index); //Rest the other arcs, as if the app was just starting.
  renderArcByIndex(currentMode.index, currentMode.arcWidth);
}

export /* Time Views */
let timeText = document.getElementById('time-text');
let dateText = document.getElementById('date-text');

export function updateDateTimeOnTick(date) {
  /* Takes a Date object to update time related views */
  timeText.text =
    utils.toMonoDigits(date.getHours()) +
    ':' +
    utils.toMonoDigits(date.getMinutes());

  dateText.text =
    days[date.getDay().toString()] +
    ' ' +
    months[date.getMonth().toString()] +
    ', ' +
    date.getDate().toString();
}
