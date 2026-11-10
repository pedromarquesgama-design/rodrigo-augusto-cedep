import React, { useState } from 'react';
import {
  Filter,
  X,
  Search,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  SlidersHorizontal,
  CheckSquare,
  Square,
  PackageSearch,
} from 'lucide-react';
import { CATEGORIES, CATEGORY_MAP } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { FilterState, ProductVariation } from '../types/product';
import { extractAvailableFacets, filterAndSortProducts, normalizeCompact } from '../utils/catalogSearch';
import { ProductCard } from './ProductCard';
import { CategoryIcon } from './CategoryIcon';
import { buildGeneralInquiryWhatsAppUrl } from '../config/business';

interface CatalogSectionProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onResetFilters: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  filters,
  setFilters,
  onResetFilters,
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    categories: true,
    brands: true,
    viscosities: true,
    productTypes: false,
    specifications: false,
    applications: false,
    variations: false,
  });

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Dynamically extract facets relevant to the selected category
  const facets = React.useMemo(
    () => extractAvailableFacets(PRODUCTS, filters.categoryId),
    [filters.categoryId]
  );

  // Filtered and sorted products
  const matchingProducts = React.useMemo(
    () => filterAndSortProducts(PRODUCTS, filters),
    [filters]
  );

  // Pagination: exactly 15 products per page
  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when any filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(matchingProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = React.useMemo(
    () => matchingProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [matchingProducts, startIndex]
  );

  // Variação a pré-selecionar: pela faceta de variação, senão pela viscosidade buscada
  const preferredVariations = React.useMemo(() => {
    const map: Record<string, ProductVariation> = {};
    const q = normalizeCompact(filters.searchQuery);
    const varFilters = filters.variations.map(normalizeCompact);
    for (const p of matchingProducts) {
      let pick: ProductVariation | undefined;
      if (varFilters.length) {
        pick = p.variations.find((v) => varFilters.includes(normalizeCompact(v.label)));
      }
      if (!pick && q) {
        pick = p.variations.find((v) => q.includes(normalizeCompact(v.label)) && normalizeCompact(v.label).length >= 4);
      }
      if (pick) map[p.id] = pick;
    }
    return map;
  }, [matchingProducts, filters.searchQuery, filters.variations]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const catalogEl = document.getElementById('catalogo-produtos');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeCategory = filters.categoryId ? CATEGORY_MAP[filters.categoryId] : null;

  const toggleArrayFilter = (
    field: 'brands' | 'productTypes' | 'viscosities' | 'specifications' | 'applications' | 'variations',
    value: string
  ) => {
    setFilters((prev) => {
      const exists = prev[field].includes(value);
      const next = exists ? prev[field].filter((v) => v !== value) : [...prev[field], value];
      return { ...prev, [field]: next };
    });
  };

  const handleCategoryChange = (catId: string | null) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: catId,
      // Reset sub-filters that may not apply to the new category
      productTypes: [],
      viscosities: [],
      specifications: [],
      applications: [],
      variations: [],
    }));
  };

  const activeFilterCount =
    (filters.categoryId ? 1 : 0) +
    (filters.searchQuery.trim() ? 1 : 0) +
    filters.brands.length +
    filters.productTypes.length +
    filters.viscosities.length +
    filters.specifications.length +
    filters.applications.length +
    filters.variations.length +
    (filters.onlyFeatured ? 1 : 0) +
    (filters.onlyOpportunities ? 1 : 0);

  const renderFilterSidebarContent = () => (
    <div className="space-y-5">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#202C70]" aria-hidden="true" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#17191D]">
            Filtros Avançados
          </h3>
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#D9252A] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Limpar ({activeFilterCount})</span>
          </button>
        )}
      </div>

      {/* 1. Categories Filter */}
      <div className="border-b border-[#E5E7EB] pb-4">
        <button
          type="button"
          onClick={() => toggleGroup('categories')}
          className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#17191D] mb-2.5 cursor-pointer"
        >
          <span>Categoria (15)</span>
          {expandedGroups.categories ? (
            <ChevronUp className="w-4 h-4 text-[#737780]" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#737780]" aria-hidden="true" />
          )}
        </button>

        {expandedGroups.categories && (
          <div className="space-y-1 max-h-72 overflow-y-auto custom-scrollbar pr-1">
            <button
              type="button"
              onClick={() => handleCategoryChange(null)}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filters.categoryId === null
                  ? 'bg-[#202C70] text-white'
                  : 'text-[#17191D] hover:bg-[#F4F5F7]'
              }`}
            >
              <span>Todas as Categorias</span>
              <span className="font-mono text-[11px] opacity-80">{PRODUCTS.length}</span>
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = filters.categoryId === cat.id;
              const count = PRODUCTS.filter((p) => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#202C70] text-white font-bold'
                      : 'text-[#17191D] hover:bg-[#F4F5F7]'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <CategoryIcon
                      iconName={cat.iconName}
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isSelected ? 'text-sky-300' : 'text-[#202C70]'
                      }`}
                    />
                    <span className="truncate">
                      {cat.number}. {cat.name}
                    </span>
                  </span>
                  <span className="font-mono text-[11px] opacity-75 shrink-0">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Viscosities Filter (Only shown if relevant to the selected category!) */}
      {facets.viscosities.length > 0 && (
        <div className="border-b border-[#E5E7EB] pb-4">
          <button
            type="button"
            onClick={() => toggleGroup('viscosities')}
            className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#17191D] mb-2.5 cursor-pointer"
          >
            <span>Viscosidade / Grau ({facets.viscosities.length})</span>
            {expandedGroups.viscosities ? (
              <ChevronUp className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            )}
          </button>

          {expandedGroups.viscosities && (
            <div className="flex flex-wrap gap-1.5">
              {facets.viscosities.map(({ value, count }) => {
                const active = filters.viscosities.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleArrayFilter('viscosities', value)}
                    className={`px-2.5 py-1 rounded-md font-mono text-xs font-bold border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#D9252A] text-white border-[#D9252A]'
                        : 'bg-[#F4F5F7] hover:bg-[#EEF1FA] text-[#17191D] border-[#E5E7EB]'
                    }`}
                  >
                    {value} <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. Brands Filter */}
      {facets.brands.length > 0 && (
        <div className="border-b border-[#E5E7EB] pb-4">
          <button
            type="button"
            onClick={() => toggleGroup('brands')}
            className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#17191D] mb-2.5 cursor-pointer"
          >
            <span>Marca ({facets.brands.length})</span>
            {expandedGroups.brands ? (
              <ChevronUp className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            )}
          </button>

          {expandedGroups.brands && (
            <div className="space-y-1 max-h-56 overflow-y-auto custom-scrollbar pr-1">
              {facets.brands.map(({ value, count }) => {
                const checked = filters.brands.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleArrayFilter('brands', value)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[#F4F5F7] text-xs text-left transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2 truncate">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-[#D9252A] shrink-0" aria-hidden="true" />
                      ) : (
                        <Square className="w-4 h-4 text-[#737780] shrink-0" aria-hidden="true" />
                      )}
                      <span className={checked ? 'font-bold text-[#17191D]' : 'text-[#17191D]'}>
                        {value}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-[#737780]">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. Product Type Filter */}
      {facets.productTypes.length > 1 && (
        <div className="border-b border-[#E5E7EB] pb-4">
          <button
            type="button"
            onClick={() => toggleGroup('productTypes')}
            className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#17191D] mb-2.5 cursor-pointer"
          >
            <span>Tipo de Produto ({facets.productTypes.length})</span>
            {expandedGroups.productTypes ? (
              <ChevronUp className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            )}
          </button>

          {expandedGroups.productTypes && (
            <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {facets.productTypes.map(({ value, count }) => {
                const checked = filters.productTypes.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleArrayFilter('productTypes', value)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[#F4F5F7] text-xs text-left transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2 truncate">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-[#202C70] shrink-0" aria-hidden="true" />
                      ) : (
                        <Square className="w-4 h-4 text-[#737780] shrink-0" aria-hidden="true" />
                      )}
                      <span className="truncate">{value}</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#737780] shrink-0">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5. Technical Specifications Filter */}
      {facets.specifications.length > 0 && (
        <div className="border-b border-[#E5E7EB] pb-4">
          <button
            type="button"
            onClick={() => toggleGroup('specifications')}
            className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#17191D] mb-2.5 cursor-pointer"
          >
            <span>Especificação Técnica ({facets.specifications.length})</span>
            {expandedGroups.specifications ? (
              <ChevronUp className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            )}
          </button>

          {expandedGroups.specifications && (
            <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {facets.specifications.map(({ value, count }) => {
                const checked = filters.specifications.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleArrayFilter('specifications', value)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[#F4F5F7] text-xs text-left transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2 truncate">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-[#202C70] shrink-0" aria-hidden="true" />
                      ) : (
                        <Square className="w-4 h-4 text-[#737780] shrink-0" aria-hidden="true" />
                      )}
                      <span className="truncate">{value}</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#737780] shrink-0">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 6. Application Filter */}
      {facets.applications.length > 1 && (
        <div className="border-b border-[#E5E7EB] pb-4">
          <button
            type="button"
            onClick={() => toggleGroup('applications')}
            className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#17191D] mb-2.5 cursor-pointer"
          >
            <span>Aplicação ({facets.applications.length})</span>
            {expandedGroups.applications ? (
              <ChevronUp className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            )}
          </button>

          {expandedGroups.applications && (
            <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {facets.applications.map(({ value, count }) => {
                const checked = filters.applications.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleArrayFilter('applications', value)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[#F4F5F7] text-xs text-left transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2 truncate">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-[#202C70] shrink-0" aria-hidden="true" />
                      ) : (
                        <Square className="w-4 h-4 text-[#737780] shrink-0" aria-hidden="true" />
                      )}
                      <span className="truncate">{value}</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#737780] shrink-0">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 7. Product Variations Filter */}
      {facets.variations.length > 1 && (
        <div>
          <button
            type="button"
            onClick={() => toggleGroup('variations')}
            className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#17191D] mb-2.5 cursor-pointer"
          >
            <span>Variações ({facets.variations.length})</span>
            {expandedGroups.variations ? (
              <ChevronUp className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#737780]" aria-hidden="true" />
            )}
          </button>

          {expandedGroups.variations && (
            <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {facets.variations.map(({ value, count }) => {
                const checked = filters.variations.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleArrayFilter('variations', value)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[#F4F5F7] text-xs text-left transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2 truncate">
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-[#202C70] shrink-0" aria-hidden="true" />
                      ) : (
                        <Square className="w-4 h-4 text-[#737780] shrink-0" aria-hidden="true" />
                      )}
                      <span className="truncate">{value}</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#737780] shrink-0">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section id="catalogo-produtos" className="py-10 sm:py-14 bg-[#F4F5F7] border-t border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Catalog Banner / Context Header */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 sm:p-6 mb-6 shadow-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17191D]">
                {activeCategory ? activeCategory.name : 'Todos os Produtos Automotivos'}
              </h2>
              <p className="text-xs sm:text-sm text-[#737780] mt-1">
                {activeCategory
                  ? activeCategory.description
                  : 'Explore todas as 85 famílias de produtos, escolha a variação técnica desejada e adicione ao seu carrinho de orçamento.'}
              </p>
            </div>

            {/* Search & Sort Controls Bar */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Mobile Filter Trigger */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3.5 h-10 rounded-lg bg-[#202C70] text-white text-xs font-bold cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                <span>Filtros</span>
                {activeFilterCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#D9252A] text-white text-[10px]">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Inline Search inside Catalog */}
              <div className="relative flex-1 sm:flex-initial sm:w-64">
                <Search
                  className="w-4 h-4 text-[#737780] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
                  }
                  placeholder="Filtrar por nome, marca, SAE..."
                  aria-label="Filtrar produtos na listagem"
                  className="w-full h-10 pl-9 pr-8 rounded-lg border border-[#E5E7EB] bg-[#F4F5F7] focus:bg-white focus:border-[#202C70] text-xs sm:text-sm text-[#17191D] focus:outline-none"
                />
                {filters.searchQuery && (
                  <button
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#737780] hover:text-[#17191D] cursor-pointer"
                    aria-label="Limpar termo de busca"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters Chips Row */}
          {activeFilterCount > 0 && (
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#737780]">Filtros ativos:</span>

              {activeCategory && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF1FA] text-[#202C70] text-xs font-bold">
                  <span>Cat: {activeCategory.name}</span>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(null)}
                    className="hover:text-[#D9252A] cursor-pointer"
                    aria-label={`Remover filtro de categoria ${activeCategory.name}`}
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              )}

              {filters.searchQuery.trim() && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FEF2F2] text-[#D9252A] text-xs font-bold">
                  <span>Busca: "{filters.searchQuery}"</span>
                  <button
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                    className="hover:text-[#17191D] cursor-pointer"
                    aria-label="Remover filtro de busca"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              )}

              {filters.viscosities.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#17191D] text-white font-mono text-xs font-bold"
                >
                  <span>SAE: {v}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayFilter('viscosities', v)}
                    className="hover:text-red-300 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              ))}

              {filters.brands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF1FA] text-[#202C70] text-xs font-bold"
                >
                  <span>Marca: {b}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayFilter('brands', b)}
                    className="hover:text-[#D9252A] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              ))}

              {filters.productTypes.map((pt) => (
                <span
                  key={pt}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-[#17191D] text-xs font-semibold"
                >
                  <span>{pt}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayFilter('productTypes', pt)}
                    className="hover:text-[#D9252A] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              ))}

              {filters.specifications.map((sp) => (
                <span
                  key={sp}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-[#17191D] text-xs font-semibold"
                >
                  <span>{sp}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayFilter('specifications', sp)}
                    className="hover:text-[#D9252A] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              ))}

              {filters.applications.map((ap) => (
                <span
                  key={ap}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-[#17191D] text-xs font-semibold"
                >
                  <span>{ap}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayFilter('applications', ap)}
                    className="hover:text-[#D9252A] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              ))}

              {filters.variations.map((vr) => (
                <span
                  key={vr}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-[#17191D] text-xs font-semibold"
                >
                  <span>{vr}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayFilter('variations', vr)}
                    className="hover:text-[#D9252A] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={onResetFilters}
                className="ml-auto text-xs font-extrabold text-[#D9252A] hover:underline cursor-pointer"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>

        {/* Main Two-Column Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-card sticky top-36">
            {renderFilterSidebarContent()}
          </aside>

          {/* Product Grid Area (9 cols) */}
          <div className="lg:col-span-9">
            {/* Results Counter Bar */}
            <div className="flex items-center justify-between mb-4 px-1">
              <p className="text-xs sm:text-sm text-[#737780]">
                Exibindo{' '}
                <strong className="font-extrabold text-[#17191D]">
                  {matchingProducts.length === 0
                    ? 0
                    : `${startIndex + 1}–${Math.min(startIndex + ITEMS_PER_PAGE, matchingProducts.length)}`}
                </strong>{' '}
                de{' '}
                <strong className="font-extrabold text-[#17191D]">
                  {matchingProducts.length}
                </strong>{' '}
                {matchingProducts.length === 1
                  ? 'produto encontrado'
                  : 'produtos encontrados'}
              </p>

              <span className="text-xs text-[#737780] hidden sm:inline">
                Página {currentPage} de {totalPages}
              </span>
            </div>

            {matchingProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} preferredVariation={preferredVariations[product.id]} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <nav
                    aria-label="Navegação de páginas do catálogo"
                    className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3"
                  >
                    <button
                      type="button"
                      onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        currentPage === 1
                          ? 'border-[#E5E7EB] text-[#A0A4AB] bg-[#F4F5F7] cursor-not-allowed opacity-60'
                          : 'border-[#E5E7EB] bg-white text-[#17191D] hover:bg-[#F4F5F7] hover:border-[#CBD5E1] shadow-xs active:scale-95'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      <span>Anterior</span>
                    </button>

                    {/* Numeric Page Buttons */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        const isCurrent = page === currentPage;
                        const isNearby = Math.abs(page - currentPage) <= 1;
                        const isFirstOrLast = page === 1 || page === totalPages;

                        if (!isNearby && !isFirstOrLast) {
                          if (page === currentPage - 2 || page === currentPage + 2) {
                            return (
                              <span
                                key={page}
                                className="px-1 text-[#737780] text-xs font-bold select-none"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            aria-current={isCurrent ? 'page' : undefined}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center select-none ${
                              isCurrent
                                ? 'bg-[#202C70] text-white shadow-sm ring-2 ring-[#202C70]/30'
                                : 'bg-white border border-[#E5E7EB] text-[#17191D] hover:bg-[#F4F5F7] hover:border-[#CBD5E1]'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        currentPage === totalPages
                          ? 'border-[#E5E7EB] text-[#A0A4AB] bg-[#F4F5F7] cursor-not-allowed opacity-60'
                          : 'border-[#E5E7EB] bg-white text-[#17191D] hover:bg-[#F4F5F7] hover:border-[#CBD5E1] shadow-xs active:scale-95'
                      }`}
                    >
                      <span>Próxima</span>
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </nav>
                )}
              </>
            ) : (
              /* Proper No-Results State */
              <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 sm:p-12 text-center shadow-card">
                <div className="w-14 h-14 rounded-full bg-[#EEF1FA] text-[#202C70] flex items-center justify-center mx-auto mb-4">
                  <PackageSearch className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-extrabold text-[#17191D]">
                  Nenhum produto encontrado com esses filtros
                </h3>
                <p className="text-xs sm:text-sm text-[#737780] max-w-md mx-auto mt-1.5">
                  Não encontramos itens correspondentes à sua combinação atual de filtros ou busca.
                  Tente limpar os filtros ou consulte nossa equipe diretamente pelo WhatsApp.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="px-5 py-2.5 rounded-lg bg-[#202C70] hover:bg-[#182157] text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Restaurar Catálogo Completo
                  </button>
                  <a
                    href={buildGeneralInquiryWhatsAppUrl(
                      filters.searchQuery
                        ? `Consulta de disponibilidade para: ${filters.searchQuery}`
                        : 'Consulta de produto específico no catálogo'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Consultar Item no WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
            <div className="p-4 bg-[#202C70] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                <span className="font-extrabold text-sm uppercase tracking-wider">
                  Filtrar Catálogo ({matchingProducts.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-white"
                aria-label="Fechar filtros"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">{renderFilterSidebarContent()}</div>

            <div className="p-4 border-t border-[#E5E7EB] bg-[#F4F5F7] flex items-center gap-2.5">
              <button
                type="button"
                onClick={onResetFilters}
                className="flex-1 h-11 rounded-lg border border-[#E5E7EB] bg-white text-[#17191D] font-bold text-xs uppercase"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 h-11 rounded-lg bg-[#D9252A] text-white font-extrabold text-xs uppercase"
              >
                Ver {matchingProducts.length} Produtos
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

