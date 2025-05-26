import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import axios from 'axios';
import L from 'leaflet';

const Updateinfo = () => {
  const sitterId = localStorage.getItem('userId');
  const [position, setPosition] = useState(null);
  const [availableDays, setAvailableDays] = useState('');

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return position ? (
      <Marker
        position={position}
        icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}
      />
    ) : null;
  };

  const handleSubmit = async () => {
    if (!position) return alert("Please click on the map to select a location.");
    if (!availableDays) return alert("Please enter available days.");

    try {
      await axios.post('http://localhost:3001/api/update-location', {
        sitterId,
        latitude: position.lat,
        longitude: position.lng,
        availableDays
      });
      alert("Location and availability updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update info.");
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-start p-4'>
      <MapContainer center={[23.8103, 90.4125]} zoom={12} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>

      <input
        type="number"
        placeholder="How many days are you available?"
        value={availableDays}
        onChange={(e) => setAvailableDays(e.target.value)}
        className="mt-4 p-2 border rounded w-full max-w-md"
      />

      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit Info
      </button>
    </div>
  );
};

export default Updateinfo;
