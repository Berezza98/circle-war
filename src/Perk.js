import { drawCenterImage, getRandom, getRandomFromArray } from "./helpers";
import Vector from "./Vector";
import {
  PERK_ARMOR, PERK_DOUBLE_BULLET, PERK_HEALTH, PERK_ICE,
  PERK_MISSILES, CANVAS_HEIGHT, CANVAS_WIDTH,
} from "./consts";
import Assets from "./Assets";

const possiblePerkType = [
  PERK_HEALTH,
  PERK_DOUBLE_BULLET,
  PERK_ARMOR,
  PERK_ICE,
  PERK_MISSILES,
];

export default class Perk {
  constructor(ctx) {
    this.ctx = ctx;
    this.position = new Vector(getRandom(0, CANVAS_WIDTH), getRandom(0, CANVAS_HEIGHT));
    this.size = 40;
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

  effect(game) {
    const { player, ammoPool } = game;

    switch (this.type) {
      case PERK_HEALTH:
        player.increaseHealth(10);
        break;
      case PERK_DOUBLE_BULLET:
        player.setSecondGun(true, 30000);
        break;
      case PERK_ARMOR:
        player.setArmor(true, 10000);
        break;
      case PERK_ICE:
        ammoPool.setIceBullets(true, 15000);
        break;
      case PERK_MISSILES:
        ammoPool.setMissilesBullets(true, 15000);
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