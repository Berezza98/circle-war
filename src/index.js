import Background from './Background';
import Menu from './Menu';

import './styles.css';

function main() {
  const background = new Background();
  new Menu();

  background.start();
}

main();