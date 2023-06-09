import { useAppDispatch } from "../lib/hooks";
import { settingsPermissions, settingsSetPermissions } from "../lib/slice/settings";

const useSetPermissions = () => {
  const dispatch = useAppDispatch();
  const setPermissions = (permissionsObj: settingsPermissions) => {
    Object.keys(permissionsObj).forEach((key) => {
      const value = permissionsObj[key];
      dispatch(settingsSetPermissions({ key, value }));
    });
  };
  return setPermissions;
};

export default useSetPermissions;
