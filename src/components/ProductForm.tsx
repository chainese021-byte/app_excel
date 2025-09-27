import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Product, Language } from '../types';

interface ProductFormProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  language: Language;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  language
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    nameAr: '',
    nameEn: '',
    quantity: 0,
    price: 0,
    categoryAr: '',
    categoryEn: '',
    description: '',
    secoCode: '',
    supplier: '',
    supplierAr: '',
    importDate: new Date().toISOString().split('T')[0],
    inventoryDates: {},
    totalReceived: 0,
    totalSold: 0,
    currentStock: 0
  });

  const isArabic = language.code === 'ar';

  useEffect(() => {
    if (product) {
      setFormData({
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        quantity: product.quantity,
        price: product.price,
        categoryAr: product.categoryAr,
        categoryEn: product.categoryEn,
        description: product.description || '',
        secoCode: product.secoCode || '',
        supplier: product.supplier || '',
        supplierAr: product.supplierAr || '',
        importDate: product.importDate || new Date().toISOString().split('T')[0],
        inventoryDates: product.inventoryDates || {},
        totalReceived: product.totalReceived || 0,
        totalSold: product.totalSold || 0,
        currentStock: product.currentStock || 0
      });
    } else {
      setFormData({
        nameAr: '',
        nameEn: '',
        quantity: 0,
        price: 0,
        categoryAr: '',
        categoryEn: '',
        description: '',
        secoCode: '',
        supplier: '',
        supplierAr: '',
        importDate: new Date().toISOString().split('T')[0],
        inventoryDates: {},
        totalReceived: 0,
        totalSold: 0,
        currentStock: 0
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: product?.id || `product-${Date.now()}`,
      ...formData,
      currentStock: formData.quantity,
      totalReceived: formData.totalReceived || formData.quantity
    };
    onSave(newProduct);
    onClose();
  };

  if (!isOpen) return null;

  const labels = {
    ar: {
      title: product ? 'تعديل المنتج' : 'إضافة منتج جديد',
      supplierAr: 'اسم المورد بالعربية',
      supplier: 'اسم المورد بالإنجليزية',
      nameAr: 'اسم المنتج بالعربية',
      nameEn: 'اسم المنتج بالإنجليزية',
      quantity: 'الكمية',
      price: 'السعر',
      categoryAr: 'الفئة بالعربية',
      categoryEn: 'الفئة بالإنجليزية',
      description: 'الوصف',
      secoCode: 'كود SECO',
      importDate: 'تاريخ الاستيراد',
      totalReceived: 'إجمالي الوارد',
      totalSold: 'إجمالي المباع',
      save: 'حفظ',
      cancel: 'إلغاء'
    },
    en: {
      title: product ? 'Edit Product' : 'Add New Product',
      supplierAr: 'Supplier Name (Arabic)',
      supplier: 'Supplier Name (English)',
      nameAr: 'Product Name (Arabic)',
      nameEn: 'Product Name (English)',
      quantity: 'Quantity',
      price: 'Price',
      categoryAr: 'Category (Arabic)',
      categoryEn: 'Category (English)',
      description: 'Description',
      secoCode: 'SECO Code',
      importDate: 'Import Date',
      totalReceived: 'Total Received',
      totalSold: 'Total Sold',
      save: 'Save',
      cancel: 'Cancel'
    }
  };

  const t = labels[language.code];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.supplierAr}
              </label>
              <input
                type="text"
                value={formData.supplierAr}
                onChange={(e) => setFormData({ ...formData, supplierAr: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.supplier}
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.nameAr}
              </label>
              <input
                type="text"
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.nameEn}
              </label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.quantity}
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.totalReceived}
              </label>
              <input
                type="number"
                value={formData.totalReceived}
                onChange={(e) => setFormData({ ...formData, totalReceived: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.totalSold}
              </label>
              <input
                type="number"
                value={formData.totalSold}
                onChange={(e) => setFormData({ ...formData, totalSold: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.importDate}
              </label>
              <input
                type="date"
                value={formData.importDate}
                onChange={(e) => setFormData({ ...formData, importDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.price}
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.categoryAr}
              </label>
              <input
                type="text"
                value={formData.categoryAr}
                onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.categoryEn}
              </label>
              <input
                type="text"
                value={formData.categoryEn}
                onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.secoCode}
              </label>
              <input
                type="text"
                value={formData.secoCode}
                onChange={(e) => setFormData({ ...formData, secoCode: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.description}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                dir={isArabic ? 'rtl' : 'ltr'}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};