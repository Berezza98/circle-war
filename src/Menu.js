import { LOCAL_STORAGE_SCORE } from "./consts";
import Game from "./Game";
import { createEl } from "./helpers";

export default class Menu {
  constructor() {
    this.parent = createEl('div', 'menu');
    this.startBtn = createEl('button', 'start-btn');
    this.startBtn.innerText = 'Start Game';
    this.bestScore = localStorage.getItem(LOCAL_STORAGE_SCORE);

    if (this.bestScore) {
      const scoreTitle = createEl('div', 'best-score');
      scoreTitle.innerText = `Best Score: ${this.bestScore}`;
      this.parent.appendChild(scoreTitle);
    }

    this.parent.appendChild(this.startBtn);
    document.body.appendChild(this.parent);

    this.addListeners();
  }

  static instance = null;

  static create() {
    Game.create().stop();
    if (!Menu.instance) {
      Menu.instance = new Menu();
    }

    return Menu.instance;
  }

  addListeners() {
    this.startBtn.addEventListener('click', () => {
      Menu.remove();

      Game.create().start();
    });
  }

  static remove() {
    if (!Menu.instance) return;

    Menu.instance.parent.remove();
    Menu.instance = null;
  }
}