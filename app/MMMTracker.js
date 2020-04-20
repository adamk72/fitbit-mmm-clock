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
      case MmmMode.monster:
        this.monsterCnt = this.monsterCnt + 1;
        return;
      case MmmMode.marshmallow:
        this.marshmallowCnt = this.marshmallowCnt + 1;
        return;
      default:
        return;
    }
  };

  this.getCount = (mode) => {
    switch (mode) {
      case MmmMode.monk:
        console.log('Monk:', this.monkCnt);
        return this.monkCnt;
      case MmmMode.monster:
        console.log('Monster:', this.monsterCnt);
        return this.monsterCnt;
      case MmmMode.marshmallow:
        console.log('Marshmallow', this.marshmallowCnt);
        return this.marshmallowCnt;
      default:
        return;
    }
  };

  this.countTotal = () => {
    return this.monkCnt + this.marshmallowCnt + this.monsterCnt;
  };
}
