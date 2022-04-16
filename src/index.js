import Background from './Background';
import ChangeOrientation from './ChangeOrientation';
import consts from './consts';
import { getOrientation, isMobile } from './helpers';
import Menu from './Menu';

import './styles.css';

let background;
let changeOrientation;
let menu;

function main() {
  // DELETE PREVIOUS
  background?.stop()?.remove?.();
  changeOrientation?.remove?.();
  menu?.remove?.();

  background = new Background();
  background.start();

  if (isMobile.any() && getOrientation() === consts.PORTRAIT_ORIENTATION) {
    changeOrientation = new ChangeOrientation();
    return
  }

  menu = new Menu();
}

window.addEventListener("orientationchange", main);
window.addEventListener("resize", main);

main();