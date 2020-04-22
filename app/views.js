import document from 'document';
import * as arcs from './arcs';
import { MmmMode } from './tracker';
import * as utils from './utils.js';

/* Mode Views */

// let modeText = document.getElementById('mmm-mode-text');
let modeImages = document.getElementsByClassName('mmm-mode-image');

export function update(tracker) {
  let currentMode = tracker.getCurrentMode();
  // modeText.text = currentMode;

  modeImages.forEach((img, index) => {
    if (currentMode === img.id) img.style.display = 'inline';
    else img.style.display = 'none';
  });
}

export /* Time Views */
let timeText = document.getElementById('time-text');

export function datetime(date) {
  /* Takes a Date object to update time related views */
  timeText.text =
    utils.toMonoDigits(date.getHours()) +
    ':' +
    utils.toMonoDigits(date.getMinutes());
}

/* Arc Views */
const MIN_TEST_MULT = 5;
const HR_TEST_MULT = MIN_TEST_MULT / 5;

function setStartAngles(arcList) {
  arcList[0]().startAngle = 0;
  arcList[1]().startAngle = arcList[0]().sweepAngle;
  arcList[2]().startAngle = arcList[0]().sweepAngle + arcList[1]().sweepAngle;
}

export function arcHandler(tracker) {
  // Initialize the arcs arrays if they doesn't exist yet.

  let minTotal = tracker.countMinTotal();
  if (minTotal * MIN_TEST_MULT >= 360) {
    tracker.resetMinutes();
    arcs.resetMinutes();
    console.log('minutes reset: ' + tracker.getMinuteCount(MmmMode.monk));
  }

  let hrTotal = tracker.countHrTotal();
  if (hrTotal * HR_TEST_MULT >= 360) {
    tracker.resetHours();
    arcs.resetHours();
  }

  if (arcs.minuteArcs.length === 0) arcs.initializeMinutes();
  if (arcs.hourArcs.length === 0) arcs.initializeHours();

  // Get the sweep angle by mode
  arcs.minuteArcs.forEach((arc, index) => {
    arc().sweepAngle =
      (tracker.getMinuteCount(arcs.minuteArcsItems[index].mode) *
        MIN_TEST_MULT) %
      360;
  });

  arcs.hourArcs.forEach((arc, index) => {
    arc().sweepAngle =
      (tracker.getHourCount(arcs.hourArcsItems[index].mode) * HR_TEST_MULT) %
      360;
  });

  setStartAngles(arcs.minuteArcs);
  setStartAngles(arcs.hourArcs);
}
