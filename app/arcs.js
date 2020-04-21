import document from 'document';
import { MmmMode } from './MmmTracker';

export let arcsList = [
  { name: 'monk-mArc', type: 'minute', mode: MmmMode.monk },
  { name: 'monster-mArc', type: 'minute', mode: MmmMode.monster },
  { name: 'marshmallow-mArc', type: 'minute', mode: MmmMode.marshmallow },
  { name: 'pause-mArc', type: 'minute', mode: MmmMode.pause },
  { name: 'monk-hArc', type: 'hour', mode: MmmMode.monk },
  { name: 'monster-hArc', type: 'hour', mode: MmmMode.monster },
  { name: 'marshmallow-hArc', type: 'hour', mode: MmmMode.marshmallow },
  { name: 'pause-hArc', type: 'hour', mode: MmmMode.pause },
];

export let minuteArcs = [];
export let hourArcs = [];

if (minuteArcs.length === 0) {
  arcsList.forEach((arc) => {
    if (arc.type === 'minute') {
      console.log(arc.name);
      minuteArcs.push(() => document.getElementById(arc.name));
    } else if (arc.type === 'hour') {
      hourArcs.push(() => document.getElementById(arc.name));
    }
  });
}
