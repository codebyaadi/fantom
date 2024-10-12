'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import {
  GearIcon,
  PersonIcon,
  UploadIcon,
  ChevronDownIcon,
  DashboardIcon,
  StackIcon,
  GridIcon,
  BarChartIcon,
} from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavLink = {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  subItems?: NavLink[];
};

const navLinks: NavLink[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'My Library',
    icon: <StackIcon />,
    subItems: [
      {
        name: 'Manga',
        href: '/library/manga',
      },
      {
        name: 'Manhwa',
        href: '/library/manhwa',
      },
      {
        name: 'Manhua',
        href: '/library/manhua',
      },
    ],
  },
  {
    name: 'Upload',
    icon: <UploadIcon />,
    subItems: [
      {
        name: 'New Series',
        href: '/upload/new-series',
      },
      {
        name: 'New Chapter',
        href: '/upload/new-chapter',
      },
    ],
  },
  {
    name: 'NFT Studio',
    icon: <GridIcon />,
    subItems: [
      {
        name: 'Create NFT',
        href: '/nft/create',
      },
      {
        name: 'My Collections',
        href: '/nft/collections',
      },
      {
        name: 'Marketplace',
        href: '/nft/marketplace',
      },
    ],
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: <BarChartIcon />,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <PersonIcon />,
  },
  {
    name: 'Settings',
    href: '/settings',
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
                    'absolute left-1/2 mt-4 h-full -translate-x-1/2 border-l bg-muted-foreground transition-all',
                    open ? 'h-64' : 'h-0',
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
        <div className="ml-4">
          {link.subItems?.map((subLink, idx) => (
            <SidebarLink key={idx} link={subLink} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
