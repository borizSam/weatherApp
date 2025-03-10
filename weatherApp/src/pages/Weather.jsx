import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper, CircularProgress, Box, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Cargar ciudades favoritas desde localStorage al inicio
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Guardar ciudades favoritas en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Función para obtener datos del clima
  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);
    setError("");

    try {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(currentWeatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setForecast(forecastResponse.data.list.filter((_, index) => index % 8 === 0));

    } catch (err) {
      setError("No se pudieron obtener los datos. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Agregar ciudad a favoritos
  const addFavorite = () => {
    if (weather && !favorites.includes(weather.name)) {
      setFavorites([...favorites, weather.name]);
    }
  };

  // Eliminar ciudad de favoritos
  const removeFavorite = (cityToRemove) => {
    setFavorites(favorites.filter((fav) => fav !== cityToRemove));
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5, width: "100%", maxWidth: "1200px", height: "100vh" }}>



      <Typography variant="h4" gutterBottom>
        🌦 Consulta el Clima
      </Typography>

      {/* Barra de búsqueda */}
      <Box display="flex" justifyContent="center" gap={2} mb={2}>
        <TextField
          label="Ingrese una ciudad"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={fetchWeatherData}>
          Buscar
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Clima actual */}
      {weather && (
        <Paper elevation={3} sx={{ p: 3, mt: 2, textAlign: "center" }}>
          <Typography variant="h6">🌍 Clima en {weather.name}</Typography>
          <Typography variant="body1">🌡️ Temperatura: <strong>{weather.main.temp}°C</strong></Typography>
          <Typography variant="body1">🌤 Condición: <strong>{weather.weather[0].description}</strong></Typography>

          <Button variant="outlined" color="secondary" onClick={addFavorite} sx={{ mt: 2 }}>
            ⭐ Guardar como favorita
          </Button>
        </Paper>
      )}

      {/* Lista de ciudades favoritas */}
      {favorites.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 2, textAlign: "center" }}>
          <Typography variant="h6">⭐ Ciudades Favoritas</Typography>
          <List>
            {favorites.map((favCity, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" onClick={() => removeFavorite(favCity)}>
                  <DeleteIcon />
                </IconButton>
              }>
                {favCity}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Botones de navegación */}
      <Box display="flex" justifyContent="center" gap={2} mt={3}>
        <Button variant="outlined" onClick={() => navigate("/")}>🏠 Inicio</Button>
        <Button variant="outlined" onClick={() => navigate("/map")}>🗺️ Mapa</Button>
        <Button variant="outlined" onClick={() => navigate("/about")}>ℹ️ Acerca de</Button>
      </Box>
    </Container>
  );
}


