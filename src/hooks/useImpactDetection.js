import { useEffect } from "react";

function useImpactDetection(onImpact) {
  useEffect(() => {
    let cooldown = false;

    const handleMotion = (event) => {
      if (cooldown) return;

      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const x = acc.x || 0;
      const y = acc.y || 0;
      const z = acc.z || 0;

      const force = Math.sqrt(x * x + y * y + z * z);

      // Strong impact threshold
      if (force > 35) {
        cooldown = true;

        onImpact();

        setTimeout(() => {
          cooldown = false;
        }, 5000);
      }
    };

    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [onImpact]);
}

export default useImpactDetection;