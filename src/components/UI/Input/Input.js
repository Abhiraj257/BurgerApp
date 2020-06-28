import React from 'react'

import classes from './Input.css'

const input = props => {
  let inputField
  switch (props.elementType) {
    case 'input':
      inputField = (
        <input
          required
          className={classes.InputField}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'textarea':
      inputField = (
        <textarea
          required
          className={classes.InputField}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'select':
      inputField = (
        <select
          value={props.value}
          onChange={props.changed}
          className={classes.InputField}
          style={{ color: '#333' }}>
          {props.elementConfig.option.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      inputField = (
        <input
          required
          className={classes.InputField}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
  }
  return (
    <div className={classes.InputBox}>
      <label>{props.label}</label>
      {inputField}
    </div>
  )
}

export default input
