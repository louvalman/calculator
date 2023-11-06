// Calculator variables
let num1 = 0;
let num2 = 0;
let op = 0;
let displayValue = 0;

// Display
const display = document.querySelector('.display');
const div = document.createElement('div');

display.appendChild(div).textContent = displayValue;

// Calculator functions

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', function () {
  num1 = displayValue;
  op = '+';
  displayValue = '';
});

const add = function (num1, num2) {
  return Number(num1) + Number(num2);
};

const subtract = function (num1, num2) {
  return num1 - num2;
};

const sum = function (array) {
  return array.reduce((acc, cur) => acc + cur, 0);
};

const multiply = function (num1, num2) {
  return num1 * num2;
};

const divide = function (num1, num2) {
  return num1 / num2;
};

// const power = function (num, power) {
//   return num ** power;
// };
//
// const factorial = function (num) {
//   if (num < 0) {
//     return undefined;
//   } else if (num === 1 || num === 0) {
//     return 1;
//   }

//   let result = 1;
//   for (let i = 1; i <= num; i++) {
//     result *= i;
//   }
//   return result;
// };

// Operation function
const operate = function () {
  if (op === '+') {
    displayValue = add(num1, num2);
  } else if (op === '-') {
    return subtract(num1, num2);
  } else if (op === '*') {
    return multiply(num1, num2);
  } else if (op === '/') {
    return divide(num1, num2);
  }
};

const equalButton = document.querySelector('.equal-button');
equalButton.addEventListener('click', function () {
  num2 = displayValue;
  operate('+', num1, num2);
});

// Clear function

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', function () {
  num1 = 0;
  num2 = 0;
  op = 0;
  displayValue = 0;
  display.appendChild(div).textContent = displayValue;
});

// Dot (comma) button function

const hasComma = (num) => {
  const numString = num.toString();
  return numString.includes('.');
};

const dotButton = document.querySelector('.dot-button');
dotButton.addEventListener('click', function () {
  if (!hasComma(displayValue)) {
    displayValue += '.';
    display.appendChild(div).textContent = displayValue;
  }
});

// Populate display when buttons are pressed

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', function () {
    const operator = button.getAttribute('data-operator');
    const number = button.getAttribute('data-number');
    const equal = button.getAttribute('data-equal');
    // Check if the button has a data-operator attribute
    if (operator) {
      displayValue += '';
      display.appendChild(div).textContent = displayValue;
    }
    // Check if the button has a data-number attribute
    if (number) {
      if (displayValue !== 0) {
        displayValue += number;
      } else {
        displayValue = number;
      }
      display.appendChild(div).textContent = displayValue;
    }
    if (equal) {
      display.appendChild(div).textContent = displayValue;
    }
  });
});
