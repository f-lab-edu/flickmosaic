import { Carousel } from '@flickmosaic/carousel';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { searchListKeys } from '../queries/search/queryKeys';
import { fetchMovieGenres, fetchTodayTrendingMovie } from '../utils/api';

import AppErrorBoundary from '@/components/AppErrorBoundary';
import GenresCard from '@/components/GenresCard';
import { SearchHomePageSkeleton } from '@/components/Skeleton';
import ThemeTab from '@/components/ThemeTab';
import useSearchMovies from '@/hooks/useSearchMovies';
import { useSearchListQuery } from '@/queries/search/useSearchListQuery';
import { buildImageUrl } from '@/utils/transform';

const TAB_BUTTONS = [
  {
    name: '전체',
  },
  {
    name: '액션',
  },
  {
    name: '로맨스',
  },
  {
    name: '코미디',
  },
  {
    name: '다른 장르 보기 V',
  },
];

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  try {
    // 기존 hook과 동일한 queryKey, queryFn 사용
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: searchListKeys.trending(),
        queryFn: fetchTodayTrendingMovie,
      }),
      queryClient.prefetchQuery({
        queryKey: searchListKeys.genres(),
        queryFn: fetchMovieGenres,
      }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error('Failed to prefetch movie data:', error);

    // 에러 발생 시 빈 상태로 반환 (클라이언트에서 재시도)
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};

const SearchHomePageContent = () => {
  const { highlightedIndex, handleMouseEnter } = useSearchMovies();
  const { trendingQuery, genresQuery } = useSearchListQuery();

  return (
    <div>
      <section className="mb-5">
        <div className="py-0 px-5">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-[-0.5px]">인기 검색어 TOP 10</h2>
          <div className="relative flex overflow-hidden items-start h-97">
            <div>
              <ThemeTab list={TAB_BUTTONS} />
              <ul className="p-0 m-0 grid grid-cols-2 gap-1 max-w-180 relative z-1 flex-1 grid-rows-5 list-none grid-flow-col">
                {trendingQuery.data?.slice(0, 10).map((movie: any, index: number) => (
                  <li
                    key={movie.id}
                    className={`flex items-center cursor-pointer min-h-8 transition-all duration-300 ease-[ease] ${index === highlightedIndex ? 'scale-[1.02]' : ''}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                  >
                    <Link href={`/movie/${movie.id}`}>
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 text-[#f82f62] text-lg leading-6 mr-4 shrink-0 transition-all duration-300 ease-[ease] ${index === highlightedIndex ? 'font-bold' : ''}`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`text-lg flex-1 leading-6 overflow-hidden whitespace-nowrap text-ellipsis transition-all duration-300 ease-[ease] ${index === highlightedIndex ? 'text-white font-semibold' : 'text-[#84868d]'}`}
                      >
                        {movie.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full z-0 [mask-image:linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_10%,rgba(0,0,0,1)_20%,rgba(0,0,0,1)_100%)] [&_img]:opacity-30 [&_img]:transition-opacity [&_img]:duration-500 [&_img]:ease-[ease]">
              {trendingQuery.data?.[highlightedIndex] && (
                <Image
                  src={buildImageUrl(trendingQuery.data[highlightedIndex].backdrop_path)}
                  alt={trendingQuery.data[highlightedIndex].title}
                  width={1280}
                  height={720}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="mb-10">
        <div className="py-0 px-5">
          <div className="mb-5 [&>h2]:text-2xl [&>h2]:text-white [&>h2]:font-bold [&>h2]:mb-2 [&>h2]:tracking-[-0.5px]">
            <h2>장르별 영화</h2>
            <p className="text-sm text-[#84868d] m-0 leading-[1.5]">원하는 장르를 선택해서 영화를 탐색해보세요</p>
          </div>
          <Carousel.Root height={180} articleWidth={319} slides={genresQuery.data ?? []}>
            <Carousel.LeftButton />
            <Carousel.Track articleWidth={319}>
              <Carousel.Article articleWidth={319} layout="overlay">
                {(slide: any) => {
                  return <GenresCard slide={slide} layout="overlay" type="genres" />;
                }}
              </Carousel.Article>
            </Carousel.Track>
            <Carousel.RightButton />
          </Carousel.Root>
        </div>
      </section>
    </div>
  );
};

const SearchHomePage = () => {
  return (
    <>
      <Head>
        <title>검색 - FLICKMOSAIC</title>
      </Head>
      <AppErrorBoundary>
        <React.Suspense fallback={<SearchHomePageSkeleton />}>
          <SearchHomePageContent />
        </React.Suspense>
      </AppErrorBoundary>
    </>
  );
};

export default SearchHomePage;
