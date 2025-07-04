import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { useFullscreen, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";

const Main = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const { toggle: toggleFulScreenMode } = useFullscreen();

  useHotkeys([
    ["mod+J", () => toggleColorScheme()],
    ["mod+f", () => toggleFulScreenMode()],
  ]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          colors: {},
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <App />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Main />);
