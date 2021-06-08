import { LEFT, RIGHT } from "./directions";
import { randomElement } from "./random";
import Grid from "./grid";

const TEMPLATE_WIDTH = 11;
const TEMPLATE_HEIGHT = 7;

class Template extends Grid {
  constructor(data) {
    super(
      TEMPLATE_WIDTH,
      TEMPLATE_HEIGHT,
      data
        .map((row) => row.split(""))
        .reverse()
        .flat()
    );
    this.initData = data;
  }

  horizontalMirror() {
    return new Template(
      this.initData.map((row) => row.split("").reverse().join(""))
    );
  }
}

const TEMPLATES = {
  1: [
    new Template([
      "####...####",
      "#.........#",
      "#.........#",
      "#....1.##.#",
      "#.........#",
      "#.........#",
      "###########",
    ]),
    new Template([
      "####...####",
      "#.........#",
      "#..1......#",
      "#......##.#",
      "#..##...1.#",
      "#.........#",
      "###########",
    ]),
  ],
  2: [
    new Template([
      "###########",
      "#.........#",
      "1.........#",
      "..........#",
      "..........#",
      "#.........#",
      "###########",
    ]),
  ],
  3: [
    new Template([
      "####...####",
      "#..1......#",
      "..........#",
      "..........#",
      "........1.#",
      "#.........#",
      "###########",
    ]),
  ],
  4: [
    new Template([
      "###########",
      "#.........#",
      "#....1....#",
      "#.........#",
      "#.........#",
      "#.........#",
      "####...####",
    ]),
  ],
  5: [
    new Template([
      "####...####",
      "#.........#",
      "#.........#",
      "#....1....#",
      "#.........#",
      "#.........#",
      "####...####",
    ]),
  ],
  6: [
    new Template([
      "###########",
      "#.........#",
      "..........#",
      ".....1....#",
      "..........#",
      "#.........#",
      "####...####",
    ]),
  ],
  7: [
    new Template([
      "####...####",
      "#......1..#",
      "1.........#",
      "..........#",
      "..........#",
      "#.........#",
      "####...####",
    ]),
  ],
  // 8, 9 can be mirrored from 2, 3
  10: [
    new Template([
      "###########",
      "#.........#",
      ".....1.....",
      "..1........",
      ".........1.",
      "#.........#",
      "###########",
    ]),
    new Template([
      "###########",
      "#.........#",
      "....###....",
      ".....1.....",
      "....1..1...",
      "#.1.......#",
      "###########",
    ]),
  ],
  11: [
    new Template([
      "####...####",
      "#.........#",
      "1..........",
      "...........",
      "...........",
      "#.........#",
      "###########",
    ]),
  ],
  // 12 and 13 can be mirrored from 6, 7
  14: [
    new Template([
      "###########",
      "#.......1.#",
      "...........",
      "...........",
      "...........",
      "#..1......#",
      "####...####",
    ]),
  ],
  15: [
    new Template([
      "####...####",
      "#....1....#",
      "...........",
      "...........",
      "...........",
      "#.1.....1.#",
      "####...####",
    ]),
  ],
};

const mirrorKey = (key) => {
  let result = key & ~(RIGHT | LEFT);
  if (key & LEFT) result |= RIGHT;
  if (key & RIGHT) result |= LEFT;
  return result;
};

const loadTemplates = function () {
  const result = Array.from(Array(16), () => []);

  Object.keys(TEMPLATES).forEach((key) => {
    const intKey = parseInt(key, 10);

    const mirroredList = TEMPLATES[key].map((template) =>
      template.horizontalMirror()
    );
    const mirroredKey = mirrorKey(intKey);

    result.forEach((arr, index) => {
      if (intKey === index) {
        Array.prototype.push.apply(arr, TEMPLATES[key]);
      }
      if (mirroredKey === index) {
        Array.prototype.push.apply(arr, mirroredList);
      }
    });
  });

  return result;
};

class LevelTemplates {
  constructor() {
    this.templates = loadTemplates();
    this.width = TEMPLATE_WIDTH;
    this.height = TEMPLATE_HEIGHT;
  }

  select(type) {
    return randomElement(this.templates[type.toString()]);
  }
}

export default LevelTemplates;
