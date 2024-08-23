import React, { useCallback, useState, FC } from 'react';
import { Button, Canvas, ColorsSpell } from '../../Components';
import style from './MainPage.module.css'


const MainPage: FC = () => {
  const [isRuning, setIsRuning] = useState<boolean>(false)
  const [colorSpell, setColorSpell] = useState<{ left: string, right: string }>({ left: "red", right: 'yellow' })
  const [isVisibilityMenu, setIsVisibilityMenu] = useState<{ left: boolean, right: boolean }>({ left: false, right: false })

  const changeIsRuning = () => {
    setIsRuning(true)
  }

  const chengeColorSpell = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'left') {
      setColorSpell(prevState => ({ ...prevState, left: e.target.id }))
    } else {
      setColorSpell(prevState => ({ ...prevState, right: e.target.id }))
    }
  }, [])

  const closeMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.id === 'myCanvasleft') {
      setIsVisibilityMenu(prevState => ({ ...prevState, left: false }))
    } else {
      setIsVisibilityMenu(prevState => ({ ...prevState, right: false }))
    }
  }, [])

  return (
    <div className={style.mainPage}>
      <Canvas
        isRuning={isRuning}
        colorSpell={colorSpell}
        setIsVisibilityMenu={setIsVisibilityMenu}
        className={style.canvas_wrapper}
      ></Canvas>
      <Button handleClick={changeIsRuning} className={style.button_wrapper}>
        Начать игру
      </Button>
      <ColorsSpell className={style.colorsSpellLeft_wrapper}
        name='left'
        chengeChecked={chengeColorSpell}
        colorSpell={colorSpell.left}
        visibility={isVisibilityMenu.left}
        closeMenu={closeMenu} />
      <ColorsSpell className={style.colorsSpellRight_wrapper}
        name='right'
        chengeChecked={chengeColorSpell}
        colorSpell={colorSpell.right}
        visibility={isVisibilityMenu.right}
        closeMenu={closeMenu} />
    </div>
  );
};

export default MainPage;