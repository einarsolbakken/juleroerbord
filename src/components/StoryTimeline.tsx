import { useEffect, useRef, useState } from "react";

export interface StoryEvent {
  time: string;
  title: string;
  description: string;
  backInfo: string;
}

// Organic river shape with wavy banks
const RIVER =
  "M 30 0 C 15 120, 40 220, 25 340 S 15 560, 30 680 S 18 880, 28 1000 L 74 1000 C 86 880, 70 780, 80 660 S 88 440, 72 320 S 84 110, 70 0 Z";

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
  const sway = Math.sin(progress * n * Math.PI) * 6;

  return (
    <div ref={wrapRef} style={{ height: `${n * 90 + 40}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] flex flex-col overflow-hidden">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center text-foreground pt-8 sm:pt-12">
          Program
        </h2>

        <div className="flex-1 flex items-stretch gap-4 sm:gap-10 max-w-4xl w-full mx-auto px-4 py-6 sm:py-10">
          {/* River */}
          <div className="relative w-16 sm:w-24 flex-shrink-0">
            <svg className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-20 sm:w-28" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="water" x1="0" x2="1">
                  <stop offset="0" stopColor="hsl(var(--water-deep))" />
                  <stop offset="0.5" stopColor="hsl(var(--water-mid))" />
                  <stop offset="1" stopColor="hsl(var(--water-deep))" />
                </linearGradient>
                <clipPath id="riverClip"><path d={RIVER} /></clipPath>
              </defs>
              <path d={RIVER} fill="url(#water)" />
              <g clipPath="url(#riverClip)" className="river-ripples">
                {Array.from({ length: 28 }).map((_, k) => (
                  <path key={k} d={`M ${20 + (k * 37) % 45} ${k * 40} q 8 -5 16 0 t 16 0`} fill="none" stroke="hsl(var(--foam) / 0.35)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                ))}
              </g>
              <path d={RIVER} fill="none" stroke="hsl(var(--water-bank) / 0.6)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            {events.map((e, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
                style={{ top: `${stopPos(i)}%` }}
              >
                <div
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-500 ${
                    i <= active ? "bg-primary border-primary scale-125" : "bg-card border-muted-foreground/50"
                  }`}
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
