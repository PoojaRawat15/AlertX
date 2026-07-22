import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Location() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [mapLink, setMapLink] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation("Geolocation is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation(`Latitude: ${lat}
Longitude: ${lng}`);

        setMapLink(`https://www.google.com/maps?q=${lat},${lng}`);

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            alert(JSON.stringify(data));
            setAddress(data.display_name);
          })
          .catch(() => {
            setAddress("Unable to fetch address.");
          });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocation("❌ Location permission denied.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocation("❌ Location unavailable.");
            break;
          case error.TIMEOUT:
            setLocation("❌ Location request timed out.");
            break;
          default:
            setLocation("❌ Unable to get location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white hover:text-red-500 text-lg font-semibold"
      >
        ← Back
      </button>

      <h1 className="text-5xl font-bold text-blue-500">
        📍 Live Location
      </h1>

      <button
        onClick={getLocation}
        className="mt-10 bg-blue-600 px-8 py-4 rounded-xl text-xl font-semibold hover:bg-blue-700"
      >
        Get My Location
      </button>

      {location && (
        <div className="mt-8 bg-gray-900 p-6 rounded-2xl text-center max-w-xl w-full">
          <p className="whitespace-pre-line">{location}</p>
        </div>
      )}

      {address && (
        <div className="mt-6 bg-gray-900 p-6 rounded-2xl text-center max-w-xl w-full">
          <h2 className="text-2xl font-semibold text-green-400">
            📍 Current Address
          </h2>
          <p className="mt-3">{address}</p>
        </div>
      )}

      {mapLink && (
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
        >
          🗺️ Open in Google Maps
        </a>
      )}
    </div>
  );
}

export default Location;