import React from 'react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  return (
    <nav className="mx-4 my-2 md:mx-6 md:my-4 lg:mx-12 lg:my-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <h2 className="font-syne font-bold">{siteConfig.name}</h2>
        </div>
        <div className="flex items-end justify-center gap-4">
          <ModeToggle />
          <Button className="font-prompt shadow-none" variant="secondary">
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
