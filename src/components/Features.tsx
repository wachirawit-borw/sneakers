'use client';
import { useEffect, useState, useCallback } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Features() {
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  type FeatureProps = { 
    icon: React.ReactNode; 
    title: string; 
    text: string; 
    gradient: string;
  };

  function Feature({ icon, title, text }: FeatureProps) {
    return (
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10 ${gradient}"></div>
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 h-full transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/15 hover:border-white/30">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-colors duration-300">
              {icon}
            </div>
            <h3 className="font-bold text-xl text-white">{title}</h3>
            <p className="text-white/80 text-sm leading-relaxed">{text}</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const video = document.createElement("video");
      const webmSupport = video.canPlayType("video/webm");
      const mp4Support = video.canPlayType("video/mp4");
      
      if (webmSupport === "probably" || webmSupport === "maybe" || 
          mp4Support === "probably" || mp4Support === "maybe") {
        setCanPlayVideo(true);
      }
    }
  }, []);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  return (
    <AnimateOnScroll>
      <section
        id="features"
        className="relative min-h-screen flex flex-col justify-center py-20 px-6 overflow-hidden"
      >
        {/* Background: Video or fallback gradient */}
        {canPlayVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onError={() => {
              console.log("Video failed to load, falling back to gradient");
              setCanPlayVideo(false);
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ minWidth: '100%', minHeight: '100%' }}
          >
            <source src="/video/features-bg.webm" type="video/webm" />
            <source src="/video/features-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        )}

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse top-3/4 right-1/4 translate-x-1/2 translate-y-1/2 animation-delay-2000"></div>
          <div className="absolute w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 animation-delay-4000"></div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Premium Features
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover what makes our shoes extraordinary with cutting-edge technology and timeless design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <Feature
              icon={
                <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Ultra Lightweight"
              text="Advanced foam technology provides incredible lightness without compromising durability. Feel like you're walking on clouds."
              gradient="from-orange-500 to-red-500"
            />
            <Feature
              icon={
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              }
              title="Lightning Fast Delivery"
              text="Express shipping within 24 hours globally. Premium packaging ensures your shoes arrive in perfect condition."
              gradient="from-blue-500 to-cyan-500"
            />
            <Feature
              icon={
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              title="Innovative Design"
              text="Meticulously crafted with premium materials. Each pair combines modern aesthetics with ergonomic excellence."
              gradient="from-purple-500 to-pink-500"
            />
          </div>

          {/* Bottom decoration */}
          <div className="mt-20 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Custom CSS for animation delays */}
        <style jsx>{`
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </section>
    </AnimateOnScroll>
  );
}