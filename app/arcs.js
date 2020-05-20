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

export function updateOuterArcs(byAmt, width, screen) {
  const scrW = screen.width;
  const scrH = screen.height;
  console.log(scrW + '/' + scrH);
  buttonArcs2.forEach((arc, index) => {
    arc.height = arc.height + byAmt * 2;
    arc.width = arc.width + byAmt * 2;
    if (index === 0 || index == 1) arc.x = scrW * 0.75 - byAmt + 10;
    else arc.x = -26 - byAmt;

    if (index === 1 || index === 2) arc.y = scrH - byAmt - 70;
    else arc.y = -30 - byAmt;

    arc.arcWidth = width;
    console.log(index + ': ' + buttonArcNames[index].name + '/' + arc.arcWidth);
    // console.log(arc.height + '/' + arc.width);
    console.log(arc.x + '/' + arc.y);
  });
}

export function initArcs() {
  initArcsHelper(buttonArcs, buttonArcNames);
  initArcsHelper(buttonArcs2, buttonArcNames, '2');
}
