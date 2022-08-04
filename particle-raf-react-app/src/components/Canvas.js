import { useRef, useEffect, useCallback } from 'react';
import { Circle } from './Circle';
import { useAnimationFrame } from '../hooks/useAnimationFrame';

const Canvas = ({ width, height, circleNum }) => {
  const canvasDomRef = useRef();
  const deltaTimeRef = useRef(0);
  const circles = Array.from({ length: circleNum }, () => {
    return new Circle(width, height);
  });
  useAnimationFrame(() => {
    const canvasDomContext = canvasDomRef.current?.getContext('2d');
    if (!canvasDomContext) {
      return;
    }

    canvasDomContext.fillStyle = `rgba(255, 255, 255, 1)`;
    canvasDomContext.fillRect(0, 0, width, height);
    canvasDomContext.save();
    for (let i = 0, maxLength = circles.length; i < maxLength; i += 1) {
      const { x, y, color, size } = circles[i].getCircle();
      canvasDomContext.fillStyle = color;
      canvasDomContext.beginPath();
      canvasDomContext.arc(x, y, size, 0, (360 * Math.PI) / 180, false);
      canvasDomContext.fill();
    }
    canvasDomContext.restore();
    deltaTimeRef.current = (deltaTimeRef.current + 0.5) % 360;
  });

  return <canvas ref={canvasDomRef} width={width} height={height} />;
};

export { Canvas };
