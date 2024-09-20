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
import { DataTableDemo } from "./table";
import { useMutation, useQuery } from "react-query";
import axios from "@/lib/axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import useFetchProduct from "@/feature/product/useFetchProduct";
import Loader from "@/components/loader";

export default function MasterDataPage() {
  const { data, isLoading, refetch: refetchProduct } = useFetchProduct();

  return (
    <ContentLayout title="Master Data">
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
            <BreadcrumbPage>Master Data</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="flex justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <div className="w-full relative">
              {isLoading ? (
                <>
                  <Loader />
                </>
              ) : null}
              {data?.data ? (
                <DataTableDemo
                  products={data?.data}
                  refetch={() => refetchProduct()}
                />
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
