'use client';

import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWallet } from '@solana/wallet-adapter-react';
import { getUserInfo } from '@/server/users';
import { ProfileForm } from './_components/profile-form';
import { toast } from 'sonner';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  bio: z.string().optional(),
  walletAddress: z.string().optional(),
});

export default function Profile() {
  const { publicKey } = useWallet();
  const [avatar, setAvatar] = useState<string>();
  const [banner, setBanner] = useState<string>();
  const [loading, setLoading] = useState(true);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
      walletAddress: publicKey?.toBase58() || '',
    },
  });

  const handleAvatarChange = () => {
    const file = avatarInputRef.current?.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleBannerClick = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click();
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      if (publicKey) formData.append('walletAddress', publicKey?.toBase58());
      formData.append('username', data.username);
      formData.append('email', data.email);
      if (data.bio) formData.append('bio', data.bio);

      const avatarFile = avatarInputRef.current?.files?.[0];
      const bannerFile = bannerInputRef.current?.files?.[0];

      if (avatarFile) formData.append('avatar', avatarFile);
      if (bannerFile) formData.append('banner', bannerFile);
      const res = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await res.json();

      if (result.success) {
        console.log('Profile updated successfully');
        toast.success('Profile updated successfully');
      } else {
        throw new Error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const setUserDefaultInfo = async () => {
    setLoading(true);
    try {
      if (publicKey) {
        const res = await getUserInfo(publicKey.toBase58());
        if (res.success && res.data) {
          console.log('res: ', res);
          setAvatar(res.data.avatar || '/avatars/3.svg');
          setBanner(res.data.banner || '/placeholder.svg');
          form.setValue('username', res.data.username || '');
          form.setValue('email', res.data.email || '');
          form.setValue('bio', res.data.bio || '');
          form.setValue('walletAddress', res.data.walletAddress || '');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUserDefaultInfo();
  }, [publicKey]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <ProfileForm
      form={form}
      avatar={avatar || ''}
      banner={banner || ''}
      avatarInputRef={avatarInputRef}
      bannerInputRef={bannerInputRef}
      handleAvatarClick={handleAvatarClick}
      handleBannerClick={handleBannerClick}
      handleAvatarChange={handleAvatarChange}
      handleBannerChange={handleBannerChange}
      onSubmit={onSubmit}
    />
  );
}
