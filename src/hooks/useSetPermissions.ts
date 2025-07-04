import { useSettingsStore } from '../lib/store/settingsStore';

const useSetPermissions = () => {
  const setPermissions = useSettingsStore((state) => state.setPermissions);
  
  const updatePermissions = (permissions: { allowMoveAudio?: boolean; allowMoveVibrate?: boolean }) => {
    Object.entries(permissions).forEach(([key, value]) => {
      setPermissions(key as 'allowMoveAudio' | 'allowMoveVibrate', value as boolean);
    });
  };

  return updatePermissions;
};

export default useSetPermissions;
