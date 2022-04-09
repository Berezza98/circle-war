import { CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';
import { getRandom, getRandomFromArray } from "./helpers";
import Vector from './Vector';

const possibleDelay = [0, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 8000, 10000];
const possibleMagnitude = [500, 600, 700, 800, 900, 1000];
const possibleSize = [20, 30, 40, 50, 60, 70, 80, 90, 10];

export default class Enemy {
  constructor(ctx) {
    this.size = getRandomFromArray(possibleSize);
    this.position = Vector.random().setMag(getRandomFromArray(possibleMagnitude));
    this.delay = getRandomFromArray(possibleDelay);
    this.ctx = ctx;
    this.speed = 1;
    this.hidden = true;
    
    setTimeout(() => {
      this.hidden = false;
    }, this.delay);
  }

  get vel() {
    const centerVector = new Vector(0, 0);
    return centerVector.sub(this.position).normalize().mult(this.speed);
  }

  update() {
    if (this.hidden) return;
 
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