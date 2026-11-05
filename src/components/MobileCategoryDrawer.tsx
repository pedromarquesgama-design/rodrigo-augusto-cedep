import React from 'react';
import { X, Layers, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { CategoryIcon } from './CategoryIcon';

interface MobileCategoryDrawerProps {
  selectedCategoryId: string | null;
  onSelectCategory: (catId: string | null) => void;
}

export const MobileCategoryDrawer: React.FC<MobileCategoryDrawerProps> = ({
  selectedCategoryId,
  onSelectCategory,
}) => {
  const { isMobileCategoriesOpen, setIsMobileCategoriesOpen } = useShop();

  if (!isMobileCategoriesOpen) return null;

  const handleChoose = (catId: string | null) => {
    onSelectCategory(catId);
    setIsMobileCategoriesOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-cat-title"
      onClick={() => setIsMobileCategoriesOpen(false)}
    >
      <div
        className="w-full max-h-[85vh] bg-white rounded-t-2xl flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-[#202C70] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-300" aria-hidden="true" />
            <h2 id="mobile-cat-title" className="text-sm font-extrabold uppercase tracking-wider">
              Departamentos CEDEP (15 Categorias)
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileCategoriesOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 text-white"
            aria-label="Fechar categorias"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <button
            type="button"
            onClick={() => handleChoose(null)}
            className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between ${
              selectedCategoryId === null
                ? 'bg-[#202C70] text-white border-[#202C70]'
                : 'bg-[#F4F5F7] text-[#17191D] border-[#E5E7EB]'
            }`}
          >
            <span className="text-xs font-extrabold uppercase tracking-wider">
              Ver Todos os Produtos ({PRODUCTS.length} famílias)
            </span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter((p) => p.categoryId === cat.id).length;
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleChoose(cat.id)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-[#EEF1FA] border-[#202C70] text-[#202C70]'
                      : 'bg-white border-[#E5E7EB] text-[#17191D]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#EEF1FA] text-[#202C70] flex items-center justify-center shrink-0">
                      <CategoryIcon iconName={cat.iconName} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-extrabold truncate">
                        {cat.number}. {cat.name}
                      </span>
                      <span className="block text-[11px] text-[#737780] truncate">
                        {cat.description}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F4F5F7] text-[#17191D] shrink-0">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

