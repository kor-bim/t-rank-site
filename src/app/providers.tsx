'use client'

import { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'

export interface ProvidersProps {
  children: ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        <SessionProvider>
          <Toaster position={'top-center'} richColors closeButton />
          {children}
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
