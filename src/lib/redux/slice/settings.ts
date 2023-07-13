import { createSlice } from "@reduxjs/toolkit";

export interface settingsPermissions {
  allowMoveAudio: boolean;
}

const initialState = {
  permissions: {
    allowMoveAudio: true,
    allowMoveVibrate: true,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    settingsSetPermissions: (state, action) => {
      state.permissions = { ...state.permissions, [action.payload.key]: action.payload.value };
    },
  },
});

export const { settingsSetPermissions } = settingsSlice.actions;
export default settingsSlice.reducer;
