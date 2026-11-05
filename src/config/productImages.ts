/**
 * CENTRALIZED PRODUCT IMAGE MANAGEMENT SYSTEM
 * ============================================
 * Rodrigo Augusto — CEDEP Lubrificantes
 *
 * Instructions for replacing temporary studio representations with individual product photographs:
 * 1. Place the individual product photograph inside `public/images/products/`
 *    (e.g., `public/images/products/ypf-elaion-moto-4t.jpg` or `.png` / `.webp`).
 * 2. Register the file path below under the corresponding product `id`.
 * 3. Any product with a valid path in `PRODUCT_IMAGE_MAP` will automatically render
 *    that photograph across the homepage, catalog grid, detail modal, and shopping cart.
 * 4. If an entry is `undefined` or empty, the platform renders a clean, high-precision
 *    technical packaging illustration tailored to that product's container, brand, and viscosity.
 *
 * IMPORTANT: Do NOT assign multi-product collage images from `products-pictures/` to individual products.
 */

export const PRODUCT_IMAGE_MAP: Record<string, string | undefined> = {
  // Category 01 — Óleos para Motos
  'ypf-elaion-moto-4t': '/images/products/ypf-elaion-moto-4t.png',
  'mobil-super-moto': '/images/products/mobil-super-moto.png',
  'castrol-actevo-essential-4t': '/images/products/castrol-actevo-essential-4t.png',
  'havoline-4t-motorcycle-oil': '/images/products/havoline-4t-motorcycle-oil.png',
  'lubrax-moto-4t-essencial': '/images/products/lubrax-moto-4t-essencial.png',
  'uni-gt4-moto-4t': '/images/products/uni-gt4-moto-4t.png',
  'uni-unix-dt-2t': '/images/products/uni-unix-dt-2t.png',

  // Category 02 — Óleos para Carros
  'acdelco-sintetico-api-sn': '/images/products/acdelco-sintetico-api-sn.png',
  'petronas-selenia-perform-k': '/images/products/petronas-selenia-perform-k.png',
  'maxi-performance-oleo-original-vw': '/images/products/maxi-performance-oleo-original-vw.png',
  'shell-helix-hx8': '/images/products/shell-helix-hx8.png',
  'castrol-magnatec-gtx-edge': '/images/products/castrol-magnatec-gtx-edge.png',
  'mobil-super-sl': '/images/products/mobil-super-sl.png',
  'havoline-prods-semissintetico-superior': '/images/products/havoline-prods-semissintetico-superior.png',
  'lubrax-valora-extremo-supera-tecno': '/images/products/lubrax-valora-extremo-supera-tecno.png',
  'ypf-elaion-f30-f50-vw': '/images/products/ypf-elaion-f30-f50-vw.png',
  'uni-tech-synth-multimax-carros': '/images/products/uni-tech-synth-multimax-carros.png',

  // Category 03 — Kits de Revisão
  'ypf-kit-revisao-elaion-completo': undefined,

  // Category 04 — Óleos para Pesados e Engrenagens
  'shell-rimula-r4x-spirax-s2a': '/images/products/shell-rimula-r4x-spirax-s2a.png',
  'mobil-delvac-modern-power': '/images/products/mobil-delvac-modern-power.png',
  'lubrax-extra-top-turbo-gold-gl5': '/images/products/lubrax-extra-top-turbo-gold-gl5.png',
  'ursa-super-td-premium-tdx-ultra': '/images/products/ursa-super-td-premium-tdx-ultra.png',
  'texaco-multigear-universal-ep': '/images/products/texaco-multigear-universal-ep.png',
  'uni-unigerol-multimax-super': '/images/products/uni-unigerol-multimax-super.png',
  'generico-wbf-100-sae90w': undefined,

  // Category 05 — Hidráulicos e Transmissão
  'uni-fta-unix-hidraulico-hidramax': '/images/products/uni-fta-unix-hidraulico-hidramax.png',
  'minigrax-hidra-c': undefined,
  'lubrax-atf-ta': '/images/products/lubrax-atf-ta.png',
  'havoline-texamatic-atf-7045e': '/images/products/havoline-texamatic-atf-7045e.png',
  'ypf-hidraulico-bp-68': undefined,
  'uni-oleo-corrente-motosserra': '/images/products/uni-oleo-corrente-motosserra.png',

  // Category 06 — Massas Consistentes e Graxas
  'texaco-marfak-mp2-mp3-starplex': '/images/products/texaco-marfak-mp2-mp3-starplex.png',
  'uni-unigrax-unilit-blue-ca2': '/images/products/uni-unigrax-unilit-blue-ca2.png',
  'mundial-prime-vaselina-solida': '/images/products/mundial-prime-vaselina-solida.png',
  'koube-firelub': '/images/products/koube-firelub.png',
  'ypf-grasa-63': '/images/products/ypf-grasa-63.png',

  // Category 07 — Sprays Técnicos e Manutenção
  'wd-40-produto-multiusos': '/images/products/wd-40-produto-multiusos.png',
  'car-80-lub-descarbonizante': undefined,
  'mundial-prime-mp1-mp80-manutencao': '/images/products/mundial-prime-mp1-mp80-manutencao.png',
  'orbi-quimica-white-lub-manutencao': '/images/products/orbi-quimica-white-lub-manutencao.png',
  'koube-hiper-fixo-od50-manutencao': '/images/products/koube-hiper-fixo-od50-manutencao.png',
  'tec-pro-bril-lub-silicone-reparador': '/images/products/tec-pro-bril-lub-silicone-reparador.png',
  'cra-lub-flush-silicone': '/images/products/cra-lub-flush-silicone.png',
  'racing-moto-removedor-graxa': '/images/products/racing-moto-removedor-graxa.png',

  // Category 08 — Aditivos para Motor e Combustível
  'koube-perfect-clean-konvertech-nanotech': '/images/products/koube-perfect-clean-konvertech-nanotech.png',
  'militec-1-condicionador-metais': '/images/products/militec-1-condicionador-metais.png',
  'bardahl-b12-plus': undefined,
  'motorkote-condicionador-metais': undefined,
  'super-prime-aditivo': undefined,
  'tec-100-descarbonizante': undefined,

  // Category 09 — Sistema de Arrefecimento
  'tec-cool-aditivo-concentrado': '/images/products/tec-cool-aditivo-concentrado.png',
  'radiex-anticorrosivo-limpa-radiador': '/images/products/radiex-anticorrosivo-limpa-radiador.png',
  'paraflu-aditivo-concentrado': '/images/products/paraflu-aditivo-concentrado.png',
  'koube-limpa-radiador-aditivo-selante': '/images/products/koube-limpa-radiador-aditivo-selante.png',
  'orbi-quimica-arrefecimento-linha': '/images/products/orbi-quimica-arrefecimento-linha.png',
  'tecovel-aditivo-multimarcas': '/images/products/tecovel-aditivo-multimarcas.png',
  'da-fabrica-agua-desmineralizada': '/images/products/da-fabrica-agua-desmineralizada.png',

  // Category 10 — Estética Automotiva e Limpeza
  '3m-auto-brilho-cera-polir-detailing': '/images/products/3m-auto-brilho-cera-polir-detailing.png',
  'centralsul-lava-carros-revitalizadores': '/images/products/centralsul-lava-carros-revitalizadores.png',
  'tecbril-cera-silicone-apc-visao-clara': '/images/products/tecbril-cera-silicone-apc-visao-clara.png',
  'orbi-quimica-pneu-pretinho-estetica': '/images/products/orbi-quimica-pneu-pretinho-estetica.png',
  'grand-prix-lava-auto-ceras': '/images/products/grand-prix-lava-auto-ceras.png',
  'tecovel-spuma-car-limpa-pneus': '/images/products/tecovel-spuma-car-limpa-pneus.png',
  'carnu-cera-com-silicone': '/images/products/carnu-cera-com-silicone.png',

  // Category 11 — Ambientadores e Perfumes
  'centralsul-climatizador-natuar-hotrod': '/images/products/centralsul-climatizador-natuar-hotrod.png',
  'tec-fresh-tecovel-geis-soft-fresh': '/images/products/tec-fresh-tecovel-geis-soft-fresh.png',
  'glade-auto-sport-sensations': '/images/products/glade-auto-sport-sensations.png',

  // Category 12 — Colas e Selantes
  'orbi-quimica-orbived-veda-escape': '/images/products/orbi-quimica-orbived-veda-escape.png',
  'mundial-prime-espuma-pu-super-cola': '/images/products/mundial-prime-espuma-pu-super-cola.png',
  '3m-adesivo-juntas-fitas-dupla-face': '/images/products/3m-adesivo-juntas-fitas-dupla-face.png',
  'ultra-weld-grey-ox': undefined,
  '3m-fita-refletiva': undefined,

  // Category 13 — Peças de Substituição
  'tecfil-filtros-e-palhetas': undefined,
  'bosch-aerofit-palhetas': '/images/products/bosch-aerofit-palhetas.png',
  'mann-racor-wega-filtros-automotivos': '/images/products/mann-racor-wega-filtros-automotivos.png',
  'vdo-discos-diagrama-bobina-tacografo': '/images/products/vdo-discos-diagrama-bobina-tacografo.png',

  // Category 14 — Ferramentas e Equipamentos
  'generico-bomba-manual-oleo-almotolia-chave': '/images/products/generico-bomba-manual-oleo-almotolia-chave.png',
  'generico-aparelho-sangria-teste-pressao': undefined,
  'esab-maquina-solda-bantam-max': '/images/products/esab-maquina-solda-bantam-max.png',
  'diversos-panos-microfibra-retalhos-estopa': '/images/products/diversos-panos-microfibra-retalhos-estopa.png',
  '3m-lixas-agua-seco-respirador-epi': '/images/products/3m-lixas-agua-seco-respirador-epi.png',

  // Category 15 — Químicos Base e Tintas
  'diversos-acido-betilimp-arla-32': '/images/products/diversos-acido-betilimp-arla-32.png',
  'chem-anti-rust': '/images/products/chem-anti-rust.png',
  'koube-fluido-freio-dot-4': undefined,
  'mundial-prime-tinta-spray-verniz-removedor': undefined,
};

export function getCustomProductImage(productId: string, directImage?: string): string | undefined {
  if (directImage && directImage.trim().length > 0) {
    return directImage;
  }
  return PRODUCT_IMAGE_MAP[productId];
}

