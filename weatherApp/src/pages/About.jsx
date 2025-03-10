import { Container, Typography, Paper, Box } from "@mui/material";

export default function About() {
  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          ℹ️ Acerca de WeatherApp
        </Typography>

        <Typography variant="body1" paragraph>
          Bienvenido a <strong>WeatherApp</strong>, una aplicación que te permite consultar el clima en tiempo real de cualquier ciudad del mundo. También puedes visualizar un pronóstico a 5 días y explorar datos meteorológicos en un mapa interactivo.
        </Typography>

        <Typography variant="h5" mt={3}>
          🌟 Funcionalidades Principales:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li">
            Buscar el clima actual de cualquier ciudad.
          </Typography>
          <Typography component="li">
            Explorar condiciones meteorológicas en un mapa interactivo.
          </Typography>
          <Typography component="li">
            Guardar tus ciudades favoritas para acceder rápidamente.
          </Typography>
        </Box>

        <Typography variant="h5" mt={3}>
          🔧 Tecnologías Utilizadas:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li">React con React Router.</Typography>
          <Typography component="li">Material-UI para el diseño.</Typography>
          <Typography component="li">OpenWeatherMap API para los datos climáticos.</Typography>
          <Typography component="li">React-Leaflet para el mapa interactivo.</Typography>
        </Box>
      </Paper>
    </Container>
  );
}
