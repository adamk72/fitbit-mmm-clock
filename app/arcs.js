import document from 'document';
import { MmmMode } from './modes';

export const outerArcsItems = [
  { name: 'monk-oArc', mode: MmmMode.monk },
  { name: 'monster-oArc', mode: MmmMode.monster },
  { name: 'marshmallow-oArc', mode: MmmMode.marshmallow },
];
export const innerArcsItems = [
  { name: 'monk-iArc', mode: MmmMode.monk },
  { name: 'monster-iArc', mode: MmmMode.monster },
  { name: 'marshmallow-iArc', mode: MmmMode.marshmallow },
];

export let outerArcs = [];
export let innerArcs = [];

initializeOuterRing();
initializeInnerRing();

export function initializeOuterRing() {
  if (outerArcs.length === 0) {
    outerArcsItems.forEach((arc) => {
      outerArcs.push(() => document.getElementById(arc.name));
    });
  }
}

export function initializeInnerRing() {
  if (innerArcs.length === 0) {
    innerArcsItems.forEach((arc, index) => {
      innerArcs.push(() => document.getElementById(arc.name));
    });
  }
}

export function resetInnerRing() {
  innerArcs = [];
}

export function resetOuterRing() {
  outerArcs = [];
}
