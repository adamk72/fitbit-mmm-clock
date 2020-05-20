import document from 'document';

export const buttonArcNames = [
  { name: 'monk-urArc' },
  { name: 'monster-lrArc' },
  { name: 'marshmallow-llArc' },
  { name: 'pause-ulArc' },
];

export let buttonArcs = [];

function initArcsHelper(arcs, items) {
  if (arcs.length === 0) {
    items.forEach((arc) => {
      let result = document.getElementById(arc.name);
      result.sweepAngle = 0;
      result.startAngle = 0;
      arcs.push(result);
    });
  }
}

export function initArcs() {
  initArcsHelper(buttonArcs, buttonArcNames);
}
