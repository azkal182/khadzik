"use client";
import React from "react";
import ExcelJs from "exceljs";
import { Button } from "@/components/ui/button";

export type TProduct = {
  id: string;
  name: string;
  type?: string;
  regularPrice: number;
  packingPrice: number;
};

const ExportExcel = ({ products }: { products: TProduct[] }) => {
  const exportExcelFile = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("test");
    // sheet.properties.defaultRowHeight = 80;

    sheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Type", key: "type", width: 10 },
      { header: "Regular Price", key: "regularPrice", width: 20 },
      { header: "Packing Price", key: "packingPrice", width: 20 }
    ];

    products.map((item) => {
      sheet.addRow({
        id: item.id,
        name: item.name,
        type: item.type,
        regularPrice: item.regularPrice,
        packingPrice: item.packingPrice
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "download.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };
  return <Button onClick={exportExcelFile}>export</Button>;
};

export default ExportExcel;
