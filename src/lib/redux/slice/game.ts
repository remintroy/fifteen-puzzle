import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matrix: [[]],
  started: false,
  moves: 0,
  tileImage: "1",
  currentLevel: "1",
  completed: false,
};

const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    setMatrix: (state, action) => {
      state.matrix = action.payload;
    },
    setMatrixAsMove: (state, action) => {
      state.matrix = action.payload;
      state.moves = state.moves + 1;
    },
    setTileImage: (state, action) => {
      state.tileImage = action.payload;
    },
    setLevel: (state, action) => {
      state.currentLevel = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    resetGame: (state) => {
      state.matrix = [[]];
      state.moves = 0;
    },
  },
});

export const { setMatrix, setMatrixAsMove, resetGame, setTileImage, setCompleted } = gameSlice.actions;
export default gameSlice.reducer;
