import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Aux from '../../../hoc/Auxilary'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = props => {
  const attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.sideDrawer) {
    attachedClasses[1] = classes.Open
  }

  return (
    <Aux>
      <Backdrop show={props.sideDrawer} click={props.open} />
      <div className={attachedClasses.join(' ')} onClick={props.open}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems authLogin={props.authLogin} />
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer
