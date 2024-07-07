import { fileURLToPath } from "url";
import createJITI from "jiti";
const jiti = createJITI(fileURLToPath(import.meta.url));

jiti("./src/env.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"]
    }
};

export default nextConfig;
