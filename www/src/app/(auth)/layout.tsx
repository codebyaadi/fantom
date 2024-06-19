import React from "react";
import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            <Link
                href="/"
                className="absolute left-8 top-6 z-20 flex items-center font-bold font-unbounded text-foreground/80 transition-colors hover:text-foreground"
            >
                <span>{siteConfig.name}</span>
            </Link>
            <div className="relative aspect-video size-full bg-slate-300 hidden md:block">
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
                <div className="flex items-center justify-center p-0 md:p-10 mx-auto font-prompt">
                    <div className="max-w-md w-full space-y-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-semibold">Sign Up</h1>
                            <p className="text-muted-foreground">Create your account to get started.</p>
                        </div>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AuthLayout
