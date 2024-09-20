export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatRibuan = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const parseRibuan = (value: string): number => {
  // Menghapus pemisah ribuan (misalnya, titik) dari string
  const cleanedValue = value.replace(/[^0-9]/g, "");
  // Mengonversi string yang dibersihkan menjadi angka
  return parseFloat(cleanedValue) || 0;
};

export function formatDate(isoDateString: Date) {
  const date = new Date(isoDateString);

  // Mendapatkan hari, bulan, dan tahun
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // bulan dimulai dari 0
  const year = date.getFullYear();

  // Format menjadi dd-mm-yyyy
  return `${day}-${month}-${year}`;
}
