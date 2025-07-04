import { create } from 'zustand';

interface SettingsPermissions {
  allowMoveAudio: boolean;
  allowMoveVibrate: boolean;
}

interface SettingsState {
  permissions: SettingsPermissions;
  setPermissions: (key: keyof SettingsPermissions, value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  permissions: {
    allowMoveAudio: true,
    allowMoveVibrate: true,
  },
  setPermissions: (key, value) =>
    set((state) => ({
      permissions: { ...state.permissions, [key]: value },
    })),
}))