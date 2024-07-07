"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { MainNav } from "./main-nav";

export const SiteHeader = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-3">
          <ModeToggle />
          <>
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </Button>
            <Button
              className="rounded-full"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </>
        </div>
      </div>
    </header>
  );
};
