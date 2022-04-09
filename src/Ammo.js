import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./consts";

export default class Ammo {
  constructor(ctx, playerPosition, sightPosition) {
    this.position = sightPosition;

    this.vel = sightPosition.sub(playerPosition).normalize();
    this.size = 5;
    this.active = false;
    this.ctx = ctx;
  }

  static size = 5;
  static color = 'red';

  update() {
    this.position = this.position.add(this.vel.mult(1));
    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.ctx.beginPath();
    this.ctx.arc(x, y, Ammo.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = Ammo.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}