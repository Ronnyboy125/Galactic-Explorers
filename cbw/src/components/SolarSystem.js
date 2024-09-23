import React from 'react';
import { Link } from 'react-router-dom';

function SolarSystem({ progress }) {
  const planets = [
    { name: 'Mercury', unlocked: true }, //  unlocked planet for testing...
    { name: 'Venus', unlocked: progress.unlockedPlanets.includes('Venus') },
    { name: 'Earth', unlocked: progress.unlockedPlanets.includes('Earth') },
    { name: 'Mars', unlocked: progress.unlockedPlanets.includes('Mars') },
  ];

  //for rendering a solar system interface like 
  // displaying a list of planets where each planet is either clickable if unlocked
  // linking to a detailed page or shown as locked if not unlocked (with appropriate styling applied based on the planet's status).
  return (
    <div className="solar-system">
      <h2>Explore the Solar System</h2>
      <div className="planets">
        {planets.map((planet) => (
          <div key={planet.name} className={`planet ${planet.unlocked ? 'unlocked' : 'locked'}`}>
            {planet.unlocked ? (
              <Link to={`/planet/${planet.name}`}>{planet.name}</Link>
            ) : (
              <span>{planet.name} (Locked)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default SolarSystem;
