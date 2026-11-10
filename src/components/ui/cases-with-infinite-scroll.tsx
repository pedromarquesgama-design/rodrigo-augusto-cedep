"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const BRAND_LOGOS = [
  { name: "Castrol", logo: "/images/brands/castrol.png" },
  { name: "Mobil", logo: "/images/brands/mobil.png" },
  { name: "Shell", logo: "/images/brands/shell.png" },
  { name: "Lubrax", logo: "/images/brands/lubrax.png" },
  { name: "Havoline", logo: "/images/brands/havoline.png" },
  { name: "Texaco", logo: "/images/brands/texaco.png" },
  { name: "YPF", logo: "/images/brands/ypf.png" },
  { name: "Bardahl", logo: "/images/brands/bardahl.png" },
  { name: "WD-40", logo: "/images/brands/wd-40.png" },
  { name: "3M", logo: "/images/brands/3m.png" },
];

interface CaseProps {
  onSelectBrand?: (brandName: string) => void;
}

function Case({ onSelectBrand }: CaseProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <div id="principais-marcas" className="w-full py-8 sm:py-10 lg:py-12 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-center sm:text-left">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#D9252A]">
                Distribuidor Autorizado & Parceiro Oficial
              </span>
              <h2 className="text-lg sm:text-2xl lg:text-3xl tracking-tight font-extrabold text-[#17191D]">
                Trabalhamos com as Principais Marcas do Mercado
              </h2>
            </div>
            <p className="text-xs text-[#737780] hidden sm:block">
              Clique em uma marca para filtrar no catálogo →
            </p>
          </div>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {BRAND_LOGOS.concat(BRAND_LOGOS).map((brand, index) => (
                <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6" key={index}>
                  <button
                    type="button"
                    onClick={() => onSelectBrand?.(brand.name)}
                    className="w-full flex rounded-xl aspect-[3/2] bg-[#F8F9FB] border border-[#E5E7EB] hover:border-[#D9252A]/50 hover:bg-white hover:shadow-md transition-all items-center justify-center p-4 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#202C70]"
                    aria-label={`Filtrar produtos da marca ${brand.name}`}
                    title={`Ver produtos da marca ${brand.name}`}
                  >
                    <img
                      src={brand.logo}
                      alt={`Logo ${brand.name}`}
                      className="max-h-12 sm:max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback text if image not found
                        const target = e.currentTarget;
                        target.style.display = "none";
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = "block";
                        }
                      }}
                    />
                    <span className="text-xs font-bold text-[#17191D] hidden">
                      {brand.name}
                    </span>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { Case };

