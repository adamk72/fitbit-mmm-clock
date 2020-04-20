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
  this.monkCnt = 0;
  this.monsterCnt = 0;
  this.marshmallowCnt = 0;
  this.pauseCnt = 0;

  this.setCurrentMode = (mode) => {
    this.currentMode = mode;
  };

  this.update = () => {
    console.log(this.currentMode);
    switch (this.currentMode) {
      case MmmMode.monk:
        this.monkCnt = this.monkCnt + 1;
        return;
      case MmmMode.monster:
        this.monsterCnt = this.monsterCnt + 1;
        return;
      case MmmMode.marshmallow:
        this.marshmallowCnt = this.marshmallowCnt + 1;
        return;
      case MmmMode.pause:
        this.pauseCnt = this.pauseCnt + 1;
        return;
      default:
        return;
    }
  };

  this.getCount = (mode) => {
    switch (mode) {
      case MmmMode.monk:
        return this.monkCnt;
      case MmmMode.monster:
        return this.monsterCnt;
      case MmmMode.marshmallow:
        return this.marshmallowCnt;
      case MmmMode.pause:
        return this.pauseCnt;
      default:
        return;
    }
  };

  this.countTotal = () => {
    return this.monkCnt + this.marshmallowCnt + this.monsterCnt;
  };
}
