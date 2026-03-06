import { useState, useEffect } from "react";

export function useIsSmallScreen() {
  const [small, setSmall] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 480
  );
  useEffect(() => {
    const check = () => setSmall(window.innerWidth < 480);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return small;
}
