import useGame from "./useGame";
import useSetMatrix from "./useSetMatrix";

const useMoveTileHook = () => {
  const { matrix } = useGame();
  const setMatrix = useSetMatrix();

  const findEmptyTile = () => {
    if (!matrix || !matrix.length) return null;
    
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === -1) {
          return { x: i, y: j };
        }
      }
    }
    return null;
  };

  const isValidMove = (x: number, y: number) => {
    if (!matrix || !matrix.length) return false;
    
    const emptyTile = findEmptyTile();
    if (!emptyTile) return false;

    return (
      (Math.abs(x - emptyTile.x) === 1 && y === emptyTile.y) ||
      (Math.abs(y - emptyTile.y) === 1 && x === emptyTile.x)
    );
  };

  const moveTile = (x: number, y: number) => {
    if (!matrix || !matrix.length || !isValidMove(x, y)) return;

    const emptyTile = findEmptyTile()!;
    const newMatrix = matrix.map((row) => [...row]);

    newMatrix[emptyTile.x][emptyTile.y] = matrix[x][y];
    newMatrix[x][y] = -1;

    setMatrix(newMatrix);
  };

  const freeMoveUp = () => {
    if (!matrix || !matrix.length) return;
    const emptyTile = findEmptyTile();
    if (!emptyTile || emptyTile.x === matrix.length - 1) return;
    moveTile(emptyTile.x + 1, emptyTile.y);
  };

  const freeMoveDown = () => {
    if (!matrix || !matrix.length) return;
    const emptyTile = findEmptyTile();
    if (!emptyTile || emptyTile.x === 0) return;
    moveTile(emptyTile.x - 1, emptyTile.y);
  };

  const freeMoveLeft = () => {
    if (!matrix || !matrix.length) return;
    const emptyTile = findEmptyTile();
    if (!emptyTile || emptyTile.y === matrix[0].length - 1) return;
    moveTile(emptyTile.x, emptyTile.y + 1);
  };

  const freeMoveRight = () => {
    if (!matrix || !matrix.length) return;
    const emptyTile = findEmptyTile();
    if (!emptyTile || emptyTile.y === 0) return;
    moveTile(emptyTile.x, emptyTile.y - 1);
  };

  const isCompleted = (solution: number[][]) => {
    if (!matrix || !matrix.length || !solution || !solution.length) return false;
    return matrix.every((row, i) =>
      row.every((value, j) => value === solution[i][j])
    );
  };

  return {
    moveTile,
    status: "",
    freeMoveDown,
    freeMoveLeft,
    freeMoveRight,
    freeMoveUp,
    isCompleted,
  };
};

export default useMoveTileHook;
