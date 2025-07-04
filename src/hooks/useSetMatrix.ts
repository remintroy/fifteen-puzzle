import { useGameStore } from '../lib/store/gameStore';

const useSetMatrix = () => {
  const setMatrix = useGameStore((state) => state.setMatrix);
  const setMoves = useGameStore((state) => state.setMoves);
  const moves = useGameStore((state) => state.moves);
  const started = useGameStore((state) => state.started);

  return (matrix: number[][], isInitialSet: boolean = false) => {
    setMatrix(matrix);
    if (!isInitialSet && started) {
      setMoves(moves + 1);
    }
  };
};

export default useSetMatrix;
