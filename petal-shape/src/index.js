import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useEffect, useState, useRef } from 'react';
import { PetalShape } from './components/PetalShape';

// https://medium.com/@changhuixu/how-to-compose-canvas-animations-in-typescript-9368dfa29028
function App() {
  const canvasDomRef = useRef(null);

  useEffect(() => {
    const canvasDomContext = canvasDomRef?.current.getContext('2d');
    const petal = new PetalShape(canvasDomContext);
    petal.draw();
  }, []);

  return <canvas ref={canvasDomRef} width="500" height="600"></canvas>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
