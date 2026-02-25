import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AppErrorBoundary from '@/components/AppErrorBoundary';
import { SearchResultPageSkeleton } from '@/components/Skeleton';
import Status from '@/components/Status';
import ThemeTab from '@/components/ThemeTab';
import useSearchMovie from '@/hooks/useSearchMovie';
import { useSearchListQuery } from '@/queries/search/useSearchListQuery';
import { useSearchGenresQuery, useSearchMovieQuery } from '@/queries/search/useSearchQuery';
import { TransformedMovie } from '@/types/Movie';
import { buildImageUrl } from '@/utils/transform';

const SearchResultPageContent = () => {
  const { query, genreId } = useSearchMovie();
  const { genresQuery } = useSearchListQuery();
  const { data: keywordData } = useSearchMovieQuery(query);
  const { data: genresData } = useSearchGenresQuery(genreId);

  // 페이지 타이틀 생성
  const getPageTitle = () => {
    if (query) return `"${query}" 검색 결과 - FlickMosaic`;
    if (genreId) {
      const genreName = genresQuery.data.find((g: { name: string; id?: number }) => g.id?.toString() === genreId)?.name;
      return `${genreName || '장르'} - FlickMosaic`;
    }
    return '검색 결과 - FlickMosaic';
  };

  const resultList = (resultData: TransformedMovie[], type: string) => {
    return (
      <>
        <Head>
          <title>{getPageTitle()}</title>
        </Head>
        <div>
          {/* 장르 검색일 때만 장르 탭 표시 */}
          {type === 'genres' && genresQuery.data.length > 0 && (
            <div className="pt-5 px-5 pb-0 mb-5 [&_h3]:text-white [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-4 [&_h3]:tracking-[-0.3px]">
              <h3>장르별 필터</h3>
              <ThemeTab list={genresQuery.data} />
            </div>
          )}

          {/* 검색 결과 헤더 */}
          <div className="flex items-center justify-between pt-0 pb-5 px-5 mb-5 border-b border-[#2a2a2a] [&_h2]:text-2xl [&_h2]:text-white [&_h2]:font-bold [&_h2]:tracking-[-0.5px] [&_h2]:m-0">
            <h2>
              {type === 'keyword'
                ? `"${query}" 검색 결과`
                : `장르: ${
                    genresQuery.data.find((g: { name: string; id?: number }) => g.id?.toString() === genreId)?.name
                  }`}
            </h2>
            <span className="text-sm font-medium text-[#84868d]">{resultData.length}개 작품</span>
          </div>

          <section className="p-5 [&_ul]:grid [&_ul]:gap-5 [&_ul]:p-0 [&_ul]:m-0 [&_ul]:list-none [&_ul]:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
            <ul>
              {resultData.map((movie) => (
                <li
                  className="flex flex-col h-[345px] bg-[#1a1a1a] rounded-2 overflow-hidden cursor-pointer transition-transform duration-300 ease-[ease] hover:scale-105 [&_img]:w-full [&_img]:h-70 [&_img]:object-cover [&_img]:shrink-0 [&_div]:p-3 [&_div]:text-white [&_div]:text-sm [&_div]:font-medium [&_div]:line-clamp-2 [&_div]:overflow-hidden [&_div]:flex-1 [&_div]:leading-[1.4] [&_div]:break-words [&_a]:flex [&_a]:flex-col [&_a]:h-full"
                  key={movie.id}
                >
                  <Link href={`/movie/${movie.id}`}>
                    <Image
                      src={buildImageUrl(movie.image)}
                      alt={movie.title}
                      width={300}
                      height={450}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                    <div className="flex flex-col p-3 gap-2 [&_h4]:text-white [&_h4]:text-sm [&_h4]:font-semibold [&_h4]:line-clamp-2 [&_h4]:overflow-hidden [&_h4]:leading-[1.4] [&_h4]:break-words [&_h4]:m-0">
                      <span>{movie.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  };

  const emptyList = () => {
    return (
      <>
        <Head>
          <title>{getPageTitle()}</title>
        </Head>
        <div className="text-center py-15 px-5 text-[#84868d] [&_h3]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:tracking-[-0.3px] [&_p]:text-sm [&_p]:leading-[1.5] [&_p]:mb-2 [&_p:last-child]:mb-0">
          <h3>검색 결과가 없습니다.</h3>
          <p>검색하신 작품이 현재 플릭모자이크에 없어요.</p>
          <p>다른 키워드로 검색해보세요.</p>
        </div>
      </>
    );
  };

  if (query) {
    if (keywordData && keywordData.length > 0) {
      return resultList(keywordData, 'keyword');
    } else {
      return emptyList();
    }
  } else if (genreId) {
    if (genresData && genresData.length > 0) {
      return resultList(genresData, 'genres');
    } else {
      return emptyList();
    }
  }

  return <Status.Loading />;
};

const SearchResultPage = () => {
  return (
    <AppErrorBoundary>
      <React.Suspense fallback={<SearchResultPageSkeleton />}>
        <SearchResultPageContent />
      </React.Suspense>
    </AppErrorBoundary>
  );
};

export default SearchResultPage;
