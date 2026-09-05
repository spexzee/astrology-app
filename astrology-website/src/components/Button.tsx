import React from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  as?: 'button' | 'a'
  href?: string
  download?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  href,
  download,
  children,
  className = '',
  ...props
}) => {
  const classes = [styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')

  if (Component === 'a') {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        role="button"
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
