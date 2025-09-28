import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Phone, Mail, Package, Grid2x2 as Grid, List } from 'lucide-react';
import { Language, CatalogProduct } from '../types';
import { catalogProducts, productCategories } from '../data/catalogProducts';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';

interface ProductCatalogProps {
  language: Language;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [showModal, setShowModal] = useState(false);

  const isArabic = language.code === 'ar';

  const labels = {
    ar: {
      title: 'كتالوج المنتجات',
      subtitle: 'تصفح مجموعتنا الواسعة من المعدات الكهربائية',
      search: 'البحث في المنتجات...',
      category: 'الفئة',
      allCategories: 'جميع الفئات',
      viewGrid: 'عرض شبكي',
      viewList: 'عرض قائمة',
      productsFound: 'منتج موجود',
      noProducts: 'لم يتم العثور على منتجات',
      noProductsDesc: 'جرب تغيير مصطلحات البحث أو الفئة',
      contactInfo: 'معلومات الاتصال للشراء',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      whatsapp: 'واتساب',
      sendMessage: 'إرسال رسالة',
      inStock: 'متوفر',
      outOfStock: 'غير متوفر',
      specifications: 'المواصفات',
      description: 'الوصف'
    },
    en: {
      title: 'Product Catalog',
      subtitle: 'Browse our extensive collection of electrical equipment',
      search: 'Search products...',
      category: 'Category',
      allCategories: 'All Categories',
      viewGrid: 'Grid View',
      viewList: 'List View',
      productsFound: 'products found',
      noProducts: 'No products found',
      noProductsDesc: 'Try changing your search terms or category',
      contactInfo: 'Contact Information for Purchase',
      phone: 'Phone',
      email: 'Email',
      whatsapp: 'WhatsApp',
      sendMessage: 'Send Message',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      specifications: 'Specifications',
      description: 'Description'
    }
  };

  const t = labels[language.code];

  // Filter products based on search and category
  const filteredProducts = catalogProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: CatalogProduct) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleWhatsAppContact = (product?: CatalogProduct) => {
    const phoneNumber = '1872752725';
    const message = product 
      ? `Hello, I'm interested in purchasing: ${product.name}. Please provide more details.`
      : 'Hello, I would like to inquire about your electrical equipment products.';
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = (product?: CatalogProduct) => {
    const subject = product 
      ? `Inquiry about ${product.name}`
      : 'Product Inquiry';
    const body = product
      ? `Hello,\n\nI'm interested in purchasing the following product:\n\nProduct: ${product.name}\nDescription: ${product.description}\n\nPlease provide pricing and availability information.\n\nThank you.`
      : 'Hello,\n\nI would like to inquire about your electrical equipment products.\n\nThank you.';
    
    const mailtoUrl = `mailto:saif@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${language.dir === 'rtl' ? 'rtl' : 'ltr'}`} dir={language.dir}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">{t.title}</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contact Information Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <ShoppingCart className="w-6 h-6" />
            {t.contactInfo}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-200" />
              <div>
                <p className="font-medium">{t.phone}</p>
                <p className="text-blue-100">+1872752725</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-200" />
              <div>
                <p className="font-medium">{t.email}</p>
                <p className="text-blue-100">saif@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleWhatsAppContact()}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {t.whatsapp}
              </button>
              <button
                onClick={() => handleEmailContact()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {t.sendMessage}
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {productCategories.map(category => (
                    <option key={category} value={category}>
                      {category === 'All Categories' ? t.allCategories : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={t.viewGrid}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title={t.viewList}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              <span className="font-semibold text-blue-600">{filteredProducts.length}</span> {t.productsFound}
            </p>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{t.noProducts}</h3>
            <p className="text-gray-500">{t.noProductsDesc}</p>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
          }`}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                language={language}
                viewMode={viewMode}
                onProductClick={handleProductClick}
                onWhatsAppContact={handleWhatsAppContact}
                onEmailContact={handleEmailContact}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        language={language}
        onWhatsAppContact={handleWhatsAppContact}
        onEmailContact={handleEmailContact}
      />
    </div>
  );
};