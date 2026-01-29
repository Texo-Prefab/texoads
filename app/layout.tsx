// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WRRCB22S');
            `,
          }}
        />
          {/* <!-- Google Tag Manager --> */}
          {/* <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WRRCB22S');</script> */}
          {/* <!-- End Google Tag Manager --> */}
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
      </head>

      <body className={`${inter.className} bg-white text-black`}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WRRCB22S"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        

        {children}

        
      </body>
    </html>
  );
}
