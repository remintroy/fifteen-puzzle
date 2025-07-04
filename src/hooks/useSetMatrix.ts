import { useGameStore } from '../lib/store/gameStore';

const useSetMatrix = () => {
  const setMatrix = useGameStore((state) => state.setMatrix);
  const setMatrixAsMove = useGameStore((state) => state.setMatrixAsMove);

  const setNewMatrix = (matrix: number[][], options?: { setAsMove: boolean }) => {
    if (options?.setAsMove) setMatrixAsMove(matrix);
    else setMatrix(matrix);
  };
  
  return setNewMatrix;
};

export default useSetMatrix;
