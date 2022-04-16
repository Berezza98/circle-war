import Ammo from "./Ammo";

export default class AmmoPool {
  constructor(game) {
    this.ctx = game.ctx;
    this.player = game.player;
    this.enemies = game.enemyPool;
    this.pool = [];
    this.delay = 50;
    this.canAdd = true;
  }

  addAmmo() {
    const { position, sightPosition } = this.player;

    if (this.canAdd) {
      this.pool.push(new Ammo(this.ctx, position, sightPosition));
      this.canAdd = false;

      setTimeout(() => this.canAdd = true, this.delay);
    }
  }

  checkHit() {
    this.pool.forEach((ammo) => {
      this.enemies.pool.forEach(enemy => {
        if (ammo.position.sub(enemy.position).mag() <= Ammo.size + enemy.size) {
          enemy.hit();
          ammo.remove();
        }
      });
    });
  }

  update() {
    this.checkHit();

    this.addAmmo();

    this.pool = this.pool.filter(ammo => ammo.isActive);

    this.pool.forEach(ammo => ammo.update());
  }
}