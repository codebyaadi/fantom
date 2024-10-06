import { Button } from '@/components/ui/button';
import Explore from './_components/explore';

export default function Home() {
  return (
    <div className="relative mx-4 my-2 md:mx-6 md:my-4 lg:mx-12 lg:my-5">
      <main className="mt-8 rounded-md bg-gradient-to-b from-brand to-[#A0F9B8] px-4 py-36">
        <div className="space-y-2 text-start md:text-center lg:text-center">
          <h1 className="font-syne text-xl font-semibold leading-tight md:text-3xl lg:text-3xl">
            Unlock a World of Manga, Manhua, and Manhwa
          </h1>
          <p className="font-prompt text-sm leading-tight">
            Read, Collect, and Own Exclusive Digital Artworks with Your Wallet.
            Pay with SOL for Instant Access and Explore Unique NFTs from Your
            Favorite Authors!
          </p>
        </div>
        <div className="my-4 flex w-full items-center justify-start md:justify-center lg:justify-center">
          <Button className="font-prompt shadow-none" variant="secondary">
            Connect Wallet
          </Button>
        </div>
      </main>
      <Explore />
    </div>
  );
}
