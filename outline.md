## Rough Outline

We absolutely dont need to be boxed in with this structure but it is a good starting point. We can always add or remove components as we see fit or change it entirely if someone has a different direction they think it should go in.





### 1. **How the Game Might Work**

#### **Start Screen**
- `Home.js`
- It should display the start screen when the game first loads. Maybe it could include options like "Start Game", "Continue Game", whatever.
- **Navigation**: Clicking "Start Game" will navigate the user to the Solar System screen, while "Continue" will load saved progress (when implemented).
- **Features**:
  - basic UI with a space themed background.
  - Could also include settings or an "Instructions" section?

#### **Solar System Map**
- `SolarSystem.js`
- Here we will display an interactive solar system map. Planets could be represented by images or buttons. Clicking on a planet will navigate the player to that planet’s page.
- **Features**:
  - Use player progress to determine which planets are unlocked. For the locked planets we can just visually dim them or make them disabled until unlocked.
  - animations for smoother transitions would be nice as well.
  
**Progress Tracking**:
- You can store the player's progress (e.g., unlocked planets, upgrades earned) in a state management system like React's useState or use something like Redux. But for simplicity we could use localStorage or if we have time integrate a back end database.
  
#### **Planet Pages**
- `Planet.js`
- Each planet will have its own "page" (route) where players can complete little games or answer questions related to that planet.
- **Logic**:
  - After completing a game successfully players earn an upgrade that allows them to progress further or unlock new planets or gives them a higher score or whatever.
  - each planet should have a unique design and theme.
  
#### **Mini-Games**
-  `MiniGame.js`
- The logic for the minigames will vary based on the type of game. For example:
  - Trivia: Answer questions about planets.
  - Drag-and-Drop: Solve puzzles.
  - Matching Game: Match celestial objects or facts.
  
**Features**:
- A basic feature would be something like completing a mini game would triggers the player's ship to upgrade, unlocking new planets.

#### **Ship Upgrades**
- `ShipUpgrade.js`
- Will display the player's current ship status (e.g., speed, armor, abilities... might not actually do anything but might be more cosmetic).
- **Features**:
  - Acts as a visual indicator showing which parts of the ship are upgraded.
  - Upgrades are earned by successfully completing mini-games and stored in the player's progress.
  - Ship upgrades can unlock new planets or allow for different types of gameplay.

### 2. **Navigation and Progress Tracking**
- **Navigation**: With the react router we could handle navigation between different pages/screens. For example:
  - Home > Solar System > Planets > Games > Ship Upgrades.
- **State Management**:
  - React’s useState or useContext for storing simple game state stuff, like unlocked planets and ship upgrades.
  - For right now we could store progress in the browser using localStorage or save to a node backend and database for persistence across sessions.

---

### 3. **Game Logic**

App.js:
- Will manages routing between screens using React Router.
- Maintains the global state of the game (e.g. player's progress, upgrades, so on).
  
SolarSystem.js:
- Displays the solar system map with clickable planets.
- Uses the player's progress to determine which planets are unlocked and which are locked.

Planet.js:
- Displays individual planet pages with unique content (e.g. minigames, facts).
- Tracks whether the player has completed the mini-game on that planet and what upgrade they received.

MiniGame.js:
- Contains the core logic for the mini-games or puzzles on each planet.
- Upon completion should call a function to update the player's progress and trigger upgrades.

ShipUpgrade.js:
- Displays the current status and will upgrade of the player's ship.
- Updates dynamically based on the player's "achievements" and unlocks new features.

---

### 4. **Back-End**

If we decide to implement a back end to persist player progress, the cloud server will handle requests to save and load player data.

**Components**:

- server.js:
  - The set up the for the node/express server and listens for API requests from the frontend.
  
- routes.js:
  - Defines API routes like:
    - POST /save-progress: Could save the player's current progress.
    - GET /load-progress: Load that saved progress.
    - POST /upgrade-ship: Update the player's ship with a new upgrade.
  
- **Database Integration**:
  - Doubtful but we could also use a database to store the player's progress, unlocked planets, and ship upgrades.
  
- **Front-End to Back-End Communication**:
  - The frontend (in this project React) will communicate with the backend (node) to save and load player progress via API calls.

---

### 5. **Visual Representation**

The game's UI should only really consist of the following at its core:

- **Home Page**: A space themed start screen with buttons for "Start Game" or "Continue Game."
- **Solar System Map**: An interactive solar system where planets can be clicked based on player progression.
- **Planet Pages**: Each planet has its own page, theme, and minigame logic.
- **Ship Upgrades**: The player's ship status and upgrades are displayed visually and update dynamically as they progress.

---
