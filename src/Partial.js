import consts from "./consts";
import { getRandom } from "./helpers";
import Vector from "./Vector";

export default class Partial {
  constructor(ctx, options = {}) {
    this.ctx = ctx;
    this.options = options;
    this.size = getRandom(5, consts.CANVAS_WIDTH / 50);
    this.position = options.pos.add(Vector.random().mult(options.offset || getRandom(1, 5)));
    this.dir = this.position.sub(options.pos).normalize();
    this.opacity = 1;
  }

  update() {
    if (this.opacity > 0) {
      this.opacity = this.opacity - 0.01 <= 0 ? 0 : this.opacity - 0.01;
    }

    this.position = this.position.add(this.dir);

    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = this.options.color || 'blue';
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}