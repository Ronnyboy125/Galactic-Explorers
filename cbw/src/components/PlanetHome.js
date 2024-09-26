// PlanetHome.js

import React, { useState, useEffect } from 'react';
import '../App.css';
import planetCollectables from './Collectable';

const GROUND_SIZE = 16;

const border = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const PlanetHome = ({ setGameMode, planet, isEarth = false, updateCollectedFacts }) => {
  const [borders] = useState(border);
  const [playerPosition, setPlayerPosition] = useState([5, 7]);

  // define positions for trivia and maze portals
  const triviaPortalPosition = [2, 13];
  const mazePortalPosition = [7, 2];

  // get the collectables for the current planet
  const [collectables, setCollectables] = useState(planetCollectables[planet] || []);
  const [message, setMessage] = useState('');

  const handleKeyDown = (e) => {
    const [x, y] = playerPosition;
    switch (e.key) {
      case 'ArrowUp':
        if (x > 0 && borders[x - 1][y] === 0) setPlayerPosition([x - 1, y]);
        break;
      case 'ArrowDown':
        if (x < GROUND_SIZE - 1 && borders[x + 1][y] === 0) setPlayerPosition([x + 1, y]);
        break;
      case 'ArrowLeft':
        if (y > 0 && borders[x][y - 1] === 0) setPlayerPosition([x, y - 1]);
        break;
      case 'ArrowRight':
        if (y < GROUND_SIZE - 1 && borders[x][y + 1] === 0) setPlayerPosition([x, y + 1]);
        break;
      default:
        break;
    }
  };

  const checkInteractions = () => {
    if (!isEarth && playerPosition[0] === triviaPortalPosition[0] && playerPosition[1] === triviaPortalPosition[1]) {
      setGameMode('trivia');
    } else if (playerPosition[0] === mazePortalPosition[0] && playerPosition[1] === mazePortalPosition[1]) {
      setGameMode('maze');
    }

    // check for collectables...
    const collectable = collectables.find(
      (item) => item.position[0] === playerPosition[0] && item.position[1] === playerPosition[1]
    );

    if (collectable) {
      setMessage(`You found a fact: ${collectable.fact}`);
      updateCollectedFacts(planet, collectable.fact);
      // Remove the collectable from the map
      setCollectables(collectables.filter((item) => item !== collectable));
    } else {
      setMessage('');
    }
  };

  useEffect(() => {
    checkInteractions();
  }, [playerPosition]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition]);

  return (
    <div className='game-layout'>
      <div className={`${planet}-container`}>
        <div className="maze-grid">
          {borders.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((cell, colIndex) => {
                const isPlayer = playerPosition[0] === rowIndex && playerPosition[1] === colIndex;
                const isTriviaPortal = !isEarth && triviaPortalPosition[0] === rowIndex && triviaPortalPosition[1] === colIndex;
                const isMazePortal = mazePortalPosition[0] === rowIndex && mazePortalPosition[1] === colIndex;
                const isCollectable = collectables.some(
                  (item) => item.position[0] === rowIndex && item.position[1] === colIndex
                );

                return (
                  <div
                    className={`planetCell ${cell === 1 ? planet + 'Wall' : 'planetPath'} ${
                      isPlayer ? 'player' : ''
                    }`}
                    key={colIndex}
                  >
                    {isTriviaPortal && '❓'}
                    {isMazePortal && '🔶'}
                    {isCollectable && '⭐'}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {message && (
        <div className="message-box">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default PlanetHome;
