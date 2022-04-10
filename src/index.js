import { requestAnimationFrame } from 'request-animation-frame-polyfill';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './consts';
import EnemyPool from './EnemyPool';
import AmmoPool from './AmmoPool';
import Player from './Player';

import './styles.css';
import Score from './Score';

function createCanvas() {
  const wrapper = document.createElement('div');
  const canvas = document.createElement('canvas');
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;

  wrapper.classList.add('wrapper');

  wrapper.appendChild(canvas)
  document.body.appendChild(wrapper);

  return canvas.getContext('2d');
}

function animate(ctx, dynamicElements) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  dynamicElements.forEach(el => el.update());

  requestAnimationFrame(() => animate(ctx, dynamicElements));
}

function main() {
  const ctx = createCanvas();

  const score = new Score(ctx);
  const player = new Player(ctx);
  const enemyPool = new EnemyPool(ctx, player, score);
  const ammoPool = new AmmoPool(ctx, player, enemyPool);

  const dynamicElements = [player, enemyPool, ammoPool, score];

  animate(ctx, dynamicElements);
}

main();