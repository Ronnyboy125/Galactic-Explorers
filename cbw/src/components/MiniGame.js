import React, { useState, useEffect } from 'react';
import '../App.css';

// prototype of the maze mini game, need art assets, needs the inventory to be stacked (ie iron ore x 3)
// better styling, and styling specific to the planet
// Better information in the popups
// make it more engaging someone

const MAZE_SIZE = 10;

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

const planetResources = {
  mercury: [
    { type: 'Iron Ore', fact: 'Mercury has large deposits of iron, which makes it denser than many other planets.' },
    { type: 'Sulfur', fact: 'Mercury\'s surface contains sulfur, likely a result of volcanic activity.' },
  ],
  mars: [
    { type: 'Carbon Crystal', fact: 'Mars contains carbon in the form of dry ice at its poles.' },
    { type: 'Martian Rock', fact: 'Mars has iron-rich rocks that give the planet its distinct red color.' },
  ],
};

const getRandomPosition = (maze) => {
  let x;
  let y;
  do {
    x = Math.floor(Math.random() * MAZE_SIZE);
    y = Math.floor(Math.random() * MAZE_SIZE);
  } while (maze[x][y] !== 0); // is it's on a traversable tile?
  return [x, y];
};

const MazeGame = ({ planet = 'mercury', onComplete }) => {
  const [maze, setMaze] = useState(initialMaze);
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [fact, setFact] = useState(null);
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem(`inventory-${planet}`);
    return savedInventory ? JSON.parse(savedInventory) : [];
  });
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (planetResources[planet]) {
      const initialResources = planetResources[planet].map((resource) => ({
        ...resource,
        position: getRandomPosition(maze),
      }));
      setResources(initialResources);
    }
  }, [planet]);

  useEffect(() => {
    localStorage.setItem(`inventory-${planet}`, JSON.stringify(inventory));
  }, [inventory, planet]);

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
    const collectedResource = resources.find((res) => res.position[0] === x && res.position[1] === y);
    if (collectedResource) {
      setInventory([...inventory, collectedResource.type]);
      setFact(collectedResource.fact);
      const updatedResources = resources.filter((res) => res !== collectedResource);
      setResources(updatedResources);

      if (updatedResources.length === 0) {
        setFact(prevFact => `${prevFact} All resources collected! You can now leave ${planet}.`);
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
      <div className="fact-box">
        <h3>Resource Facts:</h3>
        <p>{fact ? fact : 'Collect resources to learn more about the planet.'}</p>
      </div>
      <div className="maze-container">
        <h1>Exploring {planet}</h1>
        <div className="inventory">
          <h3>Inventory:</h3>
          <ul>
            {inventory.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
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
        {resources.length === 0 && (
          <button type="button" className="leave-button" onClick={onComplete}>
            Leave Planet
          </button>
        )}
      </div>
    </div>
  );
};

export default MazeGame;
