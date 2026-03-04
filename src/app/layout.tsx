import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/bsr-favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/bsr-favicon.png" />
        {/* Font loaded via @import in globals.css — no duplicate <link> needed */}
      </head>
      <body className="antialiased film-grain">{children}</body>
    </html>
  );
}
