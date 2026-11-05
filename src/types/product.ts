export type AvailabilityStatus = 'sob_consulta' | 'disponivel' | 'pendente_confirmacao';

export type ContainerStyle =
  | 'oil-bottle-1l'
  | 'oil-bottle-4l'
  | 'heavy-bucket-20l'
  | 'spray-aerosol'
  | 'additive-bottle'
  | 'coolant-bottle'
  | 'grease-pot'
  | 'wax-tin'
  | 'service-kit'
  | 'filter-box'
  | 'wiper-blade'
  | 'tachograph-disc'
  | 'sealant-tube'
  | 'tape-roll'
  | 'air-freshener'
  | 'welder-machine'
  | 'workshop-tool'
  | 'chemical-carboy';

export interface ProductVariation {
  id: string;
  label: string;
  viscosity?: string;
  specification?: string;
  packaging?: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  productType: string;
  description: string;
  specifications: string[];
  viscosities: string[];
  variations: ProductVariation[];
  packaging: string;
  application: string;
  containerStyle: ContainerStyle;
  accentColor?: string;
  image?: string;
  price?: number;
  featured?: boolean;
  mostSearched?: boolean;
  isOpportunity?: boolean;
  opportunityLabel?: string;
  availabilityStatus: AvailabilityStatus;
}

export interface Category {
  id: string;
  number: string;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  iconName: string;
  productCount?: number;
  featuredSpecs: string[];
}

export interface CartItem {
  cartItemId: string; // `${product.id}::${variationId}`
  product: Product;
  selectedVariation: ProductVariation;
  quantity: number;
}

export type SortOption = 'relevance' | 'alpha-asc' | 'alpha-desc';

export interface FilterState {
  searchQuery: string;
  categoryId: string | null;
  brands: string[];
  productTypes: string[];
  viscosities: string[];
  specifications: string[];
  applications: string[];
  variations: string[];
  onlyFeatured: boolean;
  onlyOpportunities: boolean;
  sortBy: SortOption;
}

