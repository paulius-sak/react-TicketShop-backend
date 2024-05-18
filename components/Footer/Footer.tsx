import React from 'react'
import { logo } from '@/constans/links'
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.logo}>
        <a href={logo.href}>{logo.title}</a>
      </div>
      
    </footer>
  )
}

export default Footer