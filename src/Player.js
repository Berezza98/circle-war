import Vector from './Vector';
import Ammo from './Ammo';
import KeyboardHandler from './KeyboardHandler';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';

export default class Player extends KeyboardHandler {
  constructor(ctx) {
    super();

    this.position = new Vector(0, 0);
    this.shootVector = new Vector(0, 1);
    this.ctx = ctx;
    this.health = 100;
  }

  get sightPosition() {
    return this.position.add(this.shootVector.setMag(this.health));
  }

  update() {
    if (this.keyboard.leftActive) {
      this.shootVector = Vector.fromAngle(this.shootVector.heading() + 0.05);
    }

    if (this.keyboard.rightActive) {
      this.shootVector = Vector.fromAngle(this.shootVector.heading() - 0.05);
    }

    this.draw();
  }

  draw() {
    const { x, y } = this.position;
    
    this.ctx.save();
    this.ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.health, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.stroke();

    //scope drawing
    this.ctx.beginPath();
    this.ctx.arc(this.sightPosition.x, this.sightPosition.y, Ammo.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = Ammo.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}