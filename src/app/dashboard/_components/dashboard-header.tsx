'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ModeToggle } from '@/components/mode-toggle';
import WalletConnection from '@/components/common/wallet-connection';

const DashboardHeader = () => {
  return (
    <nav className="fixed top-0 z-10 w-full border-b bg-background px-4 py-2">
      <div className="flex items-center justify-between">
        <div>
          <Link className="font-syne font-bold" href="/">
            {siteConfig.name}
          </Link>
        </div>
        <div className="flex items-end justify-center gap-4">
          <ModeToggle />
          <WalletConnection />
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
