import React from 'react'
import { connect } from 'react-redux'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = props => {
  // const addIng = (type) {
  //   props.a
  // }

  return (
    <div className={classes.BuildControls}>
      <h2 style={{ fontWeight: 100 }}>
        current price is <strong>₹{props.price.toFixed(2)}</strong>
      </h2>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          added={() => props.addIngredients(ctrl.type)}
          // added={props.addIngredients}
          remove={() => props.removeIngredient(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        onClick={props.purchasing}
        disabled={props.purchasable}>
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token ? true : false
  }
}

export default connect(mapStateToProps)(buildControls)
