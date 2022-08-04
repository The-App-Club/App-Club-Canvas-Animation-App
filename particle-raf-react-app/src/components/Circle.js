import { random } from '../plugins/index';

class Circle {
  constructor(canvasWidth, canvasHeight) {
    this.canvasSize = {
      width: canvasWidth,
      height: canvasHeight,
    };
    this.currentPosition = {
      x: random(0, canvasWidth),
      y: random(0, canvasHeight),
    };

    this.color = `hsla(${Math.floor(random(0, 360))}, 60%, 40%, 40%)`;
    this.velocity = {
      x: random(-4, 4),
      y: random(-4, 4),
    };
    this.size = random(10, 30);
  }

  moveNext() {
    const { x, y } = this.currentPosition;
    if (x < 0 || x > this.canvasSize.width) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (y < 0 || y > this.canvasSize.height) {
      this.velocity.y = this.velocity.y * -1;
    }
    this.currentPosition = {
      x: x + this.velocity.x,
      y: y + this.velocity.y,
    };
  }

  getCircle() {
    this.moveNext();
    const { x, y } = this.currentPosition;
    return {
      x,
      y,
      size: this.size,
      color: this.color,
    };
  }
}

export { Circle };
