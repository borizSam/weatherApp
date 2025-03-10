import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Weather from './Weather'
import Home from './pages/Home';
import Weather from './pages/Weather';
import MapView from './pages/MapView';
import About from './pages/About';
import Navbar from './components/Navbar';

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/about" element={<About />} />
          </Routes>
      </Router>
  );
}
export default App;
