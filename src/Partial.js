import { getRandom } from "./helpers";
import Vector from "./Vector";

export default class Partial {
  constructor(ctx, pos) {
    this.ctx = ctx;
    this.size = getRandom(10, 50);
    this.position = pos.add(Vector.random().mult(getRandom(1, 5)));
    this.dir = this.position.sub(pos);
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
    // console.log('partial draw: ', this.position, this.size);
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.beginPath();

    this.ctx.fillStyle = `hsl(${this.colorAngle}, 100%, 40%)`;
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}