import { useGameStore } from '../lib/store/gameStore';

const useGame = () => {
  const matrix = useGameStore((state) => state.matrix);
  const started = useGameStore((state) => state.started);
  const moves = useGameStore((state) => state.moves);
  const tileImage = useGameStore((state) => state.tileImage);
  const completed = useGameStore((state) => state.completed);

  return {
    matrix,
    started,
    moves,
    tileImage,
    completed
  };
};

export default useGame;
