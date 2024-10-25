import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { env } from '@/env/server';
import { cookies } from 'next/headers';

type SessionPayload = {
  publicKey: string;
};

const secretKey = env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}

export async function deleteSession() {
  (await cookies()).delete('token');
}
