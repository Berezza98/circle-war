export default class KeyboardHandler {
  constructor() {
    this.keyboard = {
      upActive: false,
      downActive: false,
      leftActive: false,
      rightActive: false,
      spaceActive: false,
    }

    this.addListeners();
  }

  addListeners() {
    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 38:
        case 29460:
          this.keyboard.upActive = true;
          break;
        case 40:
        case 29461:
          this.keyboard.downActive = true;
          break;
        case 37:
        case 4:
          this.keyboard.leftActive = true;
          break;
        case 39:
        case 35:
          this.keyboard.rightActive = true;
          break;
        case 32:
          this.keyboard.spaceActive = true;
          break;
      }
    });
    window.addEventListener('keyup', (e) => {
      switch (e.keyCode) {
        case 38:
        case 29460:
          this.keyboard.upActive = false;
          break;
        case 40:
        case 29461:
          this.keyboard.downActive = false;
          break;
        case 37:
        case 4:
          this.keyboard.leftActive = false;
          break;
        case 39:
        case 35:
          this.keyboard.rightActive = false;
          break;
        case 32:
          this.keyboard.spaceActive = false;
          break;
      }
    });
  }
}