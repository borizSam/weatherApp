import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';

function Navbar({ darkMode, setDarkMode }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/weather">Weather</Button>
                <Button color="inherit" component={Link} to="/map">Map</Button>
                <Button color="inherit" component={Link} to="/about">About</Button>

                {/* Botón para cambiar el modo oscuro */}
                <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)} sx={{ marginLeft: 'auto' }}>
                    <Brightness4Icon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;


