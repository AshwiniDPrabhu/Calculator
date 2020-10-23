import React from 'react';
import './../App.css';

function CalculatorDisplay(props) {
  return (
    <div className="calculator-display">
      <div className="calculator-output">
          {props.value}
      </div>
      <div className="calculator-error">
        {props.invalidState && <span>Invalid Input</span>}
      </div>
    </div>
  );
}

export default CalculatorDisplay;
