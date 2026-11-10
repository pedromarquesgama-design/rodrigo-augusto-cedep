import { CartItem, Product, ProductVariation } from '../types/product';

export interface BusinessConfig {
  companyName: string;
  commercialName: string;
  primaryBrandName: string;
  historicalTagline: string;
  /**
   * Placeholder for the official company WhatsApp number in international format (55 + DDD + Number).
   * Replace '5500000000000' with the real number when deploying to production.
   */
  whatsappNumber: string;
  whatsappDisplayPlaceholder: string;
  defaultGreeting: string;
  defaultClosing: string;
  contactInformation: {
    phonePlaceholder: string;
    emailPlaceholder: string;
    addressPlaceholder: string;
    cityStatePlaceholder: string;
    businessHoursPlaceholder: string;
    instagramPlaceholder: string;
    facebookPlaceholder: string;
  };
  trustMessages: {
    id: string;
    title: string;
    subtitle: string;
  }[];
}

export const BUSINESS_CONFIG: BusinessConfig = {
  companyName: 'CEDEP Lubrificantes',
  commercialName: 'Rodrigo Augusto — CEDEP Lubrificantes',
  primaryBrandName: 'CEDEP Lubrificantes',
  historicalTagline: 'Desde 1982',
  whatsappNumber: '5573991999147',
  whatsappDisplayPlaceholder: '(73) 99199-9147',
  defaultGreeting:
    'Olá, equipe CEDEP! Tudo bem?\n\nGostaria de consultar a disponibilidade e solicitar um orçamento dos seguintes produtos:',
  defaultClosing:
    'Se possível, poderiam me informar a disponibilidade e os valores de cada item?\n\nFico no aguardo. Obrigado!',
  contactInformation: {
    phonePlaceholder: 'Telefone / WhatsApp: (73) 99199-9147',
    emailPlaceholder: 'Comercial: contato@cedeplubrificantes.com.br (A confirmar)',
    addressPlaceholder: 'Endereço comercial: Consulte nossa equipe pelo WhatsApp para retirada ou entrega',
    cityStatePlaceholder: 'Atendimento Presencial e Corporativo (B2B / B2C)',
    businessHoursPlaceholder: 'Segunda a Sexta: Horário comercial | Sábado: A confirmar',
    instagramPlaceholder: '@cedeplubrificantes (A confirmar)',
    facebookPlaceholder: '/cedeplubrificantes (A confirmar)',
  },
  trustMessages: [
    {
      id: 'atendimento',
      title: 'Atendimento Especializado',
      subtitle: 'Suporte técnico para indicação de lubrificantes, filtros e químicos automotivos.',
    },
    {
      id: 'marcas',
      title: 'Diversidade de Marcas',
      subtitle: 'Trabalhamos com líderes globais: Mobil, YPF, Castrol, Shell, Lubrax, Havoline, 3M e mais.',
    },
    {
      id: 'orcamento',
      title: 'Orçamento Simplificado',
      subtitle: 'Monte sua lista no catálogo e envie diretamente para cotação rápida.',
    },
    {
      id: 'whatsapp',
      title: 'Suporte via WhatsApp',
      subtitle: 'Verificação ágil de disponibilidade para clientes finais, frotas e oficinas.',
    },
  ],
};

export interface CustomerQuotationNotes {
  customerName?: string;
  companyOrWorkshop?: string;
  additionalNotes?: string;
}

/**
 * Generates the exact dynamic WhatsApp quotation message from the shopping cart items.
 */
export function buildWhatsAppQuotationMessage(
  items: CartItem[],
  notes?: CustomerQuotationNotes
): string {
  const productLines = items
    .map((item) => {
      const brandAndName = `${item.product.brand} — ${item.product.name}`;
      const varLabel = item.selectedVariation?.label?.trim() || '';
      const showVariation =
        varLabel &&
        !brandAndName.toLowerCase().includes(varLabel.toLowerCase()) &&
        !varLabel.toLowerCase().includes(item.product.name.toLowerCase());
      const variationText = showVariation ? ` — ${varLabel}` : '';
      return `- ${item.quantity}x ${item.product.brand} ${item.product.name}${variationText}`;
    })
    .join('\n');

  const extraContextLines: string[] = [];
  if (notes?.customerName?.trim()) {
    extraContextLines.push(`Cliente: ${notes.customerName.trim()}`);
  }
  if (notes?.companyOrWorkshop?.trim()) {
    extraContextLines.push(`Oficina / Empresa: ${notes.companyOrWorkshop.trim()}`);
  }
  if (notes?.additionalNotes?.trim()) {
    extraContextLines.push(`Observações: ${notes.additionalNotes.trim()}`);
  }

  const extraBlock =
    extraContextLines.length > 0 ? `\n\nDados adicionais:\n${extraContextLines.join('\n')}` : '';

  return `${BUSINESS_CONFIG.defaultGreeting}\n\n${productLines}${extraBlock}\n\n${BUSINESS_CONFIG.defaultClosing}`;
}

/**
 * Builds the official wa.me click-to-chat URL with proper UTF-8 URL encoding.
 */
export function buildWhatsAppUrl(message: string, customNumber?: string): string {
  const cleanNumber = (customNumber || BUSINESS_CONFIG.whatsappNumber).replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Generates a WhatsApp message for a single product consultation or B2B inquiry.
 */
export function buildSingleProductWhatsAppUrl(
  product: Product,
  variation?: ProductVariation,
  quantity: number = 1
): string {
  const variationSuffix = variation?.label ? ` — ${variation.label}` : '';
  const message = `${BUSINESS_CONFIG.defaultGreeting}\n\n- ${quantity}x ${product.brand} ${product.name}${variationSuffix}\n\n${BUSINESS_CONFIG.defaultClosing}`;
  return buildWhatsAppUrl(message);
}

export function buildGeneralInquiryWhatsAppUrl(subject?: string): string {
  const baseMessage = subject
    ? `Olá, equipe CEDEP! Tudo bem?\n\nGostaria de falar com a equipe sobre: ${subject}.\n\nFico no aguardo. Obrigado!`
    : `Olá, equipe CEDEP! Tudo bem?\n\nGostaria de falar com a equipe comercial sobre disponibilidade de produtos e orçamento.\n\nFico no aguardo. Obrigado!`;
  return buildWhatsAppUrl(baseMessage);
}
