import React from 'react'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = false,
}) => {
  return (
    <div className={`${styles.header} ${centered ? styles.centered : ''}`}>
      {eyebrow && (
        <p className={`t-label ${styles.eyebrow}`}>{eyebrow}</p>
      )}
      <h1 className={`t-display-lg ${styles.title}`}>{title}</h1>
      {subtitle && (
        <p className={`t-body-lg ${styles.subtitle}`}>{subtitle}</p>
      )}
    </div>
  )
}
