import { useEffect } from "react";

function useShakeDetection(onShake) {
  useEffect(() => {
    let lastX = null;
    let lastY = null;
    let lastZ = null;

    const threshold = 25;

    const handleMotion = (event) => {
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
          onShake();
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