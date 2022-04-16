import { createEl } from "./helpers";

export default class ChangeOrientation {
  constructor() {
    this.parent = createEl('div', 'change-orientation');
    this.parent.innerText = 'Please change your orientation to Landscape Mode!';

    document.body.appendChild(this.parent);
  }

  static instance = null;

  static create() {
    if (!ChangeOrientation.instance) {
      ChangeOrientation.instance = new ChangeOrientation();
    }

    return ChangeOrientation.instance;
  }

  static remove() {
    if (!ChangeOrientation.instance) return;

    ChangeOrientation.instance.parent.remove();
    ChangeOrientation.instance = null;
  }
}