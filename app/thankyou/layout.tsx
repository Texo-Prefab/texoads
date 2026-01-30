import Script from "next/script";

export default function ThankyouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-70JJF01Q2Q"
        strategy="afterInteractive"
      />

      <Script id="ga-prefaboffices" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-70JJF01Q2Q');
        `}
      </Script>

      {children}
    </>
  );
}
