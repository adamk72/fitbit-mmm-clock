// import { outerArcs, innerArcs } from './arcs';
import { MmmModes, MmmCurrents, MmmTrackerPath } from './modes';
import * as fs from 'fs';

const NUM_OF_MODES = 4;
const FIB_SEQ = [0, 1, 2, 3, 8, 13, 21, 23, 55, 89];
const SEC_PER_MIN = 60;

export function MmmTracker(modesInit, currentsInit) {
  this.innerColor = 'fb-blue';
  this.outerColor = 'fb-blue';
  this.date = new Date();
  this.modes = modesInit;
  this.currents = currentsInit;

  this.getModeByName = (name) => {
    switch (name) {
      case 'Monk':
        return this.modes[0];
      case 'Monster':
        return this.modes[1];
      case 'Marshmallow':
        return this.modes[2];
      case 'Pause':
        return this.modes[3];
      default:
        return null;
    }
  };

  this.getModeByIndex = (index) => {
    return this.modes[index];
  };

  this.updateModes = (time) => {
    this.currents.forEach((mode, index) => {
      let minutesPassed = (time - mode.initTime) / SEC_PER_MIN;

      if (index === 0) {
        console.log(minutesPassed);
      }
    });
  };

  this.setCurrentMode = (mode) => {
    const time = new Date().getTime();

    if (mode.name != this.currents[0].name) {
      if (this.currents.length === NUM_OF_MODES) this.currents.pop();
      mode.initTime = time;
      this.currents.unshift(mode);
    }
    console.log(mode.name + ': ' + mode.initTime);
  };

  this.getCurrentMode = () => {
    return this.currents[0];
  };

  this.saveToFile = (path) => {
    let store = {
      modes: this.modes,
      currents: this.currents,
    };
    fs.writeFileSync(path, store, 'cbor');
  };
}

MmmTracker.loadFromFile = (path) => {
  try {
    let store = fs.readFileSync(path, 'cbor');

    if (store) {
      let tracker = new MmmTracker(store.modes, store.currents);
      return tracker;
    } else {
      return null;
    }
  } catch (e) {
    let store = {
      modes: MmmModes,
      currents: MmmCurrents,
    };
    fs.writeFileSync(MmmTrackerPath, store, 'cbor');
    MmmCurrents[0] = MmmModes[3]; // set this to be the Pause
    let tracker = new MmmTracker(MmmModes, MmmCurrents);
    return tracker;
  }
};
