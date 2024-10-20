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
    href: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'My Library',
    icon: <StackIcon />,
    subItems: [
      {
        name: 'My Works',
        icon: <Pencil1Icon />,
        href: '/profile',
        subItems: [
          {
            name: 'Manga',
            href: '/library/works/manga',
            icon: <ReaderIcon />,
          },
          {
            name: 'Manhwa',
            href: '/library/works/manhwa',
            icon: <ReaderIcon />,
          },
          {
            name: 'Manhua',
            href: '/library/works/manhua',
            icon: <ReaderIcon />,
          },
        ],
      },
      {
        name: 'Drafts',
        href: '/library/drafts',
        icon: <BackpackIcon />,
      },
      {
        name: 'Published',
        href: '/library/published',
        icon: <LightningBoltIcon />,
      },
      {
        name: 'Favorites',
        href: '/library/favorites',
        icon: <HeartIcon />,
      },
      {
        name: 'Explore',
        href: '/library/explore',
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
        href: '/upload/new-series',
        icon: <PlusIcon />,
      },
      {
        name: 'New Chapter',
        href: '/upload/new-chapter',
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
        href: '/nft/create',
        icon: <FrameIcon />,
      },
      {
        name: 'My Collections',
        href: '/nft/collections',
        icon: <ImageIcon />,
      },
      {
        name: 'Marketplace',
        href: '/nft/marketplace',
        icon: <MixIcon />,
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
