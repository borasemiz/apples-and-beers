import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from '@radix-ui/themes';
import clsx from 'clsx';

import '@radix-ui/themes/styles.css';
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

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
      <body className={clsx(inter.className, 'p-4')}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
