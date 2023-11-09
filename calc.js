// Calculator variables
let num1 = 0;
let num2 = 0;
let op = 0;
let displayValue = 0;

// Display
const right = document.querySelector('.right');
const div = document.createElement('div');
const miniDisplay = document.querySelector('.mini-display');
const p = document.createElement('p');

right.appendChild(div).textContent = displayValue;

// Calculator functions
// Add
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', function () {
  if (num1 !== 0 && num2 === 0) {
    // OBS virker ikke (lav 33 + 44 + 55 (equal fix))
    op = '+';
    return;
  } else if (num1 !== 0 && num2 !== 0) {
    num1 = Number(displayValue);
    num2 = 0;
    op = '+';
  }
});

const add = function (num1, num2) {
  return Number(num1) + Number(num2);
};

// Subtract
const subtract = function (num1, num2) {
  return num1 - num2;
};

// Multiply
const multiply = function (num1, num2) {
  return num1 * num2;
};

// Divide
const divide = function (num1, num2) {
  return num1 / num2;
};

// Operation function
const operate = function () {
  if (op === '+') {
    displayValue = add(num1, num2);
    right.appendChild(div).textContent = displayValue;
    num1 = displayValue;
    num2 = 0;
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
  if (num2 === 0 && displayValue !== '') {
    const parts = displayValue.split(' ');
    const secondOperand = parts[2];
    num2 = Number(secondOperand);
    miniDisplay.appendChild(p).textContent = `${num1} ${op} ${num2}`;
    operate(op, num1, num2);
    right.appendChild(div).textContent = displayValue;
  }
});

// Clear function (AC)
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', function () {
  num1 = 0;
  num2 = 0;
  op = 0;
  displayValue = 0;
  right.appendChild(div).textContent = displayValue;
  miniDisplay.appendChild(p).textContent = '';
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
  if (!hasComma(displayValue)) {
    displayValue += '.';
    right.appendChild(div).textContent = displayValue;
  }
});

// Populate display when number or operate buttons are pressed
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', function () {
    const operator = button.getAttribute('data-operator');
    const number = button.getAttribute('data-number');
    const equal = button.getAttribute('data-equal');
    // Check if the button has a data-operator attribute and populate display
    if (operator) {
      if (Number(displayValue) === num1) {
        displayValue = `${num1} ${op} `;
        miniDisplay.appendChild(p).textContent = `Ans ${num1}`;
      } else if (num1 !== 0 && num2 === 0) {
        displayValue += `${num1} ${op} `;
      }
      right.appendChild(div).textContent = displayValue;
    }
    // Populate mini-display when operator is clicked
    // Check if the button has a data-number attribute and populate display
    if (number) {
      if (displayValue !== 0) {
        displayValue += number;
      } else {
        displayValue = number;
      }
      right.appendChild(div).textContent = displayValue;
    }
  });
});
