import React, { FC, memo } from 'react';
import style from './ColorsSpell.module.css'
import clsx from 'clsx'

interface ColorsSpellProps {
  className?: string;
  name: string;
  colorSpell: string;
  chengeChecked: (e: React.ChangeEvent<HTMLInputElement>) => void
  visibility: boolean;
  closeMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ColorsSpell: FC<ColorsSpellProps> = memo(({ className, name, colorSpell, chengeChecked, visibility, closeMenu }) => {

  return (
    <div className={clsx(style.colorsSpell, className, { [style.hidden]: !visibility })}>
      <div className={style.close} onClick={closeMenu} id={'myCanvas' + name}>X</div>
      <label htmlFor="red">
        <input type="radio" id='red'
          checked={colorSpell === 'red'}
          onChange={chengeChecked}
          name={name} className={clsx(style.input, style.red)} />
      </label>
      <label htmlFor="yellow">
        <input type="radio" id='yellow'
          checked={colorSpell === 'yellow'}
          onChange={chengeChecked}
          name={name} className={clsx(style.input, style.yellow)} />
      </label>
      <label htmlFor="green">
        <input type="radio" id='green'
          checked={colorSpell === 'green'}
          onChange={chengeChecked}
          name={name} className={clsx(style.input, style.green)} />
      </label>
    </div>
  );
})

