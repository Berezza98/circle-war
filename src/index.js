import { requestAnimationFrame } from 'request-animation-frame-polyfill';
import EnemyPool from './EnemyPool';
import AmmoPool from './AmmoPool';
import Player from './Player';
import Joystick from './Joystick';
import Score from './Score';
import { isMobile } from './helpers';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';

import './styles.css';
import Background from './Background';

function createCanvas(className) {
  const canvas = document.createElement('canvas');
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;

  if (className) {
    canvas.classList.add(className);
  }

  document.body.appendChild(canvas);

  return canvas.getContext('2d');
}

function animate(ctxs, dynamicElements) {
  ctxs.forEach(ctx => ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
  dynamicElements.forEach(el => el.update());

  requestAnimationFrame(() => animate(ctxs, dynamicElements));
}

function main() {
  let joystickLeft;
  let joystickRight;
  if (isMobile.any()) {
    joystickLeft = new Joystick({ className: 'joystick', size: 200 }).append(document.body);
  }
  const bgCtx = createCanvas('bg');
  const ctx = createCanvas();
  if (isMobile.any()) {
    joystickRight = new Joystick({ className: 'joystick', size: 200 }).append(document.body);
  }

  const background = new Background(bgCtx);
  const score = new Score(ctx);
  const player = new Player(ctx, joystickLeft, joystickRight);
  const enemyPool = new EnemyPool(ctx, player, score);
  const ammoPool = new AmmoPool(ctx, player, enemyPool);

  const dynamicElements = [background, player, enemyPool, ammoPool, score];

  animate([bgCtx, ctx], dynamicElements);
}

main();