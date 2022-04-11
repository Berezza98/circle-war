import { getMinMax, getRandomFromArray } from "./helpers";
import Vector from './Vector';

const possibleDelay = [0, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 8000, 10000];
const possibleMagnitude = [100, 200, 250, 300, 350, 400];
const possibleSize = [100, 120, 130, 140, 200, 250, 300];
const possibleColors = ['red', 'blue', 'lightblue', 'yellow', 'orange'];

export default class Enemy {
  constructor(ctx, player) {
    this.player = player;
    this.size = getRandomFromArray(possibleSize);
    this.position = this.player.position.add(Vector.random().setMag(ctx.canvas.clientWidth / 2 + getRandomFromArray(possibleMagnitude)));
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
    return this.player.position.sub(this.position).normalize().mult(this.speed);
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
    // this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
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