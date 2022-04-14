import InputHandler from "./InputHandler";
import PartialSystem from "./PartialSystem";
import Vector from "./Vector";

export default class Background extends InputHandler {
  constructor(ctx) {
    super(ctx);
 
    this.ctx = ctx;
    this.counter = 0;
    this.partialSystems = [];
  }

  update() {
    this.counter++;
    
    this.partialSystems = this.partialSystems.filter(ps => ps.partials.length > 0);

    if (this.mouse.isMoving) {
      const { x, y } = this.mouse;
      this.partialSystems.push(new PartialSystem(this.ctx, new Vector(x, y)));
    }

    this.draw();
  }

  draw() {
    const { width, height } = this.ctx.canvas;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, width, height);

    this.partialSystems.forEach(ps => ps.update());
    // this.ctx.fillStyle = 'red';
    // this.ctx.arc(this.mouse.x, this.mouse.y, 20, 0, 2 * Math.PI);
    // this.ctx.fill();
    // this.ctx.stroke();
    this.ctx.restore();
  }
}