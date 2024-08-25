import { Hero } from './Hero'
import { Controler } from './Contriler'

export class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  leftHero: Hero
  rightHero: Hero
  leftSpeedControler: Controler
  leftFireControler: Controler
  rightSpeedControler: Controler
  rightFireControler: Controler
  leftScore: number
  rightScore: number
  animationId: number

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.leftHero = new Hero(this.ctx, this.canvas, 'left');
    this.rightHero = new Hero(this.ctx, this.canvas, 'right')
    this.leftSpeedControler = new Controler(this.ctx, 'left', 'speed')
    this.leftFireControler = new Controler(this.ctx, 'left', 'fire')
    this.rightSpeedControler = new Controler(this.ctx, 'right', 'speed')
    this.rightFireControler = new Controler(this.ctx, 'right', 'fire')
    this.leftScore = 0;
    this.rightScore = 0;
    this.animationId = 0;
  }

  setColorSpells(left: string, right: string) {
    this.leftHero.colorSpell = left
    this.rightHero.colorSpell = right
  }

  setOffsetMouse(offset: { x: number, y: number }) {
    this.leftHero.xMouse = offset.x
    this.leftHero.yMouse = offset.y
    this.rightHero.xMouse = offset.x
    this.rightHero.yMouse = offset.y
  }

  createLine() {
    this.ctx.beginPath()
    this.ctx.rect(0, 60, 700, 1)
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.rect(0, 460, 700, 1)
    this.ctx.stroke()
  }

  hitToHero() {
    this.rightHero.arrSpell = this.rightHero.arrSpell.filter((spell) => {
      if (this.leftHero.checkGetHitBySpell(spell)) {
        ++this.leftHero.scoreCell.score
      }
      if (this.leftHero.checkGetHitBySpell(spell) || spell.x < 10) {
        return false
      } else {
        return true
      }
    })

    this.leftHero.arrSpell = this.leftHero.arrSpell.filter((spell) => {
      if (this.rightHero.checkGetHitBySpell(spell)) {
        ++this.rightHero.scoreCell.score
      }
      if (this.rightHero.checkGetHitBySpell(spell) || spell.x > 690) {
        return false
      } else {
        return true
      }
    })
  }

  checkCursorAndSwitchs(x: number, y: number) {
    this.leftSpeedControler.checkCursorAndSwitch(x, y)
    this.leftFireControler.checkCursorAndSwitch(x, y)
    this.rightSpeedControler.checkCursorAndSwitch(x, y)
    this.rightFireControler.checkCursorAndSwitch(x, y)
  }

  moveSwitchs(x: number) {
    let speedL = this.leftSpeedControler.moveSwitch(x)
    if (speedL) {
      this.leftHero.velocity = speedL
    }
    let fireL = this.leftFireControler.moveSwitch(x)
    if (fireL) {
      this.leftHero.rateOfFire = fireL
    }
    let speedR = this.rightSpeedControler.moveSwitch(x)
    if (speedR) {
      this.rightHero.velocity = speedR
    }
    let fireR = this.rightFireControler.moveSwitch(x)
    if (fireR) {
      this.rightHero.rateOfFire = fireR
    }
  }

  setMousesUp() {
    this.leftSpeedControler.setMouseUp()
    this.leftFireControler.setMouseUp()
    this.rightSpeedControler.setMouseUp()
    this.rightFireControler.setMouseUp()
  }

  controlersCreate() {
    this.leftSpeedControler.create()
    this.leftFireControler.create()
    this.rightSpeedControler.create()
    this.rightFireControler.create()
  }

  update() {
    this.leftHero.move()
    this.rightHero.move()
    this.leftHero.collideWithBorder()
    this.rightHero.collideWithBorder()
    this.leftHero.collideWithCursor()
    this.rightHero.collideWithCursor()
    this.leftHero.createArrSpell()
    this.rightHero.createArrSpell()
    this.leftHero.moveSpell()
    this.rightHero.moveSpell()
    this.hitToHero()

  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.createLine()
    this.leftHero.createHero()
    this.rightHero.createHero()
    this.leftHero.createSpells()
    this.rightHero.createSpells()
    this.controlersCreate()

  }

  run() {
    this.animationId = window.requestAnimationFrame(() => {
      this.update()
      this.render()
      this.run()
    });
  }

  start() {
    this.leftHero.start()
    this.rightHero.start()
  }
}