export const saveProgress = (username, progress) => {
    localStorage.setItem(`progress-${username}`, JSON.stringify(progress));
  };
  
  export const loadProgress = (username) => {
    const progress = localStorage.getItem(`progress-${username}`);
    return progress ? JSON.parse(progress) : null;
  };
  