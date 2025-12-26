import { Button } from "@/components/ui/button";
import { LogOut, Gift, Star, Heart, TreePine } from "lucide-react";
import Snowfall from "./Snowfall";

interface ProtectedContentProps {
  onLogout: () => void;
}

const ProtectedContent = ({ onLogout }: ProtectedContentProps) => {
  const timelineEvents = [
    { time: "10:00", title: "Julemorgen", description: "Våkne opp og åpne første gave! ☕", icon: "🌅" },
    { time: "12:00", title: "Julelunsj", description: "Tradisjonell risgrøt med mandel 🍚", icon: "🍽️" },
    { time: "14:00", title: "Familietid", description: "Spill og moro med hele familien 🎲", icon: "👨‍👩‍👧‍👦" },
    { time: "16:00", title: "Juleeventyr", description: "Les juleeventyr sammen ved peisen 📖", icon: "🔥" },
    { time: "18:00", title: "Julemiddag", description: "Pinnekjøtt og alt tilbehør 🍖", icon: "🦌" },
    { time: "20:00", title: "Pakkeåpning", description: "Endelig tid for alle gavene! 🎁", icon: "🎄" },
    { time: "22:00", title: "Kveldskos", description: "Julefilm og sjokolade 🍫", icon: "🎬" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Snowfall />
      
      {/* Background effects */}
      <div className="absolute inset-0 gradient-festive" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      
      {/* Christmas decorations */}
      <div className="absolute top-20 left-10 text-3xl opacity-60 animate-pulse">✨</div>
      <div className="absolute top-40 right-20 text-2xl opacity-50">🌟</div>
      <div className="absolute bottom-40 left-20 text-2xl opacity-50">❄️</div>
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎄</div>
            <span className="font-display text-xl font-medium text-foreground">Julaften 2024</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-8">
            <Gift className="w-4 h-4" />
            <span>God Jul! 🎅</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-foreground mb-6 leading-tight">
            Velkommen til
            <span className="block text-gradient">Julaften 2024 🎄</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Her er programmet for årets julefeiring med familien!
          </p>
        </div>

        {/* Timeline section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Årets Juleprogram 🎄
          </h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full hidden md:block" />
            
            {/* Timeline events */}
            <div className="space-y-8 md:space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 opacity-0 animate-fade-in ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 group inline-block w-full md:max-w-sm">
                      <div className="text-3xl mb-3">{event.icon}</div>
                      <div className="text-primary font-medium text-lg mb-1">{event.time}</div>
                      <h3 className="font-display text-xl text-foreground mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm">{event.description}</p>
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-card border-4 border-primary flex items-center justify-center shadow-christmas">
                    <span className="text-xl">{event.icon}</span>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: TreePine,
              title: "Juletradisjoner",
              description: "Våre kjære tradisjoner som gjør julen magisk 🎄",
              delay: "0.8s"
            },
            {
              icon: Heart,
              title: "Familiekjærlighet",
              description: "Tid sammen med de vi er glad i ❤️",
              delay: "0.9s"
            },
            {
              icon: Star,
              title: "Julemagi",
              description: "Den spesielle følelsen som bare jul kan gi ⭐",
              delay: "1.0s"
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

        {/* Stats section with Christmas theme */}
        <div className="mt-20 pt-20 border-t border-border/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "🎁", label: "Gaver" },
              { value: "🍪", label: "Pepperkaker" },
              { value: "❤️", label: "Klemmer" },
              { value: "✨", label: "Magiske øyeblikk" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${1.1 + index * 0.1}s` }}
              >
                <div className="text-5xl mb-3">
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
            🎄 God Jul og Godt Nyttår 2024! 🎅
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProtectedContent;
