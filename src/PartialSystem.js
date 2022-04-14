import Partial from "./Partial";

export default class PartialSystem {
  constructor(ctx, pos, options = {}) {
    this.ctx = ctx;
    this.position = pos;
    this.options = options;
    this.partials = [];

    this.init();
  }

  init() {
    for (let i = 0; i < 5; i++) {
      this.partials.push(new Partial(this.ctx, this.position, this.options));
    }
  }

  update() {
    this.partials = this.partials.filter(partial => partial.size > 0);
    this.partials.forEach(partial => partial.update());
  }
}