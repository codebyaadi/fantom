import Elysia, { t } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import nacl from 'tweetnacl';
import { env } from '@/env/server';
import { PublicKey } from '@solana/web3.js';

export const authController = new Elysia({ prefix: '/auth' })
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET_KEY,
      exp: '1d',
    }),
  )
  .post(
    '/sign',
    async ({ set, jwt, body }) => {
      const { publicKey, signature, message } = body;
      console.log(body);

      try {
        const verified = nacl.sign.detached.verify(
          new Uint8Array(message),
          new Uint8Array(signature),
          new PublicKey(publicKey).toBytes(),
        );

        if (verified) {
          const token = await jwt.sign({ publicKey });
          console.log('token: ', token);
          set.status = 200;
          return {
            success: true,
            status: 200,
            token,
          };
        } else {
          set.status = 401;
          return {
            success: false,
            status: 401,
            message: 'Invalid Signature',
          };
        }
      } catch (error) {
        console.error('authentication error: ', error);
        set.status = 500;
        return {
          success: false,
          status: 500,
          message: 'authentication failed',
        };
      }
    },
    {
      body: t.Object({
        publicKey: t.String(),
        signature: t.Array(t.Number()),
        message: t.Array(t.Number()),
      }),
    },
  );
