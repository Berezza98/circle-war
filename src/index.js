import { requestAnimationFrame } from 'request-animation-frame-polyfill';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';
import Enemy from './Enemy';
import Player from './Player';

import './styles.css';

function createCanvas() {
  const wrapper = document.createElement('div');
  const canvas = document.createElement('canvas');
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;

  wrapper.classList.add('wrapper');

  wrapper.appendChild(canvas)
  document.documentElement.appendChild(wrapper);

  return canvas.getContext('2d');
}

function animate(ctx, dynamicElements) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  dynamicElements.forEach(el => el.update());

  requestAnimationFrame(() => animate(ctx, dynamicElements));
}

function main() {
  const ctx = createCanvas();

  const dynamicElements = [
    new Player(ctx),
    new Enemy(ctx)
  ];

  animate(ctx, dynamicElements);
}

main();