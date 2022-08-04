import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useEffect, useState, useCallback } from 'react';
import { Canvas } from './components/Canvas';
import { DacchiWife } from './components/DacchiWife';

function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [circleNum, setCircleNum] = useState(30);

  const handleParameterChange = (e) => {
    const { minMaxNumber } = { ...e };
    setCircleNum(minMaxNumber);
    console.log(`handleParameterChange`, e);
  };

  return (
    <div className="App">
      <DacchiWife onChange={handleParameterChange}></DacchiWife>
      <Canvas width={width} height={height} circleNum={circleNum} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
