import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    HONO_API_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_HONO_API_URL: z.string().url(),
  },
  runtimeEnv: {
    HONO_API_URL: process.env.HONO_API_URL,
    NEXT_PUBLIC_HONO_API_URL: process.env.NEXT_PUBLIC_HONO_API_URL,
  },
});
