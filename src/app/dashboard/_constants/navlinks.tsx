import {
  GearIcon,
  PersonIcon,
  UploadIcon,
  DashboardIcon,
  StackIcon,
  GridIcon,
  BarChartIcon,
  LightningBoltIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  BackpackIcon,
  ReaderIcon,
  Pencil1Icon,
  PlusIcon,
  LayersIcon,
  FrameIcon,
  MixIcon,
  ImageIcon,
} from '@radix-ui/react-icons';

export type NavLink = {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  subItems?: NavLink[];
};

export const navLinks: NavLink[] = [
  {
    name: 'Dashboard',
    href: '/dashboard/overview',
    icon: <DashboardIcon />,
  },
  {
    name: 'My Library',
    icon: <StackIcon />,
    subItems: [
      {
        name: 'My Works',
        icon: <Pencil1Icon />,
        href: '/dashboard/profile',
        subItems: [
          {
            name: 'Manga',
            href: '/dashboard/library/works/manga',
            icon: <ReaderIcon />,
          },
          {
            name: 'Manhwa',
            href: '/dashboard/library/works/manhwa',
            icon: <ReaderIcon />,
          },
          {
            name: 'Manhua',
            href: '/dashboard/library/works/manhua',
            icon: <ReaderIcon />,
          },
        ],
      },
      {
        name: 'Drafts',
        href: '/dashboard/library/drafts',
        icon: <BackpackIcon />,
      },
      {
        name: 'Published',
        href: '/dashboard/library/published',
        icon: <LightningBoltIcon />,
      },
      {
        name: 'Favorites',
        href: '/dashboard/library/favorites',
        icon: <HeartIcon />,
      },
      {
        name: 'Explore',
        href: '/dashboard/library/explore',
        icon: <MagnifyingGlassIcon />,
      },
    ],
  },
  {
    name: 'Upload',
    icon: <UploadIcon />,
    subItems: [
      {
        name: 'New Series',
        href: '/dashboard/upload/new-series',
        icon: <PlusIcon />,
      },
      {
        name: 'New Chapter',
        href: '/dashboard/upload/new-chapter',
        icon: <LayersIcon />,
      },
    ],
  },
  {
    name: 'NFT Studio',
    icon: <GridIcon />,
    subItems: [
      {
        name: 'Create NFT',
        href: '/dashboard/nft/create',
        icon: <FrameIcon />,
      },
      {
        name: 'My Collections',
        href: '/dashboard/nft/collections',
        icon: <ImageIcon />,
      },
      {
        name: 'Marketplace',
        href: '/dashboard/nft/marketplace',
        icon: <MixIcon />,
      },
    ],
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: <BarChartIcon />,
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: <PersonIcon />,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: <GearIcon />,
  },
];
