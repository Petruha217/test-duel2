import { useCallback, useEffect, useState, FC, memo } from 'react'
import { InitialCanvas, myGame } from './InitialCanvas'

interface CanvasProps {
  className?: string;
  isRuning: boolean;
  colorSpell: { left: string, right: string };
  setIsVisibilityMenu: React.Dispatch<React.SetStateAction<{
    left: boolean;
    right: boolean;
  }>>;
}

export const Canvas: FC<CanvasProps> = memo(({ isRuning, colorSpell, className, setIsVisibilityMenu }) => {
  const [offset, setOffset] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setOffset({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    myGame.moveSwitchs(e.nativeEvent.offsetX)
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setOffset({ x: -1, y: -1 })
  }, [])

  const handlerMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    myGame.checkCursorAndSwitchs(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }, [])

  const handlerMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    myGame.setMousesUp()
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setOffset({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    let left = myGame.leftHero.checkCursorIntoHero()
    let right = myGame.rightHero.checkCursorIntoHero()
    setIsVisibilityMenu(prev => {
      if (left) {
        return { ...prev, left: left }
      }
      if (right) {
        return { ...prev, right: right }
      }
      return prev
    })
  }, [setIsVisibilityMenu])

  useEffect(() => {
    myGame.run()
    myGame.setColorSpells(colorSpell.left, colorSpell.right)
    if (isRuning) {
      myGame.start()
    }
    return () => {
      window.cancelAnimationFrame(myGame.animationId)
    }
  }, [isRuning, colorSpell])

  useEffect(() => {
    myGame.setOffsetMouse(offset)
  }, [offset])

  return (
    <InitialCanvas
      className={className}
      handleMouseMove={handleMouseMove}
      handleMouseLeave={handleMouseLeave}
      handleClick={handleClick}
      handlerMouseDown={handlerMouseDown}
      handlerMouseUp={handlerMouseUp}
    />
  )
})
