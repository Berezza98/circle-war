import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./consts";

export function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isOnTheField({ x, y }) {
  return x > 0 && x < CANVAS_WIDTH && y > 0 && y < CANVAS_HEIGHT;
}

export function getRandomFromArray(array) {
  return array[getRandom(0, array.length - 1)];
}