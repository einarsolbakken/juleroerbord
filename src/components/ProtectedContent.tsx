import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Gift, HelpCircle, Image, ChevronDown, X, Volume2, VolumeX, ChevronDownCircle } from "lucide-react";
import Snowfall from "./Snowfall";
import archive1 from "@/assets/archive-photo.jpeg";
import archive2 from "@/assets/archive-1.jpg";
import archive3 from "@/assets/archive-2.jpeg";
import archive4 from "@/assets/archive-3.jpeg";
import archive5 from "@/assets/archive-4.png";
import archive6 from "@/assets/archive-5.jpg";
import archive7 from "@/assets/archive-6.jpeg";
import archive8 from "@/assets/archive-7.jpg";
import archive9 from "@/assets/archive-8.jpg";
import archive10 from "@/assets/archive-9.jpeg";
import archive11 from "@/assets/archive-10.jpeg";
import archive12 from "@/assets/archive-12.jpeg";

interface ProtectedContentProps {
  onLogout: () => void;
}

const ProtectedContent = ({ onLogout }: ProtectedContentProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToContent = () => {
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqItems = [
    { 
      q: "Kommer jeg til å bli drita full?", 
      a: "Ja, Med unntak av badstuepils og byen, er dette et All inclusive opplegg (muringsgaranti)." 
    },
    { 
      q: "Hva om jeg har en eller annen allergi (som ikke sitter i huet..)?", 
      a: "Det er selvfølgelig tatt hensyn til allergier for de det måtte gjelde." 
    },
    { 
      q: "Når er det greit å dra hjem?",
      a: "Det er greit å dra hjem om du:\n1. Blir kasta ut (så lenge du fyrer litt til vakta mens det skjer)\n2. Når lysene skrus på" 
    },
  ];

  // Archive images from the party
  const archiveImages = [
    archive1, archive2, archive3, archive4, archive5, archive6,
    archive7, archive8, archive9, archive10, archive11, archive12
  ];

  const timelineEvents = [
    { time: "10:45", title: "Treningsøkt", description: "Romaskin - NSR eller CR 💪", icon: "🏋️", backInfo: "Start dagen med en treningsøkt på romaskin. Velg mellom NSR eller CR." },
    { time: "13:15", title: "Badstue", description: "Sukkerbiten 🧖", icon: "🔥", backInfo: "Slapp av i badstuen på Sukkerbiten etter treningen." },
    { time: "18:15", title: "Vors", description: "Krebs gate 🥂", icon: "🍾", backInfo: "Vi samles for vors i Krebs gate før vi drar videre." },
    { time: "20:00", title: "Maxitaxi", description: "Transport til middag 🚕", icon: "🚖", backInfo: "Maxitaxi henter oss og kjører til Stortorvet." },
    { time: "20:30", title: "Middag", description: "Stortorvet → BA3 🍽️", icon: "🎄", backInfo: "Julemiddag på Stortorvet, deretter videre til BA3!" },
  ];

  return (
    <div className="relative">
      {/* Video Hero Section - Full Screen */}
      <section className="h-screen relative overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={`${import.meta.env.BASE_URL}videos/christmas-background.mp4`} type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <Snowfall />
        
        {/* Header on video */}
        <header className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-white/80 hover:text-white hover:bg-white/10 gap-1 sm:gap-2 px-2 sm:px-3"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logg ut</span>
            </Button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
              Velkommen til
              <span className="block text-white drop-shadow-lg">Jule<span className="text-primary drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">roer</span>bord 🎄</span>
            </h1>
            
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-8 drop-shadow-md">
              Lørdag 12. desember 2026
            </p>
          </div>
        </div>

        {/* Mute/Unmute button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-20 p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          aria-label={isMuted ? "Slå på lyd" : "Slå av lyd"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/80 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll ned for å se programmet"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs sm:text-sm font-medium">Se programmet</span>
            <ChevronDownCircle className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </button>
      </section>

      {/* Main Content Section */}
      <div id="content" className="min-h-screen relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-festive" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-accent/10 rounded-full blur-[80px] md:blur-[100px]" />
        
        {/* Christmas decorations */}
        <div className="absolute top-20 left-4 md:left-10 text-2xl md:text-3xl opacity-60 animate-pulse">✨</div>
        <div className="absolute top-40 right-4 md:right-20 text-xl md:text-2xl opacity-50">🌟</div>
        <div className="absolute bottom-40 left-4 md:left-20 text-xl md:text-2xl opacity-50 hidden sm:block">❄️</div>

        {/* Main content */}
        <main className="relative z-10 container mx-auto px-3 sm:px-4 py-12 sm:py-20 md:py-28">
          {/* Timeline section */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-20">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center text-foreground mb-8 sm:mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Program
            </h2>
            
            <div className="relative">
              {/* Vertical line - left on mobile, center on desktop */}
              <div className="absolute left-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-0.5 sm:w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full" />
              
              {/* Timeline events */}
              <div className="space-y-6 sm:space-y-8 md:space-y-12">
                {timelineEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`flex items-start sm:items-center gap-4 sm:gap-6 md:gap-8 opacity-0 animate-fade-in ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    {/* Center dot - left aligned on mobile */}
                    <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border-3 sm:border-4 border-primary flex items-center justify-center shadow-christmas flex-shrink-0 md:order-2 md:mx-0">
                      <span className="text-lg sm:text-xl">{event.icon}</span>
                    </div>
                    
                    {/* Content card with flip effect */}
                    <div className={`flex-1 md:order-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="perspective-1000 w-full md:max-w-xs md:inline-block cursor-pointer">
                        <div className="flip-card relative w-full h-28 sm:h-32 transform-style-3d">
                          {/* Front of card */}
                          <div className="absolute inset-0 glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 backface-hidden flex flex-col items-center justify-center text-center">
                            <div className="text-3xl sm:text-4xl mb-2">{event.icon}</div>
                            <div className="text-primary font-bold text-xl sm:text-2xl">{event.time}</div>
                            <h3 className="font-display text-sm sm:text-base text-foreground mt-1">{event.title}</h3>
                          </div>
                          {/* Back of card */}
                          <div className="absolute inset-0 glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 backface-hidden rotate-y-180 bg-primary/20 border-primary/40 flex flex-col items-center justify-center text-center">
                            <h4 className="font-display text-base sm:text-lg text-primary mb-2">{event.title}</h4>
                            <p className="text-foreground text-xs sm:text-sm leading-relaxed">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Spacer for alternating layout - desktop only */}
                    <div className="flex-1 hidden md:block md:order-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                id: "arkiv",
                icon: Image,
                title: "Arkiv",
                description: "",
                delay: "0.8s"
              },
              {
                id: "faq",
                icon: HelpCircle,
                title: "FAQ",
                description: "Ofte stilte spørsmål om julefeiringen 🎄",
                delay: "0.9s"
              }
            ].map((feature) => (
              <div
                key={feature.id}
                onClick={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                className={`glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 opacity-0 animate-fade-in cursor-pointer transition-all duration-500 group
                  ${expandedCard === feature.id 
                    ? 'sm:col-span-2 border-primary/50 bg-primary/5' 
                    : 'hover:border-primary/40'
                  }`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-medium text-foreground mb-1 sm:mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className={`transition-transform duration-300 flex-shrink-0 ${expandedCard === feature.id ? 'rotate-180' : ''}`}>
                    {expandedCard === feature.id ? (
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                
                {/* Expanded content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  expandedCard === feature.id ? 'max-h-[800px] opacity-100 mt-4 sm:mt-8' : 'max-h-0 opacity-0'
                }`}>
                  {feature.id === "faq" && (
                    <div className="space-y-3 sm:space-y-4">
                      {faqItems.map((item, i) => (
                        <div key={i} className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 bg-background/50">
                          <p className="text-primary font-medium mb-1 sm:mb-2 text-sm sm:text-base">❓ {item.q}</p>
                          <p className="text-foreground text-xs sm:text-sm whitespace-pre-line">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {feature.id === "arkiv" && (
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                        {archiveImages.map((imgSrc, i) => (
                          <div
                            key={i} 
                            className="aspect-square glass-card rounded-lg sm:rounded-xl overflow-hidden hover:scale-110 transition-transform cursor-pointer bg-background/30"
                          >
                            <img 
                              src={imgSrc} 
                              alt={`Arkivbilde ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats section with Christmas theme */}
          <div className="mt-12 sm:mt-20 pt-12 sm:pt-20 border-t border-border/30">
            <div className="grid grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
              {["🎁", "🍪", "❤️", "✨"].map((emoji, index) => (
                <div 
                  key={index} 
                  className="text-center opacity-0 animate-fade-in"
                  style={{ animationDelay: `${1.1 + index * 0.1}s` }}
                >
                  <div className="text-3xl sm:text-5xl">
                    {emoji}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border/30 mt-12 sm:mt-20">
          <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 text-center">
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProtectedContent;