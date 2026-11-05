import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  TrendingUp,
  ArrowRight,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';
import { PRODUCTS, MAIN_BRANDS } from '../data/products';
import { ProductCard } from './ProductCard';

interface CommercialSectionsProps {
  onSelectBrand: (brand: string) => void;
  onExploreAllCatalog: () => void;
}

export const CommercialSections: React.FC<CommercialSectionsProps> = ({
  onSelectBrand,
  onExploreAllCatalog,
}) => {
  const [featuredTab, setFeaturedTab] = useState<string>('todos');

  const featuredProducts = React.useMemo(() => {
    const allFeatured = PRODUCTS.filter((p) => p.featured);
    if (featuredTab === 'todos') return allFeatured.slice(0, 8);
    if (featuredTab === 'lubrificantes') {
      return allFeatured
        .filter((p) =>
          ['oleos-para-carros', 'oleos-para-motos', 'oleos-pesados-e-engrenagens'].includes(
            p.categoryId
          )
        )
        .slice(0, 8);
    }
    if (featuredTab === 'aditivos-sprays') {
      return allFeatured
        .filter((p) =>
          [
            'sprays-tecnicos-e-manutencao',
            'aditivos-motor-e-combustivel',
            'sistema-de-arrefecimento',
          ].includes(p.categoryId)
        )
        .slice(0, 8);
    }
    if (featuredTab === 'estetica-pecas') {
      return allFeatured
        .filter((p) =>
          [
            'estetica-automotiva-e-limpeza',
            'pecas-de-substituicao',
            'kits-de-revisao',
            'colas-e-selantes',
          ].includes(p.categoryId)
        )
        .slice(0, 8);
    }
    return allFeatured.slice(0, 8);
  }, [featuredTab]);

  const mostSearchedProducts = React.useMemo(
    () => PRODUCTS.filter((p) => p.mostSearched).slice(0, 8),
    []
  );

  const opportunityProducts = React.useMemo(
    () => PRODUCTS.filter((p) => p.isOpportunity),
    []
  );

  return (
    <div className="space-y-12 sm:space-y-16 pb-8">
      {/* =====================================================================
          1. PRODUTOS EM DESTAQUE
         ===================================================================== */}
      <section id="produtos-destaque" className="pt-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#D9252A] mb-1">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Seleção Técnica CEDEP</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17191D]">
                Produtos em Destaque
              </h2>
              <p className="text-xs sm:text-sm text-[#737780] mt-1">
                Principais soluções em óleos automotivos, sprays técnicos, aditivos e manutenção.
              </p>
            </div>

            {/* Category Quick Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'todos', label: 'Destaques Gerais' },
                { id: 'lubrificantes', label: 'Óleos & Lubrificantes' },
                { id: 'aditivos-sprays', label: 'Aditivos & Sprays' },
                { id: 'estetica-pecas', label: 'Kits, Filtros & Estética' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFeaturedTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    featuredTab === tab.id
                      ? 'bg-[#202C70] text-white'
                      : 'bg-white hover:bg-[#EEF1FA] text-[#17191D] border border-[#E5E7EB]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PRINCIPAIS MARCAS
         ===================================================================== */}
      <section id="principais-marcas" className="bg-white py-10 sm:py-12 border-y border-[#E5E7EB]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#202C70] mb-1">
                <Award className="w-4 h-4 text-[#D9252A]" aria-hidden="true" />
                <span>Fabricantes Homologados</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#17191D]">
                Principais Marcas Trabalhadas
              </h2>
              <p className="text-xs sm:text-sm text-[#737780] mt-1">
                Clique em qualquer marca para filtrar imediatamente os produtos disponíveis no catálogo.
              </p>
            </div>

            <button
              type="button"
              onClick={onExploreAllCatalog}
              className="text-xs sm:text-sm font-bold text-[#202C70] hover:text-[#D9252A] inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Ver todas no catálogo</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3">
            {MAIN_BRANDS.map((brand) => (
              <button
                key={brand.name}
                type="button"
                onClick={() => onSelectBrand(brand.name)}
                className="group p-3.5 rounded-xl border border-[#E5E7EB] bg-[#F4F5F7]/60 hover:bg-white hover:border-[#202C70] hover:shadow-card transition-all text-left flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-extrabold text-[#17191D] group-hover:text-[#202C70] tracking-tight">
                    {brand.name}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: brand.accent }}
                    aria-hidden="true"
                  />
                </div>
                <span className="text-[11px] text-[#737780] mt-1.5 line-clamp-1">
                  {brand.tagline}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. MAIS PROCURADOS
         ===================================================================== */}
      <section id="mais-procurados">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#202C70] mb-1">
                <TrendingUp className="w-4 h-4 text-[#D9252A]" aria-hidden="true" />
                <span>Alta Demanda na Loja</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17191D]">
                Produtos Mais Procurados
              </h2>
              <p className="text-xs sm:text-sm text-[#737780] mt-1">
                Itens essenciais selecionados para revisão periódica, lubrificação e cuidados automotivos.
              </p>
            </div>

            <button
              type="button"
              onClick={onExploreAllCatalog}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#202C70] hover:text-[#D9252A] cursor-pointer self-start sm:self-auto"
            >
              <span>Explorar catálogo completo</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {mostSearchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. OFERTAS E OPORTUNIDADES (HONEST COMMERCIAL SECTION)
         ===================================================================== */}
      <section id="ofertas-oportunidades">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 sm:p-8 shadow-card">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FEF2F2] text-[#D9252A] text-xs font-extrabold uppercase tracking-wider mb-2">
                  <PackageCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Ofertas, Kits & Oportunidades Comerciais</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#17191D]">
                  Kits de Revisão, Embalagens Econômicas 20L e Equipamentos
                </h2>
                <p className="text-xs sm:text-sm text-[#737780] mt-1 max-w-3xl">
                  Consulte condições comerciais para kits completos de troca de óleo + filtros,
                  baldes de 20 litros para frotas e equipamentos para oficinas.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#EEF1FA] text-[#202C70] px-4 py-3 rounded-xl border border-[#202C70]/15 shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#D9252A] shrink-0" aria-hidden="true" />
                <div className="text-xs">
                  <span className="font-extrabold block">Condições sob Consulta</span>
                  <span className="text-[#737780]">
                    Adicione ao carrinho para cotação atualizada via WhatsApp
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {opportunityProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

