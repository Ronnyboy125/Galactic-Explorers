import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import '../App.css';
import InventoryCounts from '../services/inventoryCount';
import 'reactjs-popup/dist/index.css';

// better styling, and styling specific to the planet
// Better information in the popups

const MAZE_SIZE = 10;

// Define resources for each planet
const planetResources = {
  Earth: [
    { type: 'Iron Ore', fact: 'Iron is used to build spaceships.' },
    { type: 'Copper Ore', fact: 'Copper is a good conductor of electricity.' },
  ],
  Moon: [
    { type: 'Moon Rock', fact: 'Moon rocks are made of basalt.' },
    { type: 'Regolith', fact: 'Regolith is lunar soil.' },
  ],
  Mars: [
    { type: 'Mars Soil', fact: 'Martian soil contains iron oxide.' },
    { type: 'Ice', fact: 'Water ice exists on Mars.' },
  ],
  Venus: [
    { type: 'Sulfuric Acid', fact: 'Venus has clouds of sulfuric acid.' },
    { type: 'Rock Samples', fact: 'Venusian rocks are volcanic.' },
  ],
};

const initialMaze = [
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const MazeGame = ({ planet, onComplete }) => {
  const [maze] = useState(initialMaze);
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [fact, setFact] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [resources, setResources] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [timer, setTimer] = useState(60); 
  const [collectedCount, setCollectedCount] = useState(0); 
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (planetResources[planet]) {
      const initialResources = planetResources[planet].map((resource) => ({
        ...resource,
        position: getRandomPosition(maze),
      }));
      setResources(initialResources);
    }
  }, [planet, maze]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setGameOver(true);
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const getRandomPosition = (maze) => {
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * MAZE_SIZE);
      y = Math.floor(Math.random() * MAZE_SIZE);
    } while (maze[x][y] !== 0);
    return [x, y];
  };

  const handleKeyDown = (e) => {
    const [x, y] = playerPosition;
    switch (e.key) {
      case 'ArrowUp':
        if (x > 0 && maze[x - 1][y] === 0) setPlayerPosition([x - 1, y]);
        break;
      case 'ArrowDown':
        if (x < MAZE_SIZE - 1 && maze[x + 1][y] === 0) setPlayerPosition([x + 1, y]);
        break;
      case 'ArrowLeft':
        if (y > 0 && maze[x][y - 1] === 0) setPlayerPosition([x, y - 1]);
        break;
      case 'ArrowRight':
        if (y < MAZE_SIZE - 1 && maze[x][y + 1] === 0) setPlayerPosition([x, y + 1]);
        break;
      default:
        break;
    }
  };

  const checkCollection = (x, y) => {
    const collectedResource = resources.find(
      (res) => res.position[0] === x && res.position[1] === y
    );
    if (collectedResource) {
      setInventory([...inventory, collectedResource.type]);
      setFact(collectedResource.fact);
      setCollectedCount(collectedCount + 1); 
      setIsPopupOpen(true); 

      const updatedResources = resources.filter((res) => res !== collectedResource);
      setResources(updatedResources);

      if (updatedResources.length === 0) {
        setFact((prevFact) => `${prevFact} All resources collected! You can now leave ${planet}.`);
      }
    }
  };

  useEffect(() => {
    checkCollection(playerPosition[0], playerPosition[1]);
  }, [playerPosition]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition]);

  return (
    <div className="game-layout">
      <div className="maze-grid-container">
        <div className="maze-grid-container-title">
          <h1>Exploring {planet}</h1>
          <h3>Timer: {timer} seconds</h3> 
        </div>

     {/*   <div className="maze-grid-container-resource">
          <div className="fact-box">
            <h3>Resource Facts:</h3>
            <p>{fact ? fact : 'Collect resources to learn more about the planet.'}</p>
          </div>
        </div>
*/}
        <div className="maze-grid-container-inventory">
          <div className="inventory">
            {<h3>Inventory:</h3>}
            <InventoryCounts inventory={inventory}/>
          </div>
        </div>

        <div className="maze-grid-container-leave">
          {resources.length === 0 && (
            <button type="button" className="leave-button" onClick={onComplete}>
              Leave Planet
            </button>
          )}
        </div>

        <div className="maze-grid-container-mazeGrid">
          <div className="maze-grid">
            {maze.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <div
                    className={`cell ${cell === 1 ? 'wall' : 'path'} ${
                      playerPosition[0] === rowIndex && playerPosition[1] === colIndex ? 'player' : ''
                    }`}
                    key={colIndex}
                  >
                    {resources.some((res) => res.position[0] === rowIndex && res.position[1] === colIndex) && '🔶'}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Popup open={isPopupOpen} closeOnDocumentClick onClose={() => setIsPopupOpen(false)}>
        <div className="popup-box" style={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px' }}>
          <h3>Resource Collected!</h3>
          <p>{fact}</p>
          <button onClick={() => setIsPopupOpen(false)} style={{ backgroundColor: 'white', color: 'black' }}>Continue</button>
        </div>
      </Popup>

      {gameOver && (
        <Popup open={gameOver} closeOnDocumentClick>
          <div className="popup-box" style={{ backgroundColor: 'red', color: 'white', padding: '20px', borderRadius: '10px' }}>
            <h2>Game Over!</h2>
            <p>Time's up! You collected {collectedCount} resources.</p>
            <button onClick={() => window.location.reload()} style={{ backgroundColor: 'white', color: 'red' }}>Retry</button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default MazeGame;

