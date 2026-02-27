import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Snowfall from "./Snowfall";

interface AccessGateProps {
  onAccessGranted: () => void;
}

const ACCESS_CODE = "2026";

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
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      {/* Christmas decorations */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-2xl sm:text-4xl opacity-80 animate-pulse">🎄</div>
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-2xl sm:text-4xl opacity-80 animate-pulse" style={{ animationDelay: '0.5s' }}>🎅</div>
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-xl sm:text-3xl opacity-70">🎁</div>
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 text-xl sm:text-3xl opacity-70">⭐</div>

      {/* White flash on open */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="fixed inset-0 z-50 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 1] }}
            transition={{ duration: 2.5, times: [0, 0.5, 0.8, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Sparkle particles on open */}
      <AnimatePresence>
        {isOpening && (
          <>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
              const distance = 400 + Math.random() * 150;
              return (
                <motion.div
                  key={i}
                  className="absolute z-40 flex items-center justify-center"
                  style={{ left: '50%', top: '50%', marginLeft: -48, marginTop: -48 }}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [0, 1, 1, 1, 0],
                    scale: [0, 1.8, 1.4, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 7,
                    delay: 0.4 + (i * 0.15),
                    ease: "easeOut",
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/40 rounded-full blur-xl scale-150" />
                    <img 
                      src={`${import.meta.env.BASE_URL}favicon.png`} 
                      alt="" 
                      className="relative w-24 h-24 sm:w-40 sm:h-40"
                    />
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className={`relative z-10 w-full max-w-md mx-3 sm:mx-4 ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        animate={isOpening ? { scale: 0.85, opacity: 0, y: 60 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border-primary/20 relative">
          
          {/* Gift icon with bounce */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <motion.div
              className="relative"
              animate={isOpening ? {
                scale: [1, 2, 2.5, 3],
                y: [0, -50, -150, -300],
                rotate: [0, -10, 10, 0],
                opacity: [1, 1, 1, 0],
              } : {
                y: [0, -8, 0],
              }}
              transition={isOpening ? {
                duration: 1,
                delay: 0.2,
                ease: "easeOut",
              } : {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative text-7xl sm:text-8xl md:text-9xl">🎁</div>
            </motion.div>
          </div>


          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Tilgangskode"
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

        </div>

        {/* Decorative corners */}
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg hidden sm:block" />
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-accent/50 rounded-tr-lg hidden sm:block" />
        <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-accent/50 rounded-bl-lg hidden sm:block" />
        <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg hidden sm:block" />
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
