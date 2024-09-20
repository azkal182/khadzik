"use client";
import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import useFetchMember from "@/feature/member/useFetchMember";
import { DataTableDemo } from "./table";
import ContentWrapper from "@/components/content-wrapper";
import Loader from "@/components/loader";

export default function MemberPage() {
  const { data, isLoading, refetch: refetchMember } = useFetchMember();

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
        {isLoading ? <Loader /> : null}
        {data?.data ? (
          <DataTableDemo
            products={data?.data}
            refetch={() => {
              refetchMember();
            }}
          />
        ) : null}
      </ContentWrapper>
    </ContentLayout>
  );
}
