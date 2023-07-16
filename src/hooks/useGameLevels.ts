const useGameLevels = () => {
  const lv_1 = {
    question: [
      // [5, 8, 1, 3],
      // [-1, 9, 2, 4],
      // [13, 7, 6, 11],
      // [14, 15, 10, 12],
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, -1, 15],
    ],
    solution: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, -1],
    ],
  };

  return {
    question: { level_1: lv_1.question },
    solution: { level_1: lv_1.solution },
  };
};

export default useGameLevels;
