import React, {useState, useEffect} from 'react';
import '../App.css';

const GROUND_SIZE= 16;


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
]

const miniGames = {
    pos1:[{name: "miniGameOne"}]
}
const PlanetHome = () =>{
const [borders,setBorders] = useState(border)
const [playerPosition, setPlayerPosition] = useState([5,5]);
const [miniGameOnePos, setMiniGameOnePos] = useState([1,1]);

const handleKeyDown = (e) => {
    const [x, y] = playerPosition;
    switch (e.key){
        case 'ArrowUp':
            if(x > 0 && borders[x-1][y] === 0) setPlayerPosition([x-1, y]);
            break;
        case 'ArrowDown':
            if (x < GROUND_SIZE - 1 && borders[x+1][y] === 0) setPlayerPosition([x+1, y]);
            break;
        case 'ArrowLeft':
            if(y > 0 && borders[x][y-1] === 0) setPlayerPosition([x,y-1]);
            break;
        case 'ArrowRight': 
            if (y < GROUND_SIZE -1 && borders[x][y+1] === 0) setPlayerPosition([x,y+1]);
            break;
        default:
            break;
    }
};

useEffect(() => {
        const x = miniGames["pos1"].map((game)=>({
            ...game,
            position:[8,8]
        }));
        setMiniGameOnePos(x);
  },[miniGameOnePos]);

useEffect(() => {
    window.addEventListener('keydown',handleKeyDown);
    return () => window.removeEventListener('keydown',handleKeyDown);
}, [playerPosition]);

return (
    <div className='game-Layout'>
        <div className='maze-container'>
            <div className="maze-grid">
                {borders.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <div
                        className={`cell ${cell === 1 ? 'earthWall' : 'earthPath'} ${
                            playerPosition[0] === rowIndex && playerPosition[1] === colIndex ? 'player' : ''
                        }`}
                        key={colIndex}
                        >
                        {miniGameOnePos.some((min) => min.position[0] === rowIndex && min.position[1] === colIndex) && '🔶'}
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
)

}
export default PlanetHome;