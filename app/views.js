import document from 'document';
import { MmmMode } from './MmmTracker';
let monkArc = () => document.getElementById('monk-arc');

export function arcHandler(mmmTracker) {
  monkArc().sweepAngle = mmmTracker.getCount(MmmMode.monk) * 10;
}
