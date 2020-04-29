// import { outerArcs, innerArcs } from './arcs';
import { MmmMode } from './modes';
import * as fs from 'fs';
import { CONFIG } from './config';
import { format } from 'url';

const HOUR_DEGREE_INCREMENT = 360 / 60 / 60; // it updates in seconds.
const DAY_DEGREE_INCREMENT = 360 / 24 / 60 / 60;

export const MmmTimerState = {
  running: 'running',
  paused: 'paused',
};

export function MmmTracker(settings) {
  this.currentMode = settings.currentMode;
  this.monkMinCnt = settings.monkMinCnt;
  this.monsterMinCnt = settings.monsterMinCnt;
  this.marshmallowMinCnt = settings.marshmallowMinCnt;
  this.monkHrCnt = settings.monkHrCnt;
  this.monsterHrCnt = settings.monsterHrCnt;
  this.marshmallowHrCnt = settings.marshmallowHrCnt;

  this.innerColor = 'fb-blue';
  this.outerColor = 'fb-blue';

  this.justReset = false;

  this.getJustReset = () => {
    return this.justReset;
  };

  this.setJustReset = (bool) => {
    this.justReset = bool;
  };

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

  this.saveToFile = (path) => {
    let storedObj = {
      settings: {
        currentMode: this.currentMode,
        monkMinCnt: this.monkMinCnt,
        monsterMinCnt: this.monsterMinCnt,
        marshmallowMinCnt: this.marshmallowMinCnt,
        monkHrCnt: this.marshmallowMinCnt,
        monsterHrCnt: this.marshmallowMinCnt,
        marshmallowHrCnt: this.marshmallowMinCnt,
      },
    };
    console.log(storedObj.settings.currentMode);
    console.log(storedObj.settings.monkMinCnt);
    fs.writeFileSync(path, storedObj, 'cbor');
  };

  this.monkMin = (m) => {
    this.monkMinCnt = m;
  };
  this.monsterMin = (m) => {
    this.monsterMinCnt = m;
  };
  this.marshmallowMin = (m) => {
    this.marshmallowMinCnt = m;
  };

  this.monkHr = (m) => {
    this.monkHrCnt = m;
  };
  this.monsterHr = (m) => {
    this.monsterHrCnt = m;
  };
  this.marshmallowHr = (m) => {
    this.marshmallowHrCnt = m;
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
