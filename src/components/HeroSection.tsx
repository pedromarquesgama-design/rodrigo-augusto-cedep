import React, { useState, useEffect } from 'react';
import { ArrowRight, LayoutGrid } from 'lucide-react';

const HERO_VIDEOS = [
  '/videos/hero-1.mp4',
  '/videos/hero-2.mp4',
  '/videos/hero-3.mp4',
];

interface HeroSectionProps {
  onExploreProducts: () => void;
  onQuickFilterViscosity: (visc: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onQuickFilterViscosity,
  onSelectCategory,
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Automatically cycle through videos every 7 seconds, or on video end
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative overflow-x-clip bg-[#17191D] text-white hero-mobile-height flex flex-col justify-start">
      {/* Background Video Slider replacing the square blue/gradient lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {HERO_VIDEOS.map((src, idx) => (
          <video
            key={src}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            onEnded={() => setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              idx === currentVideoIndex ? 'opacity-75 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        ))}

        {/* Elegant subtle dark overlay gradient for clear video visibility and crisp text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#17191D]/80 via-[#17191D]/55 to-[#17191D]/45 lg:from-[#17191D]/85 lg:via-[#17191D]/50 lg:to-[#17191D]/30"
          aria-hidden="true"
        />

        {/* Subtle video slider indicator dots */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-auto">
          {HERO_VIDEOS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentVideoIndex(idx)}
              aria-label={`Vídeo de fundo ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentVideoIndex ? 'w-5 sm:w-6 bg-[#D9252A]' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-[52px] sm:pt-14 lg:pt-24 pb-7 sm:pb-10 lg:pb-16 flex-1 flex flex-col justify-between lg:justify-center">
        {/* Main Content Column */}
        <div className="max-w-[540px] lg:max-w-[580px] space-y-2.5 sm:space-y-3.5 text-left flex flex-col items-start w-full">
          {/* CEDEP Official Logo - Solid authentic colors without white ghosting/neon halo */}
          <div className="w-full flex items-center justify-start pb-0.5">
            <img
              src="/images/cedep-logo-header.png?v=2"
              alt="CEDEP Lubrificantes — Desde 1982"
              className="h-[100px] sm:h-[115px] lg:h-[130px] w-auto max-w-[calc(100vw-68px)] sm:max-w-md object-contain object-left drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
            />
          </div>

          {/* 1. EYEBROW (above the headline, clean without horizontal divider lines) */}
          <div className="w-full py-0.5 mb-1 sm:mb-2 flex items-center justify-start flex-nowrap whitespace-nowrap gap-x-2 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.06em] text-white/95">
            <span>RODRIGO AUGUSTO</span>
            <span className="text-white/40 font-light">|</span>
            <span>CEDEP LUBRIFICANTES</span>
          </div>

          {/* 2. HEADLINE (3 clean solid white lines matching user reference exactly) */}
          <h1
            className="text-[26px] sm:text-[34px] lg:text-[42px] font-black text-white leading-[1.08] text-left uppercase tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            TUDO PARA O SEU
            <br />
            VEÍCULO
            <br />
            EM UM SÓ LUGAR
          </h1>

          {/* 3. SUBTEXT */}
          <p className="text-[13px] sm:text-[14.5px] font-normal text-[#E2E8F0] leading-[1.4] text-left max-w-[340px] sm:max-w-xl">
            Óleos, lubrificantes, filtros, produtos de manutenção e soluções automotivas. Encontre o que precisa com a qualidade das melhores marcas.
          </p>

          {/* 4. PRIMARY CTA BUTTON */}
          <div className="w-full max-w-[440px] pt-1">
            <button
              type="button"
              onClick={onExploreProducts}
              className="w-full h-[50px] sm:h-[52px] rounded-[10px] flex items-center justify-center gap-2.5 px-6 uppercase text-[#FFFFFF] font-bold text-[14px] sm:text-[15px] tracking-[0.05em] border border-[#FF6B6B]/40 transition-all cursor-pointer hover:brightness-110 active:scale-[0.99]"
              style={{
                background: 'linear-gradient(180deg, #8E1B1B 0%, #C62828 22%, #FF5252 46%, #D32F2F 58%, #8E1B1B 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.45), 0 0 24px rgba(220, 38, 38, 0.35)',
              }}
            >
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">EXPLORAR PRODUTOS</span>
              <ArrowRight className="w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" strokeWidth={2.5} />
            </button>

            {/* 4b. SECONDARY CTA BUTTON (Blue) - Shop by Category */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('categorias-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-2.5 w-full h-[50px] sm:h-[52px] rounded-[10px] flex items-center justify-center gap-2.5 px-6 uppercase text-[#FFFFFF] font-bold text-[14px] sm:text-[15px] tracking-[0.05em] border border-[#7C8FF0]/40 transition-all cursor-pointer hover:brightness-110 active:scale-[0.99]"
              style={{
                background: 'linear-gradient(180deg, #121A4D 0%, #1E2A78 22%, #4A5FD0 46%, #2A3A96 58%, #121A4D 100%)',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.45), 0 0 24px rgba(59, 79, 184, 0.35)',
              }}
            >
              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">COMPRE POR CATEGORIA</span>
              <LayoutGrid className="w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" strokeWidth={2.5} />
            </button>
          </div>

          {/* 5a. WHATSAPP INFO (Notebook/Desktop: positioned directly below the CTA buttons) */}
          <div className="hidden lg:block w-full max-w-[440px] pt-3">
            <div className="flex items-center gap-2.5 mb-1.5">
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 sm:w-8 sm:h-8 text-white shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <g transform="translate(12.2, 11.2) scale(0.70) translate(-12.4, -12.7)">
                  <path
                    d="M16.5 14.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.8.9-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.3-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4s-.5-1.2-.7-1.6c-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 2 0 1.2.9 2.4 1 2.5.1.2 1.7 2.6 4.2 3.7.6.3 1.1.4 1.4.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"
                    fill="currentColor"
                    stroke="none"
                  />
                </g>
              </svg>
              <h3 className="text-[12.5px] sm:text-[13.5px] font-bold text-white uppercase tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                ADICIONE OS PRODUTOS AO<br />
                CARRINHO E ENVIE SEU PEDIDO
              </h3>
            </div>

            <p className="text-[11px] sm:text-[12px] font-normal text-[#E2E8F0] uppercase tracking-wide leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              VAMOS ENCAMINHAR OS VALORES E A DISPONIBILIDADE DIRETO NO SEU WHATSAPP!
            </p>
          </div>
        </div>

        {/* 5b. WHATSAPP INFO (Mobile: pinned at bottom of viewport with mt-auto, preserving previous mobile layout) */}
        <div className="lg:hidden w-full mt-auto pt-6 pb-2 sm:pb-3">
          <div className="text-left max-w-md mx-auto py-1">
            <div className="flex items-center gap-3 mb-2">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-white shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <g transform="translate(12.2, 11.2) scale(0.70) translate(-12.4, -12.7)">
                  <path
                    d="M16.5 14.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.8.9-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.8-1.1-.7-.6-1.1-1.3-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4s-.5-1.2-.7-1.6c-.2-.4-.4-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 2 0 1.2.9 2.4 1 2.5.1.2 1.7 2.6 4.2 3.7.6.3 1.1.4 1.4.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"
                    fill="currentColor"
                    stroke="none"
                  />
                </g>
              </svg>
              <h3 className="text-[13px] sm:text-[14px] font-bold text-white uppercase tracking-wide leading-tight">
                ADICIONE OS PRODUTOS AO<br />
                CARRINHO E ENVIE SEU PEDIDO
              </h3>
            </div>

            <p className="text-[11.5px] sm:text-[12.5px] font-normal text-[#E2E8F0] uppercase tracking-wide leading-relaxed">
              VAMOS ENCAMINHAR OS VALORES E A DISPONIBILIDADE DIRETO NO SEU WHATSAPP!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

