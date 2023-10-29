'use client'

import { ReactNode, useState } from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export interface ProvidersProps {
  children: ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster position={'top-center'} richColors closeButton />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
