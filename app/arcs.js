import document from 'document';
import { me as device } from 'device';
if (!device.screen) device.screen = { width: 348, height: 250 };

const scrW = device.screen.width;
const scrH = device.screen.height;

export const buttonArcNames = [
  { name: 'monk-urArc' },
  { name: 'monster-lrArc' },
  { name: 'marshmallow-llArc' },
  { name: 'pause-ulArc' },
];

export let buttonArcs = [];
export let buttonArcs2 = [];

const ARC_INIT_DIAMETER = 100;
const ARC_INIT_WIDTH = 2;

function initArcsHelper(arcs, items, postFix = '') {
  if (arcs.length === 0) {
    // console.log('*** Init Arcs ***' + postFix);
    items.forEach((item, index) => {
      const byAmt = 0;
      let arc = document.getElementById(item.name + postFix);

      if (index === 0 || index == 1) arc.x = scrW * 0.75 - byAmt + 10;
      else arc.x = -26 - byAmt;

      if (index === 1 || index === 2) arc.y = scrH - byAmt - 70;
      else arc.y = -30 - byAmt;

      arc.arcWidth = ARC_INIT_WIDTH;
      if (index === 3) arc.arcWidth = ARC_INIT_WIDTH - 1; // since it will get initiated with a +1 line
      arc.height = ARC_INIT_DIAMETER;
      arc.width = ARC_INIT_DIAMETER;

      arcs.push(arc);
    });
    // console.log('*** Init End ***');
  }
}

function renderArc(arc, index, byAmt) {
  if (index === 0 || index == 1) arc.x = scrW * 0.75 - byAmt + 10;
  else arc.x = -26 - byAmt;

  if (index === 1 || index === 2) arc.y = scrH - byAmt - 70;
  else arc.y = -30 - byAmt;

  arc.height = ARC_INIT_DIAMETER + byAmt * 2;
  arc.width = ARC_INIT_DIAMETER + byAmt * 2;
  arc.arcWidth = byAmt;
}
export function renderArcByIndex(index, byAmt) {
  const arc = buttonArcs2[index];
  console.log(arc.id + ': ' + arc.arcWidth);
  renderArc(arc, index, byAmt);
}

export function renderAllArcss(byAmt, thickness = 1) {
  buttonArcs2.forEach((arc, index) => {
    renderArc(arc, index, byAmt, thickness);
    arc.style.fill = 'magenta';
  });
}

export function initArcs() {
  initArcsHelper(buttonArcs, buttonArcNames);
  initArcsHelper(buttonArcs2, buttonArcNames, '2');
}
