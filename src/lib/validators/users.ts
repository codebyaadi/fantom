import { z } from 'zod';

export const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'username is required')
    .max(25, 'username is too long'),
  email: z
    .string()
    .trim()
    .email('invalid email address')
    .max(50, 'email is too long'),
  emailVerified: z.boolean(),
  walletAddress: z
    .string()
    .min(32, 'solana wallet address is too short')
    .max(44, 'solana wallet address is too long'),
  avatar: z.string().url('invalid URL').optional(),
  banner: z.string().url('invalid URL').optional(),
  bio: z.string().max(255, 'bio is too long').optional(),
  isVerified: z.boolean(),
});
