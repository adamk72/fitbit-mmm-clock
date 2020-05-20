import document from 'document';

export const buttonArcNames = [
  { name: 'monk-urArc' },
  { name: 'monster-lrArc' },
  { name: 'marshmallow-llArc' },
  { name: 'pause-ulArc' },
];

export let buttonArcs = [];
export let buttonArcs2 = [];

function initArcsHelper(arcs, items, postFix = '') {
  if (arcs.length === 0) {
    items.forEach((arc) => {
      let result = document.getElementById(arc.name + postFix);
      arcs.push(result);
    });
  }
}

export function initArcs() {
  initArcsHelper(buttonArcs, buttonArcNames);
  initArcsHelper(buttonArcs2, buttonArcNames, '2');
}
