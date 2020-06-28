import React from 'react'
import classes from './Order.css'

const order = props => {
  const ingredients = []
  for (const key in props.ingredients) {
    ingredients.push({
      name: key,
      amount: props.ingredients[key]
    })
  }
  const ingredientDisplay = ingredients.map(ing => (
    <span
      key={ing.name}
      style={{
        textTransform: 'capitalize',
        padding: '7px',
        margin: '5px',
        display: 'inline-block',
        border: '1px solid #aaa'
      }}>
      {ing.name}: {ing.amount}
    </span>
  ))
  return (
    <div className={classes.Order}>
      <p>Ingredients:&nbsp;&nbsp; {ingredientDisplay}</p>
      <p>
        Price:&nbsp;&nbsp; <strong>₹{props.price}</strong>
      </p>
    </div>
  )
}

export default order
