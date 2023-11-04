const add = function (num1, num2) {
  return num1 + num2;
};

const subtract = function (num1, num2) {
  return num1 - num2;
};

const sum = function (array) {
  return array.reduce((acc, cur) => acc + cur, 0);
};

const multiply = function (array) {
  return array.reduce((acc, cur) => acc * cur);
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
