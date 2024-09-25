import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function SolarSystem({ progress }) {
  const planetEarth = [{ name: 'Earth', unlocked: true }] //  unlocked planet for testing...
  const planetMoon = [{ name: 'Moon', unlocked: progress.unlockedPlanets.includes('Moon') }];
  const planetMars = [{ name: 'Mars', unlocked: progress.unlockedPlanets.includes('Mars') }];
  const planetVenus = [{ name: 'Venus', unlocked: progress.unlockedPlanets.includes('Venus') }];

  //for rendering a solar system interface like 
  // displaying a list of planets where each planet is either clickable if unlocked
  // linking to a detailed page or shown as locked if not unlocked (with appropriate styling applied based on the planet's status).
 // if(planets[0].unlocked === true){
 // }else{
  return (
    <div className="SolarSystem">
      <div classname= "Stitle">
        The Solar System
      </div>
      <div className="PEarth">
        {planetEarth.map((planet) => (
          <div key={planet.name} className={`planet ${planet.unlocked ? 'unlocked' : 'locked'}`}>
            {planet.unlocked ? (
              <Link to={`/planet/${planet.name}`}>{planet.name}</Link>
            ) : (
              <span>{planet.name} (Locked)</span>
            )}
          </div>
        ))}
      </div><div className="PMoon">
        {planetMoon.map((planet) => (
          <div key={planet.name} className={`planet ${planet.unlocked ? 'unlocked' : 'locked'}`}>
            {planet.unlocked ? (
              <Link to={`/planet/${planet.name}`}>{planet.name}</Link>
            ) : (
              <span>{planet.name}
              </span>
            )}
          </div>
        ))}
      </div><div className="PMars">
        {planetMars.map((planet) => (
          <div key={planet.name} className={`planet ${planet.unlocked ? 'unlocked' : 'locked'}`}>
            {planet.unlocked ? (
              <Link to={`/planet/${planet.name}`}>{planet.name}</Link>
            ) : (
              <span>{planet.name} 
              </span>
            )}
          </div>
        ))}
      </div><div className="PVenus">
        {planetVenus.map((planet) => (
          <div key={planet.name} className={`planet ${planet.unlocked ? 'unlocked' : 'locked'}`}>
            {planet.unlocked ? (
              <Link to={`/planet/${planet.name}`}>{planet.name}</Link>
            ) : (
              <span>{planet.name} 
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default SolarSystem;
