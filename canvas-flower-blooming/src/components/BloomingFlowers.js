import { Flower } from './Flower';
import { FlowerRandomization } from './FlowerRandomization';
import { useRaf } from '../hooks/useRaf';

class BloomingFlowers {
  constructor(canvas, nFlowers = 10) {
    this.stopAnimation = false;
    this.flowerRandomization = new FlowerRandomization();
    this.canvas = canvas;
    this.nFlowers = nFlowers;
    this.context = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.addShadowEffect();
    this.flowers = this.getFlowers();
    this.progress = 1;
  }

  cancelAnimation() {
    this.stopAnimation = true;
  }

  bloom(progress) {
    let time = 0;
    let frame = 0;

    function loop(
      progress,
      flowers,
      context,
      canvasWidth,
      canvasHeight,
      nFlowers,
      flowerRandomization
    ) {
      function getFlowers() {
        let resultInfoList = [];
        for (let i = 0; i < nFlowers; i++) {
          const flower = flowerRandomization.getFlowerOnCanvas(
            canvasWidth,
            canvasHeight
          );
          resultInfoList.push(flower);
        }
        return resultInfoList;
      }

      requestAnimationFrame(() => {
        loop(
          progress,
          flowers,
          context,
          canvasWidth,
          canvasHeight,
          nFlowers,
          flowerRandomization
        );
      });

      time = frame / 60;
      // ビット論理和
      if ((time * 60) | (0 === frame - 1)) {
        time += 0.00001;
      }
      frame++;
      progress = (frame / 100) % 100;
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      flowers.forEach((flower) => {
        flower.increasePetalRadius(progress);
        flower.draw(context);
      });

      flowers = flowers.filter((flower) => {
        return 10 <= flower.petal.radius && flower.petal.radius <= 100;
      });

      if (flowers.length === 0) {
        flowers = getFlowers();
        frame = 0;
        progress = 0;
      }
    }
    loop(
      this.progress,
      this.flowers,
      this.context,
      this.canvasWidth,
      this.canvasHeight,
      this.nFlowers,
      this.flowerRandomization
    );
  }

  animateFlowers() {
    if (this.stopAnimation) {
      return;
    }
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.flowers.forEach((flower) => {
      flower.draw(this.context);
    });
  }

  getFlowers() {
    let resultInfoList = [];
    for (let i = 0; i < this.nFlowers; i++) {
      const flower = this.flowerRandomization.getFlowerOnCanvas(
        this.canvasWidth,
        this.canvasHeight
      );
      resultInfoList.push(flower);
    }
    return resultInfoList;
  }

  addShadowEffect() {
    this.context.shadowBlur = 5;
    this.context.shadowOffsetX = 2;
    this.context.shadowOffsetY = 2;
    this.context.shadowColor = '#333';
    this.context.globalAlpha = 0.8;
  }
}

export { BloomingFlowers };
