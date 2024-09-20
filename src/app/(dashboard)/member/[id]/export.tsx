"use client";
import React from "react";
import ExcelJs from "exceljs";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils";

export type TMember = {
  name: string;
  address?: string;
  phone: number;
  packingPrice: number;
  saldo: number;
  debts: TDebt[];
};

export type TDebt = {
  id: number;
  createdAt: Date;
  name: string;
  type?: string;
  qty?: number;
  price?: number;
  debit?: number;
  credit?: number;
  remainingDebt?: number;
};

const currencyFormat = '"Rp" #,##0';

const ExportExcelMemberDebt = ({ data }: { data: TMember }) => {
  function setCellProperties(
    cell: any,
    value: any,
    alignment: any,
    fillColor: any,
    numFmt?: any
  ) {
    cell.value = value;
    cell.alignment = alignment;
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: fillColor }
    };
    if (numFmt) {
      cell.numFmt = numFmt;
    }
  }

  const exportExcelFile = () => {
    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("test");
    sheet.properties.defaultRowHeight = 20;

    // Merge cells for the title
    sheet.mergeCells("A1:I1");
    setCellProperties(
      sheet.getCell("A1"),
      "Barang Keluar Bakul",
      { horizontal: "center", vertical: "middle" },
      "fef08a"
    );
    sheet.getCell("A1").font = { bold: true, size: 14 };

    // Define header row properties
    const headerFillColor = "a7f3d0";
    const alignment = { horizontal: "left", vertical: "middle" };

    // Apply header properties to rows 2, 3, and 4, columns A to I
    const rows = [2, 3, 4];
    const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

    rows.forEach((row) => {
      columns.forEach((col) => {
        const cellAddress = `${col}${row}`;
        setCellProperties(
          sheet.getCell(cellAddress),
          "",
          alignment,
          headerFillColor
        );
      });
    });

    // Set header cells
    setCellProperties(
      sheet.getCell("A2"),
      "Nama",
      alignment,
      headerFillColor,
      '@ * ":"'
    );
    setCellProperties(
      sheet.getCell("A3"),
      "Alamat",
      alignment,
      headerFillColor,
      '@ * ":"'
    );
    setCellProperties(
      sheet.getCell("A4"),
      "No Telp",
      alignment,
      headerFillColor,
      '@ * ":"'
    );
    setCellProperties(
      sheet.getCell("F2"),
      "Jumlah Belanja",
      alignment,
      headerFillColor,
      '@ * ":"'
    );
    setCellProperties(
      sheet.getCell("F3"),
      "Pelunasan",
      alignment,
      headerFillColor,
      '@ * ":"'
    );
    setCellProperties(
      sheet.getCell("F4"),
      "Sisa Keseluruhan",
      alignment,
      headerFillColor,
      '@ * ":"'
    );

    // Set data cells
    setCellProperties(
      sheet.getCell("B2"),
      data.name,
      alignment,
      headerFillColor
    );
    setCellProperties(
      sheet.getCell("B3"),
      data.address,
      alignment,
      headerFillColor
    );
    setCellProperties(
      sheet.getCell("B4"),
      data.phone,
      alignment,
      headerFillColor
    );
    setCellProperties(
      sheet.getCell("G2"),
      2500000,
      alignment,
      headerFillColor,
      currencyFormat
    );
    setCellProperties(
      sheet.getCell("G3"),
      2500000,
      alignment,
      headerFillColor,
      currencyFormat
    );
    setCellProperties(
      sheet.getCell("G4"),
      parseInt(data.saldo as any),
      alignment,
      headerFillColor,
      currencyFormat
    );

    // Set headers at row 3 manually
    const headers = [
      "No",
      "Date",
      "Name",
      "Type",
      "Qty",
      "Price",
      "Debit",
      "Credit",
      "Remaining Debt"
    ];

    // Write headers to row 3
    headers.forEach((header, index) => {
      sheet.getCell(5, index + 1).value = header;
      sheet.getCell(5, index + 1).font = { bold: true };
      sheet.getCell(5, index + 1).alignment = {
        horizontal: "center",
        vertical: "middle"
      };
      sheet.getCell(5, index + 1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "d9ead3" } // Light grey color for header
      };
    });

    // Set column widths to match headers
    sheet.columns = [
      { key: "id", width: 10 },
      { key: "createdAt", width: 15 },
      { key: "name", width: 30 },
      { key: "type", width: 10 },
      { key: "qty", width: 5 },
      { key: "price", width: 20 },
      { key: "debit", width: 20 },
      { key: "credit", width: 20 },
      { key: "remainingDebt", width: 20 }
    ];

    // Add data starting from row 4
    data.debts.forEach((item, i) => {
      sheet.addRow({
        id: i + 1,
        createdAt: formatDate(item.createdAt),
        name: item.name,
        type: item.type,
        qty: item.qty,
        price: item.price === 0 ? 0 : parseInt(item.price as any),
        debit: item.debit === 0 ? 0 : parseInt(item.debit as any),
        credit: item.credit === 0 ? 0 : parseInt(item.credit as any),
        remainingDebt:
          item.remainingDebt === 0 ? 0 : parseInt(item.remainingDebt as any)
      });
    });

    // Apply middle alignment and currency format to specific columns
    sheet.eachRow((row, i) => {
      if (i > 5) {
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          if (colNumber === 3) {
            cell.alignment = { horizontal: "left", vertical: "middle" };
          } else {
            cell.alignment = { horizontal: "center", vertical: "middle" };
          }
          if (
            colNumber === 6 ||
            colNumber === 7 ||
            colNumber === 8 ||
            colNumber === 9
          ) {
            cell.numFmt = currencyFormat;
            cell.alignment = { horizontal: "right" };
          }
        });
      }
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

export default ExportExcelMemberDebt;
