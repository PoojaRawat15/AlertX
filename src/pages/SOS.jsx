import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useShakeDetection from "../hooks/useShakeDetection";

function SOS() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle");
  const [count, setCount] = useState(5);

  const handleSOS = useCallback(() => {
    if (status !== "idle") return;

    setStatus("countdown");
    setCount(5);
    if("vibrate" in navigator ){
      navigator.vibrate([300,200,300]);
    }
    if("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    // Voice Alert
    const speech = new SpeechSynthesisUtterance(
      "Emergency detected. Are you okay? Emergency alert will be sent in 5 seconds. Tap cancel to stop."
    );

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }
    let timer = 5;

    const interval = setInterval(() => {
      timer--;
      setCount(timer);

      if (timer <= 0) {
        clearInterval(interval);
        if("speechSynthesis" in window) {

        window.speechSynthesis.cancel();
        }
        setStatus("sending");

        setTimeout(() => {
          setStatus("sent");
        }, 2000);
      }
    }, 1000);
  }, [status]);

  // Shake Detection
  useShakeDetection(() => {
    handleSOS();
  });

  const cancelSOS = () => {
    window.speechSynthesis.cancel();
    setStatus("idle");
    setCount(5);
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
          Shake your phone 3 times or press the SOS button.
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

            <p className="mt-5 text-white text-xl">
              🚨 Emergency Detected
            </p>

            <p className="mt-3 text-gray-300">
              Are you okay?
            </p>

            <p className="mt-2 text-gray-400">
              Emergency alert will be sent in {count} seconds.
            </p>

            <button
              onClick={cancelSOS}
              className="mt-8 bg-gray-700 hover:bg-gray-800 px-8 py-3 rounded-xl font-semibold"
            >
              Cancel
            </button>
          </>
        )}

        {status === "sending" && (
          <>
            <h2 className="text-5xl font-bold text-red-500 mt-10">
              🚨 Sending Alert...
            </h2>

            <p className="mt-5 text-gray-300">
              Fetching your live location...
            </p>
          </>
        )}

        {status === "sent" && (
          <>
            <h2 className="text-5xl font-bold text-green-500 mt-10">
              ✅ Alert Sent
            </h2>

            <p className="mt-5 text-gray-300">
              Your emergency contacts have been notified.
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default SOS;