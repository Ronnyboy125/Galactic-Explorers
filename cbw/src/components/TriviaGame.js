import React, { useState } from 'react';
import triviaQuestions from './Questions';
import '../App.css';

function TriviaGame({ planetName, onComplete }) {
  const questions = triviaQuestions[planetName];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [learnedFacts, setLearnedFacts] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
      setLearnedFacts([...learnedFacts, currentQuestion.fact]);
    }
    setSelectedOption('');

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    // reset the game
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setScore(0);
    setShowResult(false);
    setLearnedFacts([]);
  };

  const handleComplete = () => {
    if (score === questions.length) {
      // all answers correct
      onComplete(learnedFacts);
    } else {
      // not all answers are correct
      handleRetry();
    }
  };

  return (
    <div className="mini-game">
      {!showResult ? (
        <div>
          <h2>Trivia about {planetName}</h2>
          <p>
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p>{currentQuestion.question}</p>
          <form>
            {currentQuestion.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              </div>
            ))}
          </form>
          <button type="button" onClick={handleNextQuestion} disabled={!selectedOption}>
            Next
          </button>
        </div>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <p>
            Your score: {score} out of {questions.length}
          </p>
          {score === questions.length ? (
            <div>
              <p>Congratulations! You've completed the trivia for {planetName}!</p>
              <button onClick={handleComplete}>Continue</button>
            </div>
          ) : (
            <div>
              <p>You need to answer all questions correctly to complete the trivia.</p>
              <button onClick={handleRetry}>Try Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TriviaGame;
