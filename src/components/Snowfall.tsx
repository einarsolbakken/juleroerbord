import { useState } from "react";

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

const Snowfall = () => {
  const [snowflakes] = useState(createSnowflakes);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white animate-snowfall"
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

export default Snowfall;
