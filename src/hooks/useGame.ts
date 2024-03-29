import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { setTileImage } from "../lib/redux/slice/game";

const useGame = () => {
  const dispatch = useAppDispatch();
  const matrix = useAppSelector((state) => state.game.matrix);
  const moves = useAppSelector((state) => state.game.moves);
  const started = useAppSelector((state) => state.game.started);
  const tileImage = useAppSelector((state) => state.game.tileImage);
  const completed = useAppSelector((state) => state.game.completed);
  const setImageTitle = (id: string) => dispatch(setTileImage(id));
  return {
    matrix,
    moves,
    started,
    tileImage,
    completed,
    setTileImage: setImageTitle,
  };
};

export default useGame;
