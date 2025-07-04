import { useSettingsStore } from '../lib/store/settingsStore';

const usePermissions = () => {
  const permissions = useSettingsStore((state) => state.permissions);
  return permissions;
};

export default usePermissions;
