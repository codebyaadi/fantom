import { fileURLToPath } from "url";
import createJITI from "jiti";
const jiti = createJITI(fileURLToPath(import.meta.url));

jiti("./src/env/client.ts");
jiti("./src/env/server.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./node_modules/argon2/prebuilds/linux-x64/*.musl.*"],
    },
  },
};

export default nextConfig;
