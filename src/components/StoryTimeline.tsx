import { useEffect, useRef, useState } from "react";

export interface StoryEvent {
  time: string;
  title: string;
  description: string;
  backInfo: string;
}

const StoryTimeline = ({ events }: { events: StoryEvent[] }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const n = events.length;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const active = Math.min(n - 1, Math.floor(progress * n));
  // Stops placed evenly on the river; boat glides between them
  const stopPos = (i: number) => (n === 1 ? 50 : 8 + (i / (n - 1)) * 84);
  const boatPos = 8 + progress * 84;
  const sway = 0;

  return (
    <div ref={wrapRef} style={{ height: `${n * 90 + 40}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] flex flex-col overflow-hidden">
        <div className="flex-1 flex items-stretch gap-4 sm:gap-10 max-w-4xl w-full mx-auto px-4 py-10 sm:py-14">
          {/* River */}
          <div className="relative w-24 sm:w-32 flex-shrink-0">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 regatta-water overflow-hidden" aria-hidden>
              <div className="absolute inset-0 river-ripples regatta-ripples" />
              <div className="absolute inset-y-0 left-1/4 w-2 -translate-x-1/2 buoy-line" />
              <div className="absolute inset-y-0 left-3/4 w-2 -translate-x-1/2 buoy-line" />
              <div className="absolute inset-x-0 top-0 h-1 bg-foreground/70" />
              <div className="absolute inset-x-0 bottom-0 h-1 regatta-finish" />
            </div>
            {events.map((e, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
                style={{ top: `${stopPos(i)}%` }}
              >
                <div
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary border-2 border-foreground/80 shadow-[0_0_10px_rgba(0,0,0,0.35)]"
                />
              </div>
            ))}
            <div
              className="absolute left-1/2 text-3xl sm:text-5xl z-10 drop-shadow-lg pointer-events-none"
              style={{
                top: `${boatPos}%`,
                transform: `translate(calc(-50% + ${sway}px), -50%) rotate(${sway * 1.5}deg)`,
              }}
            >
              🚣
            </div>
          </div>

          {/* Cards */}
          <div className="relative flex-1 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-6">
              {events.map((e, i) => (
                <span
                  key={i}
                  className={`text-xs sm:text-sm px-2.5 py-1 rounded-full border transition-all duration-500 ${
                    i === active
                      ? "bg-primary text-primary-foreground border-primary"
                      : i < active
                      ? "border-primary/40 text-foreground/70"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {e.time}
                </span>
              ))}
            </div>

            <div className="relative h-80 sm:h-96">
              {events.map((e, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: `translateY(${(i - active) * 40}px) scale(${i === active ? 1 : 0.95})`,
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                  aria-hidden={i !== active}
                >
                  <div className="text-primary font-display italic text-xl sm:text-2xl tracking-wide">{e.time}</div>
                  <h3 className="font-display text-4xl sm:text-6xl md:text-7xl text-foreground leading-none mt-1">{e.title}</h3>
                  <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs sm:text-sm mt-3">{e.description}</p>
                  <div className="w-12 h-px bg-primary/60 my-5" />
                  <p className="text-foreground/90 font-display text-lg sm:text-2xl leading-snug max-w-xl">{e.backInfo}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs sm:text-sm text-muted-foreground">
              {active + 1} / {n}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryTimeline;
