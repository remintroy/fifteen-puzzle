import "./Tile.scss";
import useMoveTileHook from "../../hooks/useMoveTile";
import useGame from "../../hooks/useGame";
import { useHotkeys } from "@mantine/hooks";
import { Box, Card, Flex, Image, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";

function Tiles() {
  const { matrix, moves, tileImage, setTileImage } = useGame();
  const { moveTile, status, freeMoveDown, freeMoveLeft, freeMoveRight, freeMoveUp } = useMoveTileHook();

  // initiates move
  const manageMove = (rowIndex: any, valueIndex: any) => {
    moveTile(rowIndex, valueIndex);
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

  useEffect(() => {
    setGridTemplatesStylePattern(() => {
      return matrix.map(() => "1fr ").join("");
    });
  }, [matrix]);

  return (
    <Box mt={30} className="MainTileContainer">
      <div className="statusDisplay">{status ? status : ":)"}</div>
      <Box className="TileContainer" sx={{ display: "grid", gridTemplateColumns: gridTemplatesStylePattern, gridTemplateRows: gridTemplatesStylePattern }}>
        {matrix.map((row, rowIndex) => {
          return row.map((value, valueIndex) => {
            return (
              <div
                className={`${colorScheme == "dark" ? "" : "light"} ${value === -1 ? "Empty" : ""}${value !== -1 ? "Done" : ""}`}
                onClick={() => manageMove(rowIndex, valueIndex)}
                key={value}
              >
                {/* {value} */}
                {["a", "b"].includes(tileImage) ? (
                  <>{value === -1 ? "" : <img src={`/tile_images/${tileImage}/${value}.jpg`} />}</>
                ) : (
                  <>{value == -1 ? "" : value}</>
                )}
              </div>
            );
          });
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
