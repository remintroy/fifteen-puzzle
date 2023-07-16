import "./Tile.scss";
import useMoveTileHook from "../../hooks/useMoveTile";
import useGame from "../../hooks/useGame";
import { useHotkeys } from "@mantine/hooks";
import { Box, Button, Card, Flex, Image, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useGameLevels from "../../hooks/useGameLevels";
import { IconRotateClockwise } from "@tabler/icons-react";
import useSetMatrix from "../../hooks/useSetMatrix";
import { resetGame, setCompleted } from "../../lib/redux/slice/game";
import { useAppDispatch } from "../../lib/redux/hooks";

function Tiles() {
  const { matrix, moves, tileImage, setTileImage, completed } = useGame();
  const { moveTile, status, freeMoveDown, freeMoveLeft, freeMoveRight, freeMoveUp, isCompleted } = useMoveTileHook();
  const gameLevel = useGameLevels();
  const setMatrix = useSetMatrix();
  const dispatch = useAppDispatch();

  // initiates move
  const manageMove = (x: any, y: any) => {
    moveTile(x, y);
    if (isCompleted(gameLevel.solution.level_1)) dispatch(setCompleted(true));
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

  const [values, setValues] = useState(
    matrix.reduce((acc, row) => {
      row.forEach((value) => {
        acc = [...acc, value];
      });
      return acc;
    })
  );

  useEffect(() => {
    setGridTemplatesStylePattern(() => {
      return matrix.map(() => "1fr ").join("");
    });
    setValues(
      matrix.reduce((acc, row) => {
        row.forEach((value) => {
          acc = [...acc, value];
        });
        return acc;
      })
    );
  }, [matrix]);

  const Tile = ({ x, y, value }: { x: number; y: number; value: number }): JSX.Element => {
    const dark = colorScheme == "dark";
    const ans_value = gameLevel.solution.level_1[x][y];

    const handleMove = () => {
      manageMove(x, y);
    };

    return (
      <motion.div
        className={`${dark ? "" : "light"} ${value === -1 ? "Empty" : ""} ${value !== -1 && ans_value == value ? "Done" : ""}`}
        key={value}
        onClick={handleMove}
      >
        {["a", "b"].includes(tileImage) ? <>{value === -1 ? "" : <img src={`/tile_images/${tileImage}/${value}.jpg`} />}</> : <>{value == -1 ? "" : value}</>}
      </motion.div>
    );
  };

  const handleRestartGame = () => {
    dispatch(resetGame());
    setMatrix(gameLevel.question.level_1);
    dispatch(setCompleted(false));
  };
  return (
    <Box mt={30} className="MainTileContainer">
      {completed && (
        <Box className="result" bg={"dark"}>
          <Text fz={"30px"}>Great job, You nailed it</Text>
          <Text>Moves : {moves}</Text>
          <Button leftIcon={<IconRotateClockwise size={"20px"} />} onClick={() => handleRestartGame()}>
            Replay
          </Button>
        </Box>
      )}
      <div className="statusDisplay">{status ? status : ":)"}</div>
      <Box className="TileContainer" sx={{ display: "grid", gridTemplateColumns: gridTemplatesStylePattern, gridTemplateRows: gridTemplatesStylePattern }}>
        {values.map((value, index) => {
          const y = index % matrix.length;
          const x = ~~(index / matrix.length);
          return <Tile key={value} x={x} y={y} value={value} />;
        })}
      </Box>
      <Text fw={"bold"} mt={20} className="Move Count mt-4">
        {moves} Moves
      </Text>
      <Flex gap={10} mt={20}>
        <Card withBorder w={70} sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => setTileImage("1")}>
          123
        </Card>
        <Image onClick={() => setTileImage("a")} sx={{ cursor: "pointer" }} radius={5} width={70} height={70} src={"/tile_images/a/1.jpg"} />
        <Image onClick={() => setTileImage("b")} sx={{ cursor: "pointer" }} radius={5} width={70} height={70} src={"/tile_images/b/1.jpg"} />
      </Flex>
    </Box>
  );
}

export default Tiles;
