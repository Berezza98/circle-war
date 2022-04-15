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

  addListeners() {
    this.startBtn.addEventListener('click', () => {
      this.parent.remove();

      new Game().start();
    });
  }
}