'use server';

import nacl from 'tweetnacl';
import { cookies } from 'next/headers';
import { PublicKey } from '@solana/web3.js';
import { db } from '@/db';
import { users } from '@/db/schema';
import { deleteSession, encrypt } from '@/server/lib/session';
import { redirect } from 'next/navigation';

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
