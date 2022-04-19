import Perk from "./Perk";

export default class PerkPool {
  constructor(game) {
    this.ctx = game.ctx;
    this.game = game;
    this.player = game.player;
    this.pool = [];
    this.maxSize = 2;

    this.addPerks();
  }

  get readyPerks() {
    return this.pool.filter(perk => !perk.hidden);
  }

  addPerks() {
    if (this.pool.length === this.maxSize) return;

    for (let i = 0; i < this.maxSize - this.pool.length; i++) {
      this.pool.push(new Perk(this.ctx));
    }
  }

  checkCollision() {
    const { position: playerPosition, size: playerSize } = this.player;

    this.readyPerks.forEach(perk => {
      if (playerPosition.sub(perk.position).mag() <= perk.size + playerSize) {
        perk.effect(this.game);
        this.pool = this.pool.filter(el => el !== perk);
      }
    });
  }

  removeOldPerks() {
    this.pool = this.pool.filter(perk => perk.isActive);

    this.addPerks();
  }

  update() {
    this.removeOldPerks();
    this.checkCollision();

    this.readyPerks.forEach(perk => perk.update());
  }
}