import Assets from "./Assets";
import { drawCenterImage, isOnTheField } from "./helpers";
import Vector from "./Vector";

export default class Ammo {
  constructor(ctx, game, options) {
    this.ctx = ctx;
    this.game = game;
    this.player = game.player;
    this.active = true;
    this.speed = this.player.bulletSpeed;
    this.options = Object.assign({}, {
      mode: Ammo.modes.regular,
      iceBullets: false,
      missilesBullets: false,
    }, options);

    this.position =
      this.options.mode === Ammo.modes.regular
        ? this.player.sightPosition
        : this.player.position.sub(this.player.sightPosition.sub(this.player.position));
    this.vel =
      this.options.mode === Ammo.modes.regular
        ? this.player.sightDirection.normalize()
        : this.player.sightDirection.mult(-1).normalize();
    this.closestEnemy = this.getClosestEnemy();
    this.acc = new Vector(0, 0);
  }

  static modes = {
    regular: 'regular',
    opposite: 'opposite',
  };

  static size = 10;

  get isActive() {
    return isOnTheField(this.position) && this.active;
  }

  get closestEnemyVector() {
    return this.closestEnemy.position.sub(this.position).normalize();
  }

  getClosestEnemy() {
    const enemies = this.game.enemyPool.pool;
    return enemies.reduce((acc, enemy) => {
      if (this.position.sub(enemy.position).mag() <= this.position.sub(acc.position).mag()) {
        return enemy;
      }
      return acc;
    }, enemies[0]);
  }

  remove() {
    this.active = false;
  }

  update() {
    if (this.options.missilesBullets && !this.closestEnemy.isDead) {
      this.acc = this.acc.add(this.closestEnemyVector);
    }

    this.vel = this.vel.add(this.acc).setMag(this.options.missilesBullets ? this.speed + 5 : this.speed);
    this.position = this.position.add(this.vel);

    this.draw();

    // set acc to 0,0
    this.acc = new Vector(0, 0);
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(this.vel.heading());
    const ammoImg = this.options.iceBullets ? Assets.images.iceBullet : Assets.images.bullet;
    drawCenterImage(this.ctx, ammoImg, 0, 0, Ammo.size * 2, Ammo.size * 2);
    this.ctx.restore();
  }
}