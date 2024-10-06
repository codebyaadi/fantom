import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';
import { trendingMs } from '../_assets/trending';
import VerifiedBadge from '@/components/_ui/verified-svg';
import SolanaSVG from '@/components/_ui/solana-svg';

const Explore = () => {
  return (
    <main className="min-h-screen">
      <div className="mt-8">
        <h4 className="font-prompt text-base font-semibold">Explore</h4>
        <div className="no-scrollbar flex items-center overflow-x-auto scroll-smooth py-4 font-prompt md:mx-auto">
          <Button
            className="rounded-none border-b-2 border-brand bg-gradient-to-t from-brand/50 to-transparent hover:bg-transparent dark:from-brand/10"
            variant="ghost"
          >
            Trending
          </Button>
          <Button className="hover:bg-transparent" variant="ghost">
            Manga
          </Button>
          <Button className="hover:bg-transparent" variant="ghost">
            Manhwa
          </Button>
          <Button className="hover:bg-transparent" variant="ghost">
            Manhua
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {trendingMs.map((m, idx) => (
            <ExploreCards id={idx.toString()} name={m.name} src={m.img} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Explore;

interface ExploreCardProps {
  id: string;
  name: string;
  src: string;
}

const ExploreCards: React.FC<ExploreCardProps> = ({ id, name, src }) => {
  return (
    <div key={id} className="relative overflow-hidden rounded">
      <div className="relative w-full h-80">
        <Image 
          src={src} 
          alt={name} 
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute bottom-4 z-10 flex w-full items-center justify-between px-4">
        <div className='space-y-1'>
          <h2 className="font-syne text-xl font-semibold leading-tight line-clamp-1">
            {name}
          </h2>
          <span className='flex justify-start items-center gap-1'>
            <VerifiedBadge size={16} />
            <p className='text-sm font-prompt'>godxsol</p>
          </span>
        </div>
        <Button variant="rounded" className="font-prompt flex justify-center items-center">
          <SolanaSVG size={16} className='mr-2' />
          1 SOL
        </Button>
      </div>
      <div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-white/80 dark:from-black to-transparent"></div>
    </div>
  );
};

