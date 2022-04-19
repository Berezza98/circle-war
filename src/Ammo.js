import Assets from "./Assets";
import { drawCenterImage, isOnTheField } from "./helpers";

export default class Ammo {
  constructor(ctx, game, options) {
    this.ctx = ctx;
    this.game = game;
    this.player = game.player;
    this.active = true;
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
    this.closestEnemyVector = this.getClosestEnemyVector();
  }

  static modes = {
    regular: 'regular',
    opposite: 'opposite',
  };

  static size = 10;

  get isActive() {
    return isOnTheField(this.position) && this.active;
  }

  getClosestEnemyVector() {
    const enemies = this.game.enemyPool.pool;
    const closest = enemies.reduce((acc, enemy) => {
      if (this.position.sub(enemy.position).mag() <= this.position.sub(acc.position).mag()) {
        return enemy;
      }
      return acc;
    }, enemies[0]);

    return closest.position.sub(this.position).normalize();
  }

  remove() {
    this.active = false;
  }

  update() {
    this.position = this.position.add(this.options.missilesBullets ? this.closestEnemyVector : this.vel);

    this.draw();
  }

  draw() {
    const { x, y } = this.position;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(this.options.missilesBullets ? this.closestEnemyVector.heading() : this.vel.heading());
    const ammoImg = this.options.isIceAmmo ? Assets.images.iceBullet : Assets.images.bullet;
    drawCenterImage(this.ctx, ammoImg, 0, 0, Ammo.size * 2, Ammo.size * 2);
    this.ctx.restore();
  }
}