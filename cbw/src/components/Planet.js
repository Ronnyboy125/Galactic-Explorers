import React from "react";
import { useParams } from "react-router-dom";
import MiniGame from "./MiniGame";

//it essentially grabs the planet's name from the URL using the useParams constant.
//  When the mini-game is done the handleMiniGameComplete function updates the state to mark it as completed, 
// unlocking a new planet (like venus) and adds an upgrade related to the current planet to the progress object
// Then... it updates the progress state with these new values
function Planet({ progress, setProgress }) {
	const { name } = useParams(); // Get planet name from URL
	const [miniGameCompleted, setMiniGameCompleted] = React.useState(false); // miniGameCompleted tracks if a mini game is finished.

	const handleMiniGameComplete = () => {
		setMiniGameCompleted(true);
		const newProgress = {
			...progress,
			unlockedPlanets: [...progress.unlockedPlanets, "Venus"], // example unlock of a next planet
			upgrades: [...progress.upgrades, `${name} Upgrade`],
		};
		setProgress(newProgress);
	};

	const getMiniGameType = (planetName) => {
		// maybe we can have specific minigames for specific planets or do it randomly
		switch (planetName) {
			case "Mercury":
				return "trivia";
			case "Venus":
				return "puzzle";
			case "Earth":
				return "memory";
			default:
				return "trivia";
		}
	};

	return (
		<div className="planet-page">
			<h1>Welcome to {name}</h1>
			{!miniGameCompleted ? (
				<MiniGame
					type={getMiniGameType(name)}
					onComplete={handleMiniGameComplete}
				/>
			) : (
				<div>
					<h2>Mini game completed!</h2>
					<p>Upgrade received : {name} Upgrade </p>
					<p>Next planet unlocked!</p>
				</div>
			)}
		</div>
	);
}

export default Planet;
