import React from 'react';
import { Home, Layers, Heart, ShoppingCart, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { buildGeneralInquiryWhatsAppUrl } from '../config/business';

interface MobileBottomNavProps {
  onGoHome: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onGoHome,
  onNavigateSection,
}) => {
  const {
    totalUnits,
    favoriteIds,
    setIsCartOpen,
    setIsFavoritesOpen,
  } = useShop();

  return (
    <nav
      aria-label="Navegação rápida móvel"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] shadow-[0_-4px_16px_rgba(23,25,29,0.08)] pb-safe"
    >
      <div className="grid grid-cols-4 h-16">
        <button
          type="button"
          onClick={onGoHome}
          className="flex flex-col items-center justify-center gap-1 text-[#17191D] hover:text-[#202C70] active:bg-[#F4F5F7] transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-bold">Início</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateSection('categorias-grid')}
          className="flex flex-col items-center justify-center gap-1 text-[#17191D] hover:text-[#202C70] active:bg-[#F4F5F7] transition-colors cursor-pointer"
        >
          <Layers className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-bold">Categorias</span>
        </button>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center gap-1 text-[#17191D] hover:text-[#D9252A] active:bg-[#F4F5F7] transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-[#D9252A]" aria-hidden="true" />
            <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#D9252A] text-white text-[9px] font-extrabold flex items-center justify-center">
              {totalUnits}
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#D9252A]">Carrinho</span>
        </button>

        <a
          href={buildGeneralInquiryWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 bg-[#16A34A] text-white active:bg-[#15803D] transition-colors cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-extrabold">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};

