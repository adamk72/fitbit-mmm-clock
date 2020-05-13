// import { outerArcs, innerArcs } from './arcs';
import { MmmMode, MmmCurrent, MmmTrackerPath } from './modes';
import * as fs from 'fs';

export function MmmTracker(modesInit, currentInit) {
  this.innerColor = 'fb-blue';
  this.outerColor = 'fb-blue';
  this.date = new Date();
  this.modes = modesInit;
  this.current = currentInit;
  {
    // console.log('>>> on new current <<<');
    // console.log(this.modes[0].name);
    // console.log(this.modes[0].initTime);
    // console.log(this.modes[0].accumCount);
    // console.log(this.current.name);
    // console.log(this.current.initTime);
    // console.log(this.current.accumCount);
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

  this.setCurrentMode = (mode) => {
    const date = new Date();
    const time = date / 1000;
    if (mode.initTime === 0) mode.initTime = time;

    // if we switch modes, record the last count of the current mode before setting this.current
    if (mode.name != this.current.name) {
      const previous = this.modes[this.current.index];

      if (this.current.name === 'Initialize') {
        this.current.name = 'Pause';
      } else {
        // Add to the total accumulated time for the current mode
        previous.accumCount = this.current.accumCount;
        // Reset the initial time so that next time we come here, we've accumlated more from a fresh start.
        previous.initTime = this.current.initTime;
      }
      // Set the current info to the new mode to be.
      this.current.initTime = mode.initTime;
      this.current.color = mode.color;
      this.current.name = mode.name;
      this.current.index = mode.index;
      this.current.accumCount = mode.accumCount;
    }
  };

  this.getCurrentMode = () => {
    return this.current;
  };

  this.updateAccumCount = () => {
    const date = new Date();
    const time = date.getTime() / 1000;

    // console.log('B:' + this.current.name + ' ' + this.current.accumCount);
    this.current.accumCount =
      this.current.accumCount + (time - this.current.initTime);
    this.current.initTime = time;
    console.log('A:' + this.current.name + ' ' + this.current.accumCount);
  };

  {
    // this.updateModeCountOnTick = () => {
    //   const currentMode = MmmCurrent;
    //   if (currentMode && currentMode.index != -1) {
    //     // update the actual object
    //     this.modes[currentMode.index].shortCount =
    //       this.modes[currentMode.index].shortCount + 1;
    //     this.modes[currentMode.index].longCount =
    //       this.modes[currentMode.index].longCount + 1;
    //     // update the current object to match
    //     currentMode.shortCount = this.modes[currentMode.index].shortCount;
    //     this.outerColor = currentMode.color;
    //     this.innerColor = currentMode.color;
    //   }
    // };
  }
  this.getCount = (index) => {
    if (this.current.index === index) {
      return this.current.accumCount;
    } else return this.modes[index].accumCount;
  };

  this.saveToFile = (path) => {
    let store = {
      modes: this.modes,
      current: this.current,
    };
    fs.writeFileSync(path, store, 'cbor');
    {
      // console.log('*** on save ***');
      // console.log(store.modes[0].name);
      // console.log(store.modes[0].initTime);
      // console.log(store.modes[0].accumCount);
      // console.log(store.current.name);
      // console.log(store.current.initTime);
      // console.log(store.current.accumCount);
    }
  };
}

MmmTracker.loadFromFile = (path) => {
  try {
    let store = fs.readFileSync(path, 'cbor');

    if (store) {
      let tracker = new MmmTracker(store.modes, store.current);
      {
        // console.log('>>> on load <<<');
        // console.log(store.modes[0].name);
        // console.log(store.modes[0].initTime);
        // console.log(store.modes[0].accumCount);
        // console.log(store.current.name);
        // console.log(store.current.initTime);
        // console.log(store.current.accumCount)
      }

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
    // console.log(store.modes[1].name);
    // console.log(store.current.name);
    let tracker = new MmmTracker(MmmMode, MmmCurrent);
    return tracker;
  }
};
