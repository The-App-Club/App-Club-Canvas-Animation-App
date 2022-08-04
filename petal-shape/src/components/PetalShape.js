import { CanvasUtils } from './CanvasUtils';
import { Point } from './Point';
import { deg2rad } from '../plugins/index';

class PetalShape {
  constructor(canvasDomContext) {
    this.canvasDomContext = canvasDomContext;
    this.centerPoint = new Point(100, 280);
    this.petalRadius = 200;
    this.petalTipSkewRatio = 1.2;
    this.petalAngleSpan = 50;
    this.canvasUtils = new CanvasUtils(canvasDomContext);
  }

  draw() {
    this.canvasUtils.drawDashedLineBetweenTwoPoints(this.centerPoint, new Point(100, 40));
    this.canvasUtils.drawCircle(this.centerPoint, this.petalRadius, 'black', -(90 + 0.5 * this.petalAngleSpan), -(90 - 0.5 * this.petalAngleSpan));

    const vs = this.getVertices();
    const cps = this.controlPoints(vs); // the control points array
    cps.forEach((x) => this.canvasUtils.drawDashedLineBetweenTwoPoints(x[0], x[1]));
    this.canvasDomContext.beginPath();
    this.canvasDomContext.moveTo(this.centerPoint.x, this.centerPoint.y);
    // the first & the last curve are quadratic Bezier
    // because I'm using push(), pc[i][1] comes before pc[i][0]
    this.canvasDomContext.strokeStyle = this.canvasUtils.green;
    this.canvasDomContext.quadraticCurveTo(cps[1][1].x, cps[1][1].y, vs[1].x, vs[1].y);
    this.canvasDomContext.stroke();

    // central curves are cubic Bezier
    this.canvasDomContext.beginPath();
    this.canvasDomContext.moveTo(vs[1].x, vs[1].y);
    this.canvasDomContext.strokeStyle = this.canvasUtils.blue;
    this.canvasDomContext.bezierCurveTo(cps[1][0].x, cps[1][0].y, cps[2][1].x, cps[2][1].y, vs[2].x, vs[2].y);
    this.canvasDomContext.bezierCurveTo(cps[2][0].x, cps[2][0].y, cps[3][1].x, cps[3][1].y, vs[3].x, vs[3].y);
    this.canvasDomContext.stroke();

    this.canvasDomContext.beginPath();
    this.canvasDomContext.moveTo(vs[3].x, vs[3].y);
    // the first & the last curve are quadratic Bezier
    this.canvasDomContext.strokeStyle = this.canvasUtils.green;
    this.canvasDomContext.quadraticCurveTo(cps[3][0].x, cps[3][0].y, this.centerPoint.x, this.centerPoint.y);
    this.canvasDomContext.stroke();
  }

  getVertices() {
    const vs = [this.centerPoint];
    const halfAngleSpan = 0.5 * this.petalAngleSpan;
    const dx = this.petalRadius * Math.sin(deg2rad(halfAngleSpan));
    const dy = this.petalRadius * Math.cos(deg2rad(halfAngleSpan));
    vs.push(new Point(this.centerPoint.x - dx, this.centerPoint.y - dy));

    const petalTipLength = this.petalRadius * this.petalTipSkewRatio;
    vs.push(new Point(this.centerPoint.x, this.centerPoint.y - petalTipLength));

    vs.push(new Point(this.centerPoint.x + dx, this.centerPoint.y - dy));

    vs.push(this.centerPoint);
    vs.forEach((p) => {
      this.canvasUtils.drawPoint(p, 3, this.canvasUtils.red);
    });
    return vs;
  }

  controlPoints(p) {
    const t = 0.2;
    const pc = [];
    for (let i = 1; i < p.length - 1; i++) {
      const dx = p[i - 1].x - p[i + 1].x;
      const dy = p[i - 1].y - p[i + 1].y;
      pc[i] = [];
      pc[i].push(new Point(p[i].x - dx * t, p[i].y - dy * t));
      pc[i].push(new Point(p[i].x + dx * t, p[i].y + dy * t));
      pc[i].forEach((cp) => {
        this.canvasUtils.drawPoint(cp, 3, this.canvasUtils.blue);
      });
    }
    return pc;
  }
}

export { PetalShape };
