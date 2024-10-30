'use server';

import nacl from 'tweetnacl';
import { cookies } from 'next/headers';
import { PublicKey } from '@solana/web3.js';
import { db } from '@/db';
import { users } from '@/db/schema';
import { deleteSession, encrypt, getSession } from '@/server/lib/session';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { uploadFile } from '../lib/utils';

export async function authUserWithSign(
  publicKey: string,
  signature: number[],
  message: number[],
) {
  try {
    const verified = nacl.sign.detached.verify(
      new Uint8Array(message),
      new Uint8Array(signature),
      new PublicKey(publicKey).toBytes(),
    );

    if (verified) {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const token = await encrypt({ publicKey });

      const user = await db
        .insert(users)
        .values({ walletAddress: publicKey, avatar: '' })
        .onConflictDoUpdate({
          target: users.walletAddress,
          set: { walletAddress: publicKey },
        })
        .returning({
          username: users.username,
          email: users.email,
          emailVerified: users.emailVerified,
          isVerified: users.isVerified,
          avatar: users.avatar,
          banner: users.banner,
          bio: users.bio,
        });

      (await cookies()).set('token', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
      });

      return {
        ...user[0],
        token,
      };
    } else {
      throw new Error('Signature verification failed');
    }
  } catch (error) {
    console.error('Error during signMessage:', error);
    throw new Error('Unable to sign message');
  }
}

export async function logout() {
  await deleteSession();
  redirect('/');
}

export async function updateUserInfo(formData: FormData) {
  const session = await getSession();
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const bio = formData.get('bio') as string;

  const avatarFile = formData.get('avatar') as File;
  const bannerFile = formData.get('banner') as File;

  let avatarUrl: string | undefined;
  if (avatarFile) {
    avatarUrl = await uploadFile(avatarFile);
  }

  let bannerUrl: string | undefined;
  if (bannerFile) {
    bannerUrl = await uploadFile(bannerFile);
  }

  if (!session) return null;

  await db
    .update(users)
    .set({ username, email, bio, avatar: avatarUrl, banner: bannerUrl })
    .where(eq(users.walletAddress, session?.publicKey));

  revalidateTag('profile');
}
