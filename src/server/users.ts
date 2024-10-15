'use server';

import z from 'zod';
import { userSchema } from '@/lib/validators';
import { db } from '@/db';
import { users } from '@/db/schema';
import { avatarsArray } from '@/constants/avatars';

export const storeWalletAddress = async (walletAddress: string) => {
  const walletValidation = userSchema.pick({ walletAddress: true });

  try {
    const parsed = walletValidation.parse({ walletAddress });

    const existingAddress = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.walletAddress, parsed.walletAddress),
    });

    if (existingAddress) {
      console.error('wallet address already exists');
      return {
        success: false,
        message: 'wallet address already exists',
        data: parsed.walletAddress,
      };
    }

    const avatar =
      avatarsArray[Math.floor(Math.random() * avatarsArray.length)];

    await db.insert(users).values({
      walletAddress: parsed.walletAddress,
      avatar: avatar,
    });

    return {
      success: true,
      message: 'wallet address stored successfully',
      data: parsed.walletAddress,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('validation error:', error.issues);
      throw new Error('Validation failed');
    }
    console.error('error storing wallet address:', error);
    throw new Error('An error occurred while storing the wallet address');
  }
};
