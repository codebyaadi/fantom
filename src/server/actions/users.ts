'use server';

import nacl from 'tweetnacl';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import { PublicKey } from '@solana/web3.js';
import { db } from '@/db';
import { users } from '@/db/schema';
import { env } from '@/env/server';

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

    const secret = new TextEncoder().encode(env.JWT_SECRET_KEY);

    if (verified) {
      const token = await new jose.SignJWT({ publicKey })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(secret);

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

      cookies().set('token', token, { httpOnly: true, secure: true });

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
