import Enemy from "./Enemy";

export default class EnemyPool {
  constructor(game) {
    this.ctx = game.ctx;
    this.player = game.player;
    this.score = game.score;
    this.pool = [];
    this.maxSize = 10;

    for (let i = 0; i < this.maxSize; i++) {
      this.addEnemy();
    }
  }

  addEnemy() {
    this.pool.push(new Enemy(this.ctx, this.player));
  }

  checkCollision() {
    const { position: playerPosition, size: playerSize } = this.player;
    const collisioned = this.pool.filter(enemy => {
      const needToDelete = playerPosition.sub(enemy.position).mag() <= enemy.size + playerSize;
      if (needToDelete) {
        enemy.kill();
        return true;
      }

      return false;
    });

    this.pool = this.pool.filter(enemy => {
      return !enemy.isDead && (playerPosition.sub(enemy.position).mag() > enemy.size + playerSize);
    });

    if (collisioned.length > 0 && !this.player.activeArmor) {
      this.player.hit(collisioned.length);
    }

    for (let i = 0; i < this.maxSize - this.pool.length; i++) {
      this.addEnemy();
      this.score.increase();

      if (this.score.points % 100 === 0) {
        this.maxSize++;
      }
    }
  }

  update() {
    this.checkCollision();

    this.pool.forEach(enemy => enemy.update());
  }
}