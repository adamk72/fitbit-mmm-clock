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
      // switch (index) {
      //   case 0:
      //     arc().startAngle = arcs.minuteArcs[0].sweepAngle;
      //     return;
      //   case 1:
      //     arc().startAngle =
      //       arcs.minuteArcs[0].sweepAngle + arcs.minuteArcs[1].sweepAngle;
      //     return;
      //   case 2:
      //     arc().startAngle =
      //       arcs.minuteArcs[0].sweepAngle +
      //       arcs.minuteArcs[1].sweepAngle +
      //       arcs.minuteArcs[2].sweepAngle;
      //     return;
      //   case 3:
      //     arc().startAngle =
      //       arcs.minuteArcs[0].sweepAngle +
      //       arcs.minuteArcs[1].sweepAngle +
      //       arcs.minuteArcs[2].sweepAngle +
      //       arcs.minuteArcs[3].sweepAngle;
      //     return;
      // }
    }
  });
  // -  pauseMarc().startAngle =
  // -    marshmallowMarc().sweepAngle +
  // -    monsterMarc().sweepAngle +
  // -    monkMarc().sweepAngle;
  // -  pauseMarc().sweepAngle = mmmTracker.getCount(MmmMode.pause) * TEST_MULT;
}
