import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Menu from '../Menu/Menu'

const toolbar = props => (
  <header className={classes.Toolbar}>
    <Menu click={props.openStatus} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems authLogin={props.authLogin} />
    </nav>
  </header>
)

export default toolbar
