import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Findsitter = () => {
  const [locations, setLocations] = useState([]);
  const [sitterId, setSitterId] = useState('');
  const [sitterName, setSitterName] = useState('');
  const [date, setDate] = useState(''); // Add state for the date

  useEffect(() => {
    axios.get('http://localhost:3001/api/sitter-location')
      .then(res => setLocations(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async () => {
    if (!sitterId || !sitterName || !date) { // Check if date is filled
      return alert("Please fill in all fields.");
    }

    const parentId = localStorage.getItem('userId');
    const parentName = localStorage.getItem('userName');

    try {
      const res = await axios.post('http://localhost:3001/api/confirm-sitter', {
        sitterId,
        sitterName,
        parentId,
        parentName,
        date // Include date in the request
      });

      if (res.status === 200) {
        alert("Request submitted successfully!");
        setSitterId('');
        setSitterName('');
        setDate(''); // Reset the date field
      }
    } catch (error) {
      console.error("Failed to submit request:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ height: '800px', width: '100%' }}>
        {locations.length > 0 && (
          <MapContainer
            center={[23.8103, 90.4125]} // Dhaka
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {locations.map((sitter, idx) => (
              <Marker
                key={idx}
                position={[sitter.latitude, sitter.longitude]}
                icon={L.icon({
                  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
                })}
              >
                <Popup>
                  <strong>{sitter.name} (ID: {sitter.id})</strong><br />
                  {sitter.location}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Input Form */}
      <div className="w-full max-w-md mt-6 p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter sitter ID"
          value={sitterId}
          onChange={(e) => setSitterId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Enter sitter name"
          value={sitterName}
          onChange={(e) => setSitterName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* Date Input */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded"
        >
          Request for Babysitting
        </button>
      </div>
    </div>
  );
};

export default Findsitter;
