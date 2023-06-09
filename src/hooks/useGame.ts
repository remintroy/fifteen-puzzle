import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setTileImage } from "../lib/slice/game";

const useGame = () => {
  const dispatch = useAppDispatch();
  const matrix = useAppSelector((state) => state.game.matrix);
  const moves = useAppSelector((state) => state.game.moves);
  const started = useAppSelector((state) => state.game.started);
  const tileImage = useAppSelector((state) => state.game.tileImage);
  const setImageTitle = (id: string) => dispatch(setTileImage(id));
  return {
    matrix,
    moves,
    started,
    tileImage,
    setTileImage: setImageTitle,
  };
};

export default useGame;
