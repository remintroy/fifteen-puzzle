import { useGameStore } from '../lib/store/gameStore';

const useMatrix = () => {
  const matrix: number[][] = useGameStore((state) => state.matrix);
  return matrix;
};

export default useMatrix;
