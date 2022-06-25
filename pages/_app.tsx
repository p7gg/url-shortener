import type { AppProps } from 'next/app';

import { withTRPC } from '@trpc/next';
import { ThemeProvider } from 'styled-components';

import { BackgroundGradient, GlobalStyles } from '@/components/ui';
import { BASE_URL } from '@/config';

import type { AppRouter } from './api/trpc/[trpc]';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />
      <BackgroundGradient />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${BASE_URL}/api/trpc`;

    return {
      url,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: false,
          },
          mutations: {
            retry: false,
          },
        },
      },
    };
  },
  ssr: true,
})(MyApp);
