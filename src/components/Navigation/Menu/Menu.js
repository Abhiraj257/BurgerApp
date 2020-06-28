import React from 'react'
import classes from './Menu.css'

const menu = props => (
  <div className={classes.Menu} onClick={props.click}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default menu
