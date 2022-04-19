import Ammo from "./Ammo";

export default class AmmoPool {
  constructor(game) {
    this.ctx = game.ctx;
    this.game = game;
    this.player = game.player;
    this.enemies = game.enemyPool;
    this.pool = [];
    this.delay = 100;
    this.canAdd = true;
    this.iceBullets = false;
    this.iceBulletsTimer = null;
    this.missilesBullets = false;
    this.missilesBulletsTimer = null;
  }

  setMissilesBullets(value, time) {
    clearTimeout(this.missilesBulletsTimer);
    this.missilesBullets = value;

    if (!time) return;

    this.missilesBulletsTimer = setTimeout(() => {
      this.missilesBullets = !value;
    }, time);
  }

  setIceBullets(value, time) {
    clearTimeout(this.iceBulletsTimer);
    this.iceBullets = value;

    if (!time) return;

    this.iceBulletsTimer = setTimeout(() => {
      this.iceBullets = !value;
    }, time);
  }

  addAmmo() {
    if (this.canAdd) {
      const options = {
        mode: Ammo.modes.regular,
        iceBullets: this.iceBullets,
        missilesBullets: this.missilesBullets,
      };

      this.pool.push(new Ammo(this.ctx, this.game, options));
      if (this.player.secondGunAvailable) {
        options.mode = Ammo.modes.opposite;
        this.pool.push(new Ammo(this.ctx, this.game, options));
      }
      this.canAdd = false;

      setTimeout(() => this.canAdd = true, this.delay);
    }
  }

  checkHit() {
    this.pool.forEach((ammo) => {
      this.enemies.pool.forEach(enemy => {
        if (ammo.position.sub(enemy.position).mag() <= Ammo.size + enemy.size) {
          enemy.hit();

          if (ammo.isIceAmmo) {
            enemy.setFreezed(true, 10000);
          }

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