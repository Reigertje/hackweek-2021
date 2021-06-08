const UP = 1;
const LEFT = 2;
const DOWN = 4;
const RIGHT = 8;
const LIST = [UP, LEFT, DOWN, RIGHT];

const INVERSE = {
  [UP]: DOWN,
  [LEFT]: RIGHT,
  [DOWN]: UP,
  [RIGHT]: LEFT,
};

const VECTOR = {
  [UP]: [0, 1],
  [LEFT]: [-1, 0],
  [DOWN]: [0, -1],
  [RIGHT]: [1, 0],
};

const invert = function (direction) {
  return INVERSE[direction];
};

const vector = function (direction) {
  return VECTOR[direction];
};

const list = function () {
  return [...LIST];
};

export { UP, DOWN, LEFT, RIGHT, list, invert, vector };
