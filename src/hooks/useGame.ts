import { useGameStore } from '../lib/store/gameStore';

const useGame = () => {
  const matrix = useGameStore((state) => state.matrix);
  const moves = useGameStore((state) => state.moves);
  const started = useGameStore((state) => state.started);
  const tileImage = useGameStore((state) => state.tileImage);
  const completed = useGameStore((state) => state.completed);
  const setTileImage = useGameStore((state) => state.setTileImage);

  return {
    matrix,
    moves,
    started,
    tileImage,
    setTileImage,
    completed
  };
};

export default useGame;
