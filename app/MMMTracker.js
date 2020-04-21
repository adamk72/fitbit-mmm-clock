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
        this.monkHrCnt = this.monkHrCnt + 1;
        this.monkMinCnt = this.monkMinCnt + 1;
        console.log('min/hr: ' + this.monkMinCnt + '/' + this.monkHrCnt);
        return;
      case MmmMode.monster:
        this.monsterHrCnt = this.monsterHrCnt + 1;
        this.monsterMinCnt = this.monsterMinCnt + 1;
        return;
      case MmmMode.marshmallow:
        this.marshmallowHrCnt = this.marshmallowHrCnt + 1;
        this.marshmallowMinCnt = this.marshmallowMinCnt + 1;
        return;
      case MmmMode.pause:
        this.pauseHrCnt = this.pauseHrCnt + 1;
        this.pauseMinCnt = this.pauseMinCnt + 1;
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

  this.countMinTotal = () => {
    return (
      this.monkMinCnt +
      this.marshmallowMinCnt +
      this.monsterMinCnt +
      this.pauseMinCnt
    );
  };

  this.countHrTotal = () => {
    return (
      this.monkHrCnt +
      this.marshmallowHrCnt +
      this.monsterHrCnt +
      this.pauseHrCnt
    );
  };
}
