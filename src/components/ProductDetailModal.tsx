import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingCart,
  Heart,
  MessageCircle,
  Layers,
  Package,
  Wrench,
  CheckCircle2,
  Info,
  Plus,
  Minus,
} from 'lucide-react';
import { ProductVariation } from '../types/product';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import { buildSingleProductWhatsAppUrl } from '../config/business';
import { getCustomProductImage } from '../config/productImages';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useShop();

  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedVariation(selectedProduct.variations[0] || null);
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;

  const fav = isFavorite(selectedProduct.id);
  const hasCustomPhoto = Boolean(getCustomProductImage(selectedProduct.id, selectedProduct.image));
  const activeVar = selectedVariation || selectedProduct.variations[0];

  const handleAddToCart = () => {
    if (!activeVar) return;
    addToCart(selectedProduct, activeVar, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="px-5 py-3.5 bg-[#17191D] text-white flex items-center justify-between gap-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider truncate">
            <span className="px-2 py-0.5 rounded bg-[#D9252A] text-white">
              {selectedProduct.brand}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-slate-300 truncate">{selectedProduct.categoryName}</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden sm:inline font-mono text-sky-300">
              Cód: {selectedProduct.code}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Fechar detalhes do produto"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="p-5 sm:p-7 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column: Product Image Stage (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className="rounded-xl border border-[#E5E7EB] overflow-hidden bg-[#F4F5F7]">
              <ProductVisual
                product={selectedProduct}
                selectedVariationLabel={activeVar?.label}
                size="lg"
              />
            </div>

            {!hasCustomPhoto && (
              <p className="text-[11px] text-[#737780] text-center mt-2.5">
                Representação visual técnica da embalagem. Confirme especificações na listagem ao lado.
              </p>
            )}

            {/* Packaging & Application Summary Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB] space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Package className="w-4 h-4 text-[#202C70] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-extrabold text-[#17191D] block">Apresentação / Embalagem:</span>
                  <span className="text-[#737780]">{selectedProduct.packaging}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-[#E5E7EB]">
                <Wrench className="w-4 h-4 text-[#D9252A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-extrabold text-[#17191D] block">Aplicação Principal:</span>
                  <span className="text-[#737780]">{selectedProduct.application}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Details & Actions (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#202C70]">
                  {selectedProduct.productType}
                </span>
                <h2
                  id="modal-product-title"
                  className="text-xl sm:text-2xl font-extrabold text-[#17191D] mt-0.5 leading-tight"
                >
                  {selectedProduct.brand} — {selectedProduct.name}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#17191D]/90 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Technical Specifications Chips */}
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#737780] mb-2">
                  Especificações Técnicas e Normas
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.specifications.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-md bg-[#EEF1FA] text-[#202C70] border border-[#202C70]/20 text-xs font-bold"
                    >
                      {spec}
                    </span>
                  ))}
                  {selectedProduct.viscosities.map((visc) => (
                    <span
                      key={`visc-${visc}`}
                      className="px-2.5 py-1 rounded-md bg-[#17191D] text-white font-mono text-xs font-bold"
                    >
                      SAE {visc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Variation Selection (Required before adding to cart) */}
              <div className="p-4 rounded-xl bg-[#F4F5F7] border border-[#E5E7EB]">
                <label className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#17191D] mb-2.5">
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#D9252A]" aria-hidden="true" />
                    <span>Escolha a Variação / Opção Desejada:</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#202C70]">
                    {selectedProduct.variations.length}{' '}
                    {selectedProduct.variations.length === 1 ? 'opção' : 'opções'}
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProduct.variations.map((v) => {
                    const isSelected = activeVar?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariation(v)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#202C70] text-white border-[#202C70] shadow-xs'
                            : 'bg-white hover:border-[#202C70] text-[#17191D] border-[#E5E7EB]'
                        }`}
                      >
                        <span className="truncate pr-2">{v.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Honest Compatibility Note */}
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Nota Técnica:</strong> Sempre confira a viscosidade e especificação exigida no
                  manual do seu veículo ou confirme a compatibilidade exata com nossa equipe pelo WhatsApp.
                </span>
              </div>
            </div>

            {/* Quantity & Action Buttons */}
            <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center justify-between sm:justify-start border border-[#E5E7EB] rounded-lg bg-[#F4F5F7] px-2 h-12 shrink-0">
                  <span className="text-xs font-bold text-[#737780] px-2 sm:hidden">
                    Quantidade:
                  </span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-md hover:bg-white text-[#17191D] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={999}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                      }
                      aria-label="Quantidade de unidades"
                      className="w-12 text-center bg-transparent font-mono text-sm font-extrabold text-[#17191D] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-9 h-9 rounded-md hover:bg-white text-[#17191D] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Primary Add to Cart CTA */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 px-6 rounded-lg font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedFeedback
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#D9252A] hover:bg-[#B81D22] text-white shadow-md shadow-[#D9252A]/20'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {addedFeedback
                      ? 'ADICIONADO À SOLICITAÇÃO!'
                      : 'ADICIONAR AO CARRINHO'}
                  </span>
                </button>
              </div>

              {/* Direct Single-Product WhatsApp Inquiry */}
              <a
                href={buildSingleProductWhatsAppUrl(selectedProduct, activeVar, quantity)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 px-4 rounded-lg border border-emerald-600/30 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>Consultar Apenas Este Item pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

