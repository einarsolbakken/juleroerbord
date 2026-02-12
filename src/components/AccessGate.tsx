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
      }, 2800);
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
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      {/* Christmas decorations */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-2xl sm:text-4xl opacity-80 animate-pulse">🎄</div>
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-2xl sm:text-4xl opacity-80 animate-pulse" style={{ animationDelay: '0.5s' }}>🎅</div>
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-xl sm:text-3xl opacity-70">🎁</div>
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 text-xl sm:text-3xl opacity-70">⭐</div>

      {/* Opening flash effect */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="fixed inset-0 z-50 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 1] }}
            transition={{ duration: 2.8, times: [0, 0.6, 0.85, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Sparkle particles on open */}
      <AnimatePresence>
        {isOpening && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-40 text-lg sm:text-2xl"
                initial={{ 
                  x: 0, y: 0, opacity: 1, scale: 0 
                }}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600 - 200,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1, 0],
                  rotate: Math.random() * 720 - 360,
                }}
                transition={{
                  duration: 2,
                  delay: 0.8 + Math.random() * 0.3,
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
        animate={isOpening ? { scale: 0.9, opacity: 0, y: 50 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        {/* Gift Box */}
        <div className="relative">
          {/* Glow effect behind gift */}
          <motion.div
            className="absolute -inset-8 sm:-inset-12 rounded-full"
            style={{
              background: "radial-gradient(circle, hsla(0,72%,50%,0.15) 0%, transparent 70%)",
            }}
            animate={isOpening ? {
              scale: [1, 3],
              opacity: [0.5, 0],
            } : {
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={isOpening ? {
              duration: 1.5,
              delay: 0.8,
            } : {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="glass-card rounded-xl sm:rounded-2xl overflow-hidden border-primary/20 relative">
            {/* Gift Lid */}
            <motion.div
              className="relative z-20"
              animate={isOpening ? {
                y: -200,
                rotateX: -60,
                opacity: 0,
              } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "top center" }}
            >
              {/* Ribbon horizontal */}
              <div className="absolute top-0 left-0 right-0 h-full flex items-center justify-center z-10 pointer-events-none">
                <div className="w-full h-3 sm:h-4 bg-gradient-to-r from-primary/80 via-primary to-primary/80 shadow-[0_0_15px_hsla(0,72%,50%,0.5)]" />
              </div>
              
              {/* Ribbon vertical on lid */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 sm:w-4 bg-gradient-to-b from-primary/80 via-primary to-primary/80 z-10 pointer-events-none shadow-[0_0_15px_hsla(0,72%,50%,0.5)]" />
              
              {/* Bow */}
              <motion.div
                className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 z-20 text-4xl sm:text-5xl"
                animate={isOpening ? { scale: 1.5, y: -30, opacity: 0 } : { 
                  y: [0, -3, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={isOpening ? { duration: 0.5, delay: 0.3 } : {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🎀
              </motion.div>

              {/* Lid surface */}
              <div className="h-4 sm:h-6 bg-gradient-to-b from-primary/20 to-primary/10 border-b border-primary/30" />
            </motion.div>

            {/* Gift Body / Form content */}
            <motion.div
              className="p-6 sm:p-8 md:p-12 relative"
              animate={isOpening ? {} : {}}
            >
              {/* Ribbon vertical on body */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 sm:w-4 bg-gradient-to-b from-primary/30 via-primary/10 to-primary/30 pointer-events-none" />

              {/* Gift icon */}
              <div className="flex justify-center mb-6 sm:mb-8 relative z-10">
                <motion.div
                  className="relative"
                  animate={isOpening ? {
                    scale: [1, 1.3, 0],
                    y: [0, -20, -50],
                  } : {
                    y: [0, -5, 0],
                  }}
                  transition={isOpening ? {
                    duration: 0.8,
                    delay: 0.3,
                  } : {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl animate-pulse" />
                  <div className="relative text-5xl sm:text-6xl">🎁</div>
                </motion.div>
              </div>

              {/* Title */}
              <div className="text-center mb-6 sm:mb-8 relative z-10">
                <p className="text-muted-foreground text-xs sm:text-sm tracking-wide px-2">
                  Tilgangskode
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
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
                  className="btn-primary w-full h-11 sm:h-12 rounded-lg text-sm group"
                  disabled={!code.trim() || isOpening}
                >
                  <span>Åpne</span>
                </Button>
              </form>

              {/* Hint */}
              <p className="text-center text-muted-foreground/60 text-xs mt-6 sm:mt-8 tracking-wide relative z-10">
                Hint: JUL2024 🎁
              </p>
            </motion.div>
          </div>

          {/* Decorative corners */}
          <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg hidden sm:block" />
          <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-accent/50 rounded-tr-lg hidden sm:block" />
          <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-accent/50 rounded-bl-lg hidden sm:block" />
          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg hidden sm:block" />
        </div>
      </motion.div>

      {/* Shake animation */}
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
