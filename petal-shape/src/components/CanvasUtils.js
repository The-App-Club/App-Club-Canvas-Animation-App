import { Point } from './Point';
import { deg2rad } from '../plugins/index';

class CanvasUtils {
  constructor(canvasDomContext) {
    this.red = '#ff0a42';
    this.blue = '#007bff';
    this.green = '#00aa33';
    this.canvasDomContext = canvasDomContext;
  }

  drawPoint(point, radius = 3, color = 'black') {
    this.drawDot(point.x, point.y, radius, color);
  }

  drawDot(x, y, radius = 3, color = 'black') {
    this.canvasDomContext.save();

    this.canvasDomContext.beginPath();
    this.canvasDomContext.arc(x, y, radius, 0, 2 * Math.PI);
    this.canvasDomContext.fillStyle = color;
    this.canvasDomContext.fill();

    this.canvasDomContext.restore();
  }

  drawDashedLineBetweenTwoPoints(p1, p2) {
    this.drawDashedLine(p1.x, p1.y, p2.x, p2.y);
  }

  drawDashedLine(x0, y0, x1, y1) {
    this.canvasDomContext.save();

    this.canvasDomContext.beginPath();
    this.canvasDomContext.setLineDash([3, 1]);
    this.canvasDomContext.moveTo(x0, y0);
    this.canvasDomContext.lineTo(x1, y1);
    this.canvasDomContext.strokeStyle = 'gray';
    this.canvasDomContext.stroke();

    this.canvasDomContext.restore();
  }

  writeText(text, x, y, color = 'black', font = '12px Times New Roman', textAlign = 'center') {
    this.canvasDomContext.save();

    this.canvasDomContext.font = font;
    this.canvasDomContext.fillStyle = color;
    this.canvasDomContext.textAlign = textAlign;
    this.canvasDomContext.fillText(text, x, y);

    this.canvasDomContext.restore();
  }

  drawCircle(center, radius, color = 'black', startAngle = 0, endAngle = 360) {
    this.canvasDomContext.save();

    this.canvasDomContext.beginPath();
    this.canvasDomContext.setLineDash([1, 3]);
    this.canvasDomContext.strokeStyle = color;
    this.canvasDomContext.arc(center.x, center.y, radius, deg2rad(startAngle), deg2rad(endAngle));
    this.canvasDomContext.stroke();

    this.canvasDomContext.restore();
  }

  drawLabel(text, x, y) {
    this.drawDot(x, y, 10);
    this.writeText(text, x, y + 4, 'white');
  }
}

export { CanvasUtils };
