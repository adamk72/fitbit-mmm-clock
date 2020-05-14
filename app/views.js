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
const NUM_HOUR_DEGREES = NUM_OF_DEGREES / NUM_OF_HOURS / NUM_MINUTE_DEGREES;

function setStartAngles(arcList) {
  arcList[0].startAngle = 0;
  arcList[1].startAngle = arcList[0].sweepAngle;
  arcList[2].startAngle = arcList[0].sweepAngle + arcList[1].sweepAngle;
  arcList[3].startAngle =
    arcList[0].sweepAngle + arcList[1].sweepAngle + arcList[2].sweepAngle;
}

export function updateArcsOnTick(tracker, date) {
  // Get the sweep angle by mode
  arcs.innerArcs.forEach((arc, index) => {
    if (tracker.getCurrentMode().name === tracker.getModeByIndex(index).name) {
      tracker.incSweepAngle(1 / NUM_MINUTE_DEGREES);
    }
    arc.sweepAngle = tracker.getSweepAngle(index);
  });

  setStartAngles(arcs.innerArcs);
  setStartAngles(arcs.outerArcs);
}
