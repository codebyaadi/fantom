'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { CopyIcon } from '@radix-ui/react-icons';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getUserInfo, storeWalletAddress } from '@/server/users';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user-store';

const WalletConnection = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const {setUser, clearUser} = useUserStore();

  useEffect(() => {
    const fetchBalanceAndStoreAddress = async () => {
      if (publicKey) {
        const res = await storeWalletAddress(publicKey.toBase58());
        if (res.success) {
          toast.success(res.message);

          const balance = await connection.getBalance(publicKey);
          setSolBalance(balance / LAMPORTS_PER_SOL);

          const data = await getUserInfo(publicKey.toBase58());
          const userInfo = data.data

          if (userInfo) {
            setUser({
              id: userInfo.id,
              username: userInfo.username || '',
              email: userInfo.email || '',
              walletAddress: publicKey.toBase58(),
              avatar: userInfo.avatar || '',
              banner: userInfo.banner || '',
              bio: userInfo.bio || '',
              isVerified: userInfo.isVerified,
              solBalance: balance / LAMPORTS_PER_SOL,
            })
          }
        }
      }
    };
    if (publicKey) fetchBalanceAndStoreAddress();
  }, [publicKey, connection]);

  const handleWalletSelect = async (walletName: WalletName) => {
    try {
      select(walletName);
      setOpen(false);
    } catch (error) {
      console.log('wallet connection err : ', error);
    }
  };

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      toast.success('Address copied to clipboard!');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    clearUser();
  }

  return (
    <div>
      {!publicKey ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="font-prompt shadow-none" variant="secondary">
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="font-prompt sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Connect Your Wallet</DialogTitle>
              <DialogDescription>
                Select one of the wallets below to connect to your account.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-start gap-2 py-4">
              {wallets.map((w) => (
                <button
                  key={w.adapter.name}
                  onClick={() => handleWalletSelect(w.adapter.name)}
                  className="relative flex w-full scale-100 appearance-none items-center space-x-1.5 rounded-xl bg-transparent px-6 py-3.5 text-sm font-semibold transition-colors duration-150 hover:bg-gray-100 active:scale-[0.98] disabled:pointer-events-none dark:hover:bg-gray-800"
                >
                  <div className="flex">
                    <Image
                      src={w.adapter.icon}
                      alt={w.adapter.name}
                      height={24}
                      width={24}
                      className="mr-5"
                    />
                  </div>
                  <div className="">{w.adapter.name}</div>
                </button>
              ))}
            </div>
            <DialogFooter>
              {publicKey && (
                <Button variant="destructive" onClick={disconnect}>
                  Disconnect
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="font-prompt shadow-none" variant="secondary">
              {publicKey.toBase58().slice(0, 6)}...
              {publicKey.toBase58().slice(-6)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="font-prompt">
            <DropdownMenuLabel>Wallet Info</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleCopyAddress}
              className="cursor-pointer"
            >
              Address: {publicKey.toBase58().slice(0, 6)}...
              {publicKey.toBase58().slice(-6)}
              <CopyIcon />
            </DropdownMenuItem>
            <DropdownMenuItem>
              Balance: {solBalance ? solBalance.toFixed(2) : 'Loading...'} SOL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDisconnect} className="text-red-500">
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default WalletConnection;
