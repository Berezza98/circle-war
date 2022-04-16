import consts from "./consts";

export default class Score {
  constructor(game) {
    this.points = 0;
    this.ctx = game.ctx;
  }

  increase() {
    this.points += 10;
  }

  update() {
    this.draw();
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(consts.CANVAS_WIDTH - consts.CANVAS_WIDTH / 10, consts.CANVAS_HEIGHT / 15);
    this.ctx.font = `bold ${consts.CANVAS_WIDTH / 35}px serif`;
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Score: ' + this.points, 0, 0);
    this.ctx.restore();
  }
}