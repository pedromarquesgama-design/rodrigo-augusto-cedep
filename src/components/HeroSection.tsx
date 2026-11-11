import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useReducedMotion } from 'framer-motion';

const HERO_VIDEOS_MOBILE = [
  '/videos/hero-mobile-1.mp4',
  '/videos/hero-mobile-2.mp4',
  '/videos/hero-mobile-3.mp4',
  '/videos/hero-mobile-4.mp4',
];

const HERO_VIDEOS_DESKTOP = [
  '/videos/hero-desktop-1.mp4',
  '/videos/hero-desktop-2.mp4',
  '/videos/hero-desktop-3.mp4',
  '/videos/hero-desktop-4.mp4',
];

export const HeroSection: React.FC = () => {
  const reduceMotion = useReducedMotion() === true;
  // Horizontal slide carousel: drags with finger or mouse, loops and always advances leftward on its own.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: reduceMotion ? 0 : 32 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Auto-advance every 7s; every slide change (auto or swipe) restarts the timer so a gesture is never cut short.
  useEffect(() => {
    if (!emblaApi) return;

    let timer: number;
    const restart = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => emblaApi.scrollNext(), 7000);
    };
    const onSelect = () => {
      setCurrentVideoIndex(emblaApi.selectedScrollSnap());
      restart();
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('pointerDown', restart);

    return () => {
      window.clearInterval(timer);
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', restart);
    };
  }, [emblaApi]);

  return (
    <section id="inicio" className="relative overflow-x-clip bg-[#17191D] text-white hero-mobile-height flex flex-col justify-start">
      {/* Background Video Slider: one slide per index, each holding its mobile and notebook/desktop video */}
      <div
        ref={emblaRef}
        className="absolute inset-0 overflow-hidden"
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <div className="flex h-full">
          {HERO_VIDEOS_DESKTOP.map((src, idx) => (
            <div key={src} className="relative h-full shrink-0 grow-0 basis-full">
              {/* Mobile Background Video (< lg) */}
              <video
                src={HERO_VIDEOS_MOBILE[idx]}
                autoPlay
                muted
                loop
                playsInline
                tabIndex={-1}
                className="lg:hidden absolute inset-0 w-full h-full object-contain opacity-75"
              />

              {/* Notebook & Desktop Background Video (>= lg) */}
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                tabIndex={-1}
                className="hidden lg:block absolute inset-0 w-full h-full object-cover opacity-75"
              />
            </div>
          ))}
        </div>

        {/* Fade: solid behind the nav bar, then blends into the video's top edge */}
        <div
          className="lg:hidden absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: 'calc((100dvh - min(100dvh, 100vw * 16 / 9)) / 2 + 80px)',
            background: 'linear-gradient(to bottom, #17191D calc(100% - 80px), transparent)',
          }}
          aria-hidden="true"
        />

        {/* Subtle video slider indicator dots */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-auto">
          {HERO_VIDEOS_DESKTOP.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => emblaApi?.scrollTo(idx)}
              aria-label={`Vídeo de fundo ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentVideoIndex ? 'w-5 sm:w-6 bg-[#D9252A]' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-7 sm:pb-10 lg:pb-16 flex-1 flex flex-col justify-end">
        {/* 5a. WHATSAPP INFO (Notebook/Desktop: bottom-right, clear of the CTA that follows the video line) */}
        <div className="hidden lg:block self-end max-w-[340px] xl:max-w-[380px] text-right">
          <div className="flex items-center justify-end gap-2.5 mb-1.5">
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
            <h3 className="text-[12px] sm:text-[13px] font-bold text-white uppercase tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              ADICIONE OS PRODUTOS AO<br />
              CARRINHO E ENVIE SEU PEDIDO
            </h3>
          </div>

          <p className="text-[10.5px] sm:text-[11.5px] font-normal text-[#E2E8F0] uppercase tracking-wide leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
            VAMOS ENCAMINHAR OS VALORES E A DISPONIBILIDADE DIRETO NO SEU WHATSAPP!
          </p>
        </div>

        {/* 5b. WHATSAPP INFO (Mobile: pinned at bottom, shadow only behind the text block) */}
        <div className="lg:hidden -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2 sm:pb-3 pt-6 bg-gradient-to-t from-[#17191D] via-[#17191D]/90 to-transparent">
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
              <h3 className="text-[13px] sm:text-[14px] font-bold text-white uppercase tracking-wide leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                ADICIONE OS PRODUTOS AO<br />
                CARRINHO E ENVIE SEU PEDIDO
              </h3>
            </div>

            <p className="text-[11.5px] sm:text-[12.5px] font-normal text-[#E2E8F0] uppercase tracking-wide leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              VAMOS ENCAMINHAR OS VALORES E A DISPONIBILIDADE DIRETO NO SEU WHATSAPP!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
