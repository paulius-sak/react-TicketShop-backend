import React from 'react'
import Header from '../../components/Header/Header'
import LoginForm from '../../components/LogInForm/LoginForm'
import {links, logo} from "../../constans/links"

const index = () => {
  return (
    <div>
      <Header logo={logo} links={links}/>
      <LoginForm/>
    </div>
  )
}

export default index