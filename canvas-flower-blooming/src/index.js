import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useEffect, useState, useRef, useMemo } from 'react';
import { BloomingFlowers } from './components/BloomingFlowers';

// https://medium.com/@changhuixu/how-to-compose-canvas-animations-in-typescript-9368dfa29028
function App() {
  const canvasDomRef = useRef(null);

  useEffect(() => {
    const flowers = new BloomingFlowers(canvasDomRef.current, 115);
    flowers.bloom(1);
  }, []);

  return (
    <canvas
      ref={canvasDomRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
