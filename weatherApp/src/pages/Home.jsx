import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        🌍 Bienvenido a WeatherApp
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Explora el clima en diferentes ciudades y accede a información en tiempo real.  
        Usa los enlaces rápidos para navegar fácilmente por la aplicación.
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mt={3}>
        <Button variant="contained" color="primary" onClick={() => navigate("/weather")}>
          🌦 Ver Clima
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/map")}>
          🗺 Mapa
        </Button>
        <Button variant="outlined" onClick={() => navigate("/about")}>
          ℹ️ Sobre Nosotros
        </Button>
      </Box>
    </Container>
  );
}
