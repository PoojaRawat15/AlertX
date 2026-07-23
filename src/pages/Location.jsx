import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Location() {
  const navigate = useNavigate();

  const [position, setPosition] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      () => {
        alert("Unable to get location.");
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-10">

      <button
        onClick={() => navigate(-1)}
        className="self-start text-lg hover:text-red-500"
      >
        ← Back
      </button>

      <h1 className="text-5xl font-bold text-blue-500 mt-6">
        📍 Live Location
      </h1>

      <button
        onClick={getLocation}
        className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
      >
        Get My Location
      </button>

      {position && (
        <>
          <p className="mt-6 text-center">
            Latitude: {position[0]}
            <br />
            Longitude: {position[1]}
          </p>

          <div className="mt-6 w-full max-w-4xl h-[500px] rounded-2xl overflow-hidden">
            <MapContainer
              center={position}
              zoom={16}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={position} icon={icon}>
                <Popup>
                  📍 You are here
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </>
      )}

    </div>
  );
}

export default Location;