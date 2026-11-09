import { useEffect, useState } from "react";

// Mobile browser toolbars resize the viewport during a scroll gesture.
// Keep page geometry unchanged until the width (including orientation) changes.
export function useStableViewportHeight() {
  const [height, setHeight] = useState(() => window.innerHeight);
  useEffect(() => {
    let width = window.innerWidth;
    const resize = () => {
      const nextWidth = window.innerWidth;
      if (nextWidth < 640 && nextWidth === width) return;
      width = nextWidth;
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return height;
}