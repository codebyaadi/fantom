import { Unbounded, Prompt } from "next/font/google";

export const fontUnbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

export const fontPrompt = Prompt({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-prompt",
  display: "swap",
});
