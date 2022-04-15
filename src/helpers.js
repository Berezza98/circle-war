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

export function getMinMax(origMin, origMax, min, max, value) {
  const stepsCount = max - min;
  const origStep = (origMax - origMin) / stepsCount;

  return origStep * value;
}

export function createCanvas(className) {
  const canvas = document.createElement('canvas');
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;

  if (className) {
    canvas.classList.add(className);
  }

  document.body.appendChild(canvas);

  return canvas.getContext('2d');
}

export function createEl(elName, classList) {
  const el = document.createElement(elName);
  const classNames = Array.isArray(classList) ? classList : [classList];

  el.classList.add(...classNames);

  return el;
}

export const isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
    // return false;
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};