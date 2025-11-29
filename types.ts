export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number; // For deals
  storeId: string;
  category: string;
  ageMin: number;
  ageMax: number;
  gender: 'neutral' | 'boy' | 'girl';
  imageUrl: string;
  description: string;
  rating: number;
}

export interface Store {
  id: string;
  name: string;
  type: 'online' | 'physical' | 'both';
  logo: string;
  color: string;
}

export interface FilterState {
  selectedStoreIds: string[];
  ageRange: [number, number];
  gender: 'all' | 'boy' | 'girl';
  maxPrice: number;
  categories: string[];
  searchQuery: string;
}

export interface RegistryItem extends Product {
  addedAt: number;
  purchased: boolean;
  quantity: number;
}

export type ViewMode = 'catalog' | 'registry' | 'admin';
export type CatalogLayout = 'grid' | 'flipbook';