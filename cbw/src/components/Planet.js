import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MiniGame from "./MiniGame";

function Planet({ progress, setProgress }) {
  const { name } = useParams();
  const [miniGameCompleted, setMiniGameCompleted] = useState(false);
  const navigate = useNavigate();

  const handleMiniGameComplete = () => {
    setMiniGameCompleted(true);
    const newProgress = {
      ...progress,
      unlockedPlanets: [...progress.unlockedPlanets, "Moon"],
      upgrades: [...progress.upgrades, `${name} Upgrade`],
    };
    setProgress(newProgress);
  };

  // Redirect to the solar system after 5 seconds if the user doesn’t click "Leave Planet"
  useEffect(() => {
    if (miniGameCompleted) {
      const timer = setTimeout(() => {
        navigate("/solarsystem");
      }, 5000); // 5-second delay
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [miniGameCompleted, navigate]);

  return (
    <div className="planet-page">
      <h1>Welcome to {name}</h1>
      {!miniGameCompleted ? (
        <MiniGame
          type="trivia"
          onComplete={handleMiniGameComplete}
        />
      ) : (
        <div>
          <h2>Mini game completed!</h2>
          <p>Upgrade received: {name} Upgrade</p>
          <p>Next planet unlocked!</p>
          {/* Leave Planet Button */}
          <Link to="/solarsystem">
            <button>Leave Planet</button>
          </Link>
          <p>Redirecting to Solar System in 5 seconds...</p>
        </div>
      )}
    </div>
  );
}

export default Planet;
