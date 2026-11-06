import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface StoryEvent {
  time: string;
  title: string;
  description: string;
  backInfo: string;
}

const LANES = 6;
const laneCenters = Array.from({ length: LANES }, (_, L) => ((L + 0.5) / LANES) * 100);
const dividers = Array.from({ length: LANES - 1 }, (_, i) => ((i + 1) / LANES) * 100);

const BURSTS = [
  { x: 20, y: 22, r: 90, c: "hsl(var(--gold))", delay: 0 },
  { x: 75, y: 30, r: 80, c: "hsl(var(--primary))", delay: 0.45 },
  { x: 48, y: 12, r: 85, c: "hsl(var(--foreground))", delay: 0.9 },
  { x: 62, y: 48, r: 70, c: "hsl(var(--gold))", delay: 1.3 },
];
const PARTICLES = 14;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

interface Frame {
  vw: number;
  vh: number;
  s: number; // story position in stops (0..n-1), with dwell at each stop
  boats: number[]; // world y offsets from pack position, px
  zoom: number; // 0..1
  nearest: number;
}

const StoryTimeline = ({ events }: { events: StoryEvent[] }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const n = events.length;
  const offsRef = useRef<number[]>(Array(LANES).fill(0));
  const [f, setF] = useState<Frame>({ vw: 1280, vh: 800, s: 0, boats: Array(LANES).fill(0), zoom: 1, nearest: 0 });

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = wrapRef.current;
      if (el) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const rect = el.getBoundingClientRect();
        const total = rect.height - vh;
        const p = total > 0 ? clamp(-rect.top / total) : 0;
        const raw = p * (n - 1);
        const seg = Math.min(n - 2, Math.floor(raw));
        const frac = raw - seg;
        // Boats wait at each stop (zoomed in), then row on to the next
        const s = seg + smooth(0.28, 0.72, frac);
        const nearest = Math.round(raw);
        const dist = Math.abs(raw - nearest);
        const zoom = 1 - smooth(0.1, 0.28, dist);

        // Pack rows together until the 3rd stop, then spreads evenly to the finish
        const startS = Math.min(2, n - 1);
        const t = n - 1 > startS ? clamp((s - startS) / (n - 1 - startS)) : 0;
        const amp = Math.min(70, vh * 0.08);
        const cur = offsRef.current;
        for (let L = 0; L < LANES; L++) {
          const q = s / Math.max(1, n - 1);
          const pattern =
            Math.sin(Math.PI * 2.2 * q + (L / LANES) * Math.PI * 2) +
            Math.sin(q * 6.5 + L * 2.1) * 0.14 +
            (L - (LANES - 1) / 2) * 0.06;
          cur[L] += (pattern * amp * t - cur[L]) * 0.08;
        }
        setF({ vw, vh, s, boats: cur.slice(), zoom, nearest });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  const { vw, vh, s, boats, zoom, nearest } = f;
  const mobile = vw < 640;
  const pitch = mobile ? 20 : 28;
  const gap = vh * 0.9;
  const snap = (y: number) => Math.round((y - pitch / 2) / pitch) * pitch + pitch / 2;
  const stopY = (i: number) => snap(vh * 0.5 + i * gap);
  const worldH = stopY(n - 1) + vh * 0.6;

  // Pack position follows stops exactly so boats sit on each red row
  const si = Math.floor(s);
  const packY =
    si >= n - 1 ? stopY(n - 1) : stopY(si) + (stopY(si + 1) - stopY(si)) * (s - si);
  const ys = boats.map((o) => packY + o);
  const maxY = Math.max(...ys);
  const leader = maxY - Math.min(...ys) < 3 ? 2 : ys.indexOf(maxY);
  const lx = (laneCenters[leader] / 100) * vw;
  const ly = ys[leader];

  // Camera: wide shot of the full course width, zooming in on the leading boat at every stop
  const Z = 1 + (mobile ? 1.6 : 1.3) * zoom;
  const cx = vw / 2 + (lx - vw / 2) * zoom;
  const cy = packY + (ly - packY) * zoom;
  const tx = vw / 2;
  const ty = vh * (0.5 - (mobile ? 0.18 : 0.12) * zoom);
  const camera = `translate(${tx}px, ${ty}px) scale(${Z}) translate(${-cx}px, ${-cy}px)`;

  // White buoy lines get a hole where each stop row sits, so red/gold replaces white
  const hole = pitch / 2;
  const mask = (() => {
    const parts = ["black 0px"];
    events.forEach((_, i) => {
      const y = stopY(i);
      parts.push(`black ${y - hole}px`, `transparent ${y - hole}px`, `transparent ${y + hole}px`, `black ${y + hole}px`);
    });
    parts.push(`black ${worldH}px`);
    const g = `linear-gradient(to bottom, ${parts.join(", ")})`;
    return { WebkitMaskImage: g, maskImage: g };
  })();

  const atGoal = nearest === n - 1 && zoom > 0.6;
  const ev = events[nearest];

  return (
    <div ref={wrapRef} style={{ height: `${n * 130}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* World */}
        <div
          className="absolute left-0 top-0 origin-top-left will-change-transform"
          style={{ width: vw, height: worldH, transform: camera }}
          aria-hidden
        >
          <div className="absolute inset-0 regatta-water regatta-lanes overflow-hidden">
            <div className="absolute inset-0 river-ripples regatta-ripples" />
          </div>

          {dividers.map((x, i) => (
            <div
              key={i}
              className="absolute inset-y-0 w-2 sm:w-3 -translate-x-1/2 buoy-line"
              style={{ left: `${x}%`, ...mask }}
            />
          ))}

          {events.map((_, i) =>
            dividers.map((x, b) => (
              <div
                key={`${i}-${b}`}
                className={`absolute buoy-stop w-[5.2px] h-[5.2px] sm:w-2 sm:h-2 rounded-full ${
                  i === n - 1 ? "buoy-gold" : "bg-primary"
                }`}
                style={{ top: stopY(i), left: `${x}%`, transform: "translate(-50%, -50%)" }}
              />
            ))
          )}

          <div className="absolute inset-x-0 h-1 bg-foreground/70" style={{ top: stopY(0) - pitch * 2 }} />
          <div className="absolute inset-x-0 h-1.5 regatta-finish" style={{ top: stopY(n - 1) + pitch }} />

          {ys.map((y, L) => {
            const lead = L === leader;
            return (
              <div
                key={L}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: y, left: `${laneCenters[L]}%`, zIndex: lead ? 30 : 20 }}
              >
                <div
                  className="relative transition-opacity duration-500"
                  style={{ opacity: lead ? 1 : 0.75 - 0.4 * zoom }}
                >
                  {lead && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-[3px] h-14 rounded-full bg-gradient-to-t from-foreground/35 to-transparent" />
                  )}
                  <span
                    className={`block leading-none ${
                      lead ? "text-3xl sm:text-5xl drop-shadow-[0_0_12px_hsl(var(--foreground)/0.4)]" : "text-2xl sm:text-4xl"
                    }`}
                  >
                    🚣
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft fade into page background */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" style={{ opacity: zoom }} />

        {atGoal && (
          <div className="absolute inset-0 pointer-events-none z-40" aria-hidden>
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

        {/* Highlight info, shown while zoomed in on the leader */}
        <div
          className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:pb-20 z-50 pointer-events-none"
          style={{ opacity: zoom, transform: `translateY(${(1 - zoom) * 40}px)` }}
        >
          {ev && (
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-primary font-display italic text-xl sm:text-2xl tracking-wide">{ev.time}</div>
              <h3 className="font-display text-4xl sm:text-6xl md:text-7xl text-foreground leading-none mt-1">{ev.title}</h3>
              <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs sm:text-sm mt-3">{ev.description}</p>
              <div className="w-12 h-px bg-primary/60 my-5 mx-auto" />
              <p className="text-foreground/90 font-display text-lg sm:text-2xl leading-snug">{ev.backInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryTimeline;
