import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { siteConfig } from '@/config/site';
import { fontPrompt, fontSyne } from '@/config/fonts';
import { AppWalletProvider } from '@/providers/app-wallet-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['nextjs', 'react', 'web3', 'solana', 'fantom', 'nfts'],
  authors: [
    {
      name: 'codebyaadi',
      url: 'https://codebyaadi.netlify.app',
    },
  ],
  creator: 'codebyaadi',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}/og.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@codebyaadi',
    images: [
      {
        url: `${siteConfig.url}/og.jpg`,
        alt: siteConfig.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontSyne.variable} ${fontPrompt.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppWalletProvider>{children}</AppWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
