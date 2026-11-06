import React from 'react';
import { MessageSquareQuote, Quote } from 'lucide-react';
import {
  InfiniteMovingCards,
  type InfiniteMovingCardItem,
} from '@/components/ui/infinite-moving-cards';

/**
 * ATENÇÃO: depoimentos de exemplo (placeholder).
 * Substitua pelos depoimentos reais de clientes da CEDEP Lubrificantes
 * (com autorização) antes de publicar o site em produção.
 */
const TESTIMONIALS: InfiniteMovingCardItem[] = [
  {
    id: 1,
    title: 'Orçamento rápido pelo WhatsApp',
    description:
      'Montei o carrinho com óleo 5W-30 e filtros, enviei pelo WhatsApp e em poucos minutos o Rodrigo já tinha me passado valores e disponibilidade.',
    rating: 5,
    tags: ['Óleos para Carros', 'Filtros'],
    name: 'Carlos Henrique',
    role: 'Cliente particular',
  },
  {
    id: 2,
    title: 'Parceiro da nossa oficina',
    description:
      'Compramos lubrificantes em balde de 20L e graxas para a oficina. Atendimento técnico, sempre indica a especificação certa para cada motor.',
    rating: 5,
    tags: ['Oficina', 'Graxas'],
    name: 'Marcos Oliveira',
    role: 'Proprietário de oficina mecânica',
  },
  {
    id: 3,
    title: 'Linha completa para motos',
    description:
      'Encontrei o óleo 4T certinho para minha moto e ainda levei spray de corrente. Catálogo fácil de navegar pelo celular.',
    rating: 5,
    tags: ['Óleos para Motos', 'Sprays'],
    name: 'Juliana Santos',
    role: 'Motociclista',
  },
  {
    id: 4,
    title: 'Atende bem a frota',
    description:
      'Abastecemos a frota de caminhões com óleo 15W-40 diesel e aditivo de radiador. Entrega organizada e preço justo.',
    rating: 5,
    tags: ['Pesados', 'Arrefecimento'],
    name: 'Roberto Almeida',
    role: 'Gestor de frota',
  },
  {
    id: 5,
    title: 'Marcas de confiança',
    description:
      'Trabalham com Mobil, Shell, Castrol, Lubrax e YPF. Dá para comparar as opções e escolher sem dor de cabeça.',
    rating: 5,
    tags: ['Marcas originais'],
    name: 'Fernanda Lima',
    role: 'Cliente particular',
  },
  {
    id: 6,
    title: 'Estética automotiva em um só lugar',
    description:
      'Além do óleo, comprei cera, pretinho para pneus e microfibras. Tudo para o carro em um só lugar, como prometem.',
    rating: 5,
    tags: ['Estética Automotiva'],
    name: 'André Souza',
    role: 'Detailer',
  },
];

const TestimonialCard: React.FC<{ item: InfiniteMovingCardItem }> = ({ item }) => (
  <article className="relative h-full w-[min(20rem,calc(100vw-3rem))] sm:w-[22rem] rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all flex flex-col gap-3">
    <Quote className="absolute top-4 right-4 w-7 h-7 text-[#D9252A]/15" aria-hidden="true" />

    <div className="flex items-center gap-0.5 text-amber-400 text-sm" aria-label={`${item.rating} de 5 estrelas`}>
      {Array.from({ length: Math.round(item.rating ?? 5) }, (_, i) => (
        <span key={i}>★</span>
      ))}
    </div>

    {item.title && (
      <h3 className="text-[15px] font-extrabold text-[#17191D] leading-snug pr-8">
        {item.title}
      </h3>
    )}

    {item.description && (
      <p className="text-[13px] leading-relaxed text-[#4B5563] flex-1">
        “{item.description}”
      </p>
    )}

    <div className="pt-3 border-t border-[#E5E7EB]">
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#17191D] truncate">{item.name}</p>
        <p className="text-xs text-[#737780] truncate">{item.role}</p>
      </div>
    </div>
  </article>
);

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="bg-white py-10 sm:py-14 border-y border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#D9252A] mb-1.5">
          <MessageSquareQuote className="w-4 h-4" aria-hidden="true" />
          <span>Depoimentos de Clientes</span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17191D]">
          Quem Compra na CEDEP Recomenda
        </h2>
      </div>

      <InfiniteMovingCards
        items={TESTIMONIALS}
        speed="slow"
        direction="left"
        gap={16}
        renderItem={(item) => <TestimonialCard item={item} />}
      />
    </section>
  );
};

