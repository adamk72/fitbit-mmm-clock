export const MmmMode = {
  monk: 'monk',
  monster: 'monster',
  marshmallow: 'marshmallow',
  pause: 'pause',
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
  this.pauseMinCnt = 0;
  this.monkHrCnt = 0;
  this.monsterHrCnt = 0;
  this.marshmallowHrCnt = 0;
  this.pauseHrCnt = 0;

  this.setCurrentMode = (mode) => {
    this.currentMode = mode;
  };

  this.resetMinutes = () => {
    this.monkMinCnt = 0;
    this.monsterMinCnt = 0;
    this.marshmallowMinCnt = 0;
    this.pauseMinCnt = 0;
  };

  this.resetHours = () => {
    this.monkHrCnt = 0;
    this.monsterHrCnt = 0;
    this.marshmallowHrCnt = 0;
    this.pauseHrCnt = 0;
  };

  this.update = () => {
    // console.log('Curr Mode:' + this.currentMode);
    switch (this.currentMode) {
      case MmmMode.monk:
        this.monkMinCnt = this.monkMinCnt + 1;
        this.monkHrCnt = this.monkMinCnt + 1;
        return;
      case MmmMode.monster:
        this.monsterMinCnt = this.monsterMinCnt + 1;
        this.monsterHrCnt = this.monsterMinCnt + 1;
        return;
      case MmmMode.marshmallow:
        this.marshmallowMinCnt = this.marshmallowMinCnt + 1;
        this.marshmallowHrCnt = this.marshmallowMinCnt + 1;
        return;
      case MmmMode.pause:
        this.pauseMinCnt = this.pauseMinCnt + 1;
        this.pauseHrCnt = this.pauseMinCnt + 1;
        return;
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
        return this.pauseMinCnt;
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
        return this.pauseHrCnt;
      default:
        return;
    }
  };

  this.countTotal = () => {
    return this.monkCnt + this.marshmallowCnt + this.monsterCnt + this.pauseCnt;
  };
}
