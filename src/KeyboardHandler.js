export default class KeyboardHandler {
  constructor(ctx) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.disableTouch = true;

    this.keyboard = {
      upActive: false,
      downActive: false,
      leftActive: false,
      rightActive: false,
      spaceActive: false,
      wActive: false,
      sActive: false,
      aActive: false,
      dActive: false,
    };

    this.touch = {
      x: 0,
      y: 0
    };

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
        case 5:
          this.keyboard.rightActive = true;
          break;
        case 32:
          this.keyboard.spaceActive = true;
          break;
        case 87:
          this.keyboard.wActive = true;
          break;
        case 83:
          this.keyboard.sActive = true;
          break;
        case 65:
          this.keyboard.aActive = true;
          break;
        case 68:
          this.keyboard.dActive = true;
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
        case 5:
          this.keyboard.rightActive = false;
          break;
        case 32:
          this.keyboard.spaceActive = false;
          break;
        case 87:
          this.keyboard.wActive = false;
          break;
        case 83:
          this.keyboard.sActive = false;
          break;
        case 65:
          this.keyboard.aActive = false;
          break;
        case 68:
          this.keyboard.dActive = false;
          break;
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (this.disableTouch) return;

      const { pageY, pageX } = e.changedTouches[0];

      this.touch.x = pageX;
      this.touch.y = pageY;
    });

    window.addEventListener('touchstart', () => {
      this.disableTouch = false;
    });

    window.addEventListener('touchend', () => {
      this.disableTouch = true;
      this.touch.x = 0;
      this.touch.y = 0;
    });
  }
}