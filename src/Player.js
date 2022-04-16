import Vector from './Vector';
import Ammo from './Ammo';
import InputHandler from './InputHandler';
import Assets from './Assets';
import { drawCenterImage, isMobile } from './helpers';
import consts from './consts';

export default class Player extends InputHandler {
  constructor(game) {
    super(game.ctx);

    this.ctx = game.ctx;
    this.game = game;
    this.position = new Vector(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.shootVector = new Vector(0, 1);
    this.vel = new Vector(0, 0);
    this.health = 100;
    this.joystickLeft = game.joystickLeft;
    this.joystickRight = game.joystickRight;
  }

  get sightPosition() {
    return this.position.add(this.shootVector.setMag(this.size));
  }

  get size() {
    return (this.health / 100) * 5 * consts.PERCENT_WIDTH + 20;
  }

  hit(value) {
    if (this.health <= 10) {
      return this.game.stop();
    }

    this.health -= value * 10;
  }

  frictionForce() {
    this.vel = this.vel.mult(0.9);
  }

  update() {
    const speed = consts.PERCENT_WIDTH / 20;

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
      this.vel = this.vel.add(this.joystickLeft.data.mult(speed));
      this.shootVector = Vector.fromAngle(this.joystickRight.data.heading());
    }

    this.frictionForce();
    this.position = this.position.add(this.vel).setMinLimit(new Vector(this.size, this.size)).setMaxLimit(new Vector(consts.CANVAS_WIDTH - this.size, consts.CANVAS_HEIGHT - this.size));

    this.draw();
  }

  draw() {
    const { x, y } = this.position;
    
    this.ctx.save();
    // this.ctx.translate();
    this.ctx.beginPath();

    this.ctx.save();
    this.ctx.translate(x, y);
    const rotationVector = this.sightPosition.sub(this.position);
    this.ctx.rotate(rotationVector.heading());
    drawCenterImage(this.ctx, Assets.images.me, 0, 0, this.size * 2, this.size * 2);
    // Add gun
    drawCenterImage(this.ctx, Assets.images.gun, this.size, 0, this.size, this.size);
    this.ctx.restore();


    // health text
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.health, x, y);

    //scope drawing
    drawCenterImage(this.ctx, Assets.images.bullet, this.sightPosition.x, this.sightPosition.y, Ammo.size * 2, Ammo.size * 2);
    this.ctx.restore();
  }
}