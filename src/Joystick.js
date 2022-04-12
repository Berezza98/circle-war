import Vector from "./Vector";

export default class Joystick {
  constructor({ className, size }) {
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add(className);
    this.canvas.height = this.canvas.width = size;
    this.ctx = this.canvas.getContext('2d');
    this.radius = this.canvas.width / 2;
    this.innerRadius = this.radius / 2;
    this.position = new Vector(0, 0);

    this.addListeners();
    this.draw();
  }

  get data() {
    return this.position.normalize();
  }

  addListeners() {
    this.canvas.addEventListener('touchmove', (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.targetTouches[0].pageX - rect.left;
      const y = e.targetTouches[0].pageY - rect.top;

      this.position = new Vector(x - this.canvas.width / 2, y - this.canvas.height / 2).limit(this.radius - this.innerRadius);

      this.draw();
    });

    this.canvas.addEventListener('touchstart', (e) => {
      // console.log(e);
    });

    this.canvas.addEventListener('touchend', () => {
      this.position = new Vector(0, 0);

      this.draw();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
    this.ctx.arc(0, 0, this.radius - 2, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.beginPath();
    const { x, y } = this.position;
    this.ctx.arc(x, y, this.innerRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.restore();
  }

  append(parent) {
    parent.appendChild(this.canvas);

    return this;
  }
}