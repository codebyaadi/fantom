import { PhantomProvider } from '@/types';

export const getProvider = (): PhantomProvider | undefined => {
  if ('phantom' in window) {
    const { phantom } = window as any;
    const provider = phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
};

export const connectWallet = async (): Promise<string | undefined> => {
  const provider = getProvider();
  if (!provider) {
    console.error('Phantom provider not found');
    return undefined;
  }

  try {
    const resp = await provider?.connect();
    console.log('is con: ', provider.isConnected);
    return resp?.publicKey.toString();
  } catch (err) {
    console.log('Failed to connect to wallet: ', err);
    return undefined;
  }
};

export const disconnectWallet = async (): Promise<boolean> => {
  const provider = getProvider();
  if (!provider) {
    console.error('Phantom provider not found');
    return false;
  }

  try {
    await provider.disconnect();
    return true;
  } catch (err) {
    console.error('Failed to disconnect wallet:', err);
    return false;
  }
};
