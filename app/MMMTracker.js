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

  this.reset = () => {
    // console.log('reset');
    this.monkCnt = 0;
    this.monsterCnt = 0;
    this.marshmallowCnt = 0;
    this.pauseCnt = 0;
  };

  this.update = () => {
    // console.log('Curr Mode:' + this.currentMode);
    switch (this.currentMode) {
      case MmmMode.monk:
        this.monkMinCnt = this.monkMinCnt + 1;
        return;
      case MmmMode.monster:
        this.monsterMinCnt = this.monsterMinCnt + 1;
        return;
      case MmmMode.marshmallow:
        this.marshmallowMinCnt = this.marshmallowMinCnt + 1;
        return;
      case MmmMode.pause:
        this.pauseMinCnt = this.pauseMinCnt + 1;
        return;
      default:
        return;
    }
  };

  this.getCount = (mode) => {
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

  this.countTotal = () => {
    return this.monkCnt + this.marshmallowCnt + this.monsterCnt + this.pauseCnt;
  };
}
