import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = props => {
  let currentburgerIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredients key={igKey + index} type={igKey} />
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
  if (currentburgerIngredients.length === 0) {
    currentburgerIngredients = <div>Please Add Some Ingredients</div>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type='bread-top' />
      {currentburgerIngredients}
      <BurgerIngredients type='bread-bottom' />
    </div>
  )
}

export default burger
