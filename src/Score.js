export default class Score {
  constructor(ctx) {
    this.points = 0;
    this.ctx = ctx;
  }

  increase() {
    this.points += 10;
  }

  update() {
    this.draw();
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.ctx.canvas.width - 70, 30);
    this.ctx.font = "bold 20px serif";
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Score: ' + this.points, 0, 0);
    this.ctx.restore();
  }
}