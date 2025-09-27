import * as XLSX from 'xlsx';
import { Product } from '../types';

export const readExcelFile = (file: File): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON with header row
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (jsonData.length < 2) {
          reject(new Error('Excel file must contain at least one data row'));
          return;
        }

        // Parse the data into Product objects
        const products: Product[] = [];
        const headers = jsonData[0] as string[];
        
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i] as any[];
          if (row.some(cell => cell !== undefined && cell !== '')) {
            const product: Product = {
              id: `product-${Date.now()}-${i}`,
              nameAr: row[0] || 'منتج غير محدد',
              nameEn: row[1] || 'Unnamed Product',
              quantity: Number(row[2]) || 0,
              price: Number(row[3]) || 0,
              categoryAr: row[4] || 'عام',
              categoryEn: row[5] || 'General',
              description: row[6] || '',
              secoCode: row[7] || ''
            };
            products.push(product);
          }
        }
        
        resolve(products);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

export const downloadExcelFile = (products: Product[], filename: string = 'inventory') => {
  // Get all unique dates from all products
  const allDates = new Set<string>();
  products.forEach(product => {
    if (product.inventoryDates) {
      Object.keys(product.inventoryDates).forEach(date => allDates.add(date));
    }
  });
  
  const sortedDates = Array.from(allDates).sort();
  
  // Create worksheet data
  const headers = [
    'المورد', 'Supplier', 'اسم المنتج', 'Product Name',
    ...sortedDates,
    'المجموع', 'Total', 'المباع', 'Sold', 'المتبقي', 'Remaining',
    'الوصف', 'Description', 'كود SECO', 'SECO Code'
  ];
  
  const wsData = [
    headers,
    ...products.map(product => {
      const row = [
        product.supplierAr || 'مورد غير محدد',
        product.supplier || 'Unknown Supplier',
        product.nameAr,
        product.nameEn || product.nameAr
      ];
      
      // Add inventory quantities for each date
      sortedDates.forEach(date => {
        row.push(product.inventoryDates?.[date] || 0);
      });
      
      // Add totals
      row.push(
        product.totalReceived || 0,
        product.totalReceived || 0,
        product.totalSold || 0,
        product.totalSold || 0,
        product.currentStock || product.quantity,
        product.currentStock || product.quantity,
        product.description || '',
        product.description || '',
        product.secoCode || '',
        product.secoCode || ''
      );
      
      return row;
    })
  ];

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // Set column widths
  const colWidths = headers.map((header, index) => {
    if (header.includes('وصف') || header.includes('Description')) return { wch: 25 };
    if (header.includes('منتج') || header.includes('Product') || header.includes('مورد') || header.includes('Supplier')) return { wch: 20 };
    if (header.includes('/') || header.match(/\d/)) return { wch: 12 }; // Date columns
    return { wch: 15 };
  });
  ws['!cols'] = colWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'المخزون - Inventory');
  
  // Generate and download file
  const timestamp = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `${filename}_${timestamp}.xlsx`);
};

export const createSampleData = (): Product[] => {
  return [
    {
      id: 'sample-1',
      supplierAr: 'شركة التقنية المتقدمة',
      supplier: 'Advanced Tech Company',
      nameAr: 'لابتوب ديل',
      nameEn: 'Dell Laptop',
      quantity: 15,
      currentStock: 15,
      totalReceived: 20,
      totalSold: 5,
      price: 2500,
      categoryAr: 'إلكترونيات',
      categoryEn: 'Electronics',
      description: 'لابتوب عالي الأداء',
      secoCode: 'ELEC001',
      importDate: '2025-01-01',
      inventoryDates: {
        '27/8/2025': 10,
        '8/4/2025': 5,
        '7/31/2025': 5
      }
    },
    {
      id: 'sample-2',
      supplierAr: 'مؤسسة الملحقات الذكية',
      supplier: 'Smart Accessories Corp',
      nameAr: 'ماوس لاسلكي',
      nameEn: 'Wireless Mouse',
      quantity: 50,
      currentStock: 50,
      totalReceived: 60,
      totalSold: 10,
      price: 75,
      categoryAr: 'ملحقات',
      categoryEn: 'Accessories',
      description: 'ماوس لاسلكي مريح',
      secoCode: 'ACC002',
      importDate: '2025-01-15',
      inventoryDates: {
        '7/26/2025': 30,
        '27/8/2025': 20,
        '8/6/2025': 10
      }
    },
    {
      id: 'sample-3',
      supplierAr: 'متجر الألعاب الإلكترونية',
      supplier: 'Gaming Electronics Store',
      nameAr: 'كيبورد ميكانيكي',
      nameEn: 'Mechanical Keyboard',
      quantity: 25,
      currentStock: 25,
      totalReceived: 30,
      totalSold: 5,
      price: 150,
      categoryAr: 'ملحقات',
      categoryEn: 'Accessories',
      description: 'كيبورد ميكانيكي للألعاب',
      secoCode: 'ACC003',
      importDate: '2025-02-01',
      inventoryDates: {
        '1/9/2025': 15,
        '7/15/2025': 10,
        '8/3/2025': 5
      }
    }
  ];
};