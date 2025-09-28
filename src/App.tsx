import React, { useState, useRef } from 'react';
import { Upload, Download, FileSpreadsheet, RefreshCw, Package } from 'lucide-react';
import { Product, Language, languages } from './types';
import { readExcelFile, downloadExcelFile, createSampleData } from './utils/excelUtils';
import { ExcelTable } from './components/ExcelTable';
import { LanguageToggle } from './components/LanguageToggle';
import { ProductCatalog } from './components/ProductCatalog';
import { Navigation } from './components/Navigation';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [currentPage, setCurrentPage] = useState<'inventory' | 'catalog'>('inventory');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isArabic = language.code === 'ar';

  const labels = {
    ar: {
      title: 'إدارة المخزون',
      subtitle: 'نظام إدارة المخزون باستخدام Excel',
      uploadFile: 'تحميل ملف Excel',
      downloadFile: 'تنزيل Excel محدث',
      loadSample: 'تحميل بيانات تجريبية',
      uploadHint: 'اسحب ملف Excel هنا أو انقر للتحديد',
      supportedFormats: 'يدعم ملفات .xlsx',
      loading: 'جارٍ المعالجة...',
      error: 'خطأ',
      success: 'تم بنجاح'
    },
    en: {
      title: 'Inventory Manager',
      subtitle: 'Excel-based Inventory Management System',
      uploadFile: 'Upload Excel File',
      downloadFile: 'Download Updated Excel',
      loadSample: 'Load Sample Data',
      uploadHint: 'Drag Excel file here or click to select',
      supportedFormats: 'Supports .xlsx files',
      loading: 'Processing...',
      error: 'Error',
      success: 'Success'
    }
  };

  const t = labels[language.code];

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.xlsx')) {
      setError(isArabic ? 'يرجى اختيار ملف Excel صالح (.xlsx)' : 'Please select a valid Excel file (.xlsx)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const parsedProducts = await readExcelFile(file);
      setProducts(parsedProducts);
    } catch (err) {
      setError(isArabic ? 'فشل في قراءة الملف' : 'Failed to read file');
      console.error('File reading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleProductDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const handleQuantityChange = (productId: string, change: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, quantity: Math.max(0, product.quantity + change) }
        : product
    ));
  };

  const handleDownloadExcel = () => {
    if (products.length === 0) {
      setError(isArabic ? 'لا توجد بيانات للتنزيل' : 'No data to download');
      return;
    }
    downloadExcelFile(products, 'inventory');
  };

  const loadSampleData = () => {
    setProducts(createSampleData());
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${language.dir === 'rtl' ? 'rtl' : 'ltr'}`} dir={language.dir}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                {currentPage === 'inventory' ? (
                  <FileSpreadsheet className="w-8 h-8 text-blue-600" />
                ) : (
                  <Package className="w-8 h-8 text-blue-600" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentPage === 'inventory' ? t.title : (isArabic ? 'كتالوج المنتجات' : 'Product Catalog')}
                </h1>
                <p className="text-sm text-gray-600">
                  {currentPage === 'inventory' ? t.subtitle : (isArabic ? 'تصفح مجموعتنا من المعدات الكهربائية' : 'Browse our electrical equipment collection')}
                </p>
              </div>
            </div>
            <LanguageToggle currentLang={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        language={language} 
      />

      {currentPage === 'catalog' ? (
        <ProductCatalog language={language} />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* File Upload Area */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Upload Section */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="md:col-span-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center">
                <div className="p-4 bg-blue-50 rounded-full mb-4">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">{t.uploadHint}</p>
                <p className="text-sm text-gray-500">{t.supportedFormats}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleDownloadExcel}
                disabled={products.length === 0}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t.downloadFile}
              </button>
              
              <button
                onClick={loadSampleData}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {t.loadSample}
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            className="hidden"
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-blue-700 font-medium">{t.loading}</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Products Table */}
        <ExcelTable
          products={products}
          language={language}
          onProductUpdate={handleProductUpdate}
          onProductDelete={handleProductDelete}
          onProductAdd={handleProductAdd}
          onQuantityChange={handleQuantityChange}
        />
      </main>
      )}
    </div>
  );
}

export default App;