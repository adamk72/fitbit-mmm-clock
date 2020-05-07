// import { outerArcs, innerArcs } from './arcs';
import { MmmMode } from './modes';
import * as fs from 'fs';
import { CONFIG } from './config';

const HOUR_DEGREE_INCREMENT = 360 / 60 / 60; // it updates in seconds.
const DAY_DEGREE_INCREMENT = 360 / 24 / 60 / 60;

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

  this.resetShortCnt = () => {
    this.monkShortCnt = 0;
    this.monsterShortCnt = 0;
    this.marshmallowShortCnt = 0;
  };

  this.resetLongCnt = () => {
    this.monkLongCnt = 0;
    this.monsterLongCnt = 0;
    this.marshmallowLongCnt = 0;
  };

  this.updateOnTick = () => {
    switch (this.currentMode) {
      case MmmMode.monk:
        this.monkShortCnt = this.monkShortCnt + HOUR_DEGREE_INCREMENT;
        this.monkLongCnt = this.monkLongCnt + DAY_DEGREE_INCREMENT;
        this.monkLongCnt > this.monsterLongCnt &&
        this.monkLongCnt > this.marshmallowLongCnt
          ? (this.outerColor = 'fb-peach')
          : null;
        this.monkShortCnt > this.monsterShortCnt &&
        this.monkShortCnt > this.marshmallowShortCnt
          ? (this.innerColor = 'fb-peach')
          : null;
        return;
      case MmmMode.monster:
        this.monsterShortCnt = this.monsterShortCnt + HOUR_DEGREE_INCREMENT;
        this.monsterLongCnt = this.monsterLongCnt + DAY_DEGREE_INCREMENT;
        this.monsterLongCnt > this.monkLongCnt &&
        this.monsterLongCnt > this.marshmallowLongCnt
          ? (this.outerColor = 'fb-red')
          : null;
        this.monsterShortCnt > this.monkShortCnt &&
        this.monsterShortCnt > this.marshmallowShortCnt
          ? (this.innerColor = 'fb-red')
          : null;
        return;
      case MmmMode.marshmallow:
        this.marshmallowShortCnt =
          this.marshmallowShortCnt + HOUR_DEGREE_INCREMENT;
        this.marshmallowLongCnt =
          this.marshmallowLongCnt + DAY_DEGREE_INCREMENT;
        this.marshmallowLongCnt > this.monsterLongCnt &&
        this.marshmallowLongCnt > this.monkLongCnt
          ? (this.outerColor = 'fb-white')
          : null;
        this.marshmallowShortCnt > this.monsterShortCnt &&
        this.marshmallowShortCnt > this.monkShortCnt
          ? (this.innerColor = 'fb-white')
          : null;
        return;
      case MmmMode.pause:
      default:
        return;
    }
  };

  this.getShortCnt = (mode) => {
    switch (mode) {
      case MmmMode.monk:
        return this.monkShortCnt;
      case MmmMode.monster:
        return this.monsterShortCnt;
      case MmmMode.marshmallow:
        return this.marshmallowShortCnt;
      case MmmMode.pause:
      default:
        return;
    }
  };

  this.getLongCnt = (mode) => {
    switch (mode) {
      case MmmMode.monk:
        return this.monkLongCnt;
      case MmmMode.monster:
        return this.monsterLongCnt;
      case MmmMode.marshmallow:
        return this.marshmallowLongCnt;
      case MmmMode.pause:
      default:
        return;
    }
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

  this.monkMin = (m) => {
    this.monkShortCnt = m;
  };
  this.monsterMin = (m) => {
    this.monsterShortCnt = m;
  };
  this.marshmallowMin = (m) => {
    this.marshmallowShortCnt = m;
  };

  this.monkHr = (m) => {
    this.monkLongCnt = m;
  };
  this.monsterHr = (m) => {
    this.monsterLongCnt = m;
  };
  this.marshmallowHr = (m) => {
    this.marshmallowLongCnt = m;
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
