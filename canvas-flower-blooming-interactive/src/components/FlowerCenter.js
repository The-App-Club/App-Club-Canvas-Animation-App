import { Point } from './Point';

class FlowerCenter {
  constructor(centerPoint, centerRadius, centerColor) {
    this.centerPoint = centerPoint;
    this.centerRadius = centerRadius;
    this.centerColor = centerColor;
  }

  draw(context) {
    context.save();

    context.beginPath();
    context.arc(
      this.centerPoint.x,
      this.centerPoint.y,
      this.centerRadius,
      0,
      2 * Math.PI
    );
    context.fillStyle = this.centerColor;
    context.fill();

    context.restore();
  }
}

export { FlowerCenter };
