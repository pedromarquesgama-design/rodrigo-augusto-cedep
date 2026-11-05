import React from 'react';
import { Gauge } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

interface CategorySectionProps {
  selectedCategoryId: string | null;
  onSelectCategory: (catId: string | null) => void;
  onQuickFilterViscosity?: (visc: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategoryId,
  onSelectCategory,
  onQuickFilterViscosity,
}) => {
  return (
    <section id="categorias-grid" className="py-7 sm:py-10 bg-[#F4F5F7]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-4 sm:mb-5 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17191D]">
            Navegue por Categoria de Produto
          </h2>
        </div>

        {/* Categories Pills Grid (Matching Reference Design, without Kits de Revisão) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          {CATEGORIES.filter((cat) => cat.id !== 'kits-de-revisao').map((cat) => {
            const isActive = selectedCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(isActive ? null : cat.id)}
                className={`group relative flex items-center justify-center text-center px-3.5 sm:px-4 h-[50px] sm:h-[54px] rounded-[14px] sm:rounded-[16px] border transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#D9252A] text-white border-[#D9252A] shadow-md ring-2 ring-[#D9252A]/30 scale-[1.02]'
                    : 'bg-white text-[#17191D] border-[#E2E8F0] hover:border-[#F87171]/70 hover:bg-[#FFF8F8] hover:text-[#D9252A] shadow-xs hover:shadow-sm'
                }`}
              >
                <span className="text-[12.5px] sm:text-[13.5px] font-bold leading-tight">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Search by Viscosity with same heading style as categories */}
        {onQuickFilterViscosity && (
          <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17191D] mb-4 sm:mb-5 text-center">
              Busca Rápida por Viscosidade
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5 w-full">
              {['0W-20', '5W-30', '5W-40', '10W-30', '10W-40', '15W-40', '20W-50', '85W-140'].map(
                (visc) => (
                  <button
                    key={visc}
                    type="button"
                    onClick={() => onQuickFilterViscosity(visc)}
                    className="h-[40px] sm:h-[44px] rounded-[12px] bg-white hover:bg-[#FFF5F5] border border-[#E2E8F0] hover:border-[#D9252A] flex items-center justify-center font-mono text-[12.5px] sm:text-[13.5px] font-bold text-[#17191D] hover:text-[#D9252A] transition-all cursor-pointer shadow-xs hover:shadow-sm active:scale-95"
                  >
                    {visc}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

