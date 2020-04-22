import document from 'document';
import * as arcs from './arcs';
import * as utils from './utils.js';

/* Mode Views */

// let modeText = document.getElementById('mmm-mode-text');
let modeImages = document.getElementsByClassName('mmm-mode-image');

export function update(tracker) {
  let currentMode = tracker.getCurrentMode();
  // modeText.text = currentMode;

  modeImages.forEach((img) => {
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
const INNER_RING_MULT = 5;
const OUTER_RING_MULT = INNER_RING_MULT / 5;

function setStartAngles(arcList) {
  arcList[0]().startAngle = 0;
  arcList[1]().startAngle = arcList[0]().sweepAngle;
  arcList[2]().startAngle = arcList[0]().sweepAngle + arcList[1]().sweepAngle;
}

export function arcHandler(tracker) {
  let minTotal = tracker.countMinTotal();
  if (minTotal * INNER_RING_MULT >= 360) {
    tracker.resetMinutes();
    arcs.resetInnerRing();
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
