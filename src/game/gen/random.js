const randomInt = function (max) {
  return Math.floor(Math.random() * max);
};

const randomShuffle = function (array) {
  for (let i = array.length - 1; i > 0; --i) {
    let j = randomInt(i + 1);
    let x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
};

const randomElement = function (array) {
  return array[randomInt(array.length)];
};

const randomBool = function () {
  return randomInt(2) === 0;
};

export { randomInt, randomShuffle, randomElement, randomBool };
