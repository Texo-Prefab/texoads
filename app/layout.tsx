// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Prefab Solutions | Modern Farmhouses & Offices',
  description:
    'Prefab Solutions specializes in modern prefab farmhouses and office spaces. Turnkey modular construction delivered fast and efficiently.',
  keywords: 'prefab homes, modular construction, farmhouses, offices, turnkey solutions',
  authors: [{ name: 'Prefab Solutions', url: 'https://www.texoprefabworld.in' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/apple-touch-icon.png" />

        <meta name="robots" content="index, follow" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content="Prefab Solutions" />

        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://texoprefabworld.in" />
        <meta property="og:image" content="https://texoprefabworld.in/logo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://texoprefabworld.in/logo.webp" />
      </Head>

      <body className={`${inter.className} bg-white text-black`}>
        

        {children}

        
      </body>
    </html>
  );
}
