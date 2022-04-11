import { isOnTheField } from "./helpers";

export default class Ammo {
  constructor(ctx, playerPosition, sightPosition) {
    this.position = sightPosition;

    this.vel = sightPosition.sub(playerPosition).normalize();
    this.size = 5;
    this.active = false;
    this.ctx = ctx;
    this.active = true;
  }

  static size = 5;
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
    // this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.ctx.beginPath();
    this.ctx.arc(x, y, Ammo.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = Ammo.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}