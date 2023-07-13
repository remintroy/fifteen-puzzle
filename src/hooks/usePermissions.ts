import { useAppSelector } from "../lib/redux/hooks";

const usePermissions = () => {
  const permissions = useAppSelector((state) => state.settings.permissions);
  return permissions;
};

export default usePermissions;
