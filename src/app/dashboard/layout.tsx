import React from 'react';
import DashboardHeader from './_components/dashboard-header';
import Sidebar from './_components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      <DashboardHeader />
      <Sidebar />
      <div className="pl-64 pt-16">{children}</div>
    </div>
  );
}
