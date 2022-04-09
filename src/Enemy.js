import { CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';
import { getRandom } from "./helpers";
import Vector from './Vector';

export default class Enemy {
  constructor(ctx) {
    this.size = getRandom(20, 40);
    this.position = Vector.random().setMag(300);
    this.ctx = ctx;
    this.speed = getRandom(1, 2);
    console.log(this.position, this.vel);
  }

  get vel() {
    const centerVector = new Vector(0, 0);
    return centerVector.sub(this.position).normalize().mult(this.speed);
  }

  update() {
    this.position = this.position.add(this.vel);
  
    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}