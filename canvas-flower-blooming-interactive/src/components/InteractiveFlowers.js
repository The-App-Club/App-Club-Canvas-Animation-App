import { Flower } from './Flower';
import { Point } from './Point';
import { FlowerRandomization } from './FlowerRandomization';

class InteractiveFlowers {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.flowers = [];
    this.flowerRandomization = new FlowerRandomization();
    this.ctrlIsPressed = false;
    this.mousePosition = new Point(-100, -100);

    this.addShadowEffect();
    this.addInteractions();
  }

  clearCanvas() {
    this.flowers = [];
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  animateFlowers() {
    if (this.flowers.every((flower) => flower.stopChanging)) {
      return;
    }
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.flowers.forEach((flower) => {
      flower.increasePetalRadiusWithLimit();
      flower.draw(this.context);
    });
    window.requestAnimationFrame(() => this.animateFlowers());
  }

  addInteractions() {
    this.canvas.addEventListener('click', (e) => {
      if (this.ctrlIsPressed) {
        this.clearCanvas();
        return;
      }
      this.calculateMouseRelativePositionInCanvas(e);
      const flower = this.flowerRandomization.getFlowerAt(this.mousePosition);
      this.flowers.push(flower);
      this.animateFlowers();
    });

    window.addEventListener('keydown', (e) => {
      if (e.which === 17 || e.keyCode === 17) {
        this.ctrlIsPressed = true;
      }
    });
    window.addEventListener('keyup', () => {
      this.ctrlIsPressed = false;
    });
  }

  calculateMouseRelativePositionInCanvas(e) {
    this.mousePosition = new Point(
      e.clientX +
        (document.documentElement.scrollLeft || document.body.scrollLeft) -
        this.canvas.offsetLeft,
      e.clientY +
        (document.documentElement.scrollTop || document.body.scrollTop) -
        this.canvas.offsetTop
    );
  }

  addShadowEffect() {
    this.context.shadowBlur = 5;
    this.context.shadowOffsetX = 2;
    this.context.shadowOffsetY = 2;
    this.context.shadowColor = '#333';
    this.context.globalAlpha = 0.8;
  }
}

export { InteractiveFlowers };
