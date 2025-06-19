import { Inter } from 'next/font/google';
import { tw } from '@/utils';

import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={tw(inter.className, '-tracking-[0.015em]')}>{children}</body>
    </html>
  );
}
