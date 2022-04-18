import { drawCenterImage, getRandom, getRandomFromArray } from "./helpers";
import Vector from "./Vector";
import consts from "./consts";
import Assets from "./Assets";

const possiblePerkType = [
  consts.PERK_HEALTH,
  consts.PERK_DOUBLE_BULLET,
  consts.PERK_ARMOR,
];

export default class Perk {
  constructor(ctx) {
    this.ctx = ctx;
    this.position = new Vector(getRandom(0, consts.CANVAS_WIDTH), getRandom(0, consts.CANVAS_HEIGHT));
    this.size = consts.PERCENT_WIDTH * 3;
    this.opacity = 1;
    this.type = getRandomFromArray(possiblePerkType);
    this.hidden = true;

    setTimeout(() => {
      this.hidden = false;
    }, getRandom(10, 200) * 100);
  }

  isActive() {
    return this.opacity > 0;
  }

  effect(player) {
    switch (this.type) {
      case consts.PERK_HEALTH:
        player.increaseHealth(10);
        break;
      case consts.PERK_DOUBLE_BULLET:
        player.setSecondGun(true, 30000);
        break;
      case consts.PERK_ARMOR:
        player.setArmor(true, 10000);
        break;
    }
  }

  update() {
    if (this.hidden) return;
 
    if (this.opacity > 0) {
      this.opacity -= 0.001;
    }

    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    drawCenterImage(this.ctx, Assets.images[this.type], x, y, this.size * 2, this.size * 2);
    this.ctx.restore();
  }
}