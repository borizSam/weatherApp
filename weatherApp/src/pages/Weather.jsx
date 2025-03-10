import { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Weather() {
    const [city, setCity] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [history, setHistory] = useState([]);

    // Cargar favoritos al inicio
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        setHistory([{ time: new Date().toLocaleTimeString(), count: storedFavorites.length }]);
    }, []);

    const addFavorite = () => {
        if (city.trim() === '' || favorites.includes(city)) return;

        const updatedFavorites = [...favorites, city];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        // Actualizar historial de cambios
        setHistory([...history, { time: new Date().toLocaleTimeString(), count: updatedFavorites.length }]);
        
        setCity(''); // Limpiar campo después de agregar
    };

    const removeFavorite = (cityToRemove) => {
        const updatedFavorites = favorites.filter(fav => fav !== cityToRemove);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        // Actualizar historial de cambios
        setHistory([...history, { time: new Date().toLocaleTimeString(), count: updatedFavorites.length }]);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <TextField
                label="Ingrese una ciudad"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={addFavorite} 
                style={{ marginTop: '10px', width: '100%' }}
            >
                Guardar
            </Button>

            <h2>Ciudades favoritas:</h2>
            <List>
                {favorites.map((fav, index) => (
                    <ListItem key={index} secondaryAction={
                        <IconButton edge="end" onClick={() => removeFavorite(fav)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText primary={fav} />
                    </ListItem>
                ))}
            </List>

            {/* 📊 Gráfico de favoritos */}
            <h2>Historial de favoritos</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={history}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Weather;

