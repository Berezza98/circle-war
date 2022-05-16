import { drawCenterImage, getRandom } from "./helpers";
import Vector from "./Vector";

export default class Partial {
  constructor(ctx, options = {}) {
    this.ctx = ctx;
    this.options = options;
    this.size = getRandom(5, 30);
    this.position = options.pos.add(Vector.random().mult(options.offset || getRandom(1, 5)));
    this.dir = this.position.sub(options.pos).normalize();
    this.opacity = 1;
  }

  update(deltaTime) {
    const opacityStep = 0.01 * deltaTime;
    
    if (this.opacity > 0) {
      this.opacity = this.opacity - opacityStep <= 0 ? 0 : this.opacity - opacityStep;
    }

    this.position = this.position.add(this.dir.mult(deltaTime));

    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.globalAlpha = this.opacity;
    if (this.options.image) {
      drawCenterImage(this.ctx, this.options.image, x, y, this.size * 2, this.size * 2);
    } else {
      this.ctx.fillStyle = this.options.color || 'blue';
      this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
      this.ctx.fill();
    }
    this.ctx.stroke();
    this.ctx.restore();
  }
}