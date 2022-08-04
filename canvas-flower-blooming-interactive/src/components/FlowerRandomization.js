import { Flower } from './Flower';
import { Point } from './Point';
import { FlowerCenter } from './FlowerCenter';
import { Petal } from './Petal';

class FlowerRandomization {
  constructor() {
    this.colors = [
      '#f10e57',
      '#ea767a',
      '#ff6d3d',
      '#ecac43',
      '#fb9983',
      '#f9bc9f',
      '#f8ed38',
      '#a8e3f9',
      '#d1f2fd',
      '#ecd5f5',
      '#fee4fd',
      '#8520b4',
      '#fa2e59',
      '#ff703f',
      '#ff703f',
      '#f7bc05',
      '#ecf6bb',
      '#76bcad',
    ];
  }

  getFlowerAt(point) {
    const flowerCenter = new FlowerCenter(
      point,
      this.randomIntFromInterval(5, 16),
      this.randomColor()
    );
    const numberOfPetals = this.randomIntFromInterval(4, 8);
    const petalAngleSpacing = this.randomIntFromInterval(5, 25);
    const petalAngleSpan = 360 / numberOfPetals - petalAngleSpacing;
    const petal = new Petal(
      point,
      this.randomIntFromInterval(20, 50),
      this.randomIntFromInterval(9, 14) / 10,
      petalAngleSpan,
      this.randomColor()
    );
    return new Flower(flowerCenter, numberOfPetals, petal);
  }

  getFlowerOnCanvas(canvasWidth, canvasHeight) {
    return this.getFlowerAt(
      new Point(
        this.randomIntLessThan(canvasWidth),
        this.randomIntLessThan(canvasHeight)
      )
    );
  }

  randomIntFromInterval(min, max) {
    // min: inclusive; max: exclusive
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomIntLessThan(n) {
    return this.randomIntFromInterval(0, n);
  }

  randomColor() {
    return this.colors[this.randomIntLessThan(this.colors.length)];
  }
}

export { FlowerRandomization };
