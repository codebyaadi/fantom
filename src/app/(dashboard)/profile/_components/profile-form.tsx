import React from 'react';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageIcon } from '@radix-ui/react-icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { UseFormReturn } from 'react-hook-form';
import { userSchema } from '@/lib/validators';
import { z } from 'zod';

const formSchema = userSchema.pick({
  username: true,
  email: true,
  bio: true,
  walletAddress: true,
});

type FormSchema = z.infer<typeof formSchema>;

interface ProfileFormSchema {
  form: UseFormReturn<
    { username: string; email: string; bio: string; walletAddress: string },
    any,
    undefined
  >;
  avatar: string;
  banner: string;
  avatarInputRef: React.RefObject<HTMLInputElement>;
  bannerInputRef: React.RefObject<HTMLInputElement>;
  handleAvatarClick: () => void;
  handleBannerClick: () => void;
  handleAvatarChange: () => void;
  handleBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: FormSchema) => Promise<void>;
}

export const ProfileForm: React.FC<ProfileFormSchema> = ({
  form,
  avatar,
  banner,
  avatarInputRef,
  bannerInputRef,
  handleAvatarClick,
  handleBannerClick,
  handleAvatarChange,
  handleBannerChange,
  onSubmit,
}) => {
  return (
    <div className="relative mx-4 my-2 font-prompt md:mx-6 md:my-4 lg:mx-12 lg:my-5">
      <Card className="rounded bg-muted-foreground/5 shadow-none">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="relative mb-16">
                <AspectRatio
                  ratio={16 / 4}
                  className="overflow-hidden rounded-md bg-muted"
                >
                  <Image
                    id="banner"
                    src={banner || ''}
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
                    src={avatar || ''}
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
