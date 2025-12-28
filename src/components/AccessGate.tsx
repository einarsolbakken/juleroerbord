import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle } from "lucide-react";
import Snowfall from "./Snowfall";

interface AccessGateProps {
  onAccessGranted: () => void;
}

const ACCESS_CODE = "JUL2024";

const AccessGate = ({ onAccessGranted }: AccessGateProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.toUpperCase() === ACCESS_CODE) {
      localStorage.setItem("access_granted", "true");
      onAccessGranted();
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
      
      {/* Christmas decorations - smaller on mobile */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-2xl sm:text-4xl opacity-80 animate-pulse">🎄</div>
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-2xl sm:text-4xl opacity-80 animate-pulse" style={{ animationDelay: '0.5s' }}>🎅</div>
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-xl sm:text-3xl opacity-70">🎁</div>
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 text-xl sm:text-3xl opacity-70">⭐</div>
      
      {/* Content */}
      <div 
        className={`relative z-10 w-full max-w-md mx-3 sm:mx-4 opacity-0 animate-fade-in ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        style={{ animationDelay: '0.2s' }}
      >
        <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border-primary/20">
          {/* Christmas tree icon */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl animate-pulse" />
              <div className="relative text-5xl sm:text-6xl">🎄</div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-2 sm:mb-3">
              God Jul! 🎅
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm tracking-wide px-2">
              Skriv inn din tilgangskode for å se juleprogrammet
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="• • • • • • • •"
                className={`access-input h-12 sm:h-14 rounded-lg text-base ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/50' : ''}`}
                autoFocus
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
              disabled={!code.trim()}
            >
              <span>Åpne Julegaven</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          {/* Hint */}
          <p className="text-center text-muted-foreground/60 text-xs mt-6 sm:mt-8 tracking-wide">
            Hint: JUL2024 🎁
          </p>
        </div>

        {/* Decorative corners with Christmas colors */}
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg hidden sm:block" />
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-accent/50 rounded-tr-lg hidden sm:block" />
        <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-accent/50 rounded-bl-lg hidden sm:block" />
        <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg hidden sm:block" />
      </div>

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