import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useShakeDetection from "../hooks/useShakeDetection";

function Dashboard() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useShakeDetection(() => {
    setShowPopup(true);
  });

  useEffect(() => {
    if (!showPopup) return;

    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowPopup(false);
          navigate("/sos");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showPopup, navigate]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <button
        onClick={() => navigate(-1)}
        className="text-white"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-center">
        Alert<span className="text-red-500">X</span> Dashboard
      </h1>

      <p className="text-center text-gray-400 mt-2">
        Your Emergency Control Center
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div
          onClick={() => navigate("/sos")}
          className="bg-red-600 rounded-3xl p-8 hover:scale-105 duration-300 cursor-pointer"
        >
          <h2 className="text-3xl font-bold">🆘 SOS Emergency</h2>
          <p className="mt-3">
            Send emergency alert instantly.
          </p>
        </div>

        <div
          onClick={() => navigate("/location")}
          className="bg-blue-600 rounded-3xl p-8 hover:scale-105 duration-300 cursor-pointer"
        >
          <h2 className="text-3xl font-bold">📍 Live Location</h2>
          <p className="mt-3">
            Share your live location.
          </p>
        </div>

        <div
          onClick={() => navigate("/emergency-profile")}
          className="bg-purple-600 rounded-3xl p-8 hover:scale-105 duration-300 cursor-pointer"
        >
          <h2 className="text-3xl font-bold">👤 Emergency Profile</h2>
          <p className="mt-3">
            View and edit your profile.
          </p>
        </div>

        <div
          onClick={() => navigate("/settings")}
          className="bg-gray-700 rounded-3xl p-8 hover:scale-105 duration-300 cursor-pointer"
        >
          <h2 className="text-3xl font-bold">⚙️ Settings</h2>
          <p className="mt-3">
            Manage app preferences.
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="border border-red-500 rounded-3xl p-8">
          <h2 className="text-2xl font-bold">
            🤖 AI Assistant
          </h2>

          <p className="text-gray-400 mt-2">
            Coming Soon...
          </p>
        </div>

        <div className="border border-blue-500 rounded-3xl p-8">
          <h2 className="text-2xl font-bold">
            🚗 Accident Detection
          </h2>

          <p className="text-gray-400 mt-2">
            Coming Soon...
          </p>
        </div>

      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl w-80 text-center border border-red-500">

            <h2 className="text-2xl font-bold text-red-500">
              🚨 Possible Accident Detected
            </h2>

            <p className="mt-4 text-lg">
              Are you OK?
            </p>

            <p className="text-yellow-400 text-5xl font-bold mt-4">
              {countdown}
            </p>

            <p className="text-gray-400">
              Auto SOS in {countdown} sec
            </p>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => {
                  setShowPopup(false);
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"
              >
                I'm Safe
              </button>

              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/sos");
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
              >
                Send SOS
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;