import React from 'react';
import { X, Package, Phone, Mail, CheckCircle, XCircle, Tag } from 'lucide-react';
import { CatalogProduct, Language } from '../types';

interface ProductModalProps {
  product: CatalogProduct | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onWhatsAppContact: (product: CatalogProduct) => void;
  onEmailContact: (product: CatalogProduct) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  language,
  onWhatsAppContact,
  onEmailContact
}) => {
  const isArabic = language.code === 'ar';

  const labels = {
    ar: {
      productDetails: 'تفاصيل المنتج',
      description: 'الوصف',
      specifications: 'المواصفات',
      category: 'الفئة',
      availability: 'التوفر',
      inStock: 'متوفر',
      outOfStock: 'غير متوفر',
      secoCode: 'كود SECO',
      contactForPurchase: 'اتصل للشراء',
      whatsapp: 'واتساب',
      email: 'إيميل',
      close: 'إغلاق'
    },
    en: {
      productDetails: 'Product Details',
      description: 'Description',
      specifications: 'Specifications',
      category: 'Category',
      availability: 'Availability',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      secoCode: 'SECO Code',
      contactForPurchase: 'Contact for Purchase',
      whatsapp: 'WhatsApp',
      email: 'Email',
      close: 'Close'
    }
  };

  const t = labels[language.code];

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-600" />
            {t.productDetails}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Image */}
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <Package className="w-24 h-24 text-gray-400" />
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-4 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <Tag className="w-4 h-4 mr-1" />
                    {product.category}
                  </span>
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
                {product.secoCode && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{t.secoCode}:</span> {product.secoCode}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{t.description}</h4>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{t.specifications}</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">{t.contactForPurchase}</h4>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>+1872752725</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>saif@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => onWhatsAppContact(product)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {t.whatsapp}
            </button>
            <button
              onClick={() => onEmailContact(product)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              {t.email}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};