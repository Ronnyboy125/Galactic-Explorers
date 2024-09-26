import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
	return (
		<div className="home">
			<h1 className="game-title">Space Exploration Game</h1>
			<div className="home-buttons">
				{/* start a new game */}
				<Link to="/solarsystem" className="start-button">
					Start Game
				</Link>
				{/* optional: continue game (if we have time to implement saving later) */}
				<Link to="/solarsystem" className="continue-button">
					Continue Game
				</Link>
			</div>
			<div className="instructions">
				<p>
					Welcome to the Space Exploration Game! Click "Start Game" to begin
					exploring the solar system. As you visit each planet, you'll play
					mini-games to unlock new planets and gather resources.
				</p>
			</div>
		</div>
	);
}

export default Home;
