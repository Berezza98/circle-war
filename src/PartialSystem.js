import Partial from "./Partial";

export default class PartialSystem {
  constructor(ctx, options = {}) {
    this.ctx = ctx;
    this.options = options;
    this.partials = [];

    this.init();
  }

  init() {
    for (let i = 0; i < (this.options.partialCount || 5); i++) {
      this.partials.push(new Partial(this.ctx, this.options));
    }
  }

  update(deltaTime) {
    this.partials = this.partials.filter(partial => partial.opacity > 0);
    this.partials.forEach(partial => partial.update(deltaTime));
  }
}