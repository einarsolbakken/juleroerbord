import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

interface AccessGateProps {
  onAccessGranted: () => void;
}

const ACCESS_CODE = "EXCLUSIVE2024";

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
      {/* Background effects */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Content */}
      <div 
        className={`relative z-10 w-full max-w-md mx-4 opacity-0 animate-fade-in ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        style={{ animationDelay: '0.2s' }}
      >
        <div className="glass-card rounded-2xl p-8 md:p-12">
          {/* Lock icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-glow-pulse" />
              <div className="relative w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center bg-secondary/50">
                <Lock className="w-7 h-7 text-primary" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-3">
              Eksklusiv Tilgang
            </h1>
            <p className="text-muted-foreground text-sm tracking-wide">
              Skriv inn din tilgangskode for å fortsette
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="• • • • • • • •"
                className={`access-input h-14 rounded-lg ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/50' : ''}`}
                autoFocus
              />
              
              {error && (
                <div className="flex items-center justify-center gap-2 text-destructive text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4" />
                  <span>Ugyldig kode. Prøv igjen.</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="btn-primary w-full h-12 rounded-lg text-sm group"
              disabled={!code.trim()}
            >
              <span>Få Tilgang</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          {/* Hint */}
          <p className="text-center text-muted-foreground/60 text-xs mt-8 tracking-wide">
            Hint: EXCLUSIVE2024
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l border-t border-primary/30 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-r border-t border-primary/30 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l border-b border-primary/30 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r border-b border-primary/30 rounded-br-lg" />
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
