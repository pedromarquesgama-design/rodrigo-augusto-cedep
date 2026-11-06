import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { BUSINESS_CONFIG, buildGeneralInquiryWhatsAppUrl } from '../config/business';
import { useShop } from '../context/ShopContext';
import { CategoryIcon } from './CategoryIcon';
import { productMatchesSearch } from '../utils/catalogSearch';
import { Product } from '../types/product';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategoryId: string | null;
  onSelectCategory: (catId: string | null) => void;
  onNavigateSection: (sectionId: string) => void;
  activeView: 'home' | 'catalog';
  setActiveView: (view: 'home' | 'catalog') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategoryId,
  onSelectCategory,
  onNavigateSection,
  activeView,
  setActiveView,
}) => {
  const {
    totalUnits,
    uniqueProductsCount,
    favoriteIds,
    setIsCartOpen,
    setIsFavoritesOpen,
    setIsMobileCategoriesOpen,
    setSelectedProduct,
  } = useShop();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = isScrolled || activeView === 'catalog';

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search modal on Escape key and prevent background scroll
  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchModalOpen]);

  // Instant autocomplete suggestions (top 6 matches)
  const searchSuggestions: Product[] = React.useMemo(() => {
    if (!localSearch.trim() || localSearch.trim().length < 2) return [];
    return PRODUCTS.map((p) => ({ product: p, ...productMatchesSearch(p, localSearch) }))
      .filter((item) => item.matches)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((item) => item.product);
  }, [localSearch]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearchChange(localSearch);
    setIsSearchFocused(false);
    setIsSearchModalOpen(false);
    setActiveView('catalog');
    setTimeout(() => {
      const catalogEl = document.getElementById('catalogo-produtos');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleQuickSearchTerm = (term: string) => {
    setLocalSearch(term);
    onSearchChange(term);
    setIsSearchFocused(false);
    setIsSearchModalOpen(false);
    setActiveView('catalog');
    setTimeout(() => {
      const catalogEl = document.getElementById('catalogo-produtos');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleCategoryClick = (catId: string | null) => {
    onSelectCategory(catId);
    setIsMobileMenuOpen(false);
    setActiveView('catalog');
    setTimeout(() => {
      const catalogEl = document.getElementById('catalogo-produtos');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isSolid
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#E5E7EB]'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent border-transparent pointer-events-none'
      }`}
    >
      {/* Top Corporate Bar */}
      <div
        className={`bg-[#17191D] text-white text-xs border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isSolid ? 'hidden md:block max-h-9 opacity-100' : 'max-h-0 opacity-0 py-0 border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center flex-nowrap whitespace-nowrap gap-x-2 overflow-hidden">
            <span className="w-[7px] h-[7px] rounded-full bg-[#BE111B] shrink-0" aria-hidden="true" />
            <span className="text-[13px] font-light uppercase tracking-[0.06em] text-[#CFD0D5]">
              RODRIGO AUGUSTO
            </span>
            <span className="h-[9px] w-[1px] bg-[#929196] shrink-0 self-center" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.03em] text-[#A8A7AE]">
              CEDEP LUBRIFICANTES
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={buildGeneralInquiryWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Central de Cotação WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div
        className={`transition-colors duration-300 ${
          isSolid ? 'bg-transparent text-[#17191D]' : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-3.5 pointer-events-auto">
          <div className="flex items-center justify-between gap-3 lg:gap-8">
            {/* Official CEDEP Logo */}
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory(null);
                onSearchChange('');
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-3 group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#202C70] rounded-lg transition-opacity duration-300 ${
                isSolid ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Rodrigo Augusto — CEDEP Lubrificantes — Ir para o início"
            >
              <div className="h-10 sm:h-12 lg:h-13 w-auto flex items-center">
                <img
                  src="/images/cedep-logo-header.png?v=2"
                  alt="CEDEP Lubrificantes — Desde 1982"
                  className="h-9 sm:h-11 lg:h-12 w-auto object-contain transition-all duration-300"
                />
              </div>
              <div
                className={`hidden xl:flex flex-col border-l pl-3 transition-colors ${
                  isSolid ? 'border-[#E5E7EB]' : 'border-white/30'
                }`}
              >
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    isSolid ? 'text-[#202C70]' : 'text-white'
                  }`}
                >
                  Rodrigo Augusto
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSolid ? 'text-[#737780]' : 'text-slate-300'
                  }`}
                >
                  Catálogo Oficial & Cotação
                </span>
              </div>
            </a>

            {/* Prominent Desktop Search Field */}
            <div ref={searchContainerRef} className="hidden md:block flex-1 max-w-2xl relative">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
                <div
                  className={`relative flex items-center w-full rounded-lg border-2 transition-all ${
                    isSolid
                      ? 'border-[#E5E7EB] bg-[#F4F5F7] text-[#17191D] focus-within:bg-white focus-within:border-[#202C70] focus-within:ring-4 focus-within:ring-[#202C70]/10'
                      : 'border-white/25 bg-black/40 backdrop-blur-md text-white focus-within:bg-black/70 focus-within:border-white/50 focus-within:ring-4 focus-within:ring-white/10'
                  }`}
                >
                  <Search
                    className={`w-5 h-5 ml-3.5 shrink-0 pointer-events-none ${
                      isSolid ? 'text-[#737780]' : 'text-white/70'
                    }`}
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={localSearch}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => {
                      setLocalSearch(e.target.value);
                      onSearchChange(e.target.value);
                    }}
                    placeholder="Buscar por produto, marca, viscosidade (ex: Mobil 20W-50, YPF Elaion, WD-40, Militec 1)..."
                    aria-label="Buscar produtos no catálogo CEDEP Lubrificantes"
                    className={`w-full bg-transparent py-2.5 pl-3 pr-3 text-sm focus:outline-none ${
                      isSolid
                        ? 'text-[#17191D] placeholder-[#737780]'
                        : 'text-white placeholder-white/70'
                    }`}
                  />
                  {localSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setLocalSearch('');
                        onSearchChange('');
                      }}
                      className="p-1.5 text-[#737780] hover:text-[#17191D] cursor-pointer"
                      aria-label="Limpar busca"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="m-1 px-4 py-2 bg-[#202C70] hover:bg-[#182157] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer shrink-0"
                  >
                    Buscar
                  </button>
                </div>
              </form>

              {/* Instant Search Autocomplete Dropdown */}
              {isSearchFocused && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-[#E5E7EB] shadow-xl overflow-hidden z-50">
                  {localSearch.trim().length < 2 ? (
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#737780] mb-2.5">
                        Buscas Rápidas Técnicas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Mobil 20W-50',
                          'YPF Elaion',
                          '5W-30 Sintético',
                          '15W-40 Diesel',
                          'Filtro de óleo',
                          'WD-40',
                          'Militec 1',
                          'Kit Revisão',
                          'Arla 32',
                          'DOT 4',
                        ].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => handleQuickSearchTerm(term)}
                            className="px-3 py-1.5 text-xs font-medium bg-[#F4F5F7] hover:bg-[#EEF1FA] text-[#17191D] hover:text-[#202C70] rounded-md border border-[#E5E7EB] transition-colors cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : searchSuggestions.length > 0 ? (
                    <div>
                      <div className="px-4 py-2 bg-[#F4F5F7] border-b border-[#E5E7EB] flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#737780]">
                          Produtos Encontrados
                        </span>
                        <button
                          type="button"
                          onClick={handleSearchSubmit}
                          className="text-xs font-bold text-[#D9252A] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Ver todos no catálogo</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <ul className="divide-y divide-[#E5E7EB] max-h-80 overflow-y-auto custom-scrollbar">
                        {searchSuggestions.map((prod) => (
                          <li key={prod.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setIsSearchFocused(false);
                                setSelectedProduct(prod);
                              }}
                              className="w-full px-4 py-2.5 text-left hover:bg-[#F4F5F7] flex items-center justify-between gap-3 transition-colors cursor-pointer"
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#EEF1FA] text-[#202C70]">
                                    {prod.brand}
                                  </span>
                                  <span className="text-sm font-bold text-[#17191D] truncate">
                                    {prod.name}
                                  </span>
                                </div>
                                <p className="text-xs text-[#737780] truncate mt-0.5">
                                  {prod.categoryName} · {prod.variations.length} opç{prod.variations.length === 1 ? 'ão' : 'ões'}
                                </p>
                              </div>
                              {prod.viscosities.length > 0 && (
                                <span className="shrink-0 font-mono text-xs font-bold px-2 py-1 rounded bg-slate-100 text-[#17191D] border border-slate-200">
                                  {prod.viscosities.slice(0, 2).join(' / ')}
                                </span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="p-5 text-center">
                      <p className="text-sm font-semibold text-[#17191D]">
                        Nenhum produto direto para "{localSearch}"
                      </p>
                      <p className="text-xs text-[#737780] mt-1">
                        Pressione Enter para buscar no catálogo ou consulte nossa equipe no WhatsApp.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Direct WhatsApp Button (Desktop) */}
              <a
                href={buildGeneralInquiryWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden lg:inline-flex items-center gap-2 px-3.5 h-11 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  isSolid
                    ? 'border-emerald-600/30 bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-900'
                    : 'border-emerald-400/40 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 backdrop-blur-md'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                <div className="flex flex-col text-left leading-tight">
                  <span
                    className={`text-[10px] font-medium ${
                      isSolid ? 'text-emerald-700' : 'text-emerald-400'
                    }`}
                  >
                    Dúvida Técnica?
                  </span>
                  <span>WhatsApp</span>
                </div>
              </a>

              {/* Desktop Shopping Cart Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="hidden lg:inline-flex items-center gap-2.5 px-3.5 sm:px-4 h-11 rounded-lg bg-[#D9252A] hover:bg-[#B81D22] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                aria-label={`Abrir carrinho de orçamento com ${totalUnits} unidades`}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                  <span
                    aria-live="polite"
                    className="absolute -top-2 -right-2.5 min-w-[20px] h-5 px-1 rounded-full bg-[#17191D] text-white text-[11px] font-extrabold flex items-center justify-center border border-white/20"
                  >
                    {totalUnits}
                  </span>
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[10px] font-medium text-white/85 uppercase tracking-wider">
                    Orçamento
                  </span>
                  <span className="text-xs font-extrabold mt-0.5">
                    {uniqueProductsCount === 0
                      ? 'Carrinho'
                      : `${uniqueProductsCount} ${uniqueProductsCount === 1 ? 'item' : 'itens'}`}
                  </span>
                </div>
              </button>

              {/* Mobile Magnifying Glass Search Button */}
              <button
                type="button"
                onClick={() => {
                  setIsSearchModalOpen(true);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-[10px] border transition-all cursor-pointer shrink-0 shadow-xs ${
                  isSolid
                    ? 'border-[#E5E7EB] bg-white text-[#17191D] hover:bg-[#F4F5F7]'
                    : 'border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40'
                }`}
                aria-label="Abrir busca de produtos"
              >
                <Search className="w-[18px] h-[18px]" aria-hidden="true" />
              </button>

              {/* Mobile Cart Button (moved from bottom nav) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className={`lg:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-[10px] border transition-all cursor-pointer shrink-0 shadow-xs ${
                  isSolid
                    ? 'border-[#E5E7EB] bg-white text-[#D9252A] hover:bg-[#F4F5F7]'
                    : 'border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40'
                }`}
                aria-label={`Abrir carrinho com ${totalUnits} unidades`}
              >
                <ShoppingCart className="w-[18px] h-[18px]" aria-hidden="true" />
                {totalUnits > 0 && (
                  <span
                    aria-live="polite"
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D9252A] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white/90"
                  >
                    {totalUnits}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar removed as requested */}
      {/* Mobile Slide-Down Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] z-50 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-h-[calc(100vh-64px)] overflow-y-auto border-b border-[#E5E7EB] shadow-2xl p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#202C70]">
                  Menu de Navegação
                </p>
                <p className="text-xs text-[#737780]">{BUSINESS_CONFIG.commercialName}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-[#737780] hover:text-[#17191D]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSelectCategory(null);
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 rounded-lg bg-[#F4F5F7] text-left font-bold text-xs text-[#17191D]"
              >
                Início
              </button>
              <button
                type="button"
                onClick={() => handleCategoryClick(null)}
                className="p-3 rounded-lg bg-[#F4F5F7] text-left font-bold text-xs text-[#17191D]"
              >
                Catálogo Completo
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateSection('principais-marcas');
                }}
                className="p-3 rounded-lg bg-[#F4F5F7] text-left font-bold text-xs text-[#17191D]"
              >
                Principais Marcas
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateSection('ofertas-oportunidades');
                }}
                className="p-3 rounded-lg bg-[#F4F5F7] text-left font-bold text-xs text-[#17191D]"
              >
                Ofertas & Kits
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateSection('rodape-contato');
                }}
                className="p-3 rounded-lg bg-[#F4F5F7] text-left font-bold text-xs text-[#17191D]"
              >
                Contato & Endereço
              </button>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#737780] mb-2">
                Departamentos (15 Categorias)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#F4F5F7] text-left border border-[#E5E7EB]/60"
                  >
                    <div className="w-7 h-7 rounded bg-[#EEF1FA] text-[#202C70] flex items-center justify-center shrink-0">
                      <CategoryIcon iconName={cat.iconName} className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#17191D]">
                      {cat.number}. {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E7EB] flex flex-col gap-2">
              <a
                href={buildGeneralInquiryWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-[#16A34A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span>Falar com Equipe no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Overlay Modal (Triggered by the magnifying glass button) */}
      {isSearchModalOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex flex-col pointer-events-auto">
          <div className="bg-white p-4 shadow-2xl border-b border-[#E5E7EB]">
            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#737780] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    onSearchChange(e.target.value);
                  }}
                  placeholder="Buscar produto, marca, viscosidade..."
                  className="w-full h-11 pl-9 pr-9 rounded-lg border-2 border-[#202C70] bg-[#F4F5F7] text-sm text-[#17191D] focus:bg-white focus:outline-none placeholder:text-[#737780]"
                />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocalSearch('');
                      onSearchChange('');
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#737780] hover:text-[#17191D] cursor-pointer"
                    aria-label="Limpar busca"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="px-4 h-11 rounded-lg bg-[#202C70] hover:bg-[#182157] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                Buscar
              </button>

              <button
                type="button"
                onClick={() => setIsSearchModalOpen(false)}
                className="p-2 text-[#737780] hover:text-[#17191D] cursor-pointer"
                aria-label="Fechar busca"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Quick Search Suggestions when empty or short */}
            {localSearch.trim().length < 2 && (
              <div className="mt-3.5 pt-3 border-t border-[#E5E7EB]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#737780] mb-2">
                  Buscas Rápidas Populares
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Mobil 20W-50',
                    'YPF Elaion',
                    '5W-30 Sintético',
                    '15W-40 Diesel',
                    'Filtro de óleo',
                    'WD-40',
                    'Militec 1',
                    'Aditivo Radiador',
                    'DOT 4',
                  ].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleQuickSearchTerm(term)}
                      className="px-2.5 py-1.5 text-xs font-semibold bg-[#F4F5F7] hover:bg-[#EEF1FA] text-[#17191D] hover:text-[#202C70] rounded-md border border-[#E5E7EB] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Autocomplete Suggestions */}
            {localSearch.trim().length >= 2 && searchSuggestions.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center justify-between pb-2 mb-1 border-b border-[#E5E7EB]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#737780]">
                    Produtos Encontrados ({searchSuggestions.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-xs font-bold text-[#D9252A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver no catálogo</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
                <ul className="divide-y divide-[#E5E7EB] max-h-72 overflow-y-auto">
                  {searchSuggestions.map((prod) => (
                    <li key={prod.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setSelectedProduct(prod);
                        }}
                        className="w-full py-2.5 text-left flex items-center justify-between gap-2 text-xs hover:bg-[#F4F5F7] px-2 rounded-md transition-colors cursor-pointer"
                      >
                        <div className="truncate pr-2">
                          <span className="font-extrabold text-[#202C70] uppercase text-[11px]">
                            {prod.brand}
                          </span>{' '}
                          <span className="text-[#17191D] font-bold">{prod.name}</span>
                        </div>
                        {prod.viscosities.length > 0 && (
                          <span className="text-[10px] text-[#737780] shrink-0 font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                            {prod.viscosities[0]}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No matches notice */}
            {localSearch.trim().length >= 2 && searchSuggestions.length === 0 && (
              <div className="mt-3 pt-3 border-t border-[#E5E7EB] text-center py-3">
                <p className="text-xs font-bold text-[#17191D]">
                  Nenhum produto direto para "{localSearch}"
                </p>
                <p className="text-[11px] text-[#737780] mt-1 mb-2.5">
                  Pressione Buscar para tentar no catálogo completo.
                </p>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="px-4 py-2 rounded-lg bg-[#202C70] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Buscar no Catálogo
                </button>
              </div>
            )}
          </div>
          {/* Backdrop tap to close */}
          <div
            className="flex-1 cursor-pointer"
            onClick={() => setIsSearchModalOpen(false)}
            aria-label="Fechar busca"
          />
        </div>
      )}
    </header>
  );
};

