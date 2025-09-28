import React from 'react';
import { FileSpreadsheet, Package } from 'lucide-react';
import { Language } from '../types';

interface NavigationProps {
  currentPage: 'inventory' | 'catalog';
  onPageChange: (page: 'inventory' | 'catalog') => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  language
}) => {
  const isArabic = language.code === 'ar';

  const labels = {
    ar: {
      inventory: 'إدارة المخزون',
      catalog: 'كتالوج المنتجات'
    },
    en: {
      inventory: 'Inventory Management',
      catalog: 'Product Catalog'
    }
  };

  const t = labels[language.code];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex space-x-8">
            <button
              onClick={() => onPageChange('inventory')}
              className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                currentPage === 'inventory'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5" />
              {t.inventory}
            </button>
            <button
              onClick={() => onPageChange('catalog')}
              className={`flex items-center gap-2 py-4 px-6 border-b-2 font-medium text-sm transition-colors ${
                currentPage === 'catalog'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="w-5 h-5" />
              {t.catalog}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};