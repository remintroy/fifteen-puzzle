import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slice/game";
import settingsSlice from "./slice/settings";
 
const store = configureStore({
  reducer: {
    game: gameSlice,
    settings: settingsSlice
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
