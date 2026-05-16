import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Metadata } from 'next'

export const metadata = {
  title: 'ELNILE Aluminum - شركة النيل للألوميتال',
  description: 'شركة النيل للألوميتال - متخصصة في تصنيع وتركيب الألوميتال بأعلى جودة وأسعار تنافسية',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'ELNILE Aluminum',
    description: 'شركة متخصصة في الألوميتال',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-dark text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
