// import { outerArcs, innerArcs } from './arcs';
import { MmmMode, MmmIndex } from './modes';
import * as fs from 'fs';
import { CONFIG } from './config';

export const MmmTimerState = {
  running: 'running',
  paused: 'paused',
};

export function MmmTracker(settings) {
  this.currentMode = settings.currentMode;
  this.monkShortCnt = settings.monkShortCnt;
  this.monsterShortCnt = settings.monsterShortCnt;
  this.marshmallowShortCnt = settings.marshmallowShortCnt;
  this.monkLongCnt = settings.monkLongCnt;
  this.monsterLongCnt = settings.monsterLongCnt;
  this.marshmallowLongCnt = settings.marshmallowLongCnt;

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
    MmmMode[MmmIndex.current].initTime = mode.initTime;
    MmmMode[MmmIndex.current].shortCount = mode.shortCount;
    MmmMode[MmmIndex.current].longCount = mode.longCount;
    MmmMode[MmmIndex.current].color = mode.color;
    MmmMode[MmmIndex.current].name = mode.name;
    MmmMode[MmmIndex.current].index = mode.index;
  };

  this.getCurrentMode = () => {
    return MmmMode[MmmIndex.current];
  };

  this.updateModeCountOnTick = () => {
    const currentMode = MmmMode[MmmIndex.current];

    if (currentMode && currentMode.name != 'Current') {
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

  this.getShortCnt = (index) => {
    MmmMode[index].shortCount;
  };

  this.getLongCnt = (index) => {
    MmmMode[index].longCount;
  };

  this.countShortTotal = () => {
    return this.monkShortCnt + this.marshmallowShortCnt + this.monsterShortCnt;
  };

  this.countLongTotal = () => {
    return this.monkLongCnt + this.marshmallowLongCnt + this.monsterLongCnt;
  };

  this.saveToFile = (path) => {
    let storedObj = {
      settings: {
        currentMode: this.currentMode,
        monkShortCnt: this.monkShortCnt,
        monsterShortCnt: this.monsterShortCnt,
        marshmallowShortCnt: this.marshmallowShortCnt,
        monkLongCnt: this.marshmallowShortCnt,
        monsterLongCnt: this.marshmallowShortCnt,
        marshmallowLongCnt: this.marshmallowShortCnt,
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
