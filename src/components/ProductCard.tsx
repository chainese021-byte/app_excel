import React from 'react';
import { Package, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import { CatalogProduct, Language } from '../types';

interface ProductCardProps {
  product: CatalogProduct;
  language: Language;
  viewMode: 'grid' | 'list';
  onProductClick: (product: CatalogProduct) => void;
  onWhatsAppContact: (product: CatalogProduct) => void;
  onEmailContact: (product: CatalogProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  viewMode,
  onProductClick,
  onWhatsAppContact,
  onEmailContact
}) => {
  const isArabic = language.code === 'ar';

  const labels = {
    ar: {
      inStock: 'متوفر',
      outOfStock: 'غير متوفر',
      viewDetails: 'عرض التفاصيل',
      whatsapp: 'واتساب',
      email: 'إيميل',
      category: 'الفئة'
    },
    en: {
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      viewDetails: 'View Details',
      whatsapp: 'WhatsApp',
      email: 'Email',
      category: 'Category'
    }
  };

  const t = labels[language.code];

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 ml-4">
                {product.inStock ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t.inStock}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <XCircle className="w-4 h-4 mr-1" />
                    {t.outOfStock}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-sm text-blue-600 font-medium mb-2">{product.category}</p>
            <p className="text-gray-600 line-clamp-2 mb-4">{product.description}</p>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => onProductClick(product)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t.viewDetails}
              </button>
              <button
                onClick={() => onWhatsAppContact(product)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {t.whatsapp}
              </button>
              <button
                onClick={() => onEmailContact(product)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {t.email}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="aspect-square bg-gray-100 flex items-center justify-center p-8">
        <Package className="w-16 h-16 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{product.category}</span>
          {product.inStock ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              {t.inStock}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <XCircle className="w-3 h-3 mr-1" />
              {t.outOfStock}
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 min-h-[4rem]">
          {product.description}
        </p>
        
        <div className="space-y-2">
          <button
            onClick={() => onProductClick(product)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {t.viewDetails}
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onWhatsAppContact(product)}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-1 text-sm"
            >
              <Phone className="w-4 h-4" />
              {t.whatsapp}
            </button>
            <button
              onClick={() => onEmailContact(product)}
              className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-1 text-sm"
            >
              <Mail className="w-4 h-4" />
              {t.email}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};