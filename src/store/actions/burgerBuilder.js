import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const addIngredient = ingName => {
  return { type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }
}
export const removeIngredient = ingName => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }
}

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

const fetchIngredientsFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED }
}

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://burger-builder-2f91a.firebaseio.com/ingredients.json')
      .then(res => dispatch(setIngredients(res.data)))
      .catch(error => dispatch(fetchIngredientsFailed()))
  }
}
