import document from 'document';
import * as arcs from './arcs';
import { MmmMode } from './MmmTracker';

const MIN_TEST_MULT = 12;
const HR_TEST_MULT = MIN_TEST_MULT / 2;
const IDX_ADJUST = 4;

function setStartAngles(arcList) {
  arcList[0]().startAngle = 0;
  arcList[1]().startAngle = arcList[0]().sweepAngle;
  arcList[2]().startAngle = arcList[0]().sweepAngle + arcList[1]().sweepAngle;
  arcList[3]().startAngle =
    arcList[0]().sweepAngle + arcList[1]().sweepAngle + arcList[2]().sweepAngle;
}

export function arcHandler(mmmTracker) {
  // Initialize the arcs arrays if they doesn't exist yet.

  let total = mmmTracker.countTotal();
  if (total * MIN_TEST_MULT >= 360) {
    mmmTracker.reset();
  }

  // Get the sweep angle by mode
  arcs.minuteArcs.forEach((arc, index) => {
    arc().sweepAngle =
      mmmTracker.getMinuteCount(arcs.arcsList[index].mode) * MIN_TEST_MULT;
  });

  arcs.hourArcs.forEach((arc, index) => {
    arc().sweepAngle =
      mmmTracker.getHourCount(arcs.arcsList[index + IDX_ADJUST].mode) *
      HR_TEST_MULT;
  });

  setStartAngles(arcs.minuteArcs);
  setStartAngles(arcs.hourArcs);
}
