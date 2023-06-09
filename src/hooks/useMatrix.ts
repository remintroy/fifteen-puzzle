import { useAppSelector } from "../lib/hooks";

const useMatrix = () => {
  const matrix: number[][] = useAppSelector((state) => state.game.matrix);
  return matrix;
};

export default useMatrix;
