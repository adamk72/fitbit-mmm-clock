// import { outerArcs, innerArcs } from './arcs';
import { MmmMode, MmmCurrent, MmmTrackerPath } from './modes';
import * as fs from 'fs';

export function MmmTracker(modeInit, currentInit) {
  this.innerColor = 'fb-blue';
  this.outerColor = 'fb-blue';
  this.date = new Date();
  this.mode = modeInit;
  this.current = currentInit;

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
    const date = new Date();
    const time = date.getTime() / 1000;

    // if we switch modes, record the last count of the current mode before setting MmmCurrent
    if (mode.initTime != 0 && mode.name != MmmCurrent.name) {
      const currModeTimeElapsed = time - MmmCurrent.initTime;
      // Add the last elasped time to the next mode's initTime to bring it up to speed.
      if (mode.initTime === 0) {
        mode.initTime = time;
      } else {
        mode.initTime = mode.initTime + currModeTimeElapsed;
      }
      // Since we are switching modes, update current/(now previous) w/ elapsed time.
      MmmCurrent.lastCount = MmmCurrent.lastCount + currModeTimeElapsed;
    } else if (mode.initTime === 0) {
      mode.initTime = time;
    } else {
      MmmCurrent.lastCount = mode.lastCount;
    }

    MmmCurrent.initTime = mode.initTime;
    MmmCurrent.color = mode.color;
    MmmCurrent.name = mode.name;
    MmmCurrent.index = mode.index;
  };

  this.getCurrentMode = () => {
    return MmmCurrent;
  };
  {
    // this.updateModeCountOnTick = () => {
    //   const currentMode = MmmCurrent;
    //   if (currentMode && currentMode.index != -1) {
    //     // update the actual object
    //     MmmMode[currentMode.index].shortCount =
    //       MmmMode[currentMode.index].shortCount + 1;
    //     MmmMode[currentMode.index].longCount =
    //       MmmMode[currentMode.index].longCount + 1;
    //     // update the current object to match
    //     currentMode.shortCount = MmmMode[currentMode.index].shortCount;
    //     currentMode.longCount = MmmMode[currentMode.index].longCount;
    //     this.outerColor = currentMode.color;
    //     this.innerColor = currentMode.color;
    //   }
    // };
  }
  this.getCount = (index) => {
    // If the mode is still active, increment count.
    // console.log(
    //   MmmMode[index].name +
    //     ' ' +
    //     MmmMode[index].initTime +
    //     ' ' +
    //     MmmMode[index].lastCount
    // );

    if (MmmMode[index].name === MmmCurrent.name) {
      const date = new Date();
      return date.getTime() / 1000 - MmmMode[index].initTime;
    } else {
      return MmmMode[index].lastCount;
    }
  };

  this.totalCount = () => {
    let sum = 0;
    MmmMode.forEach((obj) => {
      sum = sum + obj.lastCount;
    });
    return sum;
  };

  this.saveToFile = (path) => {
    let storedObj = {
      modes: MmmMode,
      current: MmmCurrent,
    };
    fs.writeFileSync(path, storedObj, 'cbor');
  };
}

MmmTracker.loadFromFile = (path) => {
  try {
    let store = fs.readFileSync(path, 'cbor');

    if (store) {
      let tracker = new MmmTracker(store.modes, store.current);

      return tracker;
    } else {
      return null;
    }
  } catch (e) {
    let storedObj = {
      modes: MmmMode,
      current: MmmCurrent,
    };
    fs.writeFileSync(MmmTrackerPath, storedObj, 'cbor');
    let tracker = new MmmTracker(MmmMode, MmmCurrent);
    return tracker;
  }
};
