import { Petal } from './Petal';
import { FlowerCenter } from './FlowerCenter';

class Flower {
  constructor(flowerCenter, numberOfPetals, petal) {
    this.flowerCenter = flowerCenter;
    this.numberOfPetals = numberOfPetals;
    this.petal = petal;
  }

  draw(context) {
    this.drawPetals(context);
    this.flowerCenter.draw(context);
  }

  increasePetalRadius(progress) {
    this.petal = new Petal(
      this.petal.centerPoint,
      this.petal.radius + progress,
      this.petal.tipSkewRatio,
      this.petal.angleSpan,
      this.petal.color
    );
  }

  drawPetals(context) {
    context.save();

    const rotateAngle = (2 * Math.PI) / this.numberOfPetals;
    for (let i = 0; i < this.numberOfPetals; i++) {
      context.translate(this.petal.centerPoint.x, this.petal.centerPoint.y);
      context.rotate(rotateAngle);
      context.translate(-this.petal.centerPoint.x, -this.petal.centerPoint.y);
      this.petal.draw(context);
    }

    context.restore();
  }
}

export { Flower };
