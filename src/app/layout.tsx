import type { Metadata } from 'next';
import { Inter, DM_Sans, Source_Sans_3, Open_Sans, Lato } from 'next/font/google';
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
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-open-sans',
});
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Social Graphic Generator',
  description: 'Generate branded social media graphics at scale',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dmSans.variable} ${sourceSans.variable} ${openSans.variable} ${lato.variable}`}>{children}</body>
    </html>
  );
}
