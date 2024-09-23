import React, { useState } from 'react';

function MiniGame({ type, onComplete }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  // const [puzzleSolved, setPuzzleSolved] = useState(false);
  // const [memoryMatch, setMemoryMatch] = useState(false);

  // handler for the quiz type minigame
  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      if (correctAnswers + 1 === 3) {
        onComplete();  
      }
    }
  };

  // handler for the puzzle minigame (e.g. a simple word scramble or math puzzle)
  const solvePuzzle = () => {
    // setPuzzleSolved(true);
    onComplete();
  };

  // handler for the memory game (very simple version)
  const handleMemoryMatch = () => {
    // setMemoryMatch(true);
    onComplete();
  };

  return (
    <div>
      {type === 'trivia' && (
        <div>
          <h3>Trivia: What is the closest planet to the sun?</h3>
          <button type="button" onClick={() => handleQuizAnswer(true)}>Mercury</button>
          <button type="button" onClick={() => handleQuizAnswer(false)}>Mars</button>
        </div>
      )}

      {type === 'puzzle' && (
        <div>
          <h3>Solve this puzzle: What is 5 + 3?</h3>
          <button type="button" onClick={() => solvePuzzle()}>8</button>
          <button type="button" onClick={() => solvePuzzle()}>10</button>
        </div>
      )}

      {type === 'memory' && (
        <div>
          <h3>Memory Game: Click to match the correct pair!</h3>
          <button type="button" onClick={() => handleMemoryMatch()}>Match</button>
        </div>
      )}

      {type === 'dragdrop' && (
        <div>
          <h3>Drag the planets to their correct orbits (placeholder logic)</h3>
          <button type="button" onClick={() => onComplete()}>Drag and Drop Placeholder</button>
        </div>
      )}
    </div>
  );
}

export default MiniGame;
