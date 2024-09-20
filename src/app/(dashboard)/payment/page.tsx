"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content-wrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React, { useState } from "react";
import AutoCompleteMember from "../sales/autoCompleteMember";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatRibuan, parseRibuan } from "@/utils";
import { useCurrentSession } from "@/hook/useCurrentSession";
import axios from "@/lib/axios";
import { toast } from "sonner";

const PaymentPage = () => {
  const [member, setMember] = useState("");
  const [memberId, setMemberId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sisaHutang, setSisaHutang] = useState("");
  const [memberName, setMemberName] = useState("");
  const [paymentValue, setPaymentValue] = useState("");
  const { session } = useCurrentSession();

  const closeModal = () => {
    setMember("");
    setMemberId(null);
    setSisaHutang("");
    setMemberName("");
    setPaymentValue("");
    setIsOpen(false);
  };
  const handleChange = (e: any) => {
    const rawValue = e.target.value;
    const filteredValue = rawValue.replace(/[^0-9]/g, "");
    setPaymentValue(formatRibuan(filteredValue));
  };

  const handleSelect = (value: any) => {
    const filteredValue = value.saldo.replace(/[^0-9]/g, "");
    setSisaHutang(filteredValue);
    setMemberName(value.name);
    setMemberId(value.id);
    setIsOpen(true);
  };

  const handlePayment = async () => {
    try {
      await axios.post("/api/payment", {
        memberId,
        userId: session?.user?.id,
        payment: parseRibuan(paymentValue)
      });
      closeModal();
      toast.success("Payment update successfully!");
    } catch (error) {
      throw new Error("error payment create");
    }
  };

  return (
    <ContentLayout title="Payment">
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
            <BreadcrumbPage>Payment</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ContentWrapper>
        <div>
          <AutoCompleteMember
            searchInput={member}
            setSearchInput={setMember}
            onSelected={handleSelect}
          />
        </div>
        <Button onClick={() => setIsOpen(true)}>Payment</Button>

        {/* modal */}
        <Dialog open={isOpen} onOpenChange={() => closeModal()}>
          <DialogContent className="sm:max-w-[425px]">
            <div>
              <Label htmlFor="memberName">Name</Label>
              <Input
                className="text-right"
                disabled
                readOnly
                type="text"
                id="memberName"
                value={memberName}
              />
            </div>
            <div>
              <Label htmlFor="sisaHutang">Sisa Hutang</Label>
              <Input
                className="text-right"
                disabled
                readOnly
                type="number"
                id="sisaHutang"
                value={sisaHutang}
              />
            </div>
            <div>
              <Label htmlFor="payment">Bayar Senilai</Label>
              <Input
                className="text-right"
                id="payment"
                value={paymentValue}
                onChange={handleChange}
              />
            </div>
            <div className="flex">
              <Button onClick={handlePayment} className="ml-auto">
                Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ContentWrapper>
    </ContentLayout>
  );
};

export default PaymentPage;
