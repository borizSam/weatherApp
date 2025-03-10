import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">Inicio</Button>
                <Button color="inherit" component={Link} to="/weather">Clima</Button>
                <Button color="inherit" component={Link} to="/map">Mapa</Button>
                <Button color="inherit" component={Link} to="/about">Acerca de</Button>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
