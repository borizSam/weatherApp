import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Weather from './pages/Weather';
import MapView from './pages/MapView';
import About from './pages/About';
import Navbar from './components/Navbar';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: { mode: darkMode ? 'dark' : 'light' }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/map" element={<MapView />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
