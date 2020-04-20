import document from 'document';
import { MmmMode } from './MmmTracker';
let monkArc = () => document.getElementById('monk-arc');
let monsterArc = () => document.getElementById('monster-arc');
let marshmallowArc = () => document.getElementById('marshmallow-arc');
let pauseArc = () => document.getElementById('pause-arc');

export function arcHandler(mmmTracker) {
  monkArc().sweepAngle = mmmTracker.getCount(MmmMode.monk) * 6;

  monsterArc().startAngle = monkArc().sweepAngle;
  monsterArc().sweepAngle = mmmTracker.getCount(MmmMode.monster) * 6;

  marshmallowArc().startAngle = monsterArc().sweepAngle + monkArc().sweepAngle;
  marshmallowArc().sweepAngle = mmmTracker.getCount(MmmMode.marshmallow) * 6;
}
