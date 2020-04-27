import document from 'document';
import * as arcs from './arcs';
import * as utils from './utils.js';

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

  dateText = date.toString();
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
    tracker.resetHours();
    arcs.resetOuterRing();
    tracker.resetHours();
    arcs.resetOuterRing();
    tracker.setJustReset(true);
  } else {
    setTimeout(() => {
      tracker.setJustReset(false);
    }, 5500);
  }

  let minTotal = tracker.countMinTotal();
  if (minTotal * INNER_RING_MULT >= 360) {
    tracker.resetHours();
    arcs.resetOuterRing();
  }
  let hrTotal = tracker.countHrTotal();
  if (hrTotal * OUTER_RING_MULT >= 360) {
    tracker.resetHours();
    arcs.resetOuterRing();
  }

  // Initialize the arcs arrays if they doesn't exist yet.
  if (arcs.innerArcs.length === 0) arcs.initializeInnerRing();
  if (arcs.outerArcs.length === 0) arcs.initializeOuterRing();

  // Get the sweep angle by mode
  arcs.innerArcs.forEach((arc, index) => {
    arc().sweepAngle =
      tracker.getMinuteCount(arcs.outerArcsItems[index].mode) * INNER_RING_MULT;
  });

  arcs.outerArcs.forEach((arc, index) => {
    arc().sweepAngle =
      tracker.getHourCount(arcs.innerArcsItems[index].mode) * OUTER_RING_MULT;
  });

  setStartAngles(arcs.innerArcs);
  setStartAngles(arcs.outerArcs);
}
