import React from "react";
import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      <Link
        href="/"
        className="absolute left-8 top-6 z-20 flex items-center font-unbounded font-bold text-foreground/80 transition-colors hover:text-foreground"
      >
        <span>{siteConfig.name}</span>
      </Link>
      <div className="relative hidden aspect-video size-full bg-slate-300 md:block">
        <Image
          src="/images/auth-layout.jpg"
          alt="Sung Jin-Woo from 'Solo Leveling' stands powerfully with energy-emitting daggers against a dramatic cloudy sky."
          fill
          className="absolute inset-0 object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-black/80 lg:to-black/40" />
      </div>
      <main className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center lg:static lg:left-0 lg:top-0 lg:flex lg:translate-x-0 lg:translate-y-0">
        <div className="mx-auto flex items-center justify-center p-0 font-prompt md:p-10">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold">Sign Up</h1>
              <p className="text-muted-foreground">
                Create your account to get started.
              </p>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
