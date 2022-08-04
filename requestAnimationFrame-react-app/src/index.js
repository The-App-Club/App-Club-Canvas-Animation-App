import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useRaf } from './hooks/useRaf';
import { useEffect, useState } from 'react';

function App() {
  const styles = (progress) => {
    return {
      container: {
        display: 'grid',
        placeItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: `hsl(${progress}, 100%, 50%, ${0.1})`,
      },
      cowboy: {
        fontSize: `${progress * 0.1}rem`,
      },
    };
  };

  const [count, setCount] = useState(0);
  useRaf((progress) => {
    setCount((progress / 100) % 100);
  });

  return (
    <div style={styles(count).container}>
      <div style={styles(count).cowboy}>{Math.round(count)}</div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
