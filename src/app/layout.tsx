import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050608" },
    { media: "(prefers-color-scheme: light)", color: "#F5F0E8" },
  ],
};

export const metadata: Metadata = {
  title: "BSR Films | Media Production House — Raipur, Chhattisgarh",
  description:
    "BSR Films is a full-service media and film production house based in Raipur, Chhattisgarh. 25+ years of experience in documentaries, ad films, government campaigns, and more.",
  keywords:
    "BSR Films, film production, Raipur, Chhattisgarh, documentary, ad film, video production, government campaign, NFDC",
  icons: {
    icon: [
      { url: "/bsr-favicon.png", type: "image/png" },
    ],
    apple: "/bsr-favicon.png",
    shortcut: "/bsr-favicon.png",
  },
  openGraph: {
    title: "BSR Films | Media Production House",
    description:
      "Stories from the heart of Chhattisgarh. Documentaries, ad films and campaigns that bring real places and people to the screen.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/bsr-brand.png", width: 1366, height: 768, alt: "BSR Films" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/bsr-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/bsr-favicon.png" />
        {/* Preconnect to critical origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" />
        {/* Inline script: apply saved theme before paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bsr-theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased film-grain">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
