import Ammo from "./Ammo";
import KeyboardHandler from "./KeyboardHandler";

export default class AmmoPool extends KeyboardHandler {
  constructor(ctx, player, enemies) {
    super();

    this.player = player;
    this.enemies = enemies;
    this.pool = [];
    this.maxSize = 200;
    this.ctx = ctx;
    this.delay = 50;
    this.canAdd = true;
  }

  addAmmo() {
    const { position, sightPosition } = this.player;

    if (this.pool.length < this.maxSize && this.canAdd) {
      this.pool.push(new Ammo(this.ctx, position, sightPosition));
      this.canAdd = false;

      setTimeout(() => this.canAdd = true, this.delay);
    }
  }

  checkHit() {
    this.pool.forEach((ammo) => {
      this.enemies.pool.forEach(enemy => {
        if (ammo.position.sub(enemy.position).mag() <= ammo.size + enemy.size) {
          enemy.hit();
          ammo.remove();
        }
      });
    });
  }

  update() {
    this.checkHit();

    // if (this.keyboard.spaceActive) {
    this.addAmmo();
    // }

    this.pool = this.pool.filter(ammo => ammo.isActive);

    this.pool.forEach(ammo => ammo.update());
  }
}