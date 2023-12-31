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
    if (hasDecimals(operate(num1, num2, op))) {
      displayValue = operate(num1, num2, op).toFixed(5);
    } else {
      displayValue = operate(num1, num2, op);
    }
    if (hasDecimals(displayValue)) {
      num1 = Number(displayValue).toFixed(5);
    } else {
      num1 = Number(displayValue);
    }
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

// Function to handle both click and keydown events
function handleKeyInput(key) {
  const operator = key.operator;
  const number = key.number;

  if (operator) {
    handleOperator(operator);
  } else if (number) {
    handleNumber(number);
  }
  updateDisplay();
}

// Event listeners for click events
buttons.forEach((button) => {
  button.addEventListener('click', () => handleKeyInput(button.dataset));
});

// Event listener for keydown events
document.addEventListener('keydown', (event) => {
  const key = event.key;
  console.log(event.key);

  // Loop through buttons to find the one with the corresponding data-key attribute
  buttons.forEach((button) => {
    const buttonKey = button.getAttribute('data-key');
    if (buttonKey === key) {
      handleKeyInput(button.dataset);
    }
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
function handleEqual() {
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
    if (
      hasDecimals(operate(num1, num2, op)) &&
      operate(num1, num2, op) !== 'dafuq'
    ) {
      displayValue = operate(num1, num2, op).toFixed(5).toString();
    } else {
      displayValue = operate(num1, num2, op).toString();
    }
    updateDisplay();
  }
}

// Equal button (click)
const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', handleEqual);

// Equal keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === 'Enter' || key === '=') {
    handleEqual();
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

// Backspace button function ((arrow back) that returns to 0 when empty, and "removes three times" if a blank space is encountered (e.g. num1' 'op' 'num2))
function handleBackspace() {
  if (displayValue.length == 1) {
    displayValue = '0';
  } else if (displayValue.split('')[displayValue.length - 1].trim() === '') {
    displayValue = displayValue.slice(0, -3);
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  updateDisplay();
}

// Backspace button (click)
const backButton = document.querySelector('.back');
backButton.addEventListener('click', handleBackspace);

// Backspace button (keyboard support)
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === 'Backspace') {
    handleBackspace();
  }
});

// Dot (comma) button functionionality
// Check if comma is present
const hasComma = (num) => {
  const numString = num.toString();
  return numString.includes('.');
};

// Dot function (make sure only one comma can exist for each operand)
function handleDot() {
  const parts = displayValue.split(' ');
  const secondOperand = parts[2];
  if (num1 !== 0 && displayValue.includes(op) && !secondOperand.includes('.')) {
    displayValue += '.';
    updateDisplay();
  } else if (!hasComma(displayValue)) {
    displayValue += '.';
    updateDisplay();
  }
}

// Dot button (click)
const dotButton = document.querySelector('.dot-button');
dotButton.addEventListener('click', handleDot);

// Dot button (keyboard support)
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === '.') {
    handleDot();
  }
});

// Declare function to check if a number has decimal points
function hasDecimals(number) {
  return Number(number) % 1 !== 0;
}

// Add .active css class to buttons when pressed, and remove on keyup (data-key used to add to the corresponding key that is pressed)
document.addEventListener('keydown', (event) => {
  const key = event.key;
  const button = document.querySelector(`[data-key="${key}"]`);

  if (button) {
    button.classList.add('active');
  }
});

document.addEventListener('keyup', (event) => {
  const key = event.key;
  const button = document.querySelector(`[data-key="${key}"]`);

  if (button) {
    button.classList.remove('active');
  }
});

// Theme switch
const toggle = document.querySelector('#toggle');
toggle.addEventListener('click', modeSwitch);

let isBoring = true;

function modeSwitch() {
  isBoring = !isBoring;
  isBoring
    ? (toggle.innerText = 'Too boring?')
    : (toggle.innerText = 'Too exciting?');
  var rootElement = document.body;
  rootElement.classList.toggle('not-boring');
}
