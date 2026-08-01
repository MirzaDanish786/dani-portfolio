import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

// Self-hosted at build time by next/font — no render-blocking request to
// Google, and no layout shift thanks to the generated size-adjust fallback.
// Weights are pinned to only what the design uses, to keep the payload small.
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const siteUrl = "https://mirza-danish.pages.dev";
const siteTitle = "Mirza Danish - Full Stack Engineer";
const siteDescription =
  "Portfolio of Danish — Full Stack Engineer focused on developing scalable web applications, integrating real-world APIs, and delivering production-ready solutions with modern web technologies.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mirza Danish Portfolio",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-preview.png",
        width: 1366,
        height: 679,
        alt: "Mirza Danish - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NOTE: intentionally no `dark` class on <html>. The site hardcodes its own
  // zinc/phthalo palette, so the shadcn dark tokens buy nothing here — and
  // enabling them flips --primary-foreground to near-black, which silently
  // turns the text on every gradient <Button> dark.
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      {process.env.NODE_ENV === "production" && (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "7fe05f9c54ea42a3b7ecb3c63d2ba760"}'
        />
      )}
      <body>
        {children}
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(39, 39, 42, 0.95)",
              border: "1px solid rgba(63, 63, 70, 0.5)",
              color: "white",
            },
          }}
        />
      </body>
    </html>
  );
}
