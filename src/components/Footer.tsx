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

        {/* Bottom Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">{BUSINESS_CONFIG.commercialName}</strong> ({BUSINESS_CONFIG.historicalTagline}). Todos os direitos reservados.
          </p>
          <p className="text-center sm:text-right">
            Catálogo Digital & Sistema de Solicitação de Disponibilidade e Orçamento via WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
};

