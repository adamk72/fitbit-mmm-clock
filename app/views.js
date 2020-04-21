import * as arcs from './arcs';
import { MmmMode } from './MmmTracker';

const MIN_TEST_MULT = 45;
const HR_TEST_MULT = MIN_TEST_MULT / 5;

function setStartAngles(arcList) {
  arcList[0]().startAngle = 0;
  arcList[1]().startAngle = arcList[0]().sweepAngle;
  arcList[2]().startAngle = arcList[0]().sweepAngle + arcList[1]().sweepAngle;
  arcList[3]().startAngle =
    arcList[0]().sweepAngle + arcList[1]().sweepAngle + arcList[2]().sweepAngle;
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
    console.log('hours reset: ' + tracker.getHourCount(MmmMode.monk));
  }

  if (arcs.minuteArcs.length === 0) arcs.initializeMinutes();
  if (arcs.hourArcs.length === 0) arcs.initializeHours();

  // Get the sweep angle by mode
  arcs.minuteArcs.forEach((arc, index) => {
    arc().sweepAngle =
      tracker.getMinuteCount(arcs.minuteArcsItems[index].mode) * MIN_TEST_MULT;
  });

  arcs.hourArcs.forEach((arc, index) => {
    arc().sweepAngle =
      tracker.getHourCount(arcs.hourArcsItems[index].mode) * HR_TEST_MULT;
  });

  setStartAngles(arcs.minuteArcs);
  setStartAngles(arcs.hourArcs);
}
