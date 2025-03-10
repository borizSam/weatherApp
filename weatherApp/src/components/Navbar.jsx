import { AppBar, Toolbar, Button, Box, Switch, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <AppBar position="fixed" sx={{ width: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Weather App</Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/weather">Weather</Button>
          <Button color="inherit" component={Link} to="/map">Map</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">🌞</Typography>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
            color="default"
          />
          <Typography variant="body2">🌙</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}




