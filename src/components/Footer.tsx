import React from 'react';
import {
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  ClipboardCheck,
  Headphones,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { BUSINESS_CONFIG, buildGeneralInquiryWhatsAppUrl } from '../config/business';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';

interface FooterProps {
  onSelectCategory: (catId: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const { setIsCartOpen } = useShop();

  return (
    <footer id="rodape-contato" className="bg-[#17191D] text-white border-t border-white/10">
      {/* Top Trust Strip */}
      <div className="border-b border-white/10 bg-[#202C70]/35">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 text-sky-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Atendimento Especializado
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Suporte técnico para indicação correta por aplicação.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 text-amber-300 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Diversidade de Marcas
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Líderes do setor de lubrificantes, filtros e manutenção.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 text-red-400 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Solicitação de Orçamento Simplificada
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Monte sua lista online e consulte disponibilidade na hora.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Suporte via WhatsApp
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Atendimento direto para clientes, frotas e oficinas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & Identification (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center bg-white p-2.5 rounded-xl shadow-md">
              <img
                src="/images/cedep-logo-header.png?v=2"
                alt="CEDEP Lubrificantes — Desde 1982"
                className="h-14 w-auto object-contain"
              />
            </div>

            <div>
              <span className="inline-block px-2.5 py-0.5 rounded bg-[#D9252A] text-white text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                {BUSINESS_CONFIG.historicalTagline}
              </span>
              <h2 className="text-base font-extrabold text-white">
                {BUSINESS_CONFIG.commercialName}
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Plataforma comercial e catálogo completo de óleos lubrificantes para motos, carros
                e linha pesada, fluidos de transmissão e hidráulicos, graxas, aditivos, arrefecimento,
                estética automotiva, colas, filtros e equipamentos para oficina.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={buildGeneralInquiryWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Atendimento WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Ver Meu Orçamento</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Column 2: Main Categories Pt 1 (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
              Lubrificantes & Fluidos
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Main Categories Pt 2 (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
              Manutenção & Oficina
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {CATEGORIES.slice(8, 15).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory(null)}
                  className="font-bold text-amber-400 hover:underline text-left cursor-pointer"
                >
                  Ver Todas as 15 Categorias →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Business Information Placeholders (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
              Canais de Atendimento e Informações Comerciais
            </h3>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-white block">WhatsApp / Telefone Comercial:</span>
                  <span>{BUSINESS_CONFIG.whatsappDisplayPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-white block">Horário de Atendimento:</span>
                  <span>{BUSINESS_CONFIG.contactInformation.businessHoursPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9252A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-white block">Localização / Endereço:</span>
                  <span>{BUSINESS_CONFIG.contactInformation.addressPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-white block">E-mail & Redes Sociais:</span>
                  <span className="block">{BUSINESS_CONFIG.contactInformation.emailPlaceholder}</span>
                  <span className="block text-slate-400 mt-0.5">
                    Instagram: {BUSINESS_CONFIG.contactInformation.instagramPlaceholder}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Porto.com Development & Persuasive Lead Capture Section */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#1C2029] via-[#16181E] to-[#0D0E12] border border-white/10 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Ambient luminous glow accents */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 max-w-2xl">
              <a
                href="https://www.portocom.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 sm:h-16 px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 hover:border-sky-500/40 hover:bg-white/10 transition-all cursor-pointer"
                title="Conheça a PORTOCOM"
              >
                <img
                  src="/images/logo-portocom.png"
                  alt="PORTOCOM | Design & Engenharia Digital"
                  className="h-10 sm:h-12 w-auto object-contain mix-blend-screen"
                  loading="lazy"
                />
              </a>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] font-bold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Design & Engenharia Digital</span>
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Gostou da velocidade e da experiência deste site?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Este catálogo digital foi projetado e desenvolvido sob medida pela <a href="https://www.portocom.net/" target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline decoration-sky-400 hover:text-sky-300 transition-colors">PORTOCOM</a>. Criamos sites rápidos, catálogos interativos e plataformas de alto padrão para marcas que querem liderar o mercado e transformar visitantes em clientes.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href="https://www.portocom.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Fazer Orçamento Comigo</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">{BUSINESS_CONFIG.commercialName}</strong> ({BUSINESS_CONFIG.historicalTagline}). Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1.5 text-center sm:text-right">
            <span>Desenvolvido com excelência por</span>
            <a
              href="https://www.portocom.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-sky-400 transition-colors inline-flex items-center gap-1 underline underline-offset-4 decoration-white/30 hover:decoration-sky-400"
            >
              PORTOCOM
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

