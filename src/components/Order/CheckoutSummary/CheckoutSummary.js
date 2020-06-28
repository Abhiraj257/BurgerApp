import React from 'react'
import { withRouter } from 'react-router-dom'

import classes from './CheckoutSummary.css'
import Burger from '../../Layout/Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!!</h1>
      <div
        style={{
          width: '100%',
          margin: 'auto'
        }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType='Danger' clicked={props.checkoutHandleCancel}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.checkoutHandleContinue}>
        CONTINUE
      </Button>
    </div>
  )
}
export default withRouter(checkoutSummary)
