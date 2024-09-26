import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SolarSystem from './components/SolarSystem';
import Planet from './components/Planet';
import './App.css';
import { loadProgress, saveProgress } from './services/api';

function App() {
  const [progress, setProgress] = useState({
    username: 'player1',
    unlockedPlanets: ['Earth'], // only Earth should be unlocked initially
    upgrades: [],
    triviaCompletedPlanets: [],
    mazeGameCompletedPlanets: [],
    learnedFacts: {},
    signalSent: false,
  });

  // load saved progress when the app starts
  useEffect(() => {
    async function fetchProgress() {
      const savedProgress = await loadProgress('player1');
      if (savedProgress) {
        setProgress(savedProgress);
      }
    }
    fetchProgress();
  }, []);

  // save progress every time it changes
  useEffect(() => {
    if (progress) {
      saveProgress(progress.username, progress);
    }
  }, [progress]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/solarsystem"
          element={<SolarSystem progress={progress} setProgress={setProgress} />}
        />
        <Route
          path="/planet/:name"
          element={<Planet progress={progress} setProgress={setProgress} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
