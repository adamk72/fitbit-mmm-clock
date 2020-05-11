import document from 'document';
import * as arcs from './arcs';
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

/* Arc Views */

const NUM_OF_DEGREES = 360;
const NUM_OF_HOURS = 24;
const NUM_OF_MINUTES = 60;
const NUM_OF_SECONDS = 60;
const NUM_MINUTE_DEGREES = NUM_OF_DEGREES / NUM_OF_MINUTES;
const NUM_HOUR_DEGREES = NUM_OF_DEGREES / NUM_OF_HOURS;

function setStartAngles(arcList) {
  arcList[0].startAngle = 0;
  arcList[1].startAngle = arcList[0].sweepAngle;
  arcList[2].startAngle = arcList[0].sweepAngle + arcList[1].sweepAngle;
}

export function updateArcsOnTick(tracker, date) {
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Get the sweep angle by mode
  arcs.innerArcs.forEach((arc, index) => {
    const shortCnt = tracker.getShortCount(index);
    if (index === 0) return; // skip the "current" since the actual modes start at 1.
    if (shortCnt) {
      arc.sweepAngle =
        NUM_MINUTE_DEGREES *
        (shortCnt / NUM_OF_MINUTES + seconds / NUM_OF_SECONDS);
    }
  });

  arcs.outerArcs.forEach((arc, index) => {
    if (index === 0) return; // skip the "current" since the actual modes start at 1.
    const longCnt = tracker.getLongCount(index);
    if (longCnt) {
      arc.sweepAngle =
        NUM_HOUR_DEGREES * (longCnt / NUM_OF_HOURS + minutes / NUM_OF_MINUTES);
    }
  });

  setStartAngles(arcs.innerArcs);
  setStartAngles(arcs.outerArcs);
}
