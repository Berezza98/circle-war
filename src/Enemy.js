import consts from "./consts";
import { getRandomFromArray } from "./helpers";
import PartialSystem from "./PartialSystem";
import Vector from './Vector';

const possibleDelay = [0, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 8000, 10000];
const possibleMagnitude = [100, 200, 250, 300, 350, 400];
const possibleHealth = [100, 120, 130, 140, 200, 250, 300];
const possibleColors = ['red', 'blue', 'lightblue', 'yellow', 'orange'];

export default class Enemy {
  constructor(ctx, player) {
    this.player = player;
    this.health = getRandomFromArray(possibleHealth);
    this.position = this.player.position.add(Vector.random().setMag(ctx.canvas.clientWidth / 2 + getRandomFromArray(possibleMagnitude)));
    this.delay = getRandomFromArray(possibleDelay);
    this.color = getRandomFromArray(possibleColors);
    this.ctx = ctx;
    this.speed = consts.PERCENT_WIDTH / 15;
    this.hidden = true;
    this.deadHealthLevel = 20;
    this.partialSystems = [];
    
    setTimeout(() => {
      this.hidden = false;
    }, this.delay);
  }

  get size() {
    return (this.health / 100) * 5 * consts.PERCENT_WIDTH;
  }

  get isDead() {
    return this.health <= this.deadHealthLevel;
  }

  get vel() {
    return this.player.position.sub(this.position).normalize().mult(this.speed);
  }

  hit() {
    if (this.isDead) return;

    this.health -= 10;

    const options = {
      color: this.color,
      offset: this.size,
      pos: this.position,
    };

    this.partialSystems.push(new PartialSystem(this.ctx, options));
  }

  update() {
    if (this.hidden) return;
 
    this.position = this.position.add(this.vel);

    this.partialSystems.forEach(ps => ps.update());
    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.health - this.deadHealthLevel, x, y);
    this.ctx.stroke();
    this.ctx.restore();
  }
}