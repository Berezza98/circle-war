import Joystick from './Joystick';
import EnemyPool from './EnemyPool';
import AmmoPool from './AmmoPool';
import Player from './Player';
import Score from './Score';
import { createCanvas, isMobile } from './helpers';
import { LOCAL_STORAGE_SCORE, CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';
import PerkPool from './PerkPool';
import Gamepad from './Gamepad';

export default class Game {
  constructor() {
    this.ctx = createCanvas('main');
    this.gamepad = new Gamepad();
    this.joystickLeft = new Joystick({ className: 'joystick-left', size: 200, removeLastValue: true });
    this.joystickRight = new Joystick({ className: 'joystick-right', size: 200 });
    this.score = new Score(this);
    this.player = new Player(this);
    this.enemyPool = new EnemyPool(this);
    this.ammoPool = new AmmoPool(this);
    this.perkPool = new PerkPool(this);
    this.animation = null;

    this.dynamicElements = [this.player, this.enemyPool, this.ammoPool, this.score, this.perkPool];
  }

  static instance = null;

  static create() {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  update() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.dynamicElements.forEach(el => el.update());
    this.animation = requestAnimationFrame(this.update.bind(this));
  }

  start() {
    if (isMobile.any() && !this.gamepad.canUse) {
      this.joystickLeft.append(document.body);
      this.joystickRight.append(document.body);
    }

    this.update();
  }

  stop() {
    return new Promise((res, rej) => {
      // Stop on next frame
      setTimeout(() => {
        cancelAnimationFrame(this.animation);
        this.ctx.canvas.remove();
        this.joystickLeft.remove();
        this.joystickRight.remove();
        const currentRecord = parseInt(localStorage.getItem(LOCAL_STORAGE_SCORE));
        localStorage.setItem(LOCAL_STORAGE_SCORE, currentRecord > this.score.points ? currentRecord : this.score.points);
        Game.instance = null;
        res();
      }, 20);
    })
  }
}