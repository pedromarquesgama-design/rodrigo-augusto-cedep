import React, { useState, useEffect, useCallback } from 'react';
import { ShopProvider } from './context/ShopContext';
import { FilterState } from './types/product';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { CommercialSections } from './components/CommercialSections';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { MobileCategoryDrawer } from './components/MobileCategoryDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  categoryId: null,
  brands: [],
  productTypes: [],
  viscosities: [],
  specifications: [],
  applications: [],
  variations: [],
  onlyFeatured: false,
  onlyOpportunities: false,
  sortBy: 'relevance',
};

const StorefrontContent: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('categoria');
    const q = params.get('busca') || '';
    const brand = params.get('marca');
    const sae = params.get('sae');
    return {
      ...INITIAL_FILTERS,
      categoryId: cat || null,
      searchQuery: q,
      brands: brand ? [brand] : [],
      viscosities: sae ? [sae] : [],
    };
  });

  const [activeView, setActiveView] = useState<'home' | 'catalog'>('home');

  // Keep URL query params updated cleanly
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categoryId) params.set('categoria', filters.categoryId);
    if (filters.searchQuery.trim()) params.set('busca', filters.searchQuery.trim());
    if (filters.brands.length === 1) params.set('marca', filters.brands[0]);
    if (filters.viscosities.length === 1) params.set('sae', filters.viscosities[0]);
    const qs = params.toString();
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [filters.categoryId, filters.searchQuery, filters.brands, filters.viscosities]);

  const scrollToCatalog = useCallback(() => {
    setActiveView('catalog');
    setTimeout(() => {
      const el = document.getElementById('catalogo-produtos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  }, []);

  const handleSelectCategory = useCallback(
    (catId: string | null) => {
      setFilters((prev) => ({
        ...prev,
        categoryId: catId,
        productTypes: [],
        viscosities: [],
        specifications: [],
        applications: [],
        variations: [],
      }));
      scrollToCatalog();
    },
    [scrollToCatalog]
  );

  const handleSelectBrand = useCallback(
    (brandName: string) => {
      setFilters({
        ...INITIAL_FILTERS,
        brands: [brandName],
      });
      scrollToCatalog();
    },
    [scrollToCatalog]
  );

  const handleQuickFilterViscosity = useCallback(
    (visc: string) => {
      setFilters({
        ...INITIAL_FILTERS,
        viscosities: [visc],
      });
      scrollToCatalog();
    },
    [scrollToCatalog]
  );

  const handleSearchChange = useCallback((q: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: q,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const handleNavigateSection = useCallback((sectionId: string) => {
    setActiveView('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }, []);

  const handleGoHome = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F7] text-[#17191D]">
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategoryId={filters.categoryId}
        onSelectCategory={handleSelectCategory}
        onNavigateSection={handleNavigateSection}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main className="flex-1">
        <HeroSection
          onExploreProducts={scrollToCatalog}
          onQuickFilterViscosity={handleQuickFilterViscosity}
          onSelectCategory={(catId) => handleSelectCategory(catId)}
        />

        <CategorySection
          selectedCategoryId={filters.categoryId}
          onSelectCategory={handleSelectCategory}
          onQuickFilterViscosity={handleQuickFilterViscosity}
        />

        {/* Complete Filterable Catalog Section placed prominently for fast shopping */}
        <CatalogSection
          filters={filters}
          setFilters={setFilters}
          onResetFilters={handleResetFilters}
        />

        {/* Homepage Commercial & Brand Sections */}
        <CommercialSections
          onSelectBrand={handleSelectBrand}
          onExploreAllCatalog={() => {
            handleResetFilters();
            scrollToCatalog();
          }}
        />
      </main>

      <Footer onSelectCategory={handleSelectCategory} />

      {/* Overlays, Modals & Mobile Navigation */}
      <ProductDetailModal />
      <CartDrawer />
      <FavoritesDrawer />
      <MobileCategoryDrawer
        selectedCategoryId={filters.categoryId}
        onSelectCategory={handleSelectCategory}
      />
      <MobileBottomNav onGoHome={handleGoHome} onNavigateSection={handleNavigateSection} />
      <ToastNotification />
    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <StorefrontContent />
    </ShopProvider>
  );
}

export default App;

