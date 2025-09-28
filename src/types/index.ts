export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  quantity: number;
  price: number;
  categoryAr: string;
  categoryEn: string;
  description?: string;
  secoCode?: string;
  supplier?: string;
  supplierAr?: string;
  importDate?: string;
  inventoryDates?: { [date: string]: number };
  totalReceived?: number;
  totalSold?: number;
  currentStock?: number;
}

export interface Language {
  code: 'ar' | 'en';
  name: string;
  dir: 'rtl' | 'ltr';
}

export const languages: Language[] = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' }
];

export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  inStock: boolean;
  secoCode?: string;
  specifications?: string[];
  image?: string;
}