import { FilterState, Product } from '../types/product';

/**
 * Normalizes text for accent-insensitive and hyphen-tolerant search matching.
 */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function normalizeCompact(input: string): string {
  return normalizeText(input).replace(/[\s\-./()]+/g, '');
}

export function productMatchesSearch(product: Product, query: string): { matches: boolean; score: number } {
  const trimmed = query.trim();
  if (!trimmed) {
    return { matches: true, score: product.featured ? 10 : 0 };
  }

  const normQuery = normalizeText(trimmed);
  const compactQuery = normalizeCompact(trimmed);
  const tokens = normQuery.split(/\s+/).filter(Boolean);

  const fields = {
    name: normalizeText(product.name),
    brand: normalizeText(product.brand),
    category: normalizeText(product.categoryName),
    type: normalizeText(product.productType),
    specs: normalizeText(product.specifications.join(' ')),
    viscosities: normalizeText(product.viscosities.join(' ')),
    variations: normalizeText(product.variations.map((v) => v.label).join(' ')),
    application: normalizeText(product.application),
    description: normalizeText(product.description),
    code: normalizeText(product.code),
  };

  const fullSearchable = Object.values(fields).join(' ');
  const compactSearchable = normalizeCompact(fullSearchable);

  // Check if compact query directly matches (e.g. "wd40" -> "wd-40", "20w50" -> "20w-50", "militec1" -> "militec 1")
  if (compactQuery.length >= 2 && compactSearchable.includes(compactQuery)) {
    let score = 50;
    if (normalizeCompact(product.brand + product.name).includes(compactQuery)) score += 40;
    if (normalizeCompact(product.viscosities.join(' ')).includes(compactQuery)) score += 30;
    return { matches: true, score };
  }

  // Otherwise every token must match either normally or compactly
  let score = 0;
  // Exact phrase bonus
  if (fields.name.includes(normQuery) || fields.brand.includes(normQuery)) score += 45;
  if (fields.specs.includes(normQuery) || fields.variations.includes(normQuery)) score += 40;
  if (fields.type.includes(normQuery) || fields.category.includes(normQuery)) score += 30;

  for (const token of tokens) {
    const compactToken = token.replace(/[\-./]+/g, '');
    const tokenMatched =
      fullSearchable.includes(token) ||
      (compactToken.length >= 2 && compactSearchable.includes(compactToken));

    if (!tokenMatched) {
      return { matches: false, score: 0 };
    }

    if (fields.brand.includes(token)) score += 25;
    if (fields.name.includes(token)) score += 25;
    if (fields.viscosities.includes(token) || normalizeCompact(fields.viscosities).includes(compactToken)) score += 20;
    if (fields.specs.includes(token)) score += 15;
    if (fields.variations.includes(token)) score += 15;
    if (fields.category.includes(token) || fields.type.includes(token)) score += 12;
    if (fields.application.includes(token) || fields.description.includes(token)) score += 6;
  }

  return { matches: true, score };
}

export interface AvailableFacets {
  brands: { value: string; count: number }[];
  productTypes: { value: string; count: number }[];
  viscosities: { value: string; count: number }[];
  specifications: { value: string; count: number }[];
  applications: { value: string; count: number }[];
  variations: { value: string; count: number }[];
}

/**
 * Extracts only the relevant filters for the currently selected category (or all products if no category is selected).
 */
export function extractAvailableFacets(
  allProducts: Product[],
  selectedCategoryId: string | null
): AvailableFacets {
  const scopedProducts = selectedCategoryId
    ? allProducts.filter((p) => p.categoryId === selectedCategoryId)
    : allProducts;

  const brandCounts = new Map<string, number>();
  const typeCounts = new Map<string, number>();
  const viscCounts = new Map<string, number>();
  const specCounts = new Map<string, number>();
  const appCounts = new Map<string, number>();
  const varCounts = new Map<string, number>();

  for (const p of scopedProducts) {
    brandCounts.set(p.brand, (brandCounts.get(p.brand) || 0) + 1);
    typeCounts.set(p.productType, (typeCounts.get(p.productType) || 0) + 1);
    appCounts.set(p.application, (appCounts.get(p.application) || 0) + 1);

    for (const v of p.viscosities) {
      viscCounts.set(v, (viscCounts.get(v) || 0) + 1);
    }
    for (const s of p.specifications) {
      // Avoid duplicating exact viscosity strings in general technical specifications
      if (!p.viscosities.includes(s)) {
        specCounts.set(s, (specCounts.get(s) || 0) + 1);
      }
    }
    for (const vr of p.variations) {
      varCounts.set(vr.label, (varCounts.get(vr.label) || 0) + 1);
    }
  }

  const mapToSortedArray = (map: Map<string, number>) =>
    Array.from(map.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value, 'pt-BR'));

  return {
    brands: mapToSortedArray(brandCounts),
    productTypes: mapToSortedArray(typeCounts),
    viscosities: mapToSortedArray(viscCounts),
    specifications: mapToSortedArray(specCounts),
    applications: mapToSortedArray(appCounts),
    variations: mapToSortedArray(varCounts),
  };
}

export function filterAndSortProducts(products: Product[], filters: FilterState): Product[] {
  const scored: { product: Product; score: number }[] = [];

  for (const product of products) {
    if (filters.categoryId && product.categoryId !== filters.categoryId) {
      continue;
    }

    if (filters.onlyFeatured && !product.featured) {
      continue;
    }

    if (filters.onlyOpportunities && !product.isOpportunity) {
      continue;
    }

    if (filters.brands.length > 0) {
      const brandMatch = filters.brands.some(
        (b) => normalizeText(product.brand).includes(normalizeText(b)) || product.brand === b
      );
      if (!brandMatch) continue;
    }

    if (filters.productTypes.length > 0 && !filters.productTypes.includes(product.productType)) {
      continue;
    }

    if (filters.viscosities.length > 0) {
      const hasVisc = filters.viscosities.some((v) => product.viscosities.includes(v));
      if (!hasVisc) continue;
    }

    if (filters.specifications.length > 0) {
      const hasSpec = filters.specifications.some((s) => product.specifications.includes(s));
      if (!hasSpec) continue;
    }

    if (filters.applications.length > 0 && !filters.applications.includes(product.application)) {
      continue;
    }

    if (filters.variations.length > 0) {
      const hasVar = filters.variations.some((vLabel) =>
        product.variations.some((pv) => pv.label === vLabel)
      );
      if (!hasVar) continue;
    }

    const searchRes = productMatchesSearch(product, filters.searchQuery);
    if (!searchRes.matches) {
      continue;
    }

    scored.push({ product, score: searchRes.score });
  }

  if (filters.sortBy === 'alpha-asc') {
    scored.sort((a, b) =>
      `${a.product.brand} ${a.product.name}`.localeCompare(
        `${b.product.brand} ${b.product.name}`,
        'pt-BR'
      )
    );
  } else if (filters.sortBy === 'alpha-desc') {
    scored.sort((a, b) =>
      `${b.product.brand} ${b.product.name}`.localeCompare(
        `${a.product.brand} ${a.product.name}`,
        'pt-BR'
      )
    );
  } else {
    // Relevance: search score first, then featured, then mostSearched
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const aFeat = (a.product.featured ? 2 : 0) + (a.product.mostSearched ? 1 : 0);
      const bFeat = (b.product.featured ? 2 : 0) + (b.product.mostSearched ? 1 : 0);
      return bFeat - aFeat;
    });
  }

  return scored.map((item) => item.product);
}
