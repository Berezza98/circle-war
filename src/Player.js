import Vector from './Vector';
import InputHandler from './InputHandler';
import Assets from './Assets';
import { drawCenterImage, isMobile } from './helpers';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './consts';
import Menu from './Menu';

export default class Player extends InputHandler {
  constructor(game) {
    super(game.ctx);

    this.ctx = game.ctx;
    this.game = game;
    this.gamepad = game.gamepad;
    this.position = new Vector(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.shootVector = new Vector(0, 1);
    this.vel = new Vector(0, 0);
    this.health = 100;
    this.strength = 10;
    this.bulletSpeed = 2;
    this.joystickLeft = game.joystickLeft;
    this.joystickRight = game.joystickRight;
    this.secondGunAvailable = false;
    this.secondGunTimer = null;
    this.activeArmor = false;
    this.activeArmorTimer = null;
  }

  get sightPosition() {
    return this.position.add(this.shootVector.setMag(this.size * 1.6));
  }

  get sightDirection() {
    return this.sightPosition.sub(this.position);
  }

  get size() {
    return this.health + 20;
  }

  setArmor(value, time) {
    clearTimeout(this.activeArmorTimer);
    this.activeArmor = value;

    if (!time) return;

    this.activeArmorTimer = setTimeout(() => {
      this.activeArmor = !value;
    }, time);
  }

  setSecondGun(value, time) {
    clearTimeout(this.secondGunTimer);
    this.secondGunAvailable = value;

    if (!time) return;

    this.secondGunTimer = setTimeout(() => {
      this.secondGunAvailable = !value;
    }, time);
  }

  increaseBulletSpeed(value) {
    if (typeof value !== 'number') throw Error('Expected number argument, but got: ', typeof value);

    this.bulletSpeed += value;
  }

  increaseStrength(value) {
    if (typeof value !== 'number') throw Error('Expected number argument, but got: ', typeof value);

    this.strength += value;
  }

  increaseHealth(value) {
    if (typeof value !== 'number') throw Error('Expected number argument, but got: ', typeof value);

    this.health += value;
  }

  async hit(value) {
    if (this.health <= 10) {
      await this.game.stop();
      return Menu.create();
    }

    this.health -= value * 10;
  }

  frictionForce() {
    this.vel = this.vel.mult(0.9);
  }

  update() {
    const speed = 1;

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

    if (this.gamepad.canUse) {
      this.vel = this.vel.add(this.gamepad.leftAxes.mult(speed));

      if (this.gamepad.rightAxes.mag() > 0.8) {
        this.shootVector = Vector.fromAngle(this.gamepad.rightAxes.heading());
      }
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

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(this.sightDirection.heading());
    drawCenterImage(this.ctx, Assets.images.me, 0, 0, this.size * 2, this.size * 2);
    // Add gun
    drawCenterImage(this.ctx, Assets.images.gun, this.size, 25 * this.health / 100, this.size, this.size);
    if (this.secondGunAvailable) {
      drawCenterImage(this.ctx, Assets.images.gunOpposite, -this.size, 25 * this.health / 100, this.size, this.size);
    }

    this.ctx.restore();


    // health text
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.health, x, y);

    this.ctx.restore();
  }
}