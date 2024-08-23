export class ScoreCell {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  width: number
  height: number
  score: number

  constructor(ctx: CanvasRenderingContext2D, side: 'left' | 'right') {
    this.ctx = ctx;
    this.x = side === 'left' ? 285 : 355;
    this.y = 0;
    this.width = 70;
    this.height = 60;
    this.score = 0;

  }

  create() {
    this.ctx.beginPath()
    this.ctx.rect(this.x, this.y, this.width, this.height)
    this.ctx.stroke()
    this.setText()
  }

  setText() {
    this.ctx.font = "36px serif";
    this.ctx.fillText(`${this.score}`, this.x + 20, this.y + 40);
  }

}
