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

export function updateModeAndImages(tracker) {
  let currentMode = tracker.getCurrentMode();

  modeImages.forEach((img) => {
    if (currentMode === img.id) img.style.display = 'inline';
    else img.style.display = 'none';
  });
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

// testing multipliers to speed up the process.
const INNER_RING_MULT = 1;
const OUTER_RING_MULT = INNER_RING_MULT / 1;

function setStartAngles(arcList) {
  arcList[0]().startAngle = 0;
  arcList[1]().startAngle = arcList[0]().sweepAngle;
  arcList[2]().startAngle = arcList[0]().sweepAngle + arcList[1]().sweepAngle;
}

export function updateArcsOnTick(tracker, date) {
  if (
    date.getHours() === 0 &&
    date.getSeconds <= 5 &&
    !tracker.getJustReset()
  ) {
    tracker.resetLongCnt();
    arcs.resetOuterRing();
    tracker.resetShortCount();
    arcs.resetInnerRing();
    tracker.setJustReset(true);
  } else {
    setTimeout(() => {
      tracker.setJustReset(false);
    }, 5500);
  }

  let shortTotal = tracker.countShortTotal();
  if (shortTotal * INNER_RING_MULT >= 360) {
    tracker.resetShortCount();
    arcs.resetInnerRing();
  }
  let longTotal = tracker.countLongTotal();
  if (longTotal * OUTER_RING_MULT >= 360) {
    tracker.resetLongCnt();
    arcs.resetOuterRing();
  }
  arcs.initializeInnerRing();
  arcs.initializeOuterRing();

  // Get the sweep angle by mode
  arcs.innerArcs.forEach((arc, index) => {
    const shortCnt = tracker.getShortCnt(arcs.innerArcsItems[index].mode);
    if (shortCnt) {
      arc().sweepAngle = shortCnt;
    }
  });

  arcs.outerArcs.forEach((arc, index) => {
    const longCnt =
      tracker.getLongCnt(arcs.outerArcsItems[index].mode) * OUTER_RING_MULT;
    if (longCnt) {
      arc().sweepAngle = longCnt;
    }
  });

  setStartAngles(arcs.innerArcs);
  setStartAngles(arcs.outerArcs);
}
