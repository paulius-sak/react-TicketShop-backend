import React, { ReactNode } from 'react'
import Header from '../Header/Header'
import { logo, links } from '@/constans/links'
import styles from "./PageTemplate.module.css"
import Footer from "../Footer/Footer"

type PageTemplateProps = {
    children: ReactNode;
  };

const PageTemplate = ({children}: PageTemplateProps) => {
  return (
    <div className={styles.wrapper}>
        <Header logo={logo} links={links} />
        <div className={styles.content}>{children}</div>
        <Footer/>
    </div>
  )
}

export default PageTemplate