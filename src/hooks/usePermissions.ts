import { useAppSelector } from "../lib/hooks";

const usePermissions = () => {
  const permissions = useAppSelector((state) => state.settings.permissions);
  return permissions;
};

export default usePermissions;
