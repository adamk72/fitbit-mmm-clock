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

initializeInnerRing();
initializeOuterRing();

function initRing(arcs, items) {
  if (arcs.length === 0) {
    items.forEach((arc) => {
      let result = document.getElementById(arc.name);
      result.sweepAngle = 0;
      result.startAngle = 0;
      arcs.push(result);
    });
  }
}

export function initializeOuterRing() {
  initRing(outerArcs, outerArcsItems);
}

export function initializeInnerRing() {
  initRing(innerArcs, innerArcsItems);
}

export function resetInnerRing() {
  innerArcs = [];
}

export function resetOuterRing() {
  outerArcs = [];
}
