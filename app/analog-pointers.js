import document from 'document';
import { outerArcs } from './arcs';

let outerPtr = document.getElementById('outer-pointer');
let innerPtr = document.getElementById('inner-pointer');
let outerRect = document.getElementById('outer-rect');
let innerRect = document.getElementById('inner-rect');

// Returns an angle (0-360) for the current outer in the day, including innerutes
function outerToAngle(outers, inner) {
  let outerAngle = (360 / 12) * outers;
  let innerAngle = (360 / 12 / 60) * inner;
  return outerAngle + innerAngle;
}

// Returns an angle (0-360) for innerutes
function innerToAngle(inner) {
  return (360 / 60) * inner;
}

// Rotate the hands every tick
export function updateClock(tracker) {
  let today = new Date();
  let hours = today.getHours() % 12;
  let minutes = today.getMinutes();

  outerPtr.groupTransform.rotate.angle = outerToAngle(hours, minutes);
  innerPtr.groupTransform.rotate.angle = innerToAngle(minutes);
  outerRect.style.fill = tracker.getOuterColor();
  innerRect.style.fill = tracker.getInnerColor();
}
