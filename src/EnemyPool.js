import Enemy from "./Enemy";

export default class EnemyPool {
  constructor(ctx, player, score) {
    this.player = player;
    this.pool = [];
    this.maxSize = 4;
    this.score = score;
    this.ctx = ctx;

    for (let i = 0; i < this.maxSize; i++) {
      this.addEnemy();
    }
  }

  addEnemy() {
    this.pool.push(new Enemy(this.ctx, this.player));
  }

  checkCollision() {
    const { position: playerPosition, health: playerSize } = this.player;
    const collisioned = this.pool.filter(enemy => playerPosition.sub(enemy.position).mag() <= enemy.size + playerSize);
    this.pool = this.pool.filter(enemy => {
      return !enemy.isDead && (playerPosition.sub(enemy.position).mag() > enemy.size + playerSize);
    });

    if (collisioned.length > 0) {
      this.player.hit(collisioned.length);
    }

    for (let i = 0; i < this.maxSize - this.pool.length; i++) {
      this.addEnemy();
      this.score.increase();
    }
  }

  update() {
    this.checkCollision();

    this.pool.forEach(enemy => enemy.update());
  }
}