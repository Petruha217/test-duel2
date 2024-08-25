import { Hero } from './Hero'

export class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  leftHero: Hero
  rightHero: Hero
  animationId: number

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.leftHero = new Hero(this.ctx, this.canvas, 'left');
    this.rightHero = new Hero(this.ctx, this.canvas, 'right')
    this.animationId = 0;
  }

  setColorSpells(left: string, right: string) {
    this.leftHero.colorSpell = left
    this.rightHero.colorSpell = right
  }

  setOffsetMouse(offset: { x: number, y: number }) {
    this.leftHero.mouseCood = offset
    this.rightHero.mouseCood = offset

  }

  setMousesUp() {
    this.leftHero.setMouseUp()
    this.rightHero.setMouseUp()
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
        ++this.rightHero.scoreCell.score
      }
      if (this.leftHero.checkGetHitBySpell(spell) || spell.x < 10) {
        return false
      } else {
        return true
      }
    })

    this.leftHero.arrSpell = this.leftHero.arrSpell.filter((spell) => {
      if (this.rightHero.checkGetHitBySpell(spell)) {
        ++this.leftHero.scoreCell.score
      }
      if (this.rightHero.checkGetHitBySpell(spell) || spell.x > 690) {
        return false
      } else {
        return true
      }
    })
  }

  checkCursorAndSwitchs(x: number, y: number) {
    this.leftHero.checkCursorAndSwitchs(x, y)
    this.rightHero.checkCursorAndSwitchs(x, y)
  }

  moveSwitchs(x: number) {
    this.leftHero.moveSwitchs(x)
    this.rightHero.moveSwitchs(x)
  }

  update() {
    this.leftHero.update()
    this.rightHero.update()
    this.hitToHero()
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.createLine()
    this.leftHero.create()
    this.rightHero.create()
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