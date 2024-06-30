"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .max(50, "Username is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(50, "Email is too long"),
  password: z.string().min(8, "Password must be 8 char long"),
});

type InputType = z.infer<typeof formSchema>;

const SignUp = () => {
  const form = useForm<InputType>({ resolver: zodResolver(formSchema) });
  const router = useRouter();

  const onSubmit = async (data: InputType) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/add-user",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status !== 200) {
        throw new Error(response.data);
      }
      toast("User added successfully");
      router.push("/signin");
    } catch (error) {
      console.error("Error adding user: ", error);
      toast("Internal Server Error");
    }
  };

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
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2 w-full">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
