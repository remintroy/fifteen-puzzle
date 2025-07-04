import "./Tile.css";
import useMoveTileHook from "../../hooks/useMoveTile";
import useGame from "../../hooks/useGame";
import { useHotkeys } from "@mantine/hooks";
import { Box, Button, Flex, Text, useMantineTheme } from "@mantine/core";
import { Component, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useGameLevels from "../../hooks/useGameLevels";
import { IconRotateClockwise, IconArrowRight } from "@tabler/icons-react";
import useSetMatrix from "../../hooks/useSetMatrix";
import { useGameStore } from "../../lib/store/gameStore";
import { useLevelStore } from "../../lib/store/levelStore";

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box mt={30} className="MainTileContainer">
          <Text color="red" size="lg">Something went wrong. Please try refreshing the page.</Text>
        </Box>
      );
    }
    return this.props.children;
  }
}

function Tiles() {
  const { matrix, moves, completed, started } = useGame();
  const { moveTile, status, freeMoveDown, freeMoveLeft, freeMoveRight, freeMoveUp, isCompleted } = useMoveTileHook();
  const { currentLevel, setCurrentLevel, solution, question } = useGameLevels();
  const setMatrix = useSetMatrix();
  const setStarted = useGameStore((state) => state.setStarted);
  const setCompleted = useGameStore((state) => state.setCompleted);
  const resetGame = useGameStore((state) => state.resetGame);
  const initializeLevel = useLevelStore((state) => state.initializeLevel);

  useEffect(() => {
    const initGame = async () => {
      await initializeLevel();
      if (question?.length > 0) {
        setMatrix(question, true);
        setStarted(true);
      }
    };
    initGame();
  }, []);

  const manageMove = (x: number, y: number) => {
    if (!started || !matrix.length || !solution?.length) return;
    moveTile(x, y);
    if (isCompleted(solution)) setCompleted(true);
  };

  useHotkeys([
    ["ArrowUp", freeMoveUp],
    ["w", freeMoveUp],
    ["ArrowDown", freeMoveDown],
    ["s", freeMoveDown],
    ["ArrowRight", freeMoveRight],
    ["d", freeMoveRight],
    ["ArrowLeft", freeMoveLeft],
    ["a", freeMoveLeft],
  ]);

  const { colorScheme } = useMantineTheme();

  const [gridTemplatesStylePattern, setGridTemplatesStylePattern] = useState("1fr");

  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (!matrix.length) return;

    setGridTemplatesStylePattern(() => {
      return matrix.map(() => "1fr ").join("");
    });
    setValues(
      matrix.reduce((acc: number[], row) => {
        row.forEach((value) => {
          acc = [...acc, value];
        });
        return acc;
      }, [])
    );
  }, [matrix]);

  const Tile = ({ x, y, value }: { x: number; y: number; value: number }): JSX.Element => {
    const dark = colorScheme == "dark";
    const ans_value = solution?.[x]?.[y] ?? 0;

    const handleMove = () => {
      manageMove(x, y);
    };

    return (
      <motion.div
        className={`${dark ? "" : "light"} ${value === -1 ? "Empty" : ""} ${value !== -1 && ans_value == value ? "Done" : ""}`}
        key={value}
        onClick={handleMove}
      >
        {value === -1 ? "" : value}
      </motion.div>
    );
  };

  const handleRestartLevel = async () => {
    resetGame();
    await initializeLevel();
    if (question?.length > 0) {
      setMatrix(question, true);
      setStarted(true);
    }
    setCompleted(false);
  };

  const handleNextLevel = async () => {
    if (currentLevel < 5) {
      setCurrentLevel(currentLevel + 1);
      resetGame();
      await initializeLevel();
      if (question?.length > 0) {
        setMatrix(question, true);
        setStarted(true);
      }
      setCompleted(false);
    }
  };

  if (!matrix.length || !solution?.length) {
    return <Box mt={30} className="MainTileContainer"><Text>Loading...</Text></Box>;
  }

  return (
    <Box mt={30} className="MainTileContainer">
      {completed && (
        <Box className="result" bg={"dark"}>
          <Text fz={"30px"}>Great job, You nailed it!</Text>
          <Text>Moves: {moves}</Text>
          <Text mb={20}>Level: {currentLevel}</Text>
          <Flex gap={10}>
            <Button leftIcon={<IconRotateClockwise size={"20px"} />} onClick={handleRestartLevel}>
              Restart Level
            </Button>
            {currentLevel < 5 && (
              <Button leftIcon={<IconArrowRight size={"20px"} />} onClick={handleNextLevel}>
                Next Level
              </Button>
            )}
          </Flex>
        </Box>
      )}
      <div className="statusDisplay">{status ? status : ":)"}</div>
      <Box
        className="TileContainer"
        sx={{ display: "grid", gridTemplateColumns: gridTemplatesStylePattern, gridTemplateRows: gridTemplatesStylePattern }}
      >
        {values.map((value, index) => {
          const y = index % matrix.length;
          const x = ~~(index / matrix.length);
          return <Tile key={value} x={x} y={y} value={value} />;
        })}
      </Box>
      <Text fw={"bold"} mt={20} className="Move Count mt-4">
        Level {currentLevel} - {moves} Moves
      </Text>

    </Box>
  );
}

function TilesWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Tiles />
    </ErrorBoundary>
  );
}

export default TilesWithErrorBoundary;
