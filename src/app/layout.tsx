import { GradientBackground, Navbar } from './_components'
import { clsx } from '@nextui-org/shared-utils'
import { Providers } from '@/app/providers'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `RK ${process.env.NODE_ENV === 'development' ? 'local' : ''}`,
  description: 'RK Generated by hanbin',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  authors: [
    {
      name: 'hanbin',
      url: 'https://hanbin.dev'
    }
  ],
  openGraph: {
    title: '챔피언은 누구?',
    description: '야수의 눈으로 승리를 쟁취하라',
    url: 'https://rk.hanbin.dev',
    siteName: 'RK',
    images: [
      {
        url: 'https://rk.hanbin.dev/og-image.png',
        width: 1200,
        height: 630
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  creator: 'hanbin',
  viewport: 'viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="ko" dir="ltr">
      <head />
      <body className={clsx('min-h-screen bg-background antialiased', inter.className)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col">
            <Navbar />
            <main className={'w-full flex flex-col items-center justify-center py-10 px-5 gap-5 z-10'}>{children}</main>
            <GradientBackground />
          </div>
        </Providers>
      </body>
    </html>
  )
}
