import { useGameStore } from '../lib/store/gameStore';

const useGame = () => {
  const matrix = useGameStore((state) => state.matrix);
  const started = useGameStore((state) => state.started);
  const moves = useGameStore((state) => state.moves);
  const completed = useGameStore((state) => state.completed);

  return {
    matrix,
    started,
    moves,
    completed
  } as const;
};

export default useGame;
