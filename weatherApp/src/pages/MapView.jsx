import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView() {
    return (
        <MapContainer center={[40.4168, -3.7038]} zoom={5} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[40.4168, -3.7038]}>
                <Popup>Madrid, España</Popup>
            </Marker>
        </MapContainer>
    );
}
export default MapView;
