import document from 'document';
import { MmmMode } from './MmmTracker';
let monkArc = () => document.getElementById('monk-arc');
let monsterArc = () => document.getElementById('monster-arc');
let marshmallowArc = () => document.getElementById('marshmallow-arc');

export function arcHandler(mmmTracker) {
  const total = mmmTracker.countTotal();
  monkArc().sweepAngle = (mmmTracker.getCount(MmmMode.monk) / total) * 360;
  monsterArc().sweepAngle =
    (mmmTracker.getCount(MmmMode.monster) / total) * 360;
  marshmallowArc().sweepAngle =
    (mmmTracker.getCount(MmmMode.marshmallow) / total) * 360;
}
