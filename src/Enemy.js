import { getMinMax, getRandomFromArray } from "./helpers";
import Vector from './Vector';

const possibleDelay = [0, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 8000, 10000];
const possibleMagnitude = [500, 600, 700, 800, 900, 1000];
const possibleSize = [100, 120, 130, 140, 200, 250, 300];
const possibleColors = ['red', 'blue', 'lightblue', 'yellow', 'orange'];

export default class Enemy {
  constructor(ctx) {
    this.size = getRandomFromArray(possibleSize);
    this.position = Vector.random().setMag(getRandomFromArray(possibleMagnitude));
    this.delay = getRandomFromArray(possibleDelay);
    this.color = getRandomFromArray(possibleColors);
    this.ctx = ctx;
    this.speed = 1;
    this.hidden = true;
    this.deadSize = 20;
    
    setTimeout(() => {
      this.hidden = false;
    }, this.delay);
  }

  get isDead() {
    return this.size <= this.deadSize;
  }

  get vel() {
    const centerVector = new Vector(0, 0);
    return centerVector.sub(this.position).normalize().mult(this.speed);
  }

  hit() {
    if (this.isDead) return;

    this.size -= 10;
  }

  update() {
    if (this.hidden) return;
 
    this.position = this.position.add(this.vel);
  
    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.size - this.deadSize, x, y);
    this.ctx.stroke();
    this.ctx.restore();
  }
}