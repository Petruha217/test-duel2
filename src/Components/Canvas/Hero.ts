import { Spell } from "./Spell"

export class Hero {
  arrSpell: Spell[]
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  side: 'left' | 'right'
  startDate: number
  x: 30 | 670
  y: number
  r: number
  anticlockwise: boolean
  velocity: number
  dy: number
  color: 'blue' | 'grey'
  colorSpell: string
  rateOfFire: number
  direction: string
  notFire: boolean
  xMouse: number
  yMouse: number
  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, side: 'left' | 'right') {
    this.arrSpell = [];
    this.canvas = canvas;
    this.ctx = ctx;
    this.side = side;
    this.startDate = Date.now();
    this.x = side === 'left' ? 30 : 670;
    this.y = 90;
    this.r = 29;
    this.anticlockwise = true;
    this.velocity = 1;
    this.dy = 0;
    this.color = side === 'left' ? 'blue' : 'grey';
    this.colorSpell = ''
    this.rateOfFire = 0;
    this.direction = 'down';
    this.notFire = true;
    this.xMouse = -1;
    this.yMouse = -1;
  }

  createHero() {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, this.anticlockwise)
    this.ctx.stroke()
    this.ctx.fill()
  }

  start() {
    this.dy = this.velocity
    this.notFire = false
  }

  move() {
    if (this.dy) {
      this.dy = this.direction === 'down' ? this.velocity : -this.velocity
      this.y += this.dy
    }
  }

  moveBack() {
    this.direction = this.direction === 'up' ? 'down' : 'up'
  }

  checkIsCollideWithBorder() {
    if ((this.y + this.r) > this.canvas.height - 140 || (this.y - this.r) < 60) {
      return true
    } else {
      return false
    }
  }

  collideWithBorder() {
    if (this.checkIsCollideWithBorder()) {
      this.moveBack()
    }
  }

  collideWithCursor() {
    if (this.checkIsCollideWithCursor() === 'top' && this.direction === 'up') {
      if (!this.checkIsCollideWithBorder()) {
        this.moveBack()
      }
    } else if (this.checkIsCollideWithCursor() === 'bottom' && this.direction === 'down') {
      if (!this.checkIsCollideWithBorder()) {
        this.moveBack()
      }
    }
  }

  checkIsCollideWithCursor() {
    const difY = Math.abs(this.y - this.yMouse)
    const difX = Math.sqrt(Math.pow(this.r, 2) - Math.pow(difY, 2))
    const xMin = this.x - difX
    const xMax = this.x + difX
    const yTop = this.y - this.r
    const yBottom = this.y + this.r

    if (this.xMouse > xMin && this.xMouse < xMax) {
      if (this.yMouse < this.y && this.yMouse > yTop) {
        return 'top'
      } else if (this.yMouse < yBottom && this.yMouse > this.y) {
        return 'bottom'
      }
    }
  }

  createArrSpell() {
    if (this.notFire) return
    if (Math.floor(((Date.now() - this.startDate) / 17)) % (70 - this.rateOfFire * 10) === 0) {
      this.arrSpell.push(this.initialSpell())
    }
  }

  initialSpell() {
    let x = this.side === 'left' ?
      this.x + this.r :
      this.x - this.r
    let y = this.y
    return new Spell(this.ctx, this.side, x, y, this.colorSpell)
  }

  createSpells() {
    if (this.arrSpell.length) {
      this.arrSpell.forEach((spell) => {
        spell.createSpell()
      })
    }
  }

  moveSpell() {
    if (this.arrSpell.length) {
      this.arrSpell.forEach((spell) => {
        spell.move()
      })
    }
  }

  checkCursorIntoHero() {
    if (this.checkIsCollideWithCursor() === 'top' ||
      this.checkIsCollideWithCursor() === 'bottom'
    ) return true
  }

  checkGetHitBySpell(spellCood: { x: number, y: number, r: number }) {
    const dx = Math.abs(this.x - spellCood.x)
    const dy = Math.abs(this.y - spellCood.y)
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    if (distance < this.r + spellCood.r) {
      return true
    }
  }
}