import clock from 'clock';
import document from 'document';

// Update the clock every second
clock.granularity = 'seconds';

let outerPtr = document.getElementById('outer-pointer');
let innerPtr = document.getElementById('inner-pointer');

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
export function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let minutes = today.getMinutes();

  outerPtr.groupTransform.rotate.angle = outerToAngle(hours, minutes);
  innerPtr.groupTransform.rotate.angle = innerToAngle(minutes);
}
