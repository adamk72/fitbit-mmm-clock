import document from 'document';

export const outerArcsItems = [
  { name: 'monk-oArc' },
  { name: 'monster-oArc' },
  { name: 'marshmallow-oArc' },
];
export const innerArcsItems = [
  { name: 'monk-iArc' },
  { name: 'monster-iArc' },
  { name: 'marshmallow-iArc' },
];

export let outerArcs = [];
export let innerArcs = [];

initializeOuterRing();
initializeInnerRing();

export function initializeOuterRing() {
  if (outerArcs.length === 0) {
    outerArcsItems.forEach((arc, index) => {
      outerArcs.push(() => document.getElementById(arc.name));
      outerArcs[index]().sweepAngle = 0;
      outerArcs[index]().startAngle = 0;
    });
  }
}

export function initializeInnerRing() {
  if (innerArcs.length === 0) {
    innerArcsItems.forEach((arc, index) => {
      innerArcs.push(() => document.getElementById(arc.name));
      innerArcs[index]().sweepAngle = 0;
      innerArcs[index]().startAngle = 0;
    });
  }
}

export function resetInnerRing() {
  innerArcs = [];
}

export function resetOuterRing() {
  outerArcs = [];
}
