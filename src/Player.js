import Vector from './Vector';
import Ammo from './Ammo';
import InputHandler from './InputHandler';
import { isMobile } from './helpers';
import { CANVAS_HEIGHT, CANVAS_WIDTH, PERCENT_WIDTH } from './consts';

export default class Player extends InputHandler {
  constructor(ctx, joystickLeft, joystickRight) {
    super(ctx);

    this.position = new Vector(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.shootVector = new Vector(0, 1);
    this.vel = new Vector(0, 0);
    this.ctx = ctx;
    this.health = 100;
    this.joystickLeft = joystickLeft;
    this.joystickRight = joystickRight;
  }

  get sightPosition() {
    return this.position.add(this.shootVector.setMag(this.size));
  }

  get size() {
    return (this.health / 100) * 5 * PERCENT_WIDTH;
  }

  hit(value) {
    if (this.health <= 10) return;

    this.health -= value * 10;
  }

  frictionForce() {
    this.vel = this.vel.mult(0.9);
  }

  update() {
    const speed = PERCENT_WIDTH / 15;

    if (this.keyboard.leftActive) {
      this.shootVector = Vector.fromAngle(this.shootVector.heading() - 0.05);
    }

    if (this.keyboard.rightActive) {
      this.shootVector = Vector.fromAngle(this.shootVector.heading() + 0.05);
    }

    if (this.keyboard.aActive) {
      this.vel = this.vel.add(new Vector(-speed, 0));
    }

    if (this.keyboard.dActive) {
      this.vel = this.vel.add(new Vector(speed, 0));
    }

    if (this.keyboard.wActive) {
      this.vel = this.vel.add(new Vector(0, -speed));
    }

    if (this.keyboard.sActive) {
      this.vel = this.vel.add(new Vector(0, speed));
    }

    if (isMobile.any()) {
      this.vel = this.vel.add(this.joystickLeft.data);
      this.shootVector = Vector.fromAngle(this.joystickRight.data.heading());
    }

    this.frictionForce();
    this.position = this.position.add(this.vel).setMinLimit(new Vector(this.size, this.size)).setMaxLimit(new Vector(CANVAS_WIDTH - this.size, CANVAS_HEIGHT - this.size));

    this.draw();
  }

  draw() {
    const { x, y } = this.position;
    
    this.ctx.save();
    // this.ctx.translate();
    this.ctx.beginPath();
    // Max size - 5% from screen width
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
    this.ctx.stroke();

    // health text
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.health, x, y);

    //scope drawing
    this.ctx.beginPath();
    this.ctx.arc(this.sightPosition.x, this.sightPosition.y, Ammo.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = Ammo.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}