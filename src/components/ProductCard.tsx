import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Check, Layers } from 'lucide-react';
import { Product, ProductVariation } from '../types/product';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleFavorite, isFavorite, setSelectedProduct } = useShop();

  const [selectedVar, setSelectedVar] = useState<ProductVariation>(product.variations[0]);
  const [justAdded, setJustAdded] = useState(false);

  const fav = isFavorite(product.id);
  const hasMultipleVariations = product.variations.length > 1;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVar, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group bg-white rounded-xl border border-[#E5E7EB] hover:border-[#202C70]/45 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col overflow-hidden">
      {/* Top Image Stage */}
      <div className="relative border-b border-[#E5E7EB]/80">
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-wrap gap-1.5 max-w-[78%]">
          <span className="px-2 py-0.5 rounded bg-[#202C70] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
            {product.brand}
          </span>
          {product.isOpportunity && (
            <span className="px-2 py-0.5 rounded bg-[#D9252A] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
              {product.opportunityLabel || 'Destaque'}
            </span>
          )}
        </div>

        {/* Top-Right Action Buttons (Quick Details) */}
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedProduct(product)}
            className="w-9 h-9 rounded-lg bg-white/90 hover:bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[#202C70] transition-colors cursor-pointer"
            aria-label={`Ver detalhes técnicos de ${product.brand} ${product.name}`}
            title="Ver detalhes técnicos"
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Clickable Product Image */}
        <button
          type="button"
          onClick={() => setSelectedProduct(product)}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#202C70] cursor-pointer"
          aria-label={`Abrir ficha de ${product.brand} ${product.name}`}
        >
          <ProductVisual
            product={product}
            selectedVariationLabel={selectedVar?.label}
            size="md"
          />
        </button>

        {/* Bottom-Right Viscosity or Packaging Overlay */}
        {product.viscosities.length > 0 && (
          <div className="absolute bottom-2 right-2.5 z-20 flex flex-wrap justify-end gap-1 pointer-events-none">
            {product.viscosities.slice(0, 3).map((v) => (
              <span
                key={v}
                className="px-1.5 py-0.5 rounded bg-[#17191D]/90 text-white font-mono text-[10px] font-bold"
              >
                {v}
              </span>
            ))}
            {product.viscosities.length > 3 && (
              <span className="px-1.5 py-0.5 rounded bg-[#17191D]/90 text-amber-300 font-mono text-[10px] font-bold">
                +{product.viscosities.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Category & Code */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-[#737780] font-medium mb-1">
            <span className="truncate">{product.categoryName}</span>
            <span className="font-mono text-[10px] text-slate-400 shrink-0">{product.code}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-[15px] font-extrabold text-[#17191D] leading-snug group-hover:text-[#202C70] transition-colors">
            <button
              type="button"
              onClick={() => setSelectedProduct(product)}
              className="text-left hover:underline focus:outline-none cursor-pointer"
            >
              {product.brand} — {product.name}
            </button>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#737780] line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>

          {/* Technical Specifications Tags */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.specifications.slice(0, 3).map((spec) => (
              <span
                key={spec}
                className="px-2 py-0.5 rounded bg-[#F4F5F7] text-[#17191D] border border-[#E5E7EB] text-[10px] font-semibold"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Variations & CTA Footer */}
        <div className="pt-2.5 border-t border-[#E5E7EB] space-y-2.5">
          {/* Interactive Variation Selector */}
          <div>
            <label
              htmlFor={`var-select-${product.id}`}
              className="flex items-center justify-between text-[11px] font-bold text-[#17191D] mb-1"
            >
              <span className="inline-flex items-center gap-1 text-[#202C70]">
                <Layers className="w-3 h-3" aria-hidden="true" />
                <span>
                  {hasMultipleVariations
                    ? `Selecione a variação (${product.variations.length}):`
                    : 'Especificação / Variação:'}
                </span>
              </span>
            </label>

            {product.variations.length <= 3 ? (
              <div className="flex flex-wrap gap-1">
                {product.variations.map((v) => {
                  const isSel = selectedVar?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVar(v)}
                      className={`px-2 py-1 rounded text-[11px] font-bold border transition-all cursor-pointer truncate max-w-full ${
                        isSel
                          ? 'bg-[#202C70] text-white border-[#202C70]'
                          : 'bg-[#F4F5F7] hover:bg-[#EEF1FA] text-[#17191D] border-[#E5E7EB]'
                      }`}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <select
                id={`var-select-${product.id}`}
                value={selectedVar?.id}
                onChange={(e) => {
                  const found = product.variations.find((v) => v.id === e.target.value);
                  if (found) setSelectedVar(found);
                }}
                className="w-full h-9 px-2.5 rounded-lg border border-[#E5E7EB] bg-[#F4F5F7] focus:bg-white focus:border-[#202C70] text-xs font-bold text-[#17191D] focus:outline-none cursor-pointer"
              >
                {product.variations.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Primary Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full h-10 px-3 rounded-lg font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#D9252A] hover:bg-[#B81D22] text-white shadow-xs'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>ADICIONADO AO CARRINHO</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                <span>ADICIONAR AO CARRINHO</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

