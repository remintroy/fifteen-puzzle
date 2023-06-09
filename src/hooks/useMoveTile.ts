import { useEffect, useState } from "react";
import useMatrix from "./useMatrix";
import useAudio from "./useAudio";
import usePermissions from "./usePermissions";
import useSetMatrix from "./useSetMatrix";

const useMoveTileHook = (source_matrix?: number[][]) => {
  const matrixS = useMatrix(); // get immutable matrix from redux
  const setMatrix = useSetMatrix();
  const [matrix, setMatrixS] = useState<number[][]>([[]]); // mutable matrix cloned from matrix from redux
  const [status, setStatus] = useState(""); // status text of move
  const { playMoveAudio } = useAudio(); // audo services
  const permissions = usePermissions();

  useEffect(() => {
    // setting new matrix as main matrix if available
    if (source_matrix) setMatrix(source_matrix);
    // cloning matrix to make matrix mutable
    setMatrixS(JSON.parse(JSON.stringify(source_matrix ?? matrixS)));
  }, [matrixS, source_matrix]);

  /**
   * value of null tile will be -1
   * @returns Object { x , y } coordinates of null tile
   */
  const getCoordinatesOfNullTile = () => {
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        if (matrix[x][y] === -1) return { x, y };
      }
    }
    // the return below never actually returns if the matrix is good;
    // it is here for making return time correct
    return { x: 0, y: 0 };
  };

  // checks if tile can move to curresponding position
  const canMoveRight = (x: number, y: number) => matrix[x + 1]?.[y] === -1;
  const canMoveLeft = (x: number, y: number) => matrix[x - 1]?.[y] === -1;
  const canMoveUp = (x: number, y: number) => matrix[x]?.[y + 1] === -1;
  const canMoveDown = (x: number, y: number) => matrix[x]?.[y - 1] === -1;

  // get near tiles coordinates
  const getRightTile = (x: number, y: number) => (matrix[x + 1]?.[y] ? { x: x + 1, y: y } : null);
  const getLeftTile = (x: number, y: number) => (matrix[x - 1]?.[y] ? { x: x - 1, y: y } : null);
  const getUpTile = (x: number, y: number) => (matrix[x]?.[y + 1] ? { x: x, y: y + 1 } : null);
  const getDownTile = (x: number, y: number) => (matrix[x]?.[y - 1] ? { x: x, y: y - 1 } : null);

  // Here is actuall move happening
  const moveRight = (x: number, y: number) => {
    [matrix[x][y], matrix[x + 1][y]] = [matrix[x + 1][y], matrix[x][y]];
    setMatrix(matrix, { setAsMove: true });
    return matrix;
  };
  const moveLeft = (x: number, y: number) => {
    [matrix[x][y], matrix[x - 1][y]] = [matrix[x - 1][y], matrix[x][y]];
    setMatrix(matrix, { setAsMove: true });
    return matrix;
  };
  const moveUp = (x: number, y: number) => {
    [matrix[x][y], matrix[x][y + 1]] = [matrix[x][y + 1], matrix[x][y]];
    setMatrix(matrix, { setAsMove: true });
    return matrix;
  };
  const moveDown = (x: number, y: number) => {
    [matrix[x][y], matrix[x][y - 1]] = [matrix[x][y - 1], matrix[x][y]];
    setMatrix(matrix, { setAsMove: true });
    return matrix;
  };

  // NOTE: This only works on mobile or vibrate enabled devices
  // Only vibrate if allowMoveVibrate is true in premissons in settings REDUX
  const moveVibratePattern = 15;
  const invalidMoveVibratePattern = [100, 10, 100];
  const vibrateOnMove = (vibratePattern: number | number[]) => permissions.allowMoveVibrate && navigator?.vibrate(vibratePattern);

  // runs on valid moves
  const onValidMove = () => {
    vibrateOnMove(moveVibratePattern);
    playMoveAudio();
  };

  /**
   * This function checks the given tile can move on any direction and if possible moves towards the empty tile.
   * @param x X coordinate of tile starts with 0
   * @param y Y coordinate of tile starts with 0
   */
  const moveTile = (x: number, y: number) => {
    setStatus("");
    // checks if given tile can move or not.
    // If can move then current tile moves to corrent direction of empty tile
    switch (true) {
      case canMoveRight(x, y): {
        onValidMove();
        return moveRight(x, y);
      }
      case canMoveLeft(x, y): {
        onValidMove();
        return moveLeft(x, y);
      }
      case canMoveUp(x, y): {
        onValidMove();
        return moveUp(x, y);
      }
      case canMoveDown(x, y): {
        onValidMove();
        return moveDown(x, y);
      }
      case x == getCoordinatesOfNullTile().x && y == getCoordinatesOfNullTile().y: {
        vibrateOnMove(invalidMoveVibratePattern);
        setStatus(`Can't move that tile`);
        return matrix;
      }
      default: {
        vibrateOnMove(invalidMoveVibratePattern);
        setStatus("Invalid move !");
        return matrix;
      }
    }
  };

  const freeMoveLeft = () => {
    const nullTile = getCoordinatesOfNullTile();
    const leftTile = getLeftTile(nullTile.x, nullTile.y);
    if (leftTile) moveTile(leftTile.x, leftTile.y);
  };

  const freeMoveRight = () => {
    const nullTile = getCoordinatesOfNullTile();
    const rightTile = getRightTile(nullTile.x, nullTile.y);
    if (rightTile) moveTile(rightTile.x, rightTile.y);
  };

  const freeMoveUp = () => {
    const nullTile = getCoordinatesOfNullTile();
    const upTile = getUpTile(nullTile.x, nullTile.y);
    if (upTile) moveTile(upTile.x, upTile.y);
  };

  const freeMoveDown = () => {
    const nullTile = getCoordinatesOfNullTile();
    const downTile = getDownTile(nullTile.x, nullTile.y);
    if (downTile) moveTile(downTile.x, downTile.y);
  };

  return {
    moveTile,
    getCoordinatesOfNullTile,
    freeMoveLeft: freeMoveDown,
    freeMoveRight: freeMoveUp,
    freeMoveUp: freeMoveLeft,
    freeMoveDown: freeMoveRight,
    status,
  };
};

export default useMoveTileHook;
