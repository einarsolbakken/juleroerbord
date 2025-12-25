import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, Shield, Gem } from "lucide-react";

interface ProtectedContentProps {
  onLogout: () => void;
}

const ProtectedContent = ({ onLogout }: ProtectedContentProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
              <Gem className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-medium text-foreground">Eksklusiv</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logg ut</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Hero section */}
        <div className="max-w-3xl mx-auto text-center mb-20 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-8">
            <Shield className="w-4 h-4" />
            <span>Tilgang bekreftet</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-foreground mb-6 leading-tight">
            Velkommen til det
            <span className="block text-gradient">eksklusive rommet</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Du har nå tilgang til premium-innhold som er forbeholdt utvalgte medlemmer.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Sparkles,
              title: "Premium Innhold",
              description: "Eksklusivt innhold og ressurser kun for medlemmer.",
              delay: "0.4s"
            },
            {
              icon: Shield,
              title: "Privat Tilgang",
              description: "Beskyttet område med sikker autentisering.",
              delay: "0.5s"
            },
            {
              icon: Gem,
              title: "VIP-fordeler",
              description: "Spesielle fordeler og tidlig tilgang til nyheter.",
              delay: "0.6s"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-8 opacity-0 animate-fade-in hover:border-primary/40 transition-all duration-300 group"
              style={{ animationDelay: feature.delay }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 pt-20 border-t border-border/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Medlemmer" },
              { value: "24/7", label: "Tilgang" },
              { value: "100%", label: "Eksklusivt" },
              { value: "∞", label: "Muligheter" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="font-display text-3xl md:text-4xl font-medium text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground/60 text-sm">
            © 2024 Eksklusiv. Alle rettigheter reservert.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProtectedContent;
