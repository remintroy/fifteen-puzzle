import { useLevelStore } from '../lib/store/levelStore';

const useGameLevels = () => {
  const currentLevel = useLevelStore(state => state.currentLevel);
  const getCurrentLevel = useLevelStore(state => state.getCurrentLevel);
  const setCurrentLevel = useLevelStore(state => state.setCurrentLevel);
  const generateLevel = useLevelStore(state => state.generateLevel);
  const levels = useLevelStore(state => state.levels);

  const level = getCurrentLevel();

  return {
    currentLevel,
    setCurrentLevel,
    generateLevel,
    question: level.matrix || [],
    solution: level.solution || [],
    gridSize: level.gridSize || 2
  };
};

export default useGameLevels;
