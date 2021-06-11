import { LEFT, RIGHT } from "./directions";
import { randomElement } from "./random";
import Grid from "./grid";

const TEMPLATE_WIDTH = 11;
const TEMPLATE_HEIGHT = 7;

class Template extends Grid {
  constructor(width, height, data) {
    super(
      width,
      height,
      data
        .map((row) => row.split(""))
        .reverse()
        .flat()
    );
    this.initData = data;
  }

  horizontalMirror() {
    return new Template(
      this.width,
      this.height,
      this.initData.map((row) => row.split("").reverse().join(""))
    );
  }
}

class DefaultTemplate extends Template {
  constructor(data) {
    super(TEMPLATE_WIDTH, TEMPLATE_HEIGHT, data);
  }
}

const TEMPLATES = {
  1: [
    /**

    TYPE 1: EXIT ON TOP

    **/
    new DefaultTemplate([
      "####...####",
      "#.2.......#",
      "#.........#",
      "#....C.##P#",
      "#.........#",
      "#.........#",
      "###########",
    ]),
    new DefaultTemplate([
      "####...####",
      "#.......2.#",
      "#..1......#",
      "#....C.##P#",
      "#..##...1.#",
      "#.........#",
      "###########",
    ]),
    new DefaultTemplate([
      "...........",
      ".....C.....",
      "..####....#",
      "##.....####",
      "##.##..#1##",
      "##P##....P#",
      "###########",
    ]),
  ],
  2: [
    /**

    TYPE 2: EXIT ON LEFT

    **/
    new DefaultTemplate([
      "###########",
      "#.2..2....#",
      "1......C..#",
      "..........#",
      "..........#",
      "#.........#",
      "###########",
    ]),
    new DefaultTemplate([
      "...########",
      "....#2....#",
      "....#..C..#",
      "....1..P..#",
      "..........#",
      "....#.....#",
      "...########",
    ]),
  ],
  3: [
    /**

    TYPE 3: EXIT ON TOP + LEFT

    **/
    new DefaultTemplate([
      "####...####",
      "#.21...2..#",
      "..........#",
      "..........#",
      "....C...1.#",
      "#.........#",
      "###########",
    ]),
    new DefaultTemplate([
      ".......####",
      "..C....1E.#",
      ".....#....#",
      ".....1....#",
      "..#.....P.#",
      "#.........#",
      "###########",
    ]),
  ],
  4: [
    /**

    TYPE 4: EXIT ON BOTTOM

    **/
    new DefaultTemplate([
      "###########",
      "#P..2..2..#",
      "####.1....#",
      "#.......C.#",
      "#.........#",
      "#.........#",
      "####...####",
    ]),
    new DefaultTemplate([
      "###########",
      "#2....2.P.#",
      "#.C..1....#",
      "#...##....#",
      "#..#......#",
      "#.##.1....#",
      ".....#..###",
    ]),
  ],
  5: [
    /**

    TYPE 5: EXIT ON TOP + BOTTOM

    **/
    new DefaultTemplate([
      "####...####",
      "#..2...2..#",
      "#.......###",
      "#....1...P#",
      "#.C...#####",
      "#.........#",
      "####...####",
    ]),
    new DefaultTemplate([
      "...........",
      "...........",
      "..........#",
      "#....C....#",
      "#.........#",
      "#.........P",
      "#..........",
    ]),
    new DefaultTemplate([
      "####...####",
      "##.......##",
      "####..##.##",
      "#####C##P##",
      "#...2..#.1#",
      "####...2...",
      "#.......###",
    ]),
  ],
  6: [
    /**

    TYPE 6: EXIT ON LEFT + BOTTOM

    **/
    new DefaultTemplate([
      "###########",
      "#.2..2....#",
      ".......C..#",
      ".....1....#",
      ".##.......#",
      "#P........#",
      "####...####",
    ]),
    new DefaultTemplate([
      "###########",
      "#.2..P..2.#",
      "...##..C..#",
      ".....1....#",
      "1...####..#",
      "#....2....#",
      ".......####",
    ]),
  ],
  7: [
    /**

    TYPE 7: EXIT ON TOP + LEFT + BOTTOM

    **/
    new DefaultTemplate([
      "####...####",
      "#.2....12.#",
      "1.........#",
      ".....C....#",
      "..........#",
      "#.......P.#",
      "####...####",
    ]),
    new DefaultTemplate([
      "####...####",
      "##2...#####",
      ".2..#######",
      ".1C....2..#",
      "....###.1P#",
      "#.........#",
      "####...####",
    ]),
  ],
  // 8, 9 can be mirrored from 2, 3
  10: [
    /**

    TYPE 10: EXIT ON LEFT + RIGHT

    **/
    new DefaultTemplate([
      "###########",
      "#2....2C.2#",
      ".....1.....",
      "..1........",
      ".......P.1.",
      "#.........#",
      "###########",
    ]),
    new DefaultTemplate([
      "###########",
      "#2...C...2#",
      "....###....",
      "....21.....",
      "....1..1...",
      "#.1.......#",
      "###########",
    ]),
    new DefaultTemplate([
      "..#####....",
      "..2...2....",
      "...........",
      "....C......",
      "......1....",
      "#.........#",
      "##...##....",
    ]),
    new DefaultTemplate([
      "###########",
      "####2..####",
      ".....###1..",
      ".1..C......",
      "..#####....",
      "###########",
      "###########",
    ]),
  ],
  11: [
    // EXIT ON TOP, LEFT AND RIGHT
    new DefaultTemplate([
      "####...####",
      "#..2...2..#",
      "1..........",
      "......C....",
      "...........",
      "#.........#",
      "###########",
    ]),
  ],
  // 12 and 13 can be mirrored from 6, 7
  14: [
    // EXIT ON LEFT, RIGHT AND BOTTOM
    new DefaultTemplate([
      "###########",
      "#.2....21.#",
      "...........",
      "....C......",
      "...........",
      "#..1......#",
      "####...####",
    ]),
  ],
  15: [
    // EXIT ON ALL SIDES
    new DefaultTemplate([
      "####...####",
      "#.2..1..2.#",
      "...........",
      "......C....",
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

export { LevelTemplates as default, Template };
