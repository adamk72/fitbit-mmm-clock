export const MmmMode = {
  monk: 'monk',
  monster: 'monster',
  marshmallow: 'marshmallow',
  pause: 'pause',
};

export function MmmTracker() {
  this.monkCnt = 0;
  this.monsterCnt = 0;
  this.marshmallowCnt = 0;

  this.update = (mode) => {
    switch (mode) {
      case MmmMode.monk:
        this.monkCnt = this.monkCnt + 1;
        return;
      default:
        return;
    }
  };

  this.getCount = (mode) => {
    switch (mode) {
      case MmmMode.monk:
        return this.monkCnt;
      default:
        return;
    }
  };
}
