import Assets from "./Assets";
import { drawCenterImage, isOnTheField } from "./helpers";

export default class Ammo {
  constructor(ctx, player, options) {
    this.options = Object.assign({}, {
      mode: Ammo.modes.regular
    }, options);

    this.position =
      this.options.mode === Ammo.modes.regular
        ? player.sightPosition
        : player.position.sub(player.sightPosition.sub(player.position));
    this.vel =
      this.options.mode === Ammo.modes.regular
        ? player.sightDirection.normalize()
        : player.sightDirection.mult(-1).normalize();
    this.ctx = ctx;
    this.active = true;
  }

  static modes = {
    regular: 'regular',
    opposite: 'opposite',
  };

  static size = 10;

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