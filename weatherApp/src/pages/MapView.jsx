import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import L from "leaflet";

// Configuración del icono personalizado para el clima
const weatherIcon = (icon) =>
  new L.Icon({
    iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [1, -34],
  });

export default function MapView() {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar ciudades favoritas desde localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Obtener datos del clima según coordenadas
  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    setWeatherData(null);
    try {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setWeatherData({ ...response.data, lat, lon });
    } catch (error) {
      console.error("Error fetching weather data", error);
    } finally {
      setLoading(false);
    }
  };

  // Manejar clics en el mapa para obtener clima en esa ubicación
  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        fetchWeather(lat, lng);
      },
    });
    return null;
  }

  return (
    <Container sx={{ textAlign: "center", mt: 5, width: "100%", maxWidth: "1200px", height: "100vh" }}>



      <Typography variant="h4" textAlign="center" gutterBottom>
        🗺 Mapa Meteorológico Interactivo
      </Typography>
      <Typography variant="body1" textAlign="center" mb={2}>
        Haz clic en el mapa para obtener el clima en cualquier ubicación.
      </Typography>

      <Box sx={{ height: "500px", width: "100%" }}>
        <MapContainer center={[40.4168, -3.7038]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler />

          {/* Mostrar marcador si hay datos del clima */}
          {weatherData && (
            <Marker position={[weatherData.lat, weatherData.lon]} icon={weatherIcon(weatherData.weather[0].icon)}>
              <Popup>
                <Typography variant="h6">{weatherData.name || "Ubicación seleccionada"}</Typography>
                <Typography variant="body2">🌡 Temp: {weatherData.main.temp}°C</Typography>
                <Typography variant="body2">🌤 {weatherData.weather[0].description}</Typography>
              </Popup>
            </Marker>
          )}

          {/* Mostrar marcadores en ciudades favoritas */}
          {favorites.length > 0 &&
            favorites.map((favCity, index) => (
              <Marker key={index} position={[40.4168 + index * 0.1, -3.7038 + index * 0.1]} icon={weatherIcon("01d")}>
                <Popup>
                  <Typography variant="h6">{favCity}</Typography>
                  <Typography variant="body2">📌 Ciudad favorita</Typography>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </Box>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
    </Container>
  );
}
