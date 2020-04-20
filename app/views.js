import document from 'document';
import { MmmMode } from './MmmTracker';
let monkArc = () => document.getElementById('monk-arc');
let monsterArc = () => document.getElementById('monster-arc');
let marshmallowArc = () => document.getElementById('marshmallow-arc');
let pauseArc = () => document.getElementById('pause-arc');

const TEST_MULT = 12;
export function arcHandler(mmmTracker) {
  let total = mmmTracker.countTotal();
  console.log('total = ' + total * TEST_MULT);
  if (total * TEST_MULT >= 360 - TEST_MULT + 1) {
    mmmTracker.reset();
  }
  monkArc().sweepAngle = mmmTracker.getCount(MmmMode.monk) * TEST_MULT;

  monsterArc().startAngle = monkArc().sweepAngle;
  monsterArc().sweepAngle = mmmTracker.getCount(MmmMode.monster) * TEST_MULT;

  marshmallowArc().startAngle = monsterArc().sweepAngle + monkArc().sweepAngle;
  marshmallowArc().sweepAngle =
    mmmTracker.getCount(MmmMode.marshmallow) * TEST_MULT;

  pauseArc().startAngle =
    marshmallowArc().sweepAngle +
    monsterArc().sweepAngle +
    monkArc().sweepAngle;
  pauseArc().sweepAngle = mmmTracker.getCount(MmmMode.pause) * TEST_MULT;
}
