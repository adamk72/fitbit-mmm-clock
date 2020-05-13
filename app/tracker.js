// import { outerArcs, innerArcs } from './arcs';
import { MmmMode, MmmCurrent, MmmTrackerPath } from './modes';
import * as fs from 'fs';

export function MmmTracker(modeInit, currentInit) {
  this.innerColor = 'fb-blue';
  this.outerColor = 'fb-blue';
  this.date = new Date();
  this.mode = modeInit;
  this.current = currentInit;
  {
    console.log('>>> on new current <<<');
    // console.log(this.mode[0].name);
    // console.log(this.mode[0].initTime);
    // console.log(this.mode[0].lastCount);
    console.log(this.current.name);
    console.log(this.current.initTime);
    console.log(this.current.lastCount);
  }

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

    // if we switch modes, record the last count of the current mode before setting this.current
    if (mode.initTime != 0 && mode.name != this.current.name) {
      const currModeTimeElapsed = time - this.current.initTime;
      // Add the last elasped time to the next mode's initTime to bring it up to speed.
      if (mode.initTime === 0) {
        mode.initTime = time;
      } else {
        mode.initTime = mode.initTime + currModeTimeElapsed;
      }
      // Since we are switching modes, update current/(now previous) w/ elapsed time.
      this.current.lastCount = this.current.lastCount + currModeTimeElapsed;
    } else if (mode.initTime === 0) {
      mode.initTime = time;
    }

    this.current.initTime = mode.initTime;
    this.current.color = mode.color;
    this.current.name = mode.name;
    this.current.index = mode.index;
    this.current.lastCount = mode.lastCount;
  };

  this.getCurrentMode = () => {
    return this.current;
  };
  {
    // this.updateModeCountOnTick = () => {
    //   const currentMode = MmmCurrent;
    //   if (currentMode && currentMode.index != -1) {
    //     // update the actual object
    //     this.mode[currentMode.index].shortCount =
    //       this.mode[currentMode.index].shortCount + 1;
    //     this.mode[currentMode.index].longCount =
    //       this.mode[currentMode.index].longCount + 1;
    //     // update the current object to match
    //     currentMode.shortCount = this.mode[currentMode.index].shortCount;
    //     this.outerColor = currentMode.color;
    //     this.innerColor = currentMode.color;
    //   }
    // };
  }
  this.getCount = (index) => {
    {
      // If the mode is still active, increment count.
      // console.log(
      //   this.mode[index].name +
      //     ' ' +
      //     this.mode[index].initTime +
      //     ' ' +
      //     this.mode[index].lastCount
      // );
      // console.log(this.mode[index].name);
      // console.log(this.current.name);
    }
    if (this.mode[index].name === this.current.name) {
      const date = new Date();
      return date.getTime() / 1000 - this.mode[index].initTime;
    } else {
      return this.mode[index].lastCount;
    }
  };

  this.totalCount = () => {
    let sum = 0;
    this.mode.forEach((obj) => {
      sum = sum + obj.lastCount;
    });
    return sum;
  };

  this.saveToFile = (path) => {
    let store = {
      modes: this.mode,
      current: this.current,
    };
    fs.writeFileSync(path, store, 'cbor');
    console.log('*** on save ***');
    console.log(store.modes[0].name);
    console.log(store.modes[0].initTime);
    console.log(store.modes[0].lastCount);
    console.log(store.current.name);
    console.log(store.current.initTime);
    console.log(store.current.lastCount);
  };
}

MmmTracker.loadFromFile = (path) => {
  try {
    let store = fs.readFileSync(path, 'cbor');

    if (store) {
      let tracker = new MmmTracker(store.modes, store.current);
      console.log('>>> on load <<<');
      console.log(store.modes[0].name);
      console.log(store.modes[0].initTime);
      console.log(store.modes[0].lastCount);
      console.log(store.current.name);
      console.log(store.current.initTime);
      console.log(store.current.lastCount);

      return tracker;
    } else {
      return null;
    }
  } catch (e) {
    let store = {
      modes: MmmMode,
      current: MmmCurrent,
    };
    fs.writeFileSync(MmmTrackerPath, store, 'cbor');
    console.log(store.modes[1].name);
    console.log(store.current.name);
    let tracker = new MmmTracker(MmmMode, MmmCurrent);
    return tracker;
  }
};
