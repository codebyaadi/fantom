import Navbar from '@/components/layouts/navbar';
import React from 'react';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
}
