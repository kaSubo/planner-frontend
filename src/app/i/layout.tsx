import DashboardLayout from "@/components/dashboard-layout/DashboardLayout";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return <DashboardLayout>{children}</DashboardLayout>
}