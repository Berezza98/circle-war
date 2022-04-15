import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./consts";
import { getRandom, createCanvas } from "./helpers";
import Vector from "./Vector";

export default class Background {
  constructor() {
    this.ctx = createCanvas('bg');
    this.starLength = 200;
    this.stars = [];
    this.animation = null;

    this.init();
  }

  init() {
    for (let i = 0; i < this.starLength; i++) {
      this.stars.push(new Star(this.ctx));
    }
  }

  update() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    this.stars = this.stars.filter(star => star.isAlive);

    for (let i = 0; i < this.starLength - this.stars.length; i++) {
      this.stars.push(new Star(this.ctx));
    }

    this.draw();

    this.stars.forEach(star => star.update());
    this.animation = requestAnimationFrame(this.update.bind(this));
  }

  draw() {
    const { width, height } = this.ctx.canvas;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.restore();
  }

  start() {
    this.update();
  }

  stop() {
    cancelAnimationFrame(this.animation);
  }
}

class Star {
  constructor(ctx) {
    this.ctx = ctx;
    this.position = new Vector(getRandom(0, CANVAS_WIDTH), getRandom(0, CANVAS_HEIGHT));
    this.live = getRandom(100, 1000);
    this.size = getRandom(1, 4);
  }

  get isAlive() {
    return this.live > 0;
  }

  update() {
    this.live -= 1;

    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }
}