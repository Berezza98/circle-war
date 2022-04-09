import Ammo from "./Ammo";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./consts";
import { isOnTheField } from "./helpers";
import KeyboardHandler from "./KeyboardHandler";

export default class AmmoPool extends KeyboardHandler {
  constructor(ctx, player) {
    super();

    this.player = player;
    this.pool = [];
    this.maxSize = 200;
    this.ctx = ctx;
  }

  addAmmo() {
    const { position, sightPosition } = this.player;

    if (this.pool.length < this.maxSize) {
      this.pool.push(new Ammo(this.ctx, position, sightPosition));
    }
  }

  update() {
    if (this.keyboard.spaceActive) {
      this.addAmmo();
    }

    this.pool = this.pool.filter(({ position }) => isOnTheField(position));
    console.log(this.pool.length);

    this.pool.forEach(ammo => ammo.update());
  }
}