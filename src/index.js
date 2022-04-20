import Assets from './Assets';
import Background from './Background';
import ChangeOrientation from './ChangeOrientation';
import { PORTRAIT_ORIENTATION } from './consts';
import { getOrientation, isMobile } from './helpers';
import Menu from './Menu';
import assetsConfig from './aseetsConfig';

import './styles.css';

async function main() {
  // Preload all assets
  await Assets.load(assetsConfig);
  // DELETE PREVIOUS
  ChangeOrientation.remove();
  Background.remove();
  Menu.remove();

  Background.create().start();

  if (isMobile.any() && getOrientation() === PORTRAIT_ORIENTATION) {
    ChangeOrientation.create();
    return
  }

  await Menu.create();
}

window.addEventListener("orientationchange", main);
// window.addEventListener("resize", main);

main();