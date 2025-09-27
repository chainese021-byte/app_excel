import React, { useState } from 'react';
import { CreditCard as Edit, Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product, Language } from '../types';
import { ProductForm } from './ProductForm';

interface ExcelTableProps {
  products: Product[];
  language: Language;
  onProductUpdate: (product: Product) => void;
  onProductDelete: (productId: string) => void;
  onProductAdd: (product: Product) => void;
  onQuantityChange: (productId: string, change: number) => void;
}

export const ExcelTable: React.FC<ExcelTableProps> = ({
  products,
  language,
  onProductUpdate,
  onProductDelete,
  onProductAdd,
  onQuantityChange
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [sellQuantities, setSellQuantities] = useState<{ [key: string]: number }>({});

  const isArabic = language.code === 'ar';

  const labels = {
    ar: {
      addProduct: 'إضافة منتج جديد',
      productName: 'اسم المنتج',
      quantity: 'الكمية',
      price: 'السعر',
      category: 'الفئة',
      actions: 'الإجراءات',
      edit: 'تعديل',
      delete: 'حذف',
      sell: 'بيع',
      sellLabel: 'كمية البيع',
      noProducts: 'لا توجد منتجات',
      total: 'المجموع',
      items: 'عنصر',
      value: 'القيمة الإجمالية'
    },
    en: {
      addProduct: 'Add New Product',
      productName: 'Product Name',
      quantity: 'Quantity',
      price: 'Price',
      category: 'Category',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      sell: 'Sell',
      sellLabel: 'Sell Qty',
      noProducts: 'No products found',
      total: 'Total',
      items: 'items',
      value: 'Total Value'
    }
  };

  const t = labels[language.code];

  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalValue = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);

  const handleSellProduct = (productId: string) => {
    const sellQty = sellQuantities[productId] || 1;
    const product = products.find(p => p.id === productId);
    if (product && sellQty <= (product.currentStock || product.quantity)) {
      onQuantityChange(productId, -sellQty);
      // Update sold quantity
      const updatedProduct = {
        ...product,
        totalSold: (product.totalSold || 0) + sellQty,
        currentStock: (product.currentStock || product.quantity) - sellQty
      };
      onProductUpdate(updatedProduct);
      setSellQuantities({ ...sellQuantities, [productId]: 1 });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(isArabic ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">{t.total} {t.items}</p>
              <p className="text-3xl font-bold">{totalItems.toLocaleString()}</p>
            </div>
            <ShoppingCart className="w-10 h-10 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">{t.value}</p>
              <p className="text-3xl font-bold">{formatPrice(totalValue)}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm">Products</p>
              <p className="text-3xl font-bold">{products.length}</p>
            </div>
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {isArabic ? 'إدارة المخزون' : 'Inventory Management'}
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          {t.addProduct}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-xl text-gray-500 mb-2">{t.noProducts}</p>
            <p className="text-gray-400 mb-6">
              {isArabic ? 'قم بإضافة منتج جديد أو تحميل ملف Excel' : 'Add a new product or upload an Excel file'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    {t.supplier}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    {t.productName}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    {t.received}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    {t.sold}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    {t.remaining}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    {t.price}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    {t.sell}
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {isArabic ? product.supplierAr : product.supplier}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {product.importDate}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">
                          {isArabic ? product.nameAr : product.nameEn}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.secoCode && `Code: ${product.secoCode}`}
                          {product.categoryAr && (
                            <div className="text-xs text-gray-400">
                              {isArabic ? product.categoryAr : product.categoryEn}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {product.totalReceived || 0}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        {product.totalSold || 0}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        (product.currentStock || product.quantity) > 10 
                          ? 'bg-green-100 text-green-800' 
                          : (product.currentStock || product.quantity) > 0 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.currentStock || product.quantity}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium">
                      {formatPrice(product.price)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max={product.currentStock || product.quantity}
                          value={sellQuantities[product.id] || 1}
                          onChange={(e) => setSellQuantities({
                            ...sellQuantities,
                            [product.id]: Math.min(Number(e.target.value), product.currentStock || product.quantity)
                          })}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSellProduct(product.id)}
                          disabled={(product.currentStock || product.quantity) === 0}
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                          title={t.sell}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onQuantityChange(product.id, 1)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Add 1"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowForm(true);
                          }}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title={t.edit}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onProductDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductForm
        product={editingProduct}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingProduct(undefined);
        }}
        onSave={(product) => {
          if (editingProduct) {
            onProductUpdate(product);
          } else {
            onProductAdd(product);
          }
          setEditingProduct(undefined);
        }}
        language={language}
      />
    </div>
  );
};