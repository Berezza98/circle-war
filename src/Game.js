import Joystick from './Joystick';
import EnemyPool from './EnemyPool';
import AmmoPool from './AmmoPool';
import Player from './Player';
import Score from './Score';
import { createCanvas, isMobile } from './helpers';
import { CANVAS_HEIGHT, CANVAS_WIDTH, LOCAL_STORAGE_SCORE } from './consts';
import Menu from './Menu';

export default class Game {
  constructor() {
    this.ctx = createCanvas('main');
    this.joystickLeft = new Joystick({ className: 'joystick-left', size: 200, removeLastValue: true });
    this.joystickRight = new Joystick({ className: 'joystick-right', size: 200 });
    this.score = new Score(this);
    this.player = new Player(this);
    this.enemyPool = new EnemyPool(this);
    this.ammoPool = new AmmoPool(this);
    this.animation = null;

    if (isMobile.any()) {
      this.joystickLeft.append(document.body);
      this.joystickRight.append(document.body);
    }

    this.dynamicElements = [this.player, this.enemyPool, this.ammoPool, this.score];
  }

  update() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.dynamicElements.forEach(el => el.update());
    this.animation = requestAnimationFrame(this.update.bind(this));
  }

  start() {
    this.update();
  }

  stop() {
    // Stop on next frame
    setTimeout(() => {
      cancelAnimationFrame(this.animation);
      this.ctx.canvas.remove();
      localStorage.setItem(LOCAL_STORAGE_SCORE, this.score.points);
      new Menu();
    }, 20);
  }
}