import Vector from './Vector';
import Ammo from './Ammo';
import KeyboardHandler from './KeyboardHandler';
import { getMinMax } from './helpers';

export default class Player extends KeyboardHandler {
  constructor(ctx) {
    super(ctx);

    this.position = new Vector(0, 0);
    this.shootVector = new Vector(0, 1);
    this.ctx = ctx;
    this.health = 100;
  }

  get sightPosition() {
    return this.position.add(this.shootVector.setMag(this.health));
  }

  hit(value) {
    if (this.health <= 10) return;

    this.health -= value * 10;
  }

  update() {
    if (this.keyboard.leftActive) {
      this.shootVector = Vector.fromAngle(this.shootVector.heading() + 0.05);
    }

    if (this.keyboard.rightActive) {
      this.shootVector = Vector.fromAngle(this.shootVector.heading() - 0.05);
    }

    if (this.touch.x !== 0) {
      const { clientWidth: canvasWidth } = this.ctx.canvas;
      this.shootVector = Vector.fromAngle(this.shootVector.heading() - getMinMax(0.05, -0.05, -canvasWidth / 2, canvasWidth / 2, this.touch.x - canvasWidth / 2));
    }

    this.draw();
  }

  draw() {
    const { x, y } = this.position;
    
    this.ctx.save();
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.health, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.stroke();

    // health text
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.health, 0, 0);

    //scope drawing
    this.ctx.beginPath();
    this.ctx.arc(this.sightPosition.x, this.sightPosition.y, Ammo.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = Ammo.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}