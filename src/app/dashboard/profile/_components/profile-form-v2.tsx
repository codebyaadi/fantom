'use client';

import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import { userSchema } from '@/lib/validators';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { updateUserInfo } from '@/server/actions/users';
import { ProfileProps } from './types';
import { z } from 'zod';

const formSchema = userSchema.pick({
  username: true,
  email: true,
  bio: true,
  walletAddress: true,
});

type FormValues = z.infer<typeof formSchema>;

export const ProfileForm: React.FC<ProfileProps> = ({ publicKey, user }) => {
  const [avatar, setAvatar] = useState<string>(user.avatar);
  const [banner, setBanner] = useState<string>(user.banner);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || '',
      walletAddress: publicKey,
    },
  });

  const handleAvatarChange = () => {
    const file = avatarInputRef.current?.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleBannerChange = () => {
    const file = bannerInputRef.current?.files?.[0];
    if (file) {
      setBanner(URL.createObjectURL(file));
    }
  };

  const handleBannerClick = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click();
    }
  };

  const handleSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('bio', data.bio as string);

    if (avatarInputRef.current?.files?.[0]) {
      formData.append('avatar', avatarInputRef.current.files[0]);
    }
    if (bannerInputRef.current?.files?.[0]) {
      formData.append('banner', bannerInputRef.current.files[0]);
    }

    await updateUserInfo(formData);
  };

  return (
    <div className="relative mx-4 my-2 font-prompt md:mx-6 md:my-4 lg:mx-12 lg:my-5">
      <Card className="rounded bg-muted-foreground/5 shadow-none">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="relative mb-16">
                <AspectRatio
                  ratio={16 / 4}
                  className="overflow-hidden rounded-md bg-muted"
                >
                  <Image
                    id="banner"
                    src={banner!}
                    alt="Banner"
                    layout="fill"
                    objectFit="cover"
                    className="h-full w-full"
                  />
                  <div
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-muted/50 opacity-0 transition-opacity hover:opacity-100"
                    onClick={handleBannerClick}
                  >
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                  <Input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="hidden"
                  />
                </AspectRatio>
                <div className="group absolute -bottom-10 left-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-slate-400">
                  <Image
                    id="avatar"
                    src={avatar!}
                    alt="Avatar"
                    layout="fill"
                    className="h-full w-full"
                  />
                  <div
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-muted/50 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={handleAvatarClick}
                  >
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                  <Input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="walletAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet Address</FormLabel>
                      <Input readOnly {...field} className="bg-background" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Bio</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tell something about yourself"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button type="submit">Save Profile</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
