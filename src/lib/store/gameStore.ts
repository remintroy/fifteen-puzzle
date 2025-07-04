import { create } from 'zustand';

interface GameState {
  matrix: number[][];
  started: boolean;
  moves: number;
  tileImage: string;
  currentLevel: string;
  completed: boolean;
  setMatrix: (matrix: number[][]) => void;
  setMatrixAsMove: (matrix: number[][]) => void;
  setTileImage: (image: string) => void;
  setLevel: (level: string) => void;
  setCompleted: (completed: boolean) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  matrix: [[]],
  started: false,
  moves: 0,
  tileImage: '1',
  currentLevel: '1',
  completed: false,
  setMatrix: (matrix) => set({ matrix }),
  setMatrixAsMove: (matrix) => set((state) => ({ matrix, moves: state.moves + 1 })),
  setTileImage: (tileImage) => set({ tileImage }),
  setLevel: (currentLevel) => set({ currentLevel }),
  setCompleted: (completed) => set({ completed }),
  resetGame: () => set({ matrix: [[]], moves: 0 })
}))