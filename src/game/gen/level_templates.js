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
    /**

    TYPE 1: EXIT ON TOP

    **/
    new Template([
      "####...####",
      "#.........#",
      "#.........#",
      "#....C.##P#",
      "#.........#",
      "#.........#",
      "###########",
    ]),
    new Template([
      "####...####",
      "#.........#",
      "#..1......#",
      "#....C.##P#",
      "#..##...1.#",
      "#.........#",
      "###########",
    ]),
    new Template([
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
    new Template([
      "###########",
      "#.........#",
      "1......C..#",
      "..........#",
      "..........#",
      "#.........#",
      "###########",
    ]),
    new Template([
      "...########",
      "....#.....#",
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
    new Template([
      "####...####",
      "#..1......#",
      "..........#",
      "..........#",
      "....C...1.#",
      "#.........#",
      "###########",
    ]),
    new Template([
      ".......####",
      "..C....1..#",
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
    new Template([
      "###########",
      "#P........#",
      "####.1....#",
      "#.......C.#",
      "#.........#",
      "#.........#",
      "####...####",
    ]),
    new Template([
      "###########",
      "#.......P.#",
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
    new Template([
      "####...####",
      "#.........#",
      "#.......###",
      "#....1...P#",
      "#.C...#####",
      "#.........#",
      "####...####",
    ]),
    new Template([
      "...........",
      "...........",
      "..........#",
      "#....C....#",
      "#.........#",
      "#.........P",
      "#..........",
    ]),
    new Template([
      "####...####",
      "##.......##",
      "####..##.##",
      "#####C##P##",
      "#......#.1#",
      "####.......",
      "#.......###",
    ]),
  ],
  6: [
    /**

    TYPE 6: EXIT ON LEFT + BOTTOM

    **/
    new Template([
      "###########",
      "#.........#",
      ".......C..#",
      ".....1....#",
      ".##.......#",
      "#P........#",
      "####...####",
    ]),
    new Template([
      "###########",
      "#....P....#",
      "...##..C..#",
      ".....1....#",
      "1...####..#",
      "#.........#",
      ".......####",
    ]),
  ],
  7: [
    /**

    TYPE 7: EXIT ON TOP + LEFT + BOTTOM

    **/
    new Template([
      "####...####",
      "#......1..#",
      "1.........#",
      ".....C....#",
      "..........#",
      "#.......P.#",
      "####...####",
    ]),
    new Template([
      "####...####",
      "##....#####",
      "....#######",
      ".1C.......#",
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
    new Template([
      "###########",
      "#......C..#",
      ".....1.....",
      "..1........",
      ".......P.1.",
      "#.........#",
      "###########",
    ]),
    new Template([
      "###########",
      "#....C....#",
      "....###....",
      ".....1.....",
      "....1..1...",
      "#.1.......#",
      "###########",
    ]),
    new Template([
      "..#####....",
      "...........",
      "...........",
      "....C......",
      "......1....",
      "#.........#",
      "##...##....",
    ]),
    new Template([
      "###########",
      "####...####",
      ".....###1..",
      ".1..C......",
      "..#####....",
      "###########",
      "###########",
    ]),
  ],
  11: [
    // EXIT ON TOP, LEFT AND RIGHT
    new Template([
      "####...####",
      "#.........#",
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
    new Template([
      "###########",
      "#.......1.#",
      "...........",
      "....C......",
      "...........",
      "#..1......#",
      "####...####",
    ]),
  ],
  15: [
    // EXIT ON ALL SIDES
    new Template([
      "####...####",
      "#....1....#",
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

export default LevelTemplates;
