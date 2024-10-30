import 'server-only';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

export const getUserInfo = unstable_cache(
  async (publicKey: string) => {
    const user = await db
      .select({
        username: users.username,
        email: users.email,
        bio: users.bio,
        avatar: users.avatar,
        banner: users.banner,
      })
      .from(users)
      .where(eq(users.walletAddress, publicKey));

    return user[0];
  },
  ['profile'],
  { tags: ['profile'] },
);
