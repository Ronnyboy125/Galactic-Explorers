import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MiniGame from "./TriviaGame"; 
import MazeGame from "./MiniGame"; 
import PlanetHome from "./PlanetHome";

function Planet({ progress, setProgress }) {
  const { name } = useParams();
  const [gameMode, setGameMode] = useState('home'); // 'home', 'trivia', etc.
  const [triviaCompleted, setTriviaCompleted] = useState(
    progress.triviaCompletedPlanets.includes(name)
  );
  const [mazeGameCompleted, setMazeGameCompleted] = useState(
    progress.mazeGameCompletedPlanets.includes(name)
  );
  const navigate = useNavigate();
  const conditionalBackground = name;

  // is the planet is unlocked?
  const isPlanetUnlocked = progress.unlockedPlanets.includes(name);

  const handleTriviaComplete = (learnedFacts) => {
    const newProgress = {
      ...progress,
      unlockedPlanets: [...progress.unlockedPlanets, name],
      triviaCompletedPlanets: [...(progress.triviaCompletedPlanets || []), name],
      learnedFacts: {
        ...progress.learnedFacts,
        [name]: learnedFacts,
      },
    };
    setProgress(newProgress);
    setTriviaCompleted(true);
    setGameMode('home'); // now just return to planet home after trivia
  };

  const handleMazeComplete = () => {
    let newProgress = {
      ...progress,
      mazeGameCompletedPlanets: [...progress.mazeGameCompletedPlanets, name],
    };

    // should we should unlock the next planet?
    let nextPlanet = '';

    if (name === 'Earth') {
      nextPlanet = 'Moon';
    } else if (name === 'Moon' && triviaCompleted) {
      nextPlanet = 'Mars';
    } else if (name === 'Mars' && triviaCompleted) {
      nextPlanet = 'Venus';
    }

    if (nextPlanet && !progress.unlockedPlanets.includes(nextPlanet)) {
      newProgress.unlockedPlanets = [...newProgress.unlockedPlanets, nextPlanet];
    }

    setProgress(newProgress);
    setMazeGameCompleted(true);
    setGameMode('home'); // Return to PlanetHome after maze
  };

  // Redirect to the solar system after maze game completion on non-Earth planets
  useEffect(() => {
    if (mazeGameCompleted && triviaCompleted && name !== 'Earth') {
      const timer = setTimeout(() => {
        navigate("/solarsystem");
      }, 5000); // 5-second delay
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [mazeGameCompleted, triviaCompleted, name, navigate]);

  if (name === 'Earth') {
    // if the signal has been sent i.e has the player completed the game show the summary
    if (progress.signalSent) {
      return (
        <div className={conditionalBackground}>
          <h1>Welcome back to Earth</h1>
          <h2>Summary of Learned Information</h2>
          {progress.learnedFacts &&
            Object.entries(progress.learnedFacts).map(([planetName, facts]) => (
              <div key={planetName}>
                <h3>{planetName}</h3>
                <ul>
                  {facts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      );
    }

    // earth woll only have maze portal
    switch (gameMode) {
      case 'home':
        return (
          <div className={conditionalBackground}>
            <h1>Welcome to Earth</h1>
            <PlanetHome setGameMode={setGameMode} planet={name} isEarth={true} />
          </div>
        );
      case 'maze':
        if (mazeGameCompleted) {
          // is the maze already completed?
          return (
            <div className={conditionalBackground}>
              <h1>Earth - Resources Collected</h1>
              <p>You have already collected resources on Earth.</p>
              <Link to="/solarsystem">
                <button>Go to Solar System</button>
              </Link>
            </div>
          );
        } else {
          // if not start maze game
          return (
            <div className={conditionalBackground}>
              <MazeGame planet={name} onComplete={handleMazeComplete} />
            </div>
          );
        }
      default:
        return null;
    }
  }

  // all other planets
  if (!isPlanetUnlocked) {
    // planet lock check
    return (
      <div className={conditionalBackground}>
        <h1>{name} (Locked)</h1>
        <p>You need to unlock this planet first.</p>
        <Link to="/solarsystem">
          <button>Return to Solar System</button>
        </Link>
      </div>
    );
  } else {
    // planet is unlocked
    switch (gameMode) {
      case 'home':
        return (
          <div className={conditionalBackground}>
            <h1>Welcome to {name}</h1>
            <PlanetHome setGameMode={setGameMode} planet={name} />
          </div>
        );
      case 'trivia':
        if (triviaCompleted) {
          // is the trivia already completed
          return (
            <div className={conditionalBackground}>
              <h1>{name} - Trivia Completed</h1>
              <p>You have already completed the trivia for this planet.</p>
              <button onClick={() => setGameMode('home')}>Return to Planet</button>
            </div>
          );
        } else {
          // start trivia game
          return (
            <div className={conditionalBackground}>
              <MiniGame planetName={name} onComplete={handleTriviaComplete} />
            </div>
          );
        }
      case 'maze':
        if (!triviaCompleted) {
          // cannot start maze until the trivia "mini game" is completed
          return (
            <div className={conditionalBackground}>
              <h1>{name} - Trivia Not Completed</h1>
              <p>You must complete the trivia before collecting resources.</p>
              <button onClick={() => setGameMode('home')}>Return to Planet</button>
            </div>
          );
        } else if (mazeGameCompleted) {
          // is  the maze already completed?
          return (
            <div className={conditionalBackground}>
              <h1>{name} - Resources Collected</h1>
              <p>You have already collected resources on this planet.</p>
              <button onClick={() => setGameMode('home')}>Return to Planet</button>
            </div>
          );
        } else {
          // else start maze game
          return (
            <div className={conditionalBackground}>
              <MazeGame planet={name} onComplete={handleMazeComplete} />
            </div>
          );
        }
      default:
        return null;
    }
  }
}

export default Planet;
