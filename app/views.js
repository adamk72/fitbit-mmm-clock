import document from 'document';
import { MmmMode } from './MmmTracker';
let monkMarc = () => document.getElementById('monk-mArc');
let monsterMarc = () => document.getElementById('monster-mArc');
let marshmallowMarc = () => document.getElementById('marshmallow-mArc');
let pauseMarc = () => document.getElementById('pause-mArc');

let monkHarc = () => document.getElementById('monk-hArc');
let monsterHarc = () => document.getElementById('monster-hArc');
let marshmallowHarc = () => document.getElementById('marshmallow-hArc');
let pauseHarc = () => document.getElementById('pause-hArc');

const TEST_MULT = 12;
export function arcHandler(mmmTracker) {
  let total = mmmTracker.countTotal();
  console.log('total = ' + total * TEST_MULT);
  if (total * TEST_MULT >= 360) {
    mmmTracker.reset();
  }
  /***** Minutes *****/
  monkMarc().sweepAngle = mmmTracker.getCount(MmmMode.monk) * TEST_MULT;

  monsterMarc().startAngle = monkMarc().sweepAngle;
  monsterMarc().sweepAngle = mmmTracker.getCount(MmmMode.monster) * TEST_MULT;

  marshmallowMarc().startAngle =
    monsterMarc().sweepAngle + monkMarc().sweepAngle;
  marshmallowMarc().sweepAngle =
    mmmTracker.getCount(MmmMode.marshmallow) * TEST_MULT;

  pauseMarc().startAngle =
    marshmallowMarc().sweepAngle +
    monsterMarc().sweepAngle +
    monkMarc().sweepAngle;
  pauseMarc().sweepAngle = mmmTracker.getCount(MmmMode.pause) * TEST_MULT;

  /***** Hours *****/
  monkHarc().sweepAngle = mmmTracker.getCount(MmmMode.monk) * TEST_MULT;

  monsterHarc().startAngle = monkHarc().sweepAngle;
  monsterHarc().sweepAngle = mmmTracker.getCount(MmmMode.monster) * TEST_MULT;

  marshmallowHarc().startAngle =
    monsterHarc().sweepAngle + monkHarc().sweepAngle;
  marshmallowHarc().sweepAngle =
    mmmTracker.getCount(MmmMode.marshmallow) * TEST_MULT;

  pauseHarc().startAngle =
    marshmallowHarc().sweepAngle +
    monsterHarc().sweepAngle +
    monkHarc().sweepAngle;
  pauseHarc().sweepAngle = mmmTracker.getCount(MmmMode.pause) * TEST_MULT;
}
