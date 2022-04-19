import Assets from "./Assets";
import { drawCenterImage, getRandomFromArray } from "./helpers";
import PartialSystem from "./PartialSystem";
import Vector from './Vector';
import consts from "./consts";
import { enemies } from "./aseetsConfig";

const possibleDelay = [0, 500, 1000, 1500, 2000, 3000, 4000, 5000, 7000, 8000, 10000];
const possibleMagnitude = [100, 200, 250, 300, 350, 400];
const possibleHealth = [100, 120, 130, 140, 200, 250, 300];

export default class Enemy {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.player = player;
    this.health = getRandomFromArray(possibleHealth);
    this.position = this.player.position.add(Vector.random().setMag(ctx.canvas.clientWidth / 2 + getRandomFromArray(possibleMagnitude)));
    this.delay = getRandomFromArray(possibleDelay);
    this.image = Assets.images[getRandomFromArray(Object.keys(enemies))];
    this.speed = 1;
    this.hidden = true;
    this.deadHealthLevel = 20;
    this.partialSystems = [];
    this.isFreezed = false;
    this.freezedTimer = null;
    
    setTimeout(() => {
      this.hidden = false;
    }, this.delay);
  }

  get size() {
    return this.health;
  }

  get isDead() {
    return this.health <= this.deadHealthLevel;
  }

  get vel() {
    return this.player.position.sub(this.position).normalize().mult(this.speed);
  }

  setFreezed(value, time) {
    clearTimeout(this.freezedTimer);
    this.isFreezed = value;

    if (!time) return;

    this.freezedTimer = setTimeout(() => {
      this.isFreezed = !value;
    }, time);
  }

  hit() {
    if (this.isDead) return;

    this.health -= 10;

    const options = {
      image: this.image,
      offset: this.size,
      pos: this.position,
    };

    this.partialSystems.push(new PartialSystem(this.ctx, options));
  }

  update() {
    if (this.hidden) return;
 
    this.position = this.position.add(this.isFreezed ? new Vector(0, 0) : this.vel);

    this.partialSystems.forEach(ps => ps.update());
    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.beginPath();
    // width and height X2 because SIZE was radius
    drawCenterImage(this.ctx, this.image, x, y, this.size * 2, this.size * 2);
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.health - this.deadHealthLevel, x, y);
    this.ctx.stroke();
    this.ctx.restore();
  }
}