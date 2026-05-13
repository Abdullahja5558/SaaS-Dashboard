import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://corelytics.vercel.app"),
  title: {
    default: "CORELYTICS | Next-Gen Business Intelligence & Analytics",
    template: "%s | CORELYTICS",
  },
  description: "Transform your business data into stunning visual insights. Corelytics provides real-time tracking, AI-powered growth predictions, and military-grade security for modern enterprises.",
  keywords: ["analytics", "business intelligence", "dashboard", "SaaS", "data visualization", "real-time tracking", "AI predictions", "enterprise security"],
  authors: [{ name: "Corelytics Team" }],
  creator: "Corelytics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://corelytics.vercel.app",
    title: "CORELYTICS | Next-Gen Business Intelligence & Analytics",
    description: "Transform your business data into stunning visual insights with real-time tracking and AI-powered growth predictions.",
    siteName: "CORELYTICS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CORELYTICS Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CORELYTICS | Next-Gen Business Intelligence & Analytics",
    description: "Transform your business data into stunning visual insights with real-time tracking and AI-powered growth predictions.",
    creator: "@corelytics",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "night"]}
        >
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
