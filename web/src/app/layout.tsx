import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { fontPrompt, fontUnbounded } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Hydrated } from "@/store/hydration";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontUnbounded.variable,
          fontPrompt.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Hydrated>{children}</Hydrated>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
