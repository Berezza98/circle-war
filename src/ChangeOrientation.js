import { createEl } from "./helpers";

export default class ChangeOrientation {
  constructor() {
    this.parent = createEl('div', 'change-orientation');
    this.parent.innerText = 'Please change your orientation to Landscape Mode!';

    document.body.appendChild(this.parent);
  }

  remove() {
    this.parent.remove();
  }
}