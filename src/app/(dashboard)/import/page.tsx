"use client";
import { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";

interface ExcelData {
  [key: string]: string | number;
}

export default function ImportPage() {
  const [data, setData] = useState<ExcelData[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const binaryStr = e.target?.result;
      if (typeof binaryStr !== "string") return;

      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Ambil sheet pertama dari workbook
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json<ExcelData>(
        workbook.Sheets[sheetName]
      );

      // Set data ke state dan console log hasilnya
      setData(worksheet);
      console.log(worksheet);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload Excel File</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
