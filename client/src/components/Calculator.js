import React from 'react';
import './../App.css';

import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';
import DisplayMessages from './DisplayMessages';

import { sendMessage, subscribeToMessages, unsubscribeFromMessages } from '../services/SocketService';

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      expression: "",
      equalFlag: false,
      invalidState: false,
      calculations: [],
    };
  }

  componentDidMount() {
    // listen to event messages of different calculations
    subscribeToMessages('calc-message-out', (err, data) => {
      let newCalculations = this.state.calculations.slice(0, 9);
      newCalculations.unshift(data);

      this.setState({ 
        calculations: newCalculations,
      });
    });

    sendMessage('new-user', `random-${Date.now()}`);
  }

  componentWillUnmount() {
    // remove the listner to event messages
    unsubscribeFromMessages('calc-message-out', null)
  }

  // function used to append the value to the display
  display = (val) => {
    let currentValue;
    let equalFlag = this.state.equalFlag;

    if(equalFlag) {
      // Reset the values
      equalFlag = false;
      currentValue = "";
      
      // Append the result if it is not a digit
      let checkNum = new RegExp("[0-9]")
      if (!checkNum.test(val)) {
        currentValue = this.state.value;
      }
    } else {
      // Append if last key is not equal button
      currentValue = this.state.value;
    }

    this.setState({
      value: currentValue + val,
      expression: currentValue + val,
      equalFlag,
    });

    this.clearInvalidState();
  }
  
  // function to clear the expression
  ac = () => {
    this.setState({
      value: "",
      expression: "",
    });
    
    this.clearInvalidState();
  }

  // function to calculate the expression
  compute = () => {
    this.clearInvalidState();
    
    if (!this.state.equalFlag) {
      this.setState({equalFlag: true});

      try {
          let expressionToCalculate = this.state.expression ;
          expressionToCalculate = expressionToCalculate.replace(/[^-\d/*+]/g, '');
          let result = eval(expressionToCalculate);

          let message = this.state.expression.split('+').join(' + ').split('-').join(' - ').split('/').join(' ÷ ').split('*').join(' * ');
          sendMessage('calc-message', message + ' = ' + result);

          this.setState({
            value: result,
            expression: "",
          });
      } catch(err) {
          console.error("Invalid input");
          // set the error state
          this.setState({
            invalidState: true,
          });
      } 
    }
  }

  // function to clear the error state
  clearInvalidState = () => {
    this.setState({
      invalidState: false,
    });
  }

  render() {
    return (
      <div className="Calculator">
        <div className="split left">
            <h1 className="app-header">Calculator App</h1>
            <div className="calculator-grid">
                <CalculatorDisplay value={this.state.value} invalidState={this.state.invalidState} />
                <CalculatorButton action={this.display} value='7' />
                <CalculatorButton action={this.display} value='8' />
                <CalculatorButton action={this.display} value='9' />
                <CalculatorButton action={this.display} value='/' displayValue="÷" />
                <CalculatorButton action={this.display} value='4' />
                <CalculatorButton action={this.display} value='5' />
                <CalculatorButton action={this.display} value='6' />
                <CalculatorButton action={this.display} value='*' />
                <CalculatorButton action={this.display} value='1' />
                <CalculatorButton action={this.display} value='2' />
                <CalculatorButton action={this.display} value='3' />
                <CalculatorButton action={this.display} value='-' />
                <CalculatorButton action={this.display} value='0' />
                <CalculatorButton action={this.ac} value='AC' computeButton={true} />
                <CalculatorButton action={this.compute} value='=' computeButton={true} />
                <CalculatorButton action={this.display} value={'+'} />
            </div>
        </div>

        <DisplayMessages data={this.state.calculations} />
      </div>
    );
  }
}

export default Calculator;
