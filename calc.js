// Get buttons
const buttons = document.querySelectorAll('button');

// Calculator variables
let num1 = 0;
let num2 = 0;
let op = 0;
let displayValue = '0';

// Display
const right = document.querySelector('.right');
const div = document.createElement('div');
const miniDisplay = document.querySelector('.mini-display');
const p = document.createElement('p');

// Declare update display function and call it once to show the initial displayvalue of '0'
const updateDisplay = () => {
  right.appendChild(div).textContent = displayValue;
};

updateDisplay();

// Update variables when operator or number is pressed
function handleOperator(operator) {
  const parts = displayValue.split(' ');
  const secondOperand = parts[2];
  if (num1 !== 0 && !Number.isNaN(num1) && num2 === 0 && parts[2]) {
    // if user is trying to chain operations, and there exists two operands and an operator
    num2 = Number(secondOperand); // set num2 to second part of displayValue
    miniDisplay.appendChild(p).textContent = `${num1} ${op} ${num2}`; // populate miniDisplay with the previous 'num1 op num2'
    displayValue = operate(num1, num2, op);
    num1 = Number(displayValue).toFixed(5);
    num2 = 0;
    op = operator;
    displayValue += ` ${op} `;
    updateDisplay();
  } else if (!Number.isNaN(num1) && !displayValue.includes(op)) {
    op = operator;
    num1 = Number(displayValue);
    num2 = 0;
    displayValue += ` ${op} `;
  }
}

function handleNumber(number) {
  if (displayValue !== '0') {
    displayValue += number;
  } else {
    displayValue = number;
  }
}

// Determine how to handle input depending on which type of button is pressed and update display accordingly
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    const operator = button.getAttribute('data-operator');
    const number = button.getAttribute('data-number');

    if (operator) {
      handleOperator(operator);
    } else if (number) {
      handleNumber(number);
    }
    updateDisplay();
  });
});

// Calculator functions and operate function that takes uses calc functions with the input numbers and operators
const add = function (num1, num2) {
  return Number(num1) + Number(num2);
};

// Subtract
const subtract = function (num1, num2) {
  return Number(num1) - Number(num2);
};

// Multiply
const multiply = function (num1, num2) {
  return Number(num1) * Number(num2);
};

// Divide
const divide = function (num1, num2) {
  if (num1 === 0 || num2 === 0) {
    return 'dafuq';
  } else {
    return Number(num1) / Number(num2);
  }
};

// Operation function
const operate = function (num1, num2, op) {
  if (op === '+') {
    return add(num1, num2);
  } else if (op === '-') {
    return subtract(num1, num2);
  } else if (op === '*') {
    return multiply(num1, num2);
  } else if (op === '/') {
    return divide(num1, num2);
  }
};

// Equal function
const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', function () {
  if (
    num1 !== 0 &&
    num2 === 0 &&
    displayValue !== '0' &&
    displayValue !== 'dafuq'
  ) {
    const parts = displayValue.split(' ');
    const secondOperand = parts[2];
    num2 = Number(secondOperand);
    miniDisplay.appendChild(p).textContent = `${num1} ${op} ${num2}`;
    displayValue = operate(num1, num2, op).toFixed(5).toString();
    updateDisplay();
  }
});

// Clear function (AC)
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', function () {
  num1 = 0;
  num2 = 0;
  op = 0;
  displayValue = '0';
  miniDisplay.appendChild(p).textContent = '';
  updateDisplay();
});

// Dot (comma) button functionionality
// Check if comma is present
const hasComma = (num) => {
  const numString = num.toString();
  return numString.includes('.');
};

// Make sure only one comma can exist
const dotButton = document.querySelector('.dot-button');
dotButton.addEventListener('click', function () {
  const parts = displayValue.split(' ');
  const secondOperand = parts[2];
  if (num1 !== 0 && displayValue.includes(op) && !secondOperand.includes('.')) {
    displayValue += '.';
    updateDisplay();
  } else if (!hasComma(displayValue)) {
    displayValue += '.';
    updateDisplay();
  }
});
