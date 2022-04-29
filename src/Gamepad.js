import Vector from "./Vector";

export default class Gamepad {
  constructor() {
    this.controller = null;
    this.addGamepad();
  }

  static AXES = {
    leftHorizontal: 0,
    leftVertical: 1,
    rightHorizontal: 2,
    rightVertical: 3,
  }

  get canUse() {
    return !!this.controller;
  }

  get leftAxes() {
    return new Vector(this.axesPosition(Gamepad.AXES.leftHorizontal), this.axesPosition(Gamepad.AXES.leftVertical));
  }

  get rightAxes() {
    return new Vector(this.axesPosition(Gamepad.AXES.rightHorizontal), this.axesPosition(Gamepad.AXES.rightVertical));
  }

  addGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    this.controller = gamepads[0];
  }

  buttonPressed(index) {
    this.addGamepad();

    let val = this.controller.buttons[index];

    let pressed = val == 1.0;
    let touched = false;
    if (typeof val == 'object') {
      pressed = val.pressed;
      if ('touched' in val) {
        touched = val.touched;
      }
      val = val.value;
    }


    if (pressed) {
      console.log('pressed');
    }
    if (touched) {
      console.log('touched');
    }
  }

  axesPosition(index) {
    this.addGamepad();

    return this.controller.axes[index];
  }
}