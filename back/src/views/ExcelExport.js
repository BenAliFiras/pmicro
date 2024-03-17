import * as XLSX from 'xlsx';


export function exportToExcel(products) {
  const ws = XLSX.utils.json_to_sheet(products);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Products');
  XLSX.writeFile(wb, 'products.xlsx');
}
