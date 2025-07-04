import { create } from 'zustand';

type GameState = {
  matrix: number[][];
  started: boolean;
  moves: number;
  completed: boolean;
  setMatrix: (matrix: number[][]) => void;
  setStarted: (started: boolean) => void;
  setMoves: (moves: number) => void;
  setCompleted: (completed: boolean) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  matrix: [],
  started: false,
  moves: 0,
  completed: false,
  setMatrix: (matrix) => set({ matrix }),
  setStarted: (started) => set({ started }),
  setMoves: (moves) => set({ moves }),
  setCompleted: (completed) => set({ completed }),
  resetGame: () => set({ matrix: [], started: false, moves: 0, completed: false })
}));