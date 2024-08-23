export class Controler {
  ctx: CanvasRenderingContext2D
  rangeX: number
  rangeY: number
  rangeW: number
  rangeH: number
  switchX: number
  switchY: number
  switchW: number
  switchH: number
  title: 'скорость' | 'скорострельность'
  dX: number
  down: boolean

  constructor(ctx: CanvasRenderingContext2D, side: 'left' | 'right', role: 'speed' | 'fire') {
    this.ctx = ctx;
    this.rangeX = side === 'left' ? 40 : 540;
    this.rangeY = role === 'speed' ? 500 : 560;
    this.rangeW = 120;
    this.rangeH = 6;
    this.switchX = this.rangeX;
    this.switchY = this.rangeY - 6;
    this.switchW = 10;
    this.switchH = 18;
    this.title = role === 'speed' ? 'скорость' : 'скорострельность'
    this.dX = 0;
    this.down = false
  }

  create() {
    this.ctx.beginPath()
    this.ctx.strokeStyle = 'blue'
    this.ctx.rect(this.rangeX, this.rangeY, this.rangeW, this.rangeH)
    this.ctx.stroke()
    this.ctx.strokeStyle = 'black'

    this.ctx.beginPath()
    this.ctx.fillStyle = 'blue'
    this.ctx.rect(this.switchX, this.switchY, this.switchW, this.switchH)
    this.ctx.stroke()
    this.ctx.fill()
    this.ctx.fillStyle = 'black'

    this.ctx.font = "24px serif"
    this.ctx.fillText('1', this.rangeX - 20, this.rangeY + 8)
    this.ctx.fillText('5', this.rangeX + 130, this.rangeY + 10)
    this.ctx.font = "18px serif"
    this.ctx.fillText(`${this.title}`, this.rangeX, this.rangeY - 20)
  }

  range() {
    let xSwitchOnRange = this.switchX < this.rangeX + 24 ? 1 :
      this.switchX < this.rangeX + 48 ? 2 :
        this.switchX < this.rangeX + 72 ? 3 :
          this.switchX < this.rangeX + 96 ? 4 : 5
    return xSwitchOnRange
  }

  moveSwitch(x: number) {
    let res
    if (this.down) {
      if (x - this.dX > this.rangeX && x - this.dX < this.rangeX + this.rangeW) {
        this.switchX = x - this.dX
        res = this.range()
      }
    }
    return res
  }

  checkCursorAndSwitch(x: number, y: number) {
    if (x > this.switchX && x < this.switchX + this.switchW &&
      y > this.switchY && y < this.switchY + this.switchH
    ) {
      this.dX = x - this.switchX
      this.down = true
    }
  }

  setMouseUp() {
    this.down = false
  }
}
