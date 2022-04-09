import Enemy from "./Enemy";

export default class EnemyPool {
  constructor(ctx, player) {
    this.player = player;
    this.pool = [];
    this.maxSize = 10;
    this.ctx = ctx;

    for (let i = 0; i < this.maxSize; i++) {
      this.addEnemy();
    }
  }

  addEnemy() {
    this.pool.push(new Enemy(this.ctx));
  }

  checkCollision() {
    const { position: playerPosition, health: playerSize } = this.player;
    this.pool = this.pool.filter(({ position: enemyPosition, size: enemySize }) => {
      return playerPosition.sub(enemyPosition).mag() > enemySize + playerSize;
    });

    for (let i = 0; i < this.maxSize - this.pool.length; i++) {
      this.addEnemy();
    }
  }

  update() {
    this.checkCollision();

    this.pool.forEach(enemy => enemy.update());
  }
}