// Calculator variables
const num1 = 0;
const num2 = 0;
const op = 0;

// Calculator functions
const add = function (num1, num2) {
  return num1 + num2;
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

const power = function (num, power) {
  return num ** power;
};

const factorial = function (num) {
  if (num < 0) {
    return undefined;
  } else if (num === 1 || num === 0) {
    return 1;
  }

  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  return result;
};

// Operation function

const operate = function (op, num1, num2) {
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

console.log(operate('+', 2, 1));
console.log(operate('-', 2, 1));
console.log(operate('*', 1, 2));
console.log(operate('/', 1, 2));
