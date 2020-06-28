import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link='/'>
      Burger Build
    </NavigationItem>
    {props.authLogin ? (
      <NavigationItem link='/orders'>Orders</NavigationItem>
    ) : null}

    {props.authLogin ? (
      <NavigationItem link='/logout'>Log Out</NavigationItem>
    ) : (
      <NavigationItem link='/auth'>Authenticate</NavigationItem>
    )}
  </ul>
)

export default navigationItems
