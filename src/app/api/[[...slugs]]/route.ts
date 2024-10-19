import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import { uploadFile } from '@/server/lib/utils';

const app = new Elysia({ prefix: '/api' })
  .use(swagger())
  .get('/', () => 'hello Next')
  .post(
    '/profile',
    async ({ body }) => {
      const { walletAddress, username, email, bio, avatar, banner } = body;
      try {
        if (!walletAddress) {
          return { success: false, message: 'Wallet address is required' };
        }

        let avatarUrl;
        if (avatar) {
          avatarUrl = await uploadFile(avatar);
        }

        let bannerUrl;
        if (banner) {
          bannerUrl = await uploadFile(banner);
        }

        await db
          .update(users)
          .set({
            username,
            email,
            bio,
            avatar: avatarUrl,
            banner: bannerUrl,
          })
          .where(eq(users.walletAddress, walletAddress));

        return { success: true };
      } catch (error) {
        return { success: false, message: error };
      }
    },
    {
      body: t.Object({
        walletAddress: t.Optional(t.String()),
        username: t.Optional(t.String()),
        email: t.Optional(t.String()),
        bio: t.Optional(t.String()),
        avatar: t.Optional(t.File()),
        banner: t.Optional(t.File()),
      }),
    },
  );

export const GET = app.handle;
export const POST = app.handle;
