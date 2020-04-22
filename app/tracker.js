const DEGREE_INCREMENT = 360 / 60;
export const MmmMode = {
  monk: 'Monk',
  monster: 'Monster',
  marshmallow: 'Marshmallow',
  pause: 'Idle',
};

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

  this.update = () => {
    switch (this.currentMode) {
      case MmmMode.monk:
        this.monkHrCnt = this.monkHrCnt + DEGREE_INCREMENT;
        this.monkMinCnt = this.monkMinCnt + DEGREE_INCREMENT;
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
        this.monsterHrCnt = this.monsterHrCnt + DEGREE_INCREMENT;
        this.monsterMinCnt = this.monsterMinCnt + DEGREE_INCREMENT;
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
        this.marshmallowHrCnt = this.marshmallowHrCnt + DEGREE_INCREMENT;
        this.marshmallowMinCnt = this.marshmallowMinCnt + DEGREE_INCREMENT;
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
}
