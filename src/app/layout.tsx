import type { Metadata } from 'next';
import { Inter, DM_Sans, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans',
});

export const metadata: Metadata = {
  title: 'Social Graphic Generator',
  description: 'Generate branded social media graphics at scale',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dmSans.variable} ${sourceSans.variable}`}>{children}</body>
    </html>
  );
}
