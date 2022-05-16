import { LOCAL_STORAGE_SCORE } from "./consts";
import Game from "./Game";
import { createEl } from "./helpers";

export default class Menu {
  constructor() {
    this.gamepad = Game.create().gamepad;
    this.parent = createEl('div', 'menu');
    this.startBtn = createEl('button', 'start-btn');
    this.startBtn.innerText = 'Start Game';
    this.bestScore = localStorage.getItem(LOCAL_STORAGE_SCORE);

    if (this.bestScore) {
      const scoreTitle = createEl('div', 'best-score');
      scoreTitle.innerText = `Best Score: ${this.bestScore}`;
      this.parent.appendChild(scoreTitle);
    }

    this.gamepadTitle = createEl('div', 'gamepad-title');
    this.gamepadTitle.innerText = this.gamepad.canUse ? 'Gamepad controller connected!' : 'Please click on Gamepad controller to use it!';
    this.parent.appendChild(this.gamepadTitle);

    this.parent.appendChild(this.startBtn);
    document.body.appendChild(this.parent);

    this.addListeners();
  }

  static instance = null;

  static async create() {
    await Game.create().stop();
    if (!Menu.instance) {
      Menu.instance = new Menu();
    }

    Game.create(); // create new game instance
    return Menu.instance;
  }

  changeGamepadTitle() {
    this.gamepadTitle.innerText = 'Gamepad controller connected!';
  }

  addListeners() {
    this.startBtn.addEventListener('click', () => {
      Menu.remove();

      Game.create().start();
    });

    this.gamepad.on('gamepadAdded', this.changeGamepadTitle.bind(this));
  }

  static remove() {
    if (!Menu.instance) return;

    Menu.instance.parent.remove();
    Menu.instance = null;
  }
}