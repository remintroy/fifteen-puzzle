import { create } from 'zustand';

type Level = {
  gridSize: number;
  matrix: number[][];
  solution: number[][];
};

type LevelState = {
  currentLevel: number;
  levels: Level[];
  getCurrentLevel: () => Level;
  setCurrentLevel: (level: number) => void;
  generateLevel: (gridSize: number) => Promise<void>;
  initializeLevel: () => Promise<void>;
};

const generateSolution = (size: number): number[][] => {
  const solution: number[][] = [];
  let counter = 1;
  
  for (let i = 0; i < size; i++) {
    solution[i] = [];
    for (let j = 0; j < size; j++) {
      solution[i][j] = counter === size * size ? -1 : counter;
      counter++;
    }
  }
  
  return solution;
};

const shuffleMatrix = (solution: number[][]): number[][] => {
  const size = solution.length;
  const matrix = JSON.parse(JSON.stringify(solution));
  let emptyPos = { x: size - 1, y: size - 1 };
  
  // Perform more moves for larger grids to ensure proper shuffling
  const moveCount = Math.max(200, 100 * size * size);
  
  for (let i = 0; i < moveCount; i++) {
    const possibleMoves = [];
    
    // Check all possible moves
    if (emptyPos.x > 0) possibleMoves.push({ x: emptyPos.x - 1, y: emptyPos.y }); // up
    if (emptyPos.x < size - 1) possibleMoves.push({ x: emptyPos.x + 1, y: emptyPos.y }); // down
    if (emptyPos.y > 0) possibleMoves.push({ x: emptyPos.x, y: emptyPos.y - 1 }); // left
    if (emptyPos.y < size - 1) possibleMoves.push({ x: emptyPos.x, y: emptyPos.y + 1 }); // right
    
    // Avoid moving back to the previous position
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    
    // Perform move
    matrix[emptyPos.x][emptyPos.y] = matrix[move.x][move.y];
    matrix[move.x][move.y] = -1;
    emptyPos = move;
  }
  
  return matrix;
};

const generateInitialLevels = (): Level[] => {
  const gridSizes = [2, 3, 3, 4, 4];
  return gridSizes.map(size => {
    const solution = generateSolution(size);
    const matrix = shuffleMatrix(solution);
    return { gridSize: size, matrix, solution };
  });
};

export const useLevelStore = create<LevelState>((set, get) => ({
  currentLevel: 1,
  levels: generateInitialLevels(),
  getCurrentLevel: () => {
    const { currentLevel, levels } = get();
    const level = levels[currentLevel - 1];
    if (!level || !level.matrix || !level.solution) {
      const defaultLevel = { gridSize: 2, matrix: [], solution: [] };
      return defaultLevel;
    }
    return level;
  },
  setCurrentLevel: (level) => set({ currentLevel: level }),
  generateLevel: async (gridSize) => {
    return new Promise((resolve) => {
      const solution = generateSolution(gridSize);
      const matrix = shuffleMatrix(solution);
      
      set((state) => {
        const newLevels = [...state.levels];
        newLevels[state.currentLevel - 1] = { gridSize, matrix, solution };
        return { levels: newLevels };
      });
      resolve();
    });
  },
  initializeLevel: async () => {
    return new Promise((resolve) => {
      const { currentLevel, levels } = get();
      const level = levels[currentLevel - 1];
      if (!level) {
        resolve();
        return;
      }
      
      const solution = generateSolution(level.gridSize);
      const matrix = shuffleMatrix(solution);
      
      set((state) => {
        const newLevels = [...state.levels];
        newLevels[currentLevel - 1] = { ...level, matrix, solution };
        return { levels: newLevels };
      });
      resolve();
    });
  }
}));