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
import useShowMember from "@/feature/member/useShowMember";
import Link from "next/link";
import React from "react";
import { DebtMemberTable } from "./table";
import { formatCurrency } from "@/utils";
import Loader from "@/components/loader";

const ShowMambePage = ({ params }: { params: { id: number } }) => {
  const { data, isLoading } = useShowMember(params.id);

  return (
    <ContentLayout title="Member">
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
            <BreadcrumbPage>Member</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ContentWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex">
              <div className="w-20">Name</div>
              <div>: {data?.name}</div>
            </div>
            <div className="flex">
              <div className="w-20">Address</div>
              <div>: {data?.address}</div>
            </div>
            <div className="flex">
              <div className="w-20">Sisa</div>
              <div>: {data?.saldo ? formatCurrency(data?.saldo) : ""}</div>
            </div>
            <div>
              {data ? (
                <DebtMemberTable member={data} debtsData={data?.debts} />
              ) : null}
            </div>
          </>
        )}
      </ContentWrapper>
    </ContentLayout>
  );
};

export default ShowMambePage;
