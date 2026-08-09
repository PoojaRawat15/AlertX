import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useShakeDetection from "../hooks/useShakeDetection";
import useImpactDetection from "../hooks/useImpactDetection";

function SOS() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle");
  const [count, setCount] = useState(5);

  const timerRef = useRef(null);
  const startedRef = useRef(false);

  // Stop countdown, vibration and voice
  const stopSOS = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if ("vibrate" in navigator) {
      navigator.vibrate(0);
    }

    startedRef.current = false;
  }, []);

  // Start SOS
  const handleSOS = useCallback(() => {
    if (startedRef.current) return;

    startedRef.current = true;

    setStatus("countdown");
    setCount(5);

    // Voice
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(
        "Emergency detected. Are you okay? Emergency alert will be sent in five seconds. Tap I'm Safe to cancel."
      );

      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;
      speech.volume = 1;

      window.speechSynthesis.speak(speech);
    }

    let time = 5;

    timerRef.current = setInterval(() => {

      // Vibration during countdown
      if ("vibrate" in navigator) {
        navigator.vibrate([400, 150, 400]);
      }

      time--;

      setCount(time);

      // Countdown finished
      if (time <= 0) {
        stopSOS();

        setStatus("sending");

        setTimeout(() => {
          setStatus("sent");
        }, 2000);
      }

    }, 1000);

  }, [stopSOS]);

  // Shake detection
  useShakeDetection(handleSOS);

  // Impact detection
  useImpactDetection(handleSOS);

  // I'm Safe
  const cancelSOS = () => {
    stopSOS();

    setCount(5);
    setStatus("safe");
  };

  // No, I'm Not Safe
  const notSafe = () => {
    stopSOS();

    setStatus("sending");

    setTimeout(() => {
      setStatus("sent");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white hover:text-red-500 text-lg font-semibold"
      >
        ← Back
      </button>

      <div className="w-full max-w-lg bg-gray-900 rounded-3xl p-8 text-center">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-red-500">
          🆘 SOS
        </h1>

        <p className="text-gray-400 mt-3">
          Shake your phone 3 times or press the SOS button.
        </p>

        {/* IDLE */}
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

        {/* COUNTDOWN */}
        {status === "countdown" && (
          <>
            <h2 className="text-7xl font-bold text-yellow-400 mt-10">
              {count}
            </h2>

            <h3 className="mt-5 text-3xl font-bold text-red-500">
              🚨 Possible Accident Detected
            </h3>

            <p className="mt-4 text-xl text-white font-semibold">
              Are you okay?
            </p>

            <p className="mt-3 text-gray-400">
              Emergency alert will be sent in{" "}
              <b className="text-white">{count}</b> seconds.
            </p>

            <div className="mt-8 flex gap-3 justify-center">

              {/* I'M SAFE */}
              <button
                onClick={cancelSOS}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-4 rounded-xl font-bold text-lg"
              >
                ✅ I'm Safe
              </button>

              {/* NOT SAFE */}
              <button
                onClick={notSafe}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-4 rounded-xl font-bold"
              >
                🚨 No, I'm Not Safe
              </button>

            </div>
          </>
        )}

        {/* SAFE */}
        {status === "safe" && (
          <>
            <h2 className="text-5xl font-bold text-green-500 mt-10">
              ✅ You're Safe
            </h2>

            <p className="mt-5 text-xl text-white">
              You're safe! Emergency alert has been cancelled.
            </p>

            <p className="mt-3 text-gray-400">
              No alert was sent to your emergency contacts.
            </p>

            <button
              onClick={() => {
                setStatus("idle");
                setCount(5);
              }}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Back to SOS
            </button>
          </>
        )}

        {/* SENDING */}
        {status === "sending" && (
          <>
            <h2 className="text-5xl font-bold text-red-500 mt-10">
              🚨 Sending Alert...
            </h2>

            <p className="mt-5 text-gray-300">
              Fetching your live location...
            </p>

            <p className="mt-3 text-gray-400">
              Your emergency contacts are being notified.
            </p>
          </>
        )}

        {/* SENT */}
        {status === "sent" && (
          <>
            <h2 className="text-5xl font-bold text-green-500 mt-10">
              ✅ Alert Sent
            </h2>

            <p className="mt-5 text-gray-300">
              Your emergency contacts have been notified.
            </p>

            <button
              onClick={() => {
                setStatus("idle");
                setCount(5);
              }}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Back to SOS
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default SOS;