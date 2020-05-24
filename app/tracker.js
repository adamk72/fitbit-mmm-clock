// import { outerArcs, innerArcs } from './arcs';
import { MmmModes, MmmCurrents, MmmTrackerPath } from './modes';
import * as fs from 'fs';

const NUM_OF_MODES = 4;
//const FIB_SEQ = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
const FIB_SEQ = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];
const SEC_PER_MIN = 60;

export function MmmTracker(modesInit, currentsInit) {
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

  this.updateModesOnTick = () => {
    this.currents.forEach((mode, index) => {
      let minutesPassed = (Date.now() / 1000 - mode.initTime) / SEC_PER_MIN;
      let fibIdx = -1;
      for (let i = 0; i <= FIB_SEQ.length; i++) {
        if (FIB_SEQ[i] >= minutesPassed) {
          fibIdx = i;
          break;
        }
      }
      mode.arcWidth = fibIdx + 1;
    });
  };

  this.setCurrentMode = (name) => {
    const mode = this.getModeByName(name);
    if (mode.name != this.currents[0].name) {
      if (this.currents.length === NUM_OF_MODES) this.currents.pop();
      mode.initTime = Date.now() / 1000;
      this.currents.unshift(mode);
    }
  };

  this.getCurrentMode = () => {
    return this.currents[0];
  };

  this.getModes = () => {
    return this.currents;
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
