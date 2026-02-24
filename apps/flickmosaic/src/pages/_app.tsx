import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { useState } from 'react';

import AppErrorBoundary from '../components/AppErrorBoundary';
import Layout from '../layouts/Layout';
import '@orbital0m0/carousel/styles';
import '@/styles/App.css';
import '@/styles/Detail.css';
import '@/styles/Search.css';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 간주
            gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
            retry: 2, // 실패 시 2번 재시도
            retryDelay: (attemptIndex: number): number => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프
            refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리페치 비활성화
            refetchOnReconnect: true, // 네트워크 재연결 시 리페치
            // SSR에서 prefetch된 데이터는 재요청하지 않도록
            refetchOnMount: false,
          },
        },
      }),
  );

  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HydrationBoundary>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}
