"use client";

import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { cn } from "@/lib/utils";

// Contoh data
const items = [
  {
    id: 105,
    name: "Stick Tanpa ABS",
    type: "30-40",
    priceReguler: 15000,
    pricePlusPack: 16000
  }
  // Tambahkan item lain di sini
];

const TransactionForm = () => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [rincian, setRincian] = useState<any>([]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    setQuery(item.name);
    setQuantity(1);
    setTotal(item.priceReguler);
  };

  const handleQuantityChange = (e: any) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    if (selectedItem) {
      setTotal(selectedItem.priceReguler * newQuantity);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedItem) {
      setRincian([
        ...rincian,
        {
          ...selectedItem,
          quantity,
          total
        }
      ]);
      // Reset form
      setSelectedItem(null);
      setQuery("");
      setQuantity(1);
      setTotal(0);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="searchItem"
            className="block text-sm font-medium text-gray-700"
          >
            Search Item
          </label>
          <Combobox as="div" value={selectedItem} onChange={handleItemSelect}>
            <div className="relative">
              <Combobox.Input
                id="searchItem"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="Search items..."
              />
              <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredItems.length === 0 && query !== "" ? (
                  <div className="p-2 text-gray-700">No results found</div>
                ) : (
                  filteredItems.map((item) => (
                    <Combobox.Option key={item.id} value={item}>
                      {({ active }) => (
                        <div
                          className={cn(
                            "p-2 cursor-pointer",
                            active ? "bg-blue-500 text-white" : "bg-white"
                          )}
                        >
                          {item.name}
                        </div>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>

        {selectedItem && (
          <>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full p-2 border border-gray-300 rounded-md"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>

            <div>
              <label
                htmlFor="total"
                className="block text-sm font-medium text-gray-700"
              >
                Total
              </label>
              <input
                type="text"
                id="total"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                readOnly
                value={total}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </>
        )}

        {rincian.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-medium">Rincian</h2>
            <table className="w-full mt-2 border border-gray-300">
              <thead>
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {rincian.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </form>
    </div>
  );
};

export default TransactionForm;
