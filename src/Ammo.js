import Vector from "./Vector";

export default class Ammo {
  constructor(ctx, position, velocity) {
    this.position = position;
    this.vel = velocity;
    this.size = 5;
    this.active = false;
    this.ctx = ctx;
  }

  static size = 5;
  static color = 'red';

  update() {
    // if (this.active) {

    // }

    this.position = this.position.add(this.vel.mult(1));
    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.beginPath();
    this.ctx.arc(x, y, Ammo.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = Ammo.color;
    this.ctx.fill();
    this.ctx.stroke();
  }
}