import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pulsar",
  description: "A lightweight, fast, and powerful remote administration tool written in C#.",
  keywords: ["remote administration", "C#", "RAT", "system administration", "remote control", "lightweight", "fast", "pulsar"],
  authors: [{ name: "Pulsar Team" }],
  creator: "Pulsar Team",
  publisher: "Pulsar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ratting.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pulsar",
    description: "A lightweight, fast, and powerful remote administration tool written in C#.",
    url: 'https://ratting.ru',
    siteName: 'Pulsar',
    images: [
      {
        url: '/pulsar-logo.png',
        width: 512,
        height: 512,
        alt: 'Pulsar - Remote Administration Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulsar',
    description: 'A lightweight, fast, and powerful remote administration tool written in C#.',
    images: ['/pulsar-logo.png'],
  },
  icons: {
    icon: [
      { url: '/pulsar-logo.png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.ico' },
    ],
    apple: [
      { url: '/pulsar-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/pulsar-logo.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script defer data-domain="ratting.ru" src="https://analytics.ratting.ru/js/script.file-downloads.outbound-links.js"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
