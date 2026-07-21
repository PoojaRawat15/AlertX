import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Location() {
      const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(
          `Latitude: ${position.coords.latitude}
Longitude: ${position.coords.longitude}`
        );
      });
    } else {
      setLocation("Location is not supported on this device.");
    }
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
        <div className="mt-8 bg-gray-900 p-6 rounded-2xl text-center">
          <p>{location}</p>
        </div>
      )}

    </div>
  );
}

export default Location;