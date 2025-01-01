import { Metadata } from 'next'
import JsonLd from './components/JsonLd'

export const metadata: Metadata = {
  title: {
    template: '%s | HackToast',
    default: 'HackToast - Custom Web Development & Digital Solutions', 
  },
  description: 'Professional web development services including custom website development, SEO optimization, UI/UX design, and rapid website solutions. Transform your digital presence with innovative design and strategic solutions.',
  keywords: ['web development', 'custom websites', 'SEO services', 'UI/UX design', 'web solutions', 'rapid website development', 'digital strategy'],
  authors: [{ name: 'HackToast' }],
  creator: 'HackToast',
  publisher: 'HackToast',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hacktoast.com',
    siteName: 'HackToast',
    title: 'HackToast - Custom Web Development & Digital Solutions',
    description: 'Transform your digital presence with custom web development, SEO optimization, and innovative design solutions. Expert web development services tailored to your business needs.',
    images: [
      {
        url: 'https://hacktoast.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HackToast - Web Development Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hacktoast',
    creator: '@hacktoast',
    images: ['https://hacktoast.com/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  )
} 