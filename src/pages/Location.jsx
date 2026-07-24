import { useState, useEffect } from "react";
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
  const [address, setAddress] = useState("");
  const [mapLink, setMapLink] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);

        setMapLink(
          `https://www.google.com/maps?q=${lat},${lng}`
        );
      },
      () => {
        alert("Unable to get location.");
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  useEffect(() => {
    if (!position) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`
        );

        const data = await res.json();

        const a = data.address;

        const location =
          a.neighbourhood ||
          a.suburb ||
          a.residential ||
          a.hamlet ||
          a.village ||
          a.town ||
          a.city ||
          "";

        setAddress(
          `${location}, ${a.city || a.town || a.village || ""}, ${a.state || ""}`
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchAddress();
  }, [position]);
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
          <div className="mt-8 bg-gray-900 rounded-2xl p-6 w-full max-w-3xl text-center">

            <h2 className="text-2xl font-bold text-green-400">
              📍 Last Known Location
            </h2>

            <p className="mt-3 text-lg text-white">
              {address || "Fetching address..."}
            </p>

            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
            >
              🗺️ Open in Google Maps
            </a>

          </div>

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