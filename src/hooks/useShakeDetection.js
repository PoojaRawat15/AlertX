import { useEffect } from "react";

function useShakeDetection(onShake) {
  useEffect(() => {
    let lastX = null;
    let lastY = null;
    let lastZ = null;

    let shakeCount = 0;
    let lastShakeTime = 0;
    let cooldown = false;

    const threshold = 35;

    const handleMotion = (event) => {
      if (cooldown) return;

      const acc = event.accelerationIncludingGravity;

      if (!acc) return;

      const { x, y, z } = acc;

      if (lastX !== null) {
        const deltaX = Math.abs(x - lastX);
        const deltaY = Math.abs(y - lastY);
        const deltaZ = Math.abs(z - lastZ);

        if (
          deltaX > threshold ||
          deltaY > threshold ||
          deltaZ > threshold
        ) {
          const now = Date.now();

          if (now - lastShakeTime < 3000) {
            shakeCount++;
          } else {
            shakeCount = 1;
          }

          lastShakeTime = now;

          if (shakeCount >= 3) {
            cooldown = true;
            shakeCount = 0;

            onShake();
            console.log("Shake Detected");

            setTimeout(() => {
              cooldown = false;
            }, 3000);
          }
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [onShake]);
}

export default useShakeDetection;