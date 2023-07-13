import { useAppDispatch } from "../lib/redux/hooks";
import { setMatrix, setMatrixAsMove } from "../lib/redux/slice/game";

const useSetMatrix = () => {
  const dispatch = useAppDispatch();
  const setNewMatrix = (matrix: number[][], options?: { setAsMove: boolean }) => {
    if (options?.setAsMove) dispatch(setMatrixAsMove(matrix));
    else dispatch(setMatrix(matrix));
  };
  return setNewMatrix;

  //   const generateMatrix = (size: number) => {
  //     const numList = [];
  //     const output: number[][] = [];
  //     for (let i = 1; i <= size * size; i++) i == size * size ? numList.push(-1) : numList.push(i);
  //     for (let x = 0; x < size; x++) {
  //       for (let y = 0; y < size; y++) {
  //         output[x] = output[x] ? [...output[x], numList.splice(0, 1)[0]] : [numList.splice(0, 1)[0]];
  //       }
  //     }
  //     return output;
  //   };
};

export default useSetMatrix;
