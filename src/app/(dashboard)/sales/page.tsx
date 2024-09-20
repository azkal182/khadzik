"use client";
import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import AutoCompleteInput from "./AutoComplete";
import { formatCurrency, formatRibuan } from "@/utils";
import AutoCompleteMember from "./autoCompleteMember";
import { toast } from "sonner";
import useCreateTransaction from "@/feature/transaction/useCreateTransaction";
import { useCurrentSession } from "@/hook/useCurrentSession";

// Tipe data untuk item
interface Item {
  id: number;
  name: string;
  type: string;
  price: number;
  regularPrice: number;
  packingPrice: number;
}

// Tipe data untuk rincian
interface Rincian {
  name: string;
  type?: string;
  price: number;
  quantity: number;
  total: number;
}

const items: Item[] = require("@/app/(dashboard)/master-data/data.json");

export default function SalesPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [variant, setVariant] = useState<any>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [rincian, setRincian] = useState<Rincian[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const qtyRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const variantRef = useRef<HTMLButtonElement | null>(null);
  const [value, setValue] = useState("");
  const [memberValue, setMemberValue] = useState("");
  const [memberId, setMemberId] = useState<number | null>(null);
  const { mutate } = useCreateTransaction({});
  const { session } = useCurrentSession();

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    setQuantity(newQuantity);

    if (selectedItem) {
      let price = selectedItem.regularPrice;
      if (variant === "packing") {
        price = selectedItem.packingPrice;
      }
      setTotal(price * newQuantity);
    }
  };

  const handleVariantChange = (variant: string) => {
    setVariant(variant);
    if (variant === "packing") {
      setPrice(selectedItem!.packingPrice);
      setTotal(selectedItem!.packingPrice * quantity);
    } else {
      setPrice(selectedItem!.regularPrice);
      setTotal(selectedItem!.regularPrice * quantity);
    }
  };

  const handleSubmit = () => {
    if (variant === undefined) {
      return alert("silahkan pilih variant!");
    }
    if (selectedItem) {
      const newRincian: Rincian = {
        name: selectedItem.name,
        type: selectedItem.type,
        quantity,
        price:
          variant === "packing"
            ? selectedItem.packingPrice
            : selectedItem.regularPrice,
        total
      };
      setRincian([...rincian, newRincian]);
      //   @ts-ignore
      setSubTotal(parseInt(subTotal) + parseInt(total));
      // Reset form fields
      setSelectedItem(null);
      setQuantity(1);
      setPrice(0);
      setTotal(0);
      setVariant(undefined);
      searchRef.current?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah aksi default seperti submit pada form
      variantRef.current?.focus();
      //   btnRef.current?.focus();
    }
  };

  const handleSave = async () => {
    if (!memberId) {
      return toast.error("Pilihlah member dari option!");
    }
    if (rincian.length === 0) {
      return toast.error("Anda belum menginput barang!");
    }

    const body = {
      userId: session?.user?.id,
      memberId,
      subTotal,
      data: rincian
    };
    mutate(body as any);
    setRincian([]);
    toast.success("Trasnsaksi berhasil disimpan!");
  };

  return (
    <ContentLayout title="Sales">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Sales</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="flex justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <div className="w-full flex flex-col relative">
              <div>
                <div className=" flex flex-col md:flex-row items-center justify-between gap-3">
                  <div className="w-full md:w-60">
                    <Label htmlFor="search">Search</Label>
                    <AutoCompleteInput
                      ref={searchRef}
                      onSelected={(item: Item) => {
                        // alert(item);
                        setSelectedItem(item);
                        if (variant === "packing") {
                          setPrice(item.packingPrice);
                        } else if (variant === "nonPacking") {
                          setPrice(item.regularPrice);
                        } else {
                          setPrice(item.regularPrice);
                        }
                        // setQuantity(1);
                        setTotal(item?.regularPrice || 0);
                        // qtyRef.current.focus();
                        if (qtyRef.current) {
                          qtyRef.current.focus();
                          qtyRef.current.setSelectionRange(
                            0,
                            qtyRef.current.value.length
                          ); // Pilih semua teks dalam input
                        }
                      }}
                      searchInput={value}
                      setSearchInput={(val) => {
                        setValue(val);
                      }}
                    />
                  </div>
                  <div className="w-full md:w-60">
                    <Label htmlFor="member">Member</Label>
                    <AutoCompleteMember
                      searchInput={memberValue}
                      setSearchInput={setMemberValue}
                      onSelected={(selected) => {
                        setMemberValue(selected.name);
                        setMemberId(parseInt(selected.id));
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 lg:grid-cols-12 gap-3 mt-3">
                  <div className="col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      value={selectedItem?.name || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input
                      type="text"
                      id="type"
                      value={selectedItem?.type || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="qty">Quantity</Label>
                    <Input
                      onKeyDown={handleKeyDown}
                      ref={qtyRef}
                      type="text"
                      id="qty"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="price">Price</Label>
                    <Input type="number" readOnly id="price" value={price} />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="total">Total</Label>
                    <Input readOnly type="number" id="total" value={total} />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="total">Variant</Label>
                    <Select
                      disabled={selectedItem !== null ? false : true}
                      onValueChange={handleVariantChange}
                      value={variant || ""}
                    >
                      <SelectTrigger
                        ref={variantRef}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault(); // Mencegah aksi default seperti submit pada form
                            btnRef.current?.focus();
                          }
                        }}
                        className="w-full"
                      >
                        <SelectValue placeholder="Select a variant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="packing">Packing</SelectItem>
                        <SelectItem value="nonPacking">Non Packing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end col-span-2">
                    <Button
                      ref={btnRef}
                      className="w-full"
                      onClick={handleSubmit}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              {/* table */}
              <div className="mt-4 p-2 border min-h-32 lg:h-[calc(100vh-56px-64px-20px-24px-56px-48px-260px)] lg:overflow-y-scroll">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="w-20">Quantity</TableHead>
                      <TableHead className="w-20">Price</TableHead>
                      <TableHead className="w-40 text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rincian.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="w-8">{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell className="w-20 text-center">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="w-20">{item.price}</TableCell>
                        <TableCell className="w-40 text-right">
                          {formatRibuan(item.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className=" mt-auto w-52 ml-auto">
                <Separator className="my-4" />
                <div className="flex items-center">
                  <strong>Sub Total: </strong>
                  <span className="ml-auto">{formatCurrency(subTotal)}</span>
                </div>
                <Button onClick={handleSave} className="w-full mt-3">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
