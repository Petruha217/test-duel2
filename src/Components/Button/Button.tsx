import React, { memo, FC, ReactNode } from 'react';
import style from './Button.module.css'
import clsx from 'clsx'

interface ButtonProps {
  children: ReactNode;
  handleClick: () => void
  className?: string
}
export const Button: FC<ButtonProps> = memo(({ children, handleClick, className }) => {
  return (
    <button
      className={clsx(style.button, className)}
      onClick={handleClick}
    >
      {children}
    </button>
  )
})

