import { useEffect, useState } from "react";
import Tiles from "./components/Tile/Tile";
import { Box, Drawer, Text } from "@mantine/core";
// import { createBrowserRouter } from "react-router-dom";
// import HomePage from "./pages/Home";
import useSetMatrix from "./hooks/useSetMatrix";
import useGameLevels from "./hooks/useGameLevels";

// const route = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
// ]);

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const setMatrix = useSetMatrix();
  const levels = useGameLevels();

  useEffect(() => {
    setMatrix(levels.question.level_1);
  }, []);

  return (
    <Box>
      <Drawer size={"xs"} opened={openDrawer} onClose={() => setOpenDrawer(false)} title="Game Settings">
        {/* Drawer content */}
      </Drawer>
      <Text fz={"xl"} onClick={() => setOpenDrawer(true)} fw={"bold"} align="center" py={10}>
        Fifteen Puzzle
      </Text>
      <div className="AppMain">
        <Tiles />
      </div>
    </Box>
  );
}
export default App;
