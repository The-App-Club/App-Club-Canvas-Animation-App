import { Petal } from './Petal';
import { FlowerCenter } from './FlowerCenter';

class Flower {
  constructor(flowerCenter, numberOfPetals, petal) {
    this.flowerCenter = flowerCenter;
    this.numberOfPetals = numberOfPetals;
    this.petal = petal;
    this.originalPetalRadius = petal.radius;
    this.stopChanging = false;
  }

  draw(context) {
    this.drawPetals(context);
    this.flowerCenter.draw(context);
  }

  increasePetalRadius() {
    this.petal = new Petal(
      this.petal.centerPoint,
      this.petal.radius + 0.2,
      this.petal.tipSkewRatio,
      this.petal.angleSpan,
      this.petal.color
    );
  }

  increasePetalRadiusWithLimit() {
    if (this.petal.radius < this.originalPetalRadius + 30) {
      this.stopChanging = false;
      this.increasePetalRadius();
    } else {
      this.stopChanging = true;
    }
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
