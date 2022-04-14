import { getRandom } from "./helpers";
import Vector from "./Vector";

export default class Partial {
  constructor(ctx, pos, options = {}) {
    this.ctx = ctx;
    this.options = options;
    this.size = getRandom(10, 50);
    this.position = pos.add(Vector.random().mult(options.offset || getRandom(1, 5)));
    this.dir = this.position.sub(pos).normalize();

    this.colorAngle = 0;
  }

  update() {
    if (this.size > 0) {
      this.size = this.size - 1 <= 0 ? 0 : this.size - 1;
    }

    this.position = this.position.add(this.dir);
    this.colorAngle = (this.colorAngle + 10) % 360;

    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.beginPath();

    this.ctx.fillStyle = this.options.color || 'blue';
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}