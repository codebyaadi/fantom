"use client"

import React from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/userStore"; // Import the authentication store

import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { MainNav } from "./main-nav";
import { UserButton } from "./user-button";

export const SiteHeader = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container h-16 flex items-center">
        <MainNav />
        <div className="flex flex-1 justify-end items-center space-x-3">
          <ModeToggle />
          {user ? (
            <UserButton name={user.name} avatar={user.avatar} />
          ) : (
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
          )}
        </div>
      </div>
    </header>
  )
}