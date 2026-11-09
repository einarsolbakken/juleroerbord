import { memo, useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
  delay: number;
}

const createSnowflakes = (): Snowflake[] =>
  Array.from({ length: 120 }, (_, i) => {
    const animationDuration = 5 + Math.random() * 10;

    return {
      id: i,
      left: Math.random() * 100,
      animationDuration,
      opacity: 0.3 + Math.random() * 0.7,
      size: 4 + Math.random() * 8,
      delay: -(Math.random() * animationDuration),
    };
  });

const Snowfall = ({ confineOnMobile = false }: { confineOnMobile?: boolean }) => {
  const [snowflakes] = useState(createSnowflakes);
  const [count, setCount] = useState(() => window.innerWidth < 640 ? 24 : 80);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCount(reduced.matches ? 0 : mobile.matches ? 24 : 80);
    update();
    mobile.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className={`${confineOnMobile ? "absolute sm:fixed" : "fixed"} inset-0 pointer-events-none z-50 overflow-hidden`} aria-hidden="true">
      {snowflakes.slice(0, count).map((flake) => (
        <div
          key={flake.id}
          className="absolute text-foreground animate-snowfall"
          style={{
            left: `${flake.left}%`,
            top: 0,
            animationDuration: `${flake.animationDuration}s`,
            opacity: flake.opacity,
            fontSize: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default memo(Snowfall);
