import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "../App.css";
import SSmusic from "../sounds/BGM_Start.mp3";
// import Emusic from "../sounds/BGM_Earth.mp3";
// import Mmusuic from "../sounds/BGM_Moon.mp3";
// import MAmusic from "../sounds/BGM_Mars.mp3";

function SolarSystem({ progress, setProgress }) {
  var SSaudio = new Audio(SSmusic);
  useEffect(() => {
		SSaudio.play();
  });

  const planetEarth = { name: "Earth", unlocked: true };
  const planetMoon = {
    name: "Moon",
    unlocked: progress.unlockedPlanets.includes("Moon"),
  };
  const planetMars = {
    name: "Mars",
    unlocked: progress.unlockedPlanets.includes("Mars"),
  };
  const planetVenus = {
    name: "Venus",
    unlocked: progress.unlockedPlanets.includes("Venus"),
  };

   //for rendering a solar system interface like 
  // displaying a list of planets where each planet is either clickable if unlocked
  // linking to a detailed page or shown as locked if not unlocked (with appropriate styling applied based on the planet's status).
 // if(planets[0].unlocked === true){
 // }else{

  const totalPlanets = 3; // moon, mars, venus, etc.

  // inits the triviaCompletedPlanets function if it is undefined
  const triviaCompletedPlanets = progress.triviaCompletedPlanets || [];
  const triviaCompleted = triviaCompletedPlanets.length;

  const progressPercentage = (triviaCompleted / totalPlanets) * 100;

  const allTriviaCompleted = triviaCompleted === totalPlanets;

  return (
    <div className="SolarSystem">
      {/* Render planets */}
      <div className="PEarth">
        <div key={planetEarth.name} className="planet unlocked">
          <Link to={`/planet/${planetEarth.name}`}>{planetEarth.name}</Link>
        </div>
      </div>
      <div className="PMoon">
        <div
          key={planetMoon.name}
          className={`planet ${planetMoon.unlocked ? "unlocked" : "locked"}`}
        >
          {planetMoon.unlocked ? (
            <Link to={`/planet/${planetMoon.name}`}>{planetMoon.name}</Link>
          ) : (
            <span>{planetMoon.name}</span>
          )}
        </div>
      </div>
      <div className="PMars">
        <div
          key={planetMars.name}
          className={`planet ${planetMars.unlocked ? "unlocked" : "locked"}`}
        >
          {planetMars.unlocked ? (
            <Link to={`/planet/${planetMars.name}`}>{planetMars.name}</Link>
          ) : (
            <span>{planetMars.name}</span>
          )}
        </div>
      </div>
      <div className="PVenus">
        <div
          key={planetVenus.name}
          className={`planet ${planetVenus.unlocked ? "unlocked" : "locked"}`}
        >
          {planetVenus.unlocked ? (
            <Link to={`/planet/${planetVenus.name}`}>{planetVenus.name}</Link>
          ) : (
            <span>{planetVenus.name}</span>
          )}
        </div>
      </div>
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p>
          {triviaCompleted} out of {totalPlanets} planets completed
        </p>
      </div>
      {/* Send Signal Button */}
      {allTriviaCompleted && !progress.signalSent && (
        <button onClick={() => setProgress({ ...progress, signalSent: true })}>
          Send Signal
        </button>
      )}
      {/* Return to Earth Button */}
      {progress.signalSent && (
        <Link to="/planet/Earth">
          <button>Return to Earth</button>
        </Link>
      )}
    </div>
  );
}

export default SolarSystem;
