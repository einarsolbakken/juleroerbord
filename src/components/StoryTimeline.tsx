import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface StoryEvent {
  time: string;
  title: string;
  description: string;
  backInfo: string;
}

const DOT_PITCH = 20; // px vertical spacing between buoys (matches .buoy-line)
const LANES = 6;
const SPREAD_AMP = 3.8; // % of track height: max offset from the pack centre
const PAD = 5; // % padding at both ends of the track

const laneCenters = Array.from({ length: LANES }, (_, L) => ((L + 0.5) / LANES) * 100);
const dividers = Array.from({ length: LANES - 1 }, (_, i) => ((i + 1) / LANES) * 100);

// Firework bursts shown when the boats cross the finish line
const BURSTS = [
  { x: 22, y: 18, r: 36, c: "hsl(45 95% 55%)", delay: 0 },
  { x: 72, y: 34, r: 30, c: "hsl(0 72% 55%)", delay: 0.45 },
  { x: 46, y: 8, r: 32, c: "hsl(0 0% 100%)", delay: 0.9 },
  { x: 60, y: 55, r: 26, c: "hsl(45 95% 55%)", delay: 1.3 },
];
const PARTICLES = 12;

const StoryTimeline = ({ events }: { events: StoryEvent[] }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const riverRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [riverH, setRiverH] = useState(0);
  const [boats, setBoats] = useState<number[]>(() => Array(LANES).fill(8));
  const boatsRef = useRef<number[]>(Array(LANES).fill(8));
  const n = events.length;

  useEffect(() => {
    let raf = 0;
    let alive = true;

    const loop = () => {
      if (!alive) return;
      const el = wrapRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        setProgress((prev) => (Math.abs(prev - p) > 0.0005 ? p : prev));

        const h = riverRef.current?.getBoundingClientRect().height ?? 0;
        if (h) setRiverH((prev) => (Math.abs(prev - h) > 0.5 ? h : prev));

        const boatPos = 8 + p * 84;
        // Boats row in line until the 3rd stop, then the field spreads out
        // steadily and keeps growing all the way to the finish line.
        const startP = n > 2 ? 2 / (n - 1) : 0;
        const t = Math.min(1, Math.max(0, (p - startP) / (1 - startP)));
        const cur = boatsRef.current;
        let maxDelta = 0;
        for (let L = 0; L < LANES; L++) {
          // Evenly spaced phases: the field rotates slowly, so the lead changes hands
          const phase = Math.PI * 2.2 * p + (L / LANES) * Math.PI * 2;
          const pattern =
            Math.sin(phase) +
            Math.sin(p * 6.5 + L * 2.1) * 0.14 +
            (L - (LANES - 1) / 2) * 0.06;
          const target = Math.min(
            100 - PAD,
            Math.max(PAD, boatPos + pattern * SPREAD_AMP * t)
          );
          maxDelta = Math.max(maxDelta, Math.abs(target - cur[L]));
          cur[L] += (target - cur[L]) * 0.08;
        }
        if (maxDelta > 0.01) setBoats(cur.slice());
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [n]);

  const active = Math.min(n - 1, Math.floor(progress * n));
  const maxY = Math.max(...boats);
  const leaderLane =
    maxY - Math.min(...boats) < 0.3 ? -1 : boats.indexOf(maxY);
  const atGoal = progress > 0.96;
  // Stops placed evenly on the track; boats glide between them
  const stopPos = (i: number) => (n === 1 ? 50 : 8 + (i / (n - 1)) * 84);

  // Exactly one red buoy per side at every stop; white buoys fill the rest of the line.
  // Each white line gets a hole at every stop so no white buoy peeks out behind a red one.
  const pitch = typeof window !== "undefined" && window.innerWidth >= 640 ? 28 : DOT_PITCH;
  // Snap each stop onto the white buoy grid so the red buoy replaces exactly one white buoy
  const snapPos = (pct: number) => {
    if (!riverH) return pct;
    const y = (pct / 100) * riverH;
    const k = Math.round((y - pitch / 2) / pitch);
    return ((k * pitch + pitch / 2) / riverH) * 100;
  };
  // The very last buoy row in the grid — where the gold finish buoys sit
  const lastRowPos = (() => {
    if (!riverH) return 96;
    const kMax = Math.floor((riverH - pitch / 2) / pitch);
    return ((kMax * pitch + pitch / 2) / riverH) * 100;
  })();
  const buoyRowPos = (i: number) => (i === n - 1 ? lastRowPos : snapPos(stopPos(i)));
  const HOLE = riverH > 0 ? ((pitch / 2) / riverH) * 100 : 1.2;
  const whiteLaneMask = (() => {
    const stops: Array<[number, string]> = [[0, "black"]];
    const push = (pos: number, color: string) => {
      const p = Math.max(0, Math.min(100, pos));
      const last = stops[stops.length - 1];
      if (p < last[0]) return;
      if (p === last[0]) {
        last[1] = color;
        return;
      }
      stops.push([p, color]);
    };
    events.forEach((_, i) => {
      const p = buoyRowPos(i);
      push(p - HOLE, "black");
      push(p, "transparent");
      push(p + HOLE, "black");
    });
    push(100, "black");
    return `linear-gradient(to bottom, ${stops.map(([p, c]) => `${c} ${p}%`).join(", ")})`;
  })();
  const mask = (m: string) => ({ WebkitMaskImage: m, maskImage: m });

  return (
    <div ref={wrapRef} style={{ height: `${n * 90 + 40}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] flex flex-col overflow-hidden">
        <div className="flex-1 flex items-stretch gap-3 sm:gap-10 max-w-6xl w-full mx-auto px-4 py-10 sm:py-14">
          {/* Regatta course */}
          <div className="relative w-[36vw] max-w-[150px] sm:w-[34vw] sm:max-w-[440px] flex-shrink-0">
            <div
              ref={riverRef}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full regatta-water regatta-lanes overflow-hidden water-fade"
              aria-hidden
            >
              <div className="absolute inset-0 river-ripples regatta-ripples" />

              {/* Lane dividers */}
              {dividers.map((x, i) => (
                <div
                  key={i}
                  className="absolute inset-y-0 w-2 sm:w-3 -translate-x-1/2 buoy-line"
                  style={{ left: `${x}%`, ...mask(whiteLaneMask) }}
                />
              ))}

              {/* At every stop, the white buoy in each lane line is replaced by a red one.
                  The final stop (Byen) gets gold buoys instead. */}
              {events.map((_, i) =>
                dividers.map((x, b) => (
                  <div
                    key={`${i}-${b}`}
                    className={`absolute buoy-stop w-[5.2px] h-[5.2px] sm:w-2 sm:h-2 rounded-full ${
                      i === n - 1 ? "buoy-gold" : "bg-primary"
                    }`}
                    style={{
                      top: `${buoyRowPos(i)}%`,
                      left: `${x}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))
              )}

              {/* Start and finish */}
              <div className="absolute inset-x-0 top-0 h-1 bg-foreground/70" />
              <div className="absolute inset-x-0 bottom-0 h-1 regatta-finish" />

              {/* Fireworks when the boats reach the finish */}
              {atGoal && (
                <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none z-40" aria-hidden>
                  {BURSTS.map((b, bi) => (
                    <div key={bi} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
                      {Array.from({ length: PARTICLES }).map((_, pi) => (
                        <span
                          key={pi}
                          className="firework-particle"
                          style={
                            {
                              "--a": `${(360 / PARTICLES) * pi}deg`,
                              "--d": `${b.r}px`,
                              background: b.c,
                              animationDelay: `${b.delay}s`,
                            } as CSSProperties
                          }
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Boats */}
              {boats.map((y, L) => {
                const leader = L === leaderLane;
                return (
                  <div
                    key={L}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ top: `${y}%`, left: `${laneCenters[L]}%`, zIndex: leader ? 30 : 20 }}
                  >
                    <div
                      className={`relative transition-all duration-700 ease-out ${
                        leader ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      {leader && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-[3px] h-14 rounded-full bg-gradient-to-t from-white/35 to-transparent" />
                      )}
                      <span
                        className={`block leading-none ${
                          leader
                            ? "text-3xl sm:text-5xl drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                            : "text-xl sm:text-3xl"
                        }`}
                      >
                        🚣
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Cards */}
          <div className="relative flex-1 flex flex-col justify-center pb-24 sm:pb-32">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryTimeline;
