import './globals.css';
import type { Metadata } from 'next';
import { Inter, Rajdhani, Orbitron } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-rajdhani' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });

export const metadata: Metadata = {
  title: 'ED Exobiology Star Chart',
  description: 'Exobiology database for Elite Dangerous',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${inter.className} ${rajdhani.variable} ${orbitron.variable}`}>{children}</body>
    </html>
  );
}