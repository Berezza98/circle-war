import Assets from "./Assets";
import { drawCenterImage, isOnTheField } from "./helpers";

export default class Ammo {
  constructor(ctx, playerPosition, sightPosition) {
    this.position = sightPosition;

    this.vel = sightPosition.sub(playerPosition).normalize();
    this.active = false;
    this.ctx = ctx;
    this.active = true;
  }

  static size = 10;
  static color = 'red';

  get isActive() {
    return isOnTheField(this.position) && this.active;
  }

  remove() {
    this.active = false;
  }

  update() {
    this.position = this.position.add(this.vel);
    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(this.vel.heading());
    drawCenterImage(this.ctx, Assets.images.bullet, 0, 0, Ammo.size * 2, Ammo.size * 2);
    this.ctx.restore();
  }
}