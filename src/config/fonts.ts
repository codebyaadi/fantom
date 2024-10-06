import { Syne, Prompt } from 'next/font/google';

export const fontSyne = Syne({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const fontPrompt = Prompt({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-prompt',
  display: 'swap',
});
