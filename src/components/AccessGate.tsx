import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Snowfall from "./Snowfall";

interface AccessGateProps {
  onAccessGranted: () => void;
}

const ACCESS_CODE = "JUL2024";

const GiftBox = ({ isOpening }: { isOpening: boolean }) => {
  return (
    <div className="relative w-40 h-40 sm:w-52 sm:h-52 mx-auto mb-6 sm:mb-8">
      {/* Glow under gift */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-6 rounded-full bg-primary/20 blur-xl"
        animate={isOpening ? { opacity: 0, scale: 2 } : { opacity: [0.3, 0.6, 0.3], scale: [0.9, 1, 0.9] }}
        transition={isOpening ? { duration: 0.5 } : { duration: 3, repeat: Infinity }}
      />

      {/* Gift body */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-24 sm:w-36 sm:h-32 rounded-lg overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(0 72% 45%), hsl(0 72% 55%), hsl(0 72% 48%))",
          boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.1), 0 8px 30px rgba(0,0,0,0.4)",
        }}
        animate={isOpening ? {
          scale: [1, 1.05, 0.9, 0],
          y: [0, -10, 20],
          opacity: [1, 1, 0],
        } : {}}
        transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
      >
        {/* Vertical ribbon on body */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-4 sm:w-5 h-full"
          style={{
            background: "linear-gradient(90deg, hsl(43 74% 42%), hsl(43 74% 55%), hsl(43 74% 42%))",
            boxShadow: "0 0 8px rgba(200,160,50,0.3)",
          }}
        />
        {/* Horizontal ribbon on body */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-4 sm:h-5"
          style={{
            background: "linear-gradient(180deg, hsl(43 74% 42%), hsl(43 74% 55%), hsl(43 74% 42%))",
            boxShadow: "0 0 8px rgba(200,160,50,0.3)",
          }}
        />
        {/* Shine effect */}
        <div
          className="absolute top-1 left-1 w-8 sm:w-10 h-8 sm:h-10 rounded-br-2xl opacity-30"
          style={{ background: "linear-gradient(135deg, white 0%, transparent 60%)" }}
        />
      </motion.div>

      {/* Gift lid */}
      <motion.div
        className="absolute bottom-[88px] sm:bottom-[120px] left-1/2 -translate-x-1/2 w-32 h-8 sm:w-40 sm:h-10 rounded-md z-10"
        style={{
          background: "linear-gradient(135deg, hsl(0 72% 50%), hsl(0 72% 58%), hsl(0 72% 50%))",
          boxShadow: "inset 0 2px 6px rgba(255,255,255,0.15), 0 4px 15px rgba(0,0,0,0.3)",
        }}
        animate={isOpening ? {
          y: -120,
          rotateZ: -25,
          opacity: 0,
          scale: 0.8,
        } : {
          y: [0, -2, 0],
        }}
        transition={isOpening ? {
          duration: 0.7,
          delay: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        } : {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Ribbon on lid */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-4 sm:w-5 h-full"
          style={{
            background: "linear-gradient(90deg, hsl(43 74% 42%), hsl(43 74% 55%), hsl(43 74% 42%))",
          }}
        />
      </motion.div>

      {/* Bow - left loop */}
      <motion.div
        className="absolute bottom-[110px] sm:bottom-[148px] left-1/2 z-20"
        style={{ marginLeft: "-22px", transform: "translateX(-8px)" }}
        animate={isOpening ? {
          y: -140,
          x: -60,
          rotate: -40,
          opacity: 0,
          scale: 0.5,
        } : {
          y: [0, -3, 0],
          rotate: [0, -2, 0],
        }}
        transition={isOpening ? {
          duration: 0.7,
          delay: 0.25,
          ease: "easeOut",
        } : {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-7 h-10 sm:w-8 sm:h-12 rounded-full border-[3px] sm:border-4"
          style={{
            borderColor: "hsl(43 74% 50%)",
            background: "linear-gradient(135deg, hsl(43 74% 55%) 0%, hsl(43 74% 42%) 100%)",
            transform: "rotate(-30deg)",
            boxShadow: "0 0 10px rgba(200,160,50,0.3)",
          }}
        />
      </motion.div>

      {/* Bow - right loop */}
      <motion.div
        className="absolute bottom-[110px] sm:bottom-[148px] left-1/2 z-20"
        style={{ marginLeft: "2px", transform: "translateX(8px)" }}
        animate={isOpening ? {
          y: -140,
          x: 60,
          rotate: 40,
          opacity: 0,
          scale: 0.5,
        } : {
          y: [0, -3, 0],
          rotate: [0, 2, 0],
        }}
        transition={isOpening ? {
          duration: 0.7,
          delay: 0.25,
          ease: "easeOut",
        } : {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-7 h-10 sm:w-8 sm:h-12 rounded-full border-[3px] sm:border-4"
          style={{
            borderColor: "hsl(43 74% 50%)",
            background: "linear-gradient(135deg, hsl(43 74% 42%) 0%, hsl(43 74% 55%) 100%)",
            transform: "rotate(30deg)",
            boxShadow: "0 0 10px rgba(200,160,50,0.3)",
          }}
        />
      </motion.div>

      {/* Bow center knot */}
      <motion.div
        className="absolute bottom-[114px] sm:bottom-[152px] left-1/2 -translate-x-1/2 z-30 w-4 h-4 sm:w-5 sm:h-5 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(43 74% 58%), hsl(43 74% 45%))",
          boxShadow: "0 0 8px rgba(200,160,50,0.5)",
        }}
        animate={isOpening ? {
          y: -150,
          opacity: 0,
          scale: 0,
        } : {
          scale: [1, 1.1, 1],
        }}
        transition={isOpening ? {
          duration: 0.5,
          delay: 0.2,
        } : {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Light burst on open */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full z-5"
            style={{ background: "radial-gradient(circle, hsla(43,74%,55%,0.8), hsla(43,74%,50%,0.3), transparent)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 3, 5], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AccessGate = ({ onAccessGranted }: AccessGateProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.toUpperCase() === ACCESS_CODE) {
      localStorage.setItem("access_granted", "true");
      setIsOpening(true);
      setTimeout(() => {
        onAccessGranted();
      }, 2500);
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Snowfall />
      
      {/* Background effects */}
      <div className="absolute inset-0 gradient-festive" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/10 rounded-full blur-[100px] sm:blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-accent/10 rounded-full blur-[80px] sm:blur-[120px]" />

      {/* White flash on open */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="fixed inset-0 z-50 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 1] }}
            transition={{ duration: 2.5, times: [0, 0.5, 0.85, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Sparkle particles on open */}
      <AnimatePresence>
        {isOpening && (
          <>
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-40 text-lg sm:text-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.5) * 500 - 150,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0],
                  rotate: Math.random() * 540 - 270,
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.5 + Math.random() * 0.3,
                  ease: "easeOut",
                }}
              >
                {["✨", "⭐", "🌟", "❄️", "🎄", "🎅", "🔔", "🎀"][i % 8]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className={`relative z-10 w-full max-w-md mx-3 sm:mx-4 ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        animate={isOpening ? { opacity: 0, y: 40 } : {}}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        {/* CSS Gift Box */}
        <GiftBox isOpening={isOpening} />

        {/* Form card */}
        <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 border-primary/20">
          <div className="text-center mb-5 sm:mb-6">
            <p className="text-muted-foreground text-sm sm:text-base tracking-wide">
              Tilgangskode
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="• • • • • • • •"
                className={`access-input h-12 sm:h-14 rounded-lg text-base ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/50' : ''}`}
                autoFocus
                disabled={isOpening}
              />
              
              {error && (
                <div className="flex items-center justify-center gap-2 text-destructive text-xs sm:text-sm animate-fade-in">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Feil kode! Prøv igjen 🎅</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="btn-primary w-full h-11 sm:h-12 rounded-lg text-sm"
              disabled={!code.trim() || isOpening}
            >
              Åpne
            </Button>
          </form>

          <p className="text-center text-muted-foreground/60 text-xs mt-5 sm:mt-6 tracking-wide">
            Hint: JUL2024 🎁
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
};

export default AccessGate;
