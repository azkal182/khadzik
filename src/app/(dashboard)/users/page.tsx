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
import ContentWrapper from "@/components/content-wrapper";
import { DataTableUser } from "./table";
// import useFetchUser from "@/feature/user/useFetchUser";
import Loader from "@/components/loader";

export default function UsersPage() {
  //   const { data, isLoading, refetch } = useFetchUser();
  return (
    <ContentLayout title="Users">
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
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ContentWrapper>
        {/* {isLoading ? <Loader /> : null}
        {data ? (
          <DataTableUser users={data?.data} refetch={() => refetch()} />
        ) : null} */}
        <div>user</div>
      </ContentWrapper>
    </ContentLayout>
  );
}
