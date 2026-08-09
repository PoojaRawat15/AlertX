import { useState } from "react";

function Location() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => {
    setLoading(true);
    setError("");
    setAddress("");
    setLocation(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        // Reverse geocoding - get address
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          const data = await response.json();

          if (data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress("Address could not be found.");
          }
        } catch (err) {
          console.error("Address error:", err);
          setAddress("Location found, but address could not be loaded.");
        }

        setLoading(false);
      },

      (error) => {
        console.error(error);

        setLoading(false);

        if (error.code === 1) {
          setError(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          setError("Unable to detect your location.");
        } else if (error.code === 3) {
          setError("Location request timed out. Please try again.");
        } else {
          setError("Something went wrong while getting your location.");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const openGoogleMaps = () => {
    if (!location) return;

    const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">

      {/* Back */}
      <button
        onClick={() => window.history.back()}
        className="text-white text-lg hover:text-blue-400 mb-8"
      >
        ← Back
      </button>

      {/* Heading */}
      <div className="text-center">

        <h1 className="text-5xl md:text-6xl font-bold text-blue-500">
          📍 Live Location
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Find and share your current location
        </p>

        {/* Get Location Button */}
        <button
          onClick={getLocation}
          disabled={loading}
          className="mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-10 py-4 rounded-2xl text-xl font-bold"
        >
          {loading ? "Getting Location..." : "Get My Location"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-8 bg-red-900/40 border border-red-500 rounded-xl p-5">
            <p className="text-red-300">
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* Location Result */}
        {location && (
          <div className="mt-10 bg-gray-900 rounded-3xl p-7 max-w-2xl mx-auto">

            <h2 className="text-3xl font-bold text-green-500">
              📍 Your Current Location
            </h2>

            {/* Address */}
            <div className="mt-6 bg-gray-800 rounded-2xl p-5 text-left">

              <p className="text-gray-400 text-sm">
                CURRENT ADDRESS
              </p>

              <p className="text-white text-lg mt-2 leading-relaxed">
                {address || "Finding your address..."}
              </p>

            </div>

            {/* Coordinates */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-sm">
                  Latitude
                </p>

                <p className="text-white font-semibold mt-1">
                  {location.latitude.toFixed(6)}
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-sm">
                  Longitude
                </p>

                <p className="text-white font-semibold mt-1">
                  {location.longitude.toFixed(6)}
                </p>
              </div>

            </div>

            {/* Google Maps */}
            <button
              onClick={openGoogleMaps}
              className="mt-7 w-full bg-green-600 hover:bg-green-700 px-6 py-4 rounded-xl text-lg font-bold"
            >
              🗺️ View on Google Maps
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Location;