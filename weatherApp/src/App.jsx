import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import MapView from "./pages/MapView";
import About from "./pages/About";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* ✅ Pasamos darkMode y setDarkMode a Navbar */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", marginTop: "64px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
