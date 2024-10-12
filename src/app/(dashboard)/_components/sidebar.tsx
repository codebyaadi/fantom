'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import {
  GearIcon,
  HomeIcon,
  PersonIcon,
  UploadIcon,
  ChevronDownIcon,
} from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavLink = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  subItems?: NavLink[];
};

const navLinks: NavLink[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <HomeIcon />,
  },
  {
    name: 'Profile',
    href: '/dashboard/profil',
    icon: <PersonIcon />,
  },
  {
    name: 'Upload',
    href: '/dashboard/profile',
    icon: <UploadIcon />,
    subItems: [
      {
        name: 'Item 1',
        href: '/dashboard/profil',
      },
      {
        name: 'Item 3',
        href: '/dashboard/profil',
      },
    ],
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: <GearIcon />,
  },
];

const Sidebar = () => {
  return (
    <div className="fixed left-0 h-screen w-64 border-r bg-background px-4 font-prompt">
      <nav className="mt-16">
        {navLinks.map((link, idx) => (
          <SidebarLink key={idx} link={link} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

const SidebarLink: React.FC<{ link: NavLink; depth?: number }> = ({
  link,
  depth = 0,
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const hasSubItems = !!link.subItems;

  return (
    <div className={`ml-${depth * 2} overflow-hidden`}>
      <Link
        href={link.href || '#'}
        className={cn(
          'flex items-center gap-3 rounded px-3 py-2 text-sm font-normal text-muted-foreground transition-all',
          pathname === link.href ? 'bg-muted-foreground/10 text-primary' : '',
        )}
        onClick={() => hasSubItems && setOpen(!open)}
      >
        <div className="relative flex items-center">
          {link.icon && (
            <span className="relative">
              {link.icon}
              {hasSubItems && (
                <span
                  className={cn(
                    'absolute left-1/2 mt-4 -translate-x-1/2 h-full border-l bg-muted-foreground transition-all',
                    open ? 'h-64' : 'h-0'
                  )}
                  style={{
                    top: 'calc(100%)',
                  }}
                />
              )}
            </span>
          )}
        </div>
        {link.name}
        {hasSubItems && (
          <ChevronDownIcon
            className={`ml-auto transition ${open ? 'rotate-180' : ''}`}
          />
        )}
      </Link>
      {hasSubItems && open && (
        <div className="ml-4 space-y-1">
          {link.subItems?.map((subLink, idx) => (
            <SidebarLink key={idx} link={subLink} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
