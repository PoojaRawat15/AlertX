import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SOS() {
      const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [count, setCount] = useState(3);

  const handleSOS = () => {
    setStatus("countdown");
    setCount(3);

    let timer = 3;

    const interval = setInterval(() => {
      timer--;
      setCount(timer);

      if (timer === 0) {
        clearInterval(interval);

        setStatus("sending");

        setTimeout(() => {
          setStatus("sent");
        }, 2000);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <button
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 text-white hover:text-red-500 text-lg font-semibold"
>
  ← Back
</button>
      <div className="w-full max-w-lg bg-gray-900 rounded-3xl p-8 text-center">

        <h1 className="text-5xl font-bold text-red-500">
          🆘 SOS
        </h1>

        <p className="text-gray-400 mt-3">
          Press only during an emergency
        </p>

        {status === "idle" && (
          <>
            <button
              onClick={handleSOS}
              className="mt-10 w-52 h-52 rounded-full bg-red-600 hover:bg-red-700 text-4xl font-bold shadow-2xl"
            >
              SOS
            </button>

            <p className="text-gray-400 mt-8">
              Your emergency contacts will be notified.
            </p>
          </>
        )}

        {status === "countdown" && (
          <>
            <h2 className="text-6xl font-bold text-yellow-400 mt-10">
              {count}
            </h2>

            <p className="mt-5 text-white">
              Preparing Emergency Alert...
            </p>
          </>
        )}

        {status === "sending" && (
          <>
            <h2 className="text-5xl font-bold text-red-500 mt-10">
              🚨 Sending Alert...
            </h2>
          </>
        )}

        {status === "sent" && (
          <>
            <h2 className="text-5xl font-bold text-green-500 mt-10">
              ✅ Alert Sent
            </h2>

            <p className="mt-5 text-gray-300">
              Help is on the way.
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default SOS;