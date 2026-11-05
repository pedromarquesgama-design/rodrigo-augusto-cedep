import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';

export const FavoritesDrawer: React.FC = () => {
  const {
    isFavoritesOpen,
    setIsFavoritesOpen,
    favoriteProducts,
    toggleFavorite,
    addToCart,
    setSelectedProduct,
    setIsCartOpen,
  } = useShop();

  if (!isFavoritesOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorites-drawer-title"
      onClick={() => setIsFavoritesOpen(false)}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-[#E5E7EB]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-[#202C70] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 fill-[#D9252A] text-[#D9252A]" aria-hidden="true" />
            <div>
              <h2 id="favorites-drawer-title" className="text-base font-extrabold">
                Meus Produtos Favoritos
              </h2>
              <p className="text-xs text-slate-200">
                {favoriteProducts.length}{' '}
                {favoriteProducts.length === 1 ? 'produto salvo' : 'produtos salvos'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFavoritesOpen(false)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            aria-label="Fechar favoritos"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#FEF2F2] text-[#D9252A] flex items-center justify-center mb-3">
              <Heart className="w-7 h-7" aria-hidden="true" />
            </div>
            <h3 className="text-base font-extrabold text-[#17191D]">
              Nenhum produto salvo nos favoritos
            </h3>
            <p className="text-xs text-[#737780] max-w-xs mt-1.5 leading-relaxed">
              Toque no ícone de coração nos produtos do catálogo para salvar itens de compra
              recorrente da sua oficina ou veículo.
            </p>
            <button
              type="button"
              onClick={() => setIsFavoritesOpen(false)}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#202C70] text-white text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Voltar ao Catálogo</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-xl border border-[#E5E7EB] bg-white flex gap-3 items-center shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsFavoritesOpen(false);
                    setSelectedProduct(product);
                  }}
                  className="rounded-lg border border-[#E5E7EB] overflow-hidden shrink-0 cursor-pointer"
                >
                  <ProductVisual product={product} size="sm" />
                </button>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#EEF1FA] text-[#202C70]">
                    {product.brand}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#17191D] truncate mt-0.5">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#737780] truncate">{product.categoryName}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(product, product.variations[0], 1)}
                      className="px-2.5 py-1.5 rounded-md bg-[#D9252A] hover:bg-[#B81D22] text-white text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Adicionar ({product.variations[0].label})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      className="p-1.5 rounded-md text-[#737780] hover:text-[#D9252A] hover:bg-red-50 cursor-pointer"
                      aria-label="Remover dos favoritos"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {favoriteProducts.length > 0 && (
          <div className="p-4 border-t border-[#E5E7EB] bg-[#F4F5F7]">
            <button
              type="button"
              onClick={() => {
                setIsFavoritesOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full py-3 rounded-lg bg-[#202C70] hover:bg-[#182157] text-white text-xs font-extrabold uppercase tracking-wider cursor-pointer"
            >
              Ir para o Carrinho de Orçamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

