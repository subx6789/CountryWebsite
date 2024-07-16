import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <main
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } bg-veryLightGray dark:bg-veryDarkBlue transition-colors duration-300`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Outlet />
    </main>
  );
}

export default App;
