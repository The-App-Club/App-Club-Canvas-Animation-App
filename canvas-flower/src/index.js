import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useEffect, useState, useRef } from 'react';

import { Flower } from './components/Flower';
import { FlowerCenter } from './components/FlowerCenter';
import { Petal } from './components/Petal';
import { Point } from './components/Point';

// https://medium.com/@changhuixu/how-to-compose-canvas-animations-in-typescript-9368dfa29028
function App() {
  const canvasDomRef = useRef(null);

  useEffect(() => {
    const canvasDomContext = canvasDomRef?.current.getContext('2d');
    const petal = new Petal(new Point(75, 80), 55, 1.2, 75, '#ff1493');
    const center = new FlowerCenter(new Point(75, 80), 20, '#ff5a02');
    const flower = new Flower(center, 4, petal);

    // first flower
    flower.draw(canvasDomContext);

    // second flower
    canvasDomContext.save();
    canvasDomContext.translate(140, 0);

    // shadow effects
    canvasDomContext.shadowBlur = 5;
    canvasDomContext.shadowOffsetX = 2;
    canvasDomContext.shadowOffsetY = 2;
    canvasDomContext.shadowColor = '#333';
    canvasDomContext.globalAlpha = 0.85;

    flower.draw(canvasDomContext);
    canvasDomContext.restore();
  }, []);

  return <canvas ref={canvasDomRef} width="500" height="600"></canvas>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
