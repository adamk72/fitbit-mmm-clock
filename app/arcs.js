import document from 'document';
import { MmmMode } from './MmmTracker';

export let minuteArcsItems = [
  { name: 'monk-mArc', type: 'minute', mode: MmmMode.monk },
  { name: 'monster-mArc', type: 'minute', mode: MmmMode.monster },
  { name: 'marshmallow-mArc', type: 'minute', mode: MmmMode.marshmallow },
  { name: 'pause-mArc', type: 'minute', mode: MmmMode.pause },
];
export let hourArcsItems = [
  { name: 'monk-hArc', type: 'hour', mode: MmmMode.monk },
  { name: 'monster-hArc', type: 'hour', mode: MmmMode.monster },
  { name: 'marshmallow-hArc', type: 'hour', mode: MmmMode.marshmallow },
  { name: 'pause-hArc', type: 'hour', mode: MmmMode.pause },
];

export let minuteArcs = [];
export let hourArcs = [];

initializeMinutes();
initializeHours();

export function initializeMinutes() {
  if (minuteArcs.length === 0) {
    minuteArcsItems.forEach((arc) => {
      minuteArcs.push(() => document.getElementById(arc.name));
    });
  }
}

export function initializeHours() {
  if (hourArcs.length === 0) {
    hourArcsItems.forEach((arc) => {
      hourArcs.push(() => document.getElementById(arc.name));
    });
  }
}

export function resetHours() {
  hourArcs = [];
}

export function resetMinutes() {
  minuteArcs = [];
}
