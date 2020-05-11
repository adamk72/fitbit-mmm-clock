// import { outerArcs, innerArcs } from './arcs';
import { MmmMode, MmmCurrent } from './modes';
import * as fs from 'fs';
import { CONFIG } from './config';

export function MmmTracker(settings) {
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
    MmmCurrent.initTime = mode.initTime;
    MmmCurrent.shortCount = mode.shortCount;
    MmmCurrent.longCount = mode.longCount;
    MmmCurrent.color = mode.color;
    MmmCurrent.name = mode.name;
    MmmCurrent.index = mode.index;
  };

  this.getCurrentMode = () => {
    return MmmCurrent;
  };

  this.updateModeCountOnTick = () => {
    const currentMode = MmmCurrent;

    if (currentMode && currentMode.index != -1) {
      // update the actual object
      MmmMode[currentMode.index].shortCount =
        MmmMode[currentMode.index].shortCount + 1;
      MmmMode[currentMode.index].longCount =
        MmmMode[currentMode.index].longCount + 1;

      // update the current object to match
      currentMode.shortCount = MmmMode[currentMode.index].shortCount;
      currentMode.longCount = MmmMode[currentMode.index].longCount;

      this.outerColor = currentMode.color;
      this.innerColor = currentMode.color;
    }
  };

  this.getShortCount = (index) => {
    return MmmMode[index].shortCount;
  };

  this.getLongCount = (index) => {
    return MmmMode[index].longCount;
  };

  this.countShortTotal = () => {
    let sum = 0;
    MmmMode.forEach((obj, index) => {
      console.log(obj.name + ' ' + obj.shortCount);
      sum = sum + obj.shortCount;
    });
    return sum;
  };
  this.countLongTotal = () => {
    let sum = 0;
    MmmMode.forEach((obj, index) => {
      sum = sum + obj.longCount;
    });
    return sum;
  };

  this.saveToFile = (path) => {
    let storedObj = {
      settings: {
        // currentMode: this.currentMode,
        // monkShortCnt: this.monkShortCnt,
        // monsterShortCnt: this.monsterShortCnt,
        // marshmallowShortCnt: this.marshmallowShortCnt,
        // monkLongCnt: this.marshmallowShortCnt,
        // monsterLongCnt: this.marshmallowShortCnt,
        // marshmallowLongCnt: this.marshmallowShortCnt,
      },
    };
    fs.writeFileSync(path, storedObj, 'cbor');
  };
}

MmmTracker.loadFromFile = (path) => {
  try {
    let store = fs.readFileSync(path, 'cbor');

    if (
      store.settings.currentMode != undefined ||
      store.settings.currentMode != null
    ) {
      let tracker = new MmmTracker(store.settings);

      return tracker;
    } else {
      return null;
    }
  } catch (e) {
    fs.writeFileSync(CONFIG.MmmTrackerPath, CONFIG.settings, 'cbor');
    let tracker = new MmmTracker(CONFIG.settings);
    return tracker;
  }
};
