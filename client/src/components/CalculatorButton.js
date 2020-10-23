import React from 'react';
import './../App.css';

function CalculatorButton(props) {
  var buttonValue;
  if (props.displayValue) {
    buttonValue = props.displayValue;
  } else {
    buttonValue = props.value;
  }

  const performAction = () => {
    if (props.computeButton) {
      props.action()
    } else {
      props.action(props.value)
    }
  }

  return (
    <button onClick={() => performAction()}>{buttonValue}</button>
  );
}

export default CalculatorButton;
