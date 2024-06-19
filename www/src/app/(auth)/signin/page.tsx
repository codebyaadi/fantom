"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/userStore";

export const formSchema = z.object({
  identity: z.string().min(1, "Username or email is required").max(50, "Username or email is too long"),
  password: z.string().min(8, "Password must be 8 characters long")
});

type InputType = z.infer<typeof formSchema>;

const SignIn = () => {
  const form = useForm<InputType>({ resolver: zodResolver(formSchema) });
  const { login, isLoading, error } = useAuthStore();

  const router = useRouter();

  const onSubmit = async (data: InputType) => {
    const { identity, password } = data;
    await login(identity, password);
    router.push("/");
  }

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        <Button variant="outline">
          {/* <ChromeIcon className="mr-2 h-4 w-4" /> */}
          Google
        </Button>
        <Button variant="outline">
          {/* <GithubIcon className="mr-2 h-4 w-4" /> */}
          GitHub
        </Button>
        <Button variant="outline">
          {/* <DiscIcon className="mr-2 h-4 w-4" /> */}
          Discord
        </Button>
      </div>
      <div className="relative space-y-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField name="identity" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input placeholder="Ex. johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField name="password" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button type="submit" className="w-full mt-2">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignIn
