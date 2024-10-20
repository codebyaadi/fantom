'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapter, WalletName } from '@solana/wallet-adapter-base';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/user-store';

const WalletConnection = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, connected, connecting, signMessage, connect } = useWallet();
  const { setAuth, clearAuth, isAuthenticated } = useAuthStore();

  // Query for fetching SOL balance
  const { data: solBalance } = useQuery({
    queryKey: ['solBalance', publicKey?.toBase58()],
    queryFn: async () => {
      if (!publicKey) return null;
      const balance = await connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;
    },
    enabled: !!publicKey,
  });

  // Mutation for wallet authentication
  const authMutation = useMutation({
    mutationFn: async () => {
      if (!publicKey || !signMessage) throw new Error('Wallet not connected');

      const message = new TextEncoder().encode(`Auth ${Date.now()}`);
      const signature = await signMessage(message);

      const response = await fetch('/api/auth/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicKey: publicKey.toBase58(),
          signature: Array.from(signature),
          message: Array.from(message),
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      setAuth({ token: data.token });
      toast.success('Wallet connected and authenticated!');
    },
    onError: (error) => {
      console.error('Authentication error:', error);
      toast.error('Failed to authenticate. Please try again.');
      disconnect();
    },
  });

  const handleWalletSelect = async (wallet: WalletAdapter) => {
    try {
      select(wallet.name);
      setOpen(false);

      // Wait for the wallet to be connected
      if (!connected) {
        await connect()
      }
      wallet.addListener('connect', ())
      if (publicKey && signMessage) {
        authMutation.mutate();
      } else {
        throw new Error('Wallet connected but publicKey or signMessage not available');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
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
    clearAuth();
    toast.success('Wallet disconnected');
  };

  if (!connected || !isAuthenticated) {
    return (
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
                onClick={async () => await handleWalletSelect(w.adapter)}
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
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="font-prompt shadow-none" variant="secondary">
          {publicKey?.toBase58().slice(0, 6)}...
          {publicKey?.toBase58().slice(-6)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-prompt">
        <DropdownMenuLabel>Wallet Info</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleCopyAddress}
          className="flex cursor-pointer items-center gap-2"
        >
          <span>
            Address: {publicKey?.toBase58().slice(0, 6)}...
            {publicKey?.toBase58().slice(-6)}
          </span>
          <CopyIcon size={16} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          Balance: {solBalance ? solBalance.toFixed(2) : 'Loading...'} SOL
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDisconnect}
          className="cursor-pointer text-red-500"
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletConnection;