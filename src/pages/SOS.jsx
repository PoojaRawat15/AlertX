import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useShakeDetection from "../hooks/useShakeDetection";
const beep = newAudio("/beep.mp3");
function SOS() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle");
  const [count, setCount] = useState(5);

  const timerRef = useRef(null);
  const startedRef = useRef(false);

  const stopSOS = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setTimeout(() => {
      startedRef.current = false;
    }, 1000);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if ("vibrate" in navigator) {
      navigator.vibrate(0);
    }
  };

  const handleSOS = useCallback(() => {
    if (startedRef.current) return;

    startedRef.current = true;

    setStatus("countdown");
    setCount(5);
    if("vibrator" in navigator){
      navigator.vibrate([500,200,500]);
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(
        "Emergency detected. Are you okay? Emergency alert will be sent in five seconds. Tap cancel to stop."
      );

      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }

    let time = 5;

    timerRef.current = setInterval(() => {
      beep.currentTime = 0;
      beep.play();

      if ("vibrate" in navigator) {
        navigator.vibrate([500,200,500]);
      }

      time--;

      setCount(time);

      if (time <= 0) {
        stopSOS();

        setStatus("sending");

        setTimeout(() => {
          setStatus("sent");
        }, 2000);
      }

    }, 1000);

  }, []);

  useShakeDetection(handleSOS);

  const cancelSOS = () => {
    stopSOS();
    setCount(5);
    setStatus("idle");
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if ("vibrate" in naviator) {
      navigator.vibrate(0);
    }
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
            <h2 className="text-7xl font-bold text-yellow-400 mt-10">
              {count}
            </h2>

            <h2 className="mt-5 text=3xl font-bold text-red-500">
              🚨 Possible Emergency Detected
            </h2>

            <p className="mt-4 text=xl text-white">
              Are you okay?
            </p>

            <p className="mt-2 text-gray-400">
              Emergency alert will be sent in <b>{count}</b> seconds.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <button onClick={cancelSOS}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold">
                ✅I'm safe
              </button>
              <button onClick={() => {
                stopSOS();
                setStatus("sending");
                setTimeout(() => {
                  setStatus("sent");
                }, 2000);
              }}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold" >
                🚨No, I'm not safe
              </button>
            </div>

            
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

            <button
              onClick={() => {
                setStatus("idle");
                setCount(5);
              }}
              className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold"
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