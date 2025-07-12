import './globals.css'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "ZURFRK | Men's Shoes",
  description: "Discover ZURFRK – premium men's footwear brand that blends style, comfort, and performance.",
  keywords: ['ZURFRK', "men's shoes", 'premium footwear', 'fashion shoes', 'comfortable shoes', 'รองเท้าผู้ชาย', 'Next.js', 'React'],
  openGraph: {
    title: "ZURFRK | Men's Shoes",
    description: "Explore ZURFRK's collection of stylish and high-performance men's footwear. Crafted for comfort and designed for confidence.",
    url: 'https://zurfrk-landing-page.vercel.app',
    siteName: "ZURFRK Men's Shoes",
    images: [
      {
        url: '/pictures/og-image.webp',
        width: 1200,
        height: 524,
        alt: "ZURFRK Men's Shoes Website",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/pictures/favicon.ico',
    shortcut: '/pictures/favicon.ico',
    apple: '/pictures/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
