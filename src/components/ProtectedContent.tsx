import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Gift, HelpCircle, Image, ChevronDown, X, Volume2, VolumeX, ChevronDownCircle, ExternalLink } from "lucide-react";
import Snowfall from "./Snowfall";
import StoryTimeline from "./StoryTimeline";
import { useStableViewportHeight } from "@/hooks/use-stable-viewport-height";
import archive1 from "@/assets/archive-photo.jpeg";
import archive2 from "@/assets/archive-1.jpg";
import archive3 from "@/assets/archive-2.jpeg";
import archive4 from "@/assets/archive-3.jpeg";
import archive5 from "@/assets/archive-4.jpg";
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

// Juleroerbord 2026
const ProtectedContent = ({ onLogout }: ProtectedContentProps) => {
  const viewportHeight = useStableViewportHeight();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Keep autoplay muted; only the sound button may enable audio.
    v.muted = true;
    const startVideo = () => { void v.play().catch(() => {}); };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !document.hidden) startVideo();
      else v.pause();
    }, { threshold: 0 });
    observer.observe(v);
    const onVisibility = () => {
      if (document.hidden) v.pause();
      else if (v.getBoundingClientRect().bottom > 0) startVideo();
    };
    document.addEventListener("visibilitychange", onVisibility);
    startVideo();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      v.pause();
    };
  }, []);

  useEffect(() => {
    if (!expandedCard) return;

    const timeoutId = window.setTimeout(() => {
      document.getElementById(`feature-${expandedCard}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 550);

    return () => window.clearTimeout(timeoutId);
  }, [expandedCard]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      video.volume = 1;
      if (video.paused) {
        video.play().catch(() => {
          video.muted = true;
          setIsMuted(true);
        });
      }
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
      a: "1. Når du blir kasta ut (så lenge du fyrer litt til vakta mens det skjer)\n2. Når lysene skrus på" 
    },
    {
      q: "Hva med drikkesanger?",
      a: "Selvfølgelig! Her finner du sangheftet fra i fjor:",
      link: { label: "Sanghefte 2025 (PDF)", href: "/sanghefte.pdf" },
    },
  ];

  // Archive images from the party
  const archiveImages = [
    archive1, archive2, archive3, archive4, archive5, archive6,
    archive7, archive8, archive9, archive10, archive11, archive12
  ];

  const timelineEvents = [
    { time: "Morgen", title: "Hjemme hos deg selv", description: "Der det hele starter", icon: "🏠", backInfo: "Du starter dagen hjemme hos deg selv, uthvilt og klar for en dag med mye halloi. Spis en god frokost, drikk vann og pakk det du trenger for første del av dagen." },
    { time: "10:45", title: "Treningsøkt", description: "6 x 4min på the machine designed in hell 👺", icon: "🍾", backInfo: "Vi møtes på NSR og sikter på start litt over 11. LFG" },
    { time: "13:15", title: "Badstue", description: "Trosten - Sukkerbiten", icon: "🍾", backInfo: "Transport fra roklubben til badstue 🧖 Husk badebukse, håndkle og evt noe om du er tørst 🚰" },
    { time: "18:15", title: "Vors", description: "Krebs gate 14", icon: "🍾", backInfo: "Vi møtes selvfølgelig til vorssprell med mye ljuging, sang og nok alkohol (IKKE ta med egen drikke). I tillegg oppfordrer vi alle til å la slipset ligge igjen hjemme (som betyr IKKE ta med slips)" },
    { time: "20:00", title: "Maxitaxi", description: "Transport til middag", icon: "🍾", backInfo: "Stappa taxi mot byen" },
    { time: "20:30", title: "Middag", description: "Stortorvet Gjæstegiveri", icon: "🐑", backInfo: "Vi vender tilbake til legendariske Stortorvet Gjæstegiveri. Bottomless pinnekjøtt på menyen." },
    { time: "00:00", title: "BA3", description: "Final destination", icon: "🎆", backInfo: "Kvelden avsluttes selvfølgelig på BA3. Vi drar hjem når lysene skrus på." },
  ];

  return (
    <div className="relative">
      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-50"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Forstørret bilde"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* Video Hero Section - Full Screen */}
      <section style={{ height: viewportHeight }} className="relative overflow-hidden bg-black">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          onLoadedData={() => setIsVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={`${import.meta.env.BASE_URL}videos/christmas-background.mp4`} type="video/mp4" />
        </video>
        
        {/* Darker gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        
        <Snowfall confineOnMobile />
        
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
            {/* Radial vignette behind text for extra contrast */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)]" />

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-4 sm:mb-6 leading-tight [text-shadow:0_4px_24px_rgba(0,0,0,0.85),0_2px_6px_rgba(0,0,0,0.9)]">
              Jule<span className="text-primary [text-shadow:0_0_30px_rgba(220,38,38,0.7),0_4px_24px_rgba(0,0,0,0.85)]">roer</span>bord 2026 🎄
            </h1>

            <p className="text-white text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-8 [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
              Lørdag 12. desember
            </p>
          </div>
        </div>

        {/* Mute/Unmute button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-20 p-3 sm:p-4 rounded-full bg-white/15 border border-white/20 text-white hover:bg-white/20 transition-colors duration-300"
          aria-label={isMuted ? "Slå på lyd" : "Slå av lyd"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </Button>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-10 sm:bottom-14 inset-x-0 mx-auto w-fit z-20 text-white/80 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll ned for å se programmet"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs sm:text-sm font-medium">Se programmet</span>
            <ChevronDownCircle className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </button>
      </section>

      {/* Main Content Section */}
      <div id="content" className="min-h-screen relative overflow-x-clip">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-festive" />
        
        {/* Christmas decorations */}

        {/* Main content */}
        <main className="relative z-10 container mx-auto px-3 sm:px-4">
          </main>
          <StoryTimeline events={timelineEvents} />
          <main className="relative z-10 container mx-auto px-3 sm:px-4 pb-12 sm:pb-20">
          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                id: "arkiv",
                icon: Image,
                title: "Høydepunkter fra i fjor",
                description: "",
                delay: "0.8s"
              },
              {
                id: "faq",
                icon: HelpCircle,
                title: "FAQ",
                description: "",
                delay: "0.9s"
              }
            ].map((feature) => (
              <div
                key={feature.id}
                id={`feature-${feature.id}`}
                onClick={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                className={`glass-card scroll-mt-4 rounded-xl sm:rounded-2xl p-5 sm:p-8 opacity-0 animate-fade-in cursor-pointer transition-colors duration-500 group
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
                <div className={`overflow-hidden transition-opacity duration-500 ${
                  expandedCard === feature.id ? 'opacity-100 mt-4 sm:mt-8' : 'hidden opacity-0'
                }`}>
                  {feature.id === "faq" && (
                    <div className="space-y-3 sm:space-y-4">
                      {faqItems.map((item, i) => (
                        <div key={i} className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 bg-background/50">
                          <p className="text-primary font-medium mb-1 sm:mb-2 text-sm sm:text-base">❓ {item.q}</p>
                          <p className="text-foreground text-xs sm:text-sm whitespace-pre-line">{item.a}</p>
                          {item.link && (
                            <a
                              href={item.link.href}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 mt-2 text-primary text-xs sm:text-sm underline underline-offset-4 hover:text-primary/80 transition-colors"
                            >
                              {item.link.label}
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {feature.id === "arkiv" && expandedCard === "arkiv" && (
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                        {archiveImages.map((imgSrc, i) => (
                          <div
                            key={i} 
                            className="aspect-square rounded-lg sm:rounded-xl overflow-hidden border border-border/30 cursor-pointer bg-background/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightboxImage(imgSrc);
                            }}
                          >
                            <img 
                              src={imgSrc} 
                              alt={`Arkivbilde ${i + 1}`}
                              loading="lazy"
                              decoding="async"
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
