export class Spell {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  r: number
  anticlockwise: boolean
  velocity: number
  dx: number
  color: string
  direction: 'toRight' | 'toLeft'

  constructor(ctx: CanvasRenderingContext2D, side: 'left' | 'right', x: number, y: number, colorSpell: string) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = 7;
    this.anticlockwise = true;
    this.velocity = 5;
    this.dx = 0;
    this.color = colorSpell;
    this.direction = side === 'left' ? 'toRight' : 'toLeft';
  }

  createSpell() {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, this.anticlockwise)
    this.ctx.stroke()
    this.ctx.fill()
    this.ctx.fillStyle = 'black'
  }

  move() {
    this.dx = this.direction === 'toRight' ? this.velocity : -this.velocity
    this.x += this.dx
  }

  getCood() {
    return { x: this.x, y: this.y, r: this.r }
  }
}