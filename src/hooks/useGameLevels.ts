const useGameLevels = () => {
  const lv_1 = {
    question: [
      [3, -1, 1, 2],
      [6, 11, 7, 4],
      [9, 5, 13, 8],
      [12, 14, 10, 15],
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
