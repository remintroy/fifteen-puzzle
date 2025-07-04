import "./Tile.css";
import useMoveTileHook from "../../hooks/useMoveTile";
import useGame from "../../hooks/useGame";
import { useHotkeys } from "@mantine/hooks";
import { Box, Button, Card, Flex, Image, Text, useMantineTheme } from "@mantine/core";
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
  const { matrix, moves, tileImage, completed, started } = useGame();
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
      if (question.level_1?.length > 0) {
        setMatrix(question.level_1, true);
        setStarted(true);
      }
    };
    initGame();
  }, []);

  const manageMove = (x: number, y: number) => {
    if (!started || !matrix.length || !solution.level_1?.length) return;
    moveTile(x, y);
    if (isCompleted(solution.level_1)) setCompleted(true);
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
    const ans_value = solution.level_1?.[x]?.[y] ?? 0;

    const handleMove = () => {
      manageMove(x, y);
    };

    return (
      <motion.div
        className={`${dark ? "" : "light"} ${value === -1 ? "Empty" : ""} ${value !== -1 && ans_value == value ? "Done" : ""}`}
        key={value}
        onClick={handleMove}
      >
        {["a", "b"].includes(tileImage) ? (
          <>{value === -1 ? "" : <img src={`/tile_images/${tileImage}/${value}.jpg`} />}</>
        ) : (
          <>{value == -1 ? "" : value}</>
        )}
      </motion.div>
    );
  };

  const handleRestartLevel = async () => {
    resetGame();
    await initializeLevel();
    if (question.level_1?.length > 0) {
      setMatrix(question.level_1, true);
      setStarted(true);
    }
    setCompleted(false);
  };

  const handleNextLevel = async () => {
    if (currentLevel < 5) {
      setCurrentLevel(currentLevel + 1);
      resetGame();
      await initializeLevel();
      if (question.level_1?.length > 0) {
        setMatrix(question.level_1, true);
        setStarted(true);
      }
      setCompleted(false);
    }
  };

  if (!matrix.length || !solution.level_1?.length) {
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
      <Flex gap={10} mt={20}>
        <Card
          withBorder
          w={70}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onClick={() => useGameStore.getState().setTileImage("1")}
        >
          123
        </Card>
        <Image
          onClick={() => useGameStore.getState().setTileImage("a")}
          sx={{ cursor: "pointer" }}
          radius={5}
          width={70}
          height={70}
          src={"/tile_images/a/1.jpg"}
        />
        <Image
          onClick={() => useGameStore.getState().setTileImage("b")}
          sx={{ cursor: "pointer" }}
          radius={5}
          width={70}
          height={70}
          src={"/tile_images/b/1.jpg"}
        />
      </Flex>
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
