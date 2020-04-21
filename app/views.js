import document from 'document';
import * as arcs from './arcs';
import { MmmMode } from './MmmTracker';

const TEST_MULT = 12;
export function arcHandler(mmmTracker) {
  // Initialize the arcs arrays if they doesn't exist yet.

  let total = mmmTracker.countTotal();
  if (total * TEST_MULT >= 360) {
    mmmTracker.reset();
  }

  // Get the sweep angle by mode
  arcs.minuteArcs.forEach((arc, index) => {
    if (arcs.arcsList[index].type === 'minute') {
      arc().sweepAngle =
        mmmTracker.getCount(arcs.arcsList[index].mode) * TEST_MULT;
    }
  });

  arcs.minuteArcs[0]().startAngle = 0;
  arcs.minuteArcs[1]().startAngle = arcs.minuteArcs[0]().sweepAngle;
  arcs.minuteArcs[2]().startAngle =
    arcs.minuteArcs[0]().sweepAngle + arcs.minuteArcs[1]().sweepAngle;
  arcs.minuteArcs[3]().startAngle =
    arcs.minuteArcs[0]().sweepAngle +
    arcs.minuteArcs[1]().sweepAngle +
    arcs.minuteArcs[2]().sweepAngle;
}
