// import { outerArcs, innerArcs } from './arcs';
import { MmmMode } from './modes';

const HOUR_DEGREE_INCREMENT = 360 / 60 / 60; // it updates in seconds.
const DAY_DEGREE_INCREMENT = 360 / 24 / 60 / 60;

export const MmmTimerState = {
  running: 'running',
  paused: 'paused',
};

export function MmmTracker() {
  this.currentMode = MmmMode.pause;
  this.monkMinCnt = 0;
  this.monsterMinCnt = 0;
  this.marshmallowMinCnt = 0;
  this.monkHrCnt = 0;
  this.monsterHrCnt = 0;
  this.marshmallowHrCnt = 0;

  this.innerColor = 'fb-blue';
  this.outerColor = 'fb-blue';

  // Ideally, this should be located elsewhere
  this.getInnerColor = () => {
    return this.innerColor;
  };

  this.getOuterColor = () => {
    return this.outerColor;
  };

  this.setInnerColor = (color) => {
    this.innerColor = color;
  };

  this.setOuterColor = (color) => {
    this.outerColor = color;
  };

  this.setCurrentMode = (mode) => {
    this.currentMode = mode;
  };

  this.getCurrentMode = () => {
    return this.currentMode;
  };

  this.resetMinutes = () => {
    this.monkMinCnt = 0;
    this.monsterMinCnt = 0;
    this.marshmallowMinCnt = 0;
  };

  this.resetHours = () => {
    this.monkHrCnt = 0;
    this.monsterHrCnt = 0;
    this.marshmallowHrCnt = 0;
  };

  this.updateOnTick = () => {
    switch (this.currentMode) {
      case MmmMode.monk:
        this.monkMinCnt = this.monkMinCnt + HOUR_DEGREE_INCREMENT;
        this.monkHrCnt = this.monkHrCnt + DAY_DEGREE_INCREMENT;
        this.monkHrCnt > this.monsterHrCnt &&
        this.monkHrCnt > this.marshmallowHrCnt
          ? (this.outerColor = 'fb-peach')
          : null;
        this.monkMinCnt > this.monsterMinCnt &&
        this.monkMinCnt > this.marshmallowMinCnt
          ? (this.innerColor = 'fb-peach')
          : null;
        return;
      case MmmMode.monster:
        this.monsterMinCnt = this.monsterMinCnt + HOUR_DEGREE_INCREMENT;
        this.monsterHrCnt = this.monsterHrCnt + DAY_DEGREE_INCREMENT;
        this.monsterHrCnt > this.monkHrCnt &&
        this.monsterHrCnt > this.marshmallowHrCnt
          ? (this.outerColor = 'fb-red')
          : null;
        this.monsterMinCnt > this.monkMinCnt &&
        this.monsterMinCnt > this.marshmallowMinCnt
          ? (this.innerColor = 'fb-red')
          : null;
        return;
      case MmmMode.marshmallow:
        this.marshmallowMinCnt = this.marshmallowMinCnt + HOUR_DEGREE_INCREMENT;
        this.marshmallowHrCnt = this.marshmallowHrCnt + DAY_DEGREE_INCREMENT;
        this.marshmallowHrCnt > this.monsterHrCnt &&
        this.marshmallowHrCnt > this.monkHrCnt
          ? (this.outerColor = 'fb-white')
          : null;
        this.marshmallowMinCnt > this.monsterMinCnt &&
        this.marshmallowMinCnt > this.monkMinCnt
          ? (this.innerColor = 'fb-white')
          : null;
        return;
      case MmmMode.pause:
      default:
        return;
    }
  };

  this.getMinuteCount = (mode) => {
    switch (mode) {
      case MmmMode.monk:
        return this.monkMinCnt;
      case MmmMode.monster:
        return this.monsterMinCnt;
      case MmmMode.marshmallow:
        return this.marshmallowMinCnt;
      case MmmMode.pause:
      default:
        return;
    }
  };

  this.getHourCount = (mode) => {
    switch (mode) {
      case MmmMode.monk:
        return this.monkHrCnt;
      case MmmMode.monster:
        return this.monsterHrCnt;
      case MmmMode.marshmallow:
        return this.marshmallowHrCnt;
      case MmmMode.pause:
      default:
        return;
    }
  };

  this.countMinTotal = () => {
    return this.monkMinCnt + this.marshmallowMinCnt + this.monsterMinCnt;
  };

  this.countHrTotal = () => {
    return this.monkHrCnt + this.marshmallowHrCnt + this.monsterHrCnt;
  };

  // this.saveToFile = (path) => {
  //   let storedObj = {
  //     modeStates: {
  //       mode: this.getCurrentMode,
  //       innerColor: this.getInnerColor,
  //       outerColor: this.getOuterColor,
  //     },
  //     // for now, these have to be in order.
  //     innerRingStates: {
  //       monk: {
  //         sweepAngle: innerArcs[0].sweepAngle,
  //         startAngle: innerArcs[0].startAngle,
  //       },
  //       monster: {
  //         sweepAngle: innerArcs[1].sweepAngle,
  //         startAngle: innerArcs[1].startAngle,
  //       },
  //       marshmallow: {
  //         sweepAngle: innerArcs[2].sweepAngle,
  //         startAngle: innerArcs[2].startAngle,
  //       },
  //     },
  //     outerRingStates: {
  //       monk: {
  //         sweepAngle: outerArcs[0].sweepAngle,
  //         startAngle: outerArcs[0].startAngle,
  //       },
  //       monster: {
  //         sweepAngle: outerArcs[1].sweepAngle,
  //         startAngle: outerArcs[1].startAngle,
  //       },
  //       marshmallow: {
  //         sweepAngle: outerArcs[2].sweepAngle,
  //         startAngle: outerArcs[2].startAngle,
  //       },
  //     },
  //   };
  //   fs.writeFileSync(path, storedObj, 'cbor');
  // };
}

// MmmTracker.loadFromFile = (path) => {
//   try {
//     let store = fs.readFileSync(path, 'cbor');
//     let tracker = new MmmTracker();

//     tracker.setCurrentMode(store.modeStates.mode);
//     tracker.setInnerColor(store.modeStates.innerColor);
//     tracker.setOuterColor(store.modeStates.outerColor);

//     innerArcs[0].sweepAngle = store.innerRingStates.monk.sweepAngle;
//     innerArcs[0].startAngle = store.innerRingStates.monk.startAngle;
//     innerArcs[1].sweepAngle = store.innerRingStates.monster.sweepAngle;
//     innerArcs[1].startAngle = store.innerRingStates.monster.startAngle;
//     innerArcs[2].sweepAngle = store.innerRingStates.marshmallow.sweepAngle;
//     innerArcs[2].startAngle = store.innerRingStates.marshmallow.startAngle;

//     outerArcs[0].sweepAngle = store.outerRingStates.monk.sweepAngle;
//     outerArcs[0].startAngle = store.outerRingStates.monk.startAngle;
//     outerArcs[1].sweepAngle = store.outerRingStates.monster.sweepAngle;
//     outerArcs[1].startAngle = store.outerRingStates.monster.startAngle;
//     outerArcs[2].sweepAngle = store.outerRingStates.marshmallow.sweepAngle;
//     outerArcs[2].startAngle = store.outerRingStates.marshmallow.startAngle;

//     return tracker;
//   } catch (e) {
//     return null;
//   }
// };
