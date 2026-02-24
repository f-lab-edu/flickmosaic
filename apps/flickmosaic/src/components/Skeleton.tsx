import React, { memo } from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = memo(
  ({ width = '100%', height = '20px', borderRadius = '4px', className = '', style = {} }) => {
    return (
      <div
        className={`block animate-skeleton-loading bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-size-[200%_100%] will-change-[background-position] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:bg-[#2a2a2a] contrast-more:bg-none contrast-more:bg-black contrast-more:border contrast-more:border-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 ${className}`}
        style={{
          width,
          height,
          borderRadius,
          ...style,
        }}
        aria-hidden="true"
        role="presentation"
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

// 오버레이 레이아웃 영화 카드 스켈레톤
const OverlayMovieCardSkeleton: React.FC = memo(() => {
  return (
    <div className="relative overflow-hidden h-[642px]">
      <Skeleton height="642px" borderRadius="8px" />
      <div className="p-4 md:p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
        <Skeleton width="60%" height="32px" style={{ marginBottom: '12px' }} />
        <Skeleton width="80%" height="20px" style={{ marginBottom: '8px' }} />
        <Skeleton width="40%" height="16px" />
      </div>
    </div>
  );
});

OverlayMovieCardSkeleton.displayName = 'OverlayMovieCardSkeleton';

// 상단 레이아웃 영화 카드 스켈레톤
const TopMovieCardSkeleton: React.FC = memo(() => {
  return (
    <div className="relative overflow-hidden flex flex-col gap-3">
      <Skeleton height="289px" borderRadius="8px" />
      <div className="py-0 px-2">
        <Skeleton width="90%" height="20px" style={{ marginBottom: '8px' }} />
        <Skeleton width="70%" height="16px" />
      </div>
    </div>
  );
});

TopMovieCardSkeleton.displayName = 'TopMovieCardSkeleton';

// 좌측 레이아웃 영화 카드 스켈레톤
const LeftMovieCardSkeleton: React.FC = memo(() => {
  return (
    <div className="relative overflow-hidden flex items-center gap-4 h-30">
      <Skeleton width="80px" height="120px" borderRadius="4px" />
      <div className="flex items-center justify-center">
        <Skeleton width="24px" height="24px" borderRadius="50%" />
      </div>
    </div>
  );
});

LeftMovieCardSkeleton.displayName = 'LeftMovieCardSkeleton';

// 콘텐츠 없는 영화 카드 스켈레톤
const NoneMovieCardSkeleton: React.FC = memo(() => {
  return (
    <div className="relative overflow-hidden h-[164px]">
      <Skeleton height="164px" borderRadius="8px" />
    </div>
  );
});

NoneMovieCardSkeleton.displayName = 'NoneMovieCardSkeleton';

// 캐러셀용 스켈레톤
const CarouselSkeleton: React.FC<{
  height: number;
  articleWidth: number;
  layout?: 'overlay' | 'top' | 'left' | 'none';
  count?: number;
}> = memo(({ height, articleWidth, layout = 'top', count = 5 }) => {
  // 레이아웃에 따라 적절한 스켈레톤 컴포넌트를 렌더링하는 함수
  const renderMovieCardSkeleton = () => {
    switch (layout) {
      case 'overlay':
        return <OverlayMovieCardSkeleton />;
      case 'left':
        return <LeftMovieCardSkeleton />;
      case 'none':
        return <NoneMovieCardSkeleton />;
      case 'top':
      default:
        return <TopMovieCardSkeleton />;
    }
  };

  return (
    <div className="relative rounded-2 overflow-hidden" style={{ height: `${height}px` }}>
      <div className="flex gap-3 md:gap-4 h-full" style={{ width: `${articleWidth * count}px` }}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="shrink-0 h-full" style={{ width: `${articleWidth}px` }}>
            {renderMovieCardSkeleton()}
          </div>
        ))}
      </div>
    </div>
  );
});

CarouselSkeleton.displayName = 'CarouselSkeleton';

// 페이지 전체 로딩용 스켈레톤
const PageSkeleton: React.FC = memo(() => {
  return (
    <div className="p-4 md:p-6 max-w-300 my-0 mx-auto">
      {/* 탭 스켈레톤 */}
      <div className="flex gap-2 md:gap-3 mb-8 py-0 px-4 flex-wrap">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} width="120px" height="40px" borderRadius="20px" />
        ))}
      </div>

      {/* 메인 캐러셀 스켈레톤 */}
      <section style={{ marginBottom: '40px' }}>
        <CarouselSkeleton height={642} articleWidth={1140} layout="overlay" count={3} />
      </section>

      {/* 추천 캐러셀 스켈레톤 */}
      <section style={{ marginBottom: '40px' }}>
        <CarouselSkeleton height={289} articleWidth={421} layout="top" count={4} />
      </section>

      {/* Top 20 캐러셀 스켈레톤 */}
      <section style={{ marginBottom: '40px' }}>
        <Skeleton width="200px" height="28px" style={{ marginBottom: '16px' }} />
        <CarouselSkeleton height={200} articleWidth={400} layout="left" count={5} />
      </section>

      {/* 새로 올라온 콘텐츠 캐러셀 스켈레톤 */}
      <section style={{ marginBottom: '40px' }}>
        <Skeleton width="180px" height="28px" style={{ marginBottom: '16px' }} />
        <CarouselSkeleton height={164} articleWidth={290} layout="none" count={6} />
      </section>
    </div>
  );
});

PageSkeleton.displayName = 'PageSkeleton';

// 상세 페이지용 스켈레톤
const DetailPageSkeleton: React.FC = memo(() => {
  return (
    <div className="relative h-auto pt-5 md:h-[646px] z-2 flex flex-col gap-6 md:pt-10 mb-8 bg-gradient-to-r from-gray-700/80 via-gray-900 to-gray-800">
      <div className="flex flex-col gap-6 px-5 md:flex-row md:gap-8 md:px-10 items-start h-full">
        <div className="min-w-auto max-w-none pt-5 md:min-w-[25em] md:max-w-[37.25em] flex-1 flex flex-col justify-start h-full md:pt-10">
          {/* 영화 제목 */}
          <div className="flex flex-col justify-end">
            <Skeleton width="80%" height="48px" style={{ marginBottom: '16px' }} />
          </div>

          {/* 영화 메타 정보 */}
          <div className="flex flex-row flex-wrap items-center min-h-[22px] gap-1 mb-4">
            <Skeleton width="80px" height="20px" />
            <Skeleton width="60px" height="20px" />
            <Skeleton width="100px" height="20px" />
          </div>

          {/* 영화 개요 */}
          <div className="relative">
            <Skeleton width="100%" height="66px" style={{ marginTop: '16px' }} />
          </div>

          {/* 평점 정보 */}
          <div className="flex items-center min-h-23 justify-start gap-[70px] my-6">
            <div className="flex flex-col">
              <Skeleton width="60px" height="44px" />
              <Skeleton width="80px" height="20px" style={{ marginTop: '4px' }} />
            </div>
            <div className="flex flex-col">
              <Skeleton width="80px" height="44px" />
              <Skeleton width="60px" height="20px" style={{ marginTop: '4px' }} />
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex-col flex gap-6 justify-end mt-6">
            <div className=" flex flex-col gap-[10px]">
              <Skeleton width="120px" height="40px" style={{ marginRight: '10px' }} />
              <Skeleton width="120px" height="40px" />
            </div>
            <div className="flex flex-wrap flex-row gap-[10px] items-stretch justify-start">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} width="120px" height="78px" borderRadius="6px" />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full min-h-50 mt-5 flex-1 relative md:min-h-[270px] rounded-2 overflow-hidden md:mt-10 block">
          <Skeleton height="100%" borderRadius="8px" />
        </div>
      </div>

      <div className="px-5 md:px-10 bg-black/90">
        {/* 관련 콘텐츠 섹션 */}
        <section className="mt-10 mb-8">
          <Skeleton width="150px" height="24px" style={{ marginBottom: '20px' }} />
          <div className="relative z-0 h-[288px] flex gap-4">
            <Skeleton width="200px" height="288px" borderRadius="4px" />
          </div>
        </section>

        {/* 관련 동영상 섹션 */}
        <section className="mt-10 mb-8">
          <Skeleton width="150px" height="24px" style={{ marginBottom: '20px' }} />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="bg-white/10 rounded-2 p-4">
                <Skeleton width="100%" height="20px" style={{ marginBottom: '8px' }} />
                <Skeleton width="60px" height="16px" />
              </div>
            ))}
          </div>
        </section>

        {/* 감독/출연 섹션 */}
        <section className="mt-10 mb-8">
          <Skeleton width="150px" height="24px" style={{ marginBottom: '20px' }} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-5 md:gap-y-10 md:mt-5">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <div className="flex-1">
                  <Skeleton width="100px" height="22px" style={{ marginBottom: '2px' }} />
                  <Skeleton width="80px" height="18px" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 리뷰 섹션 */}
        <section className="mt-10 mb-8">
          <Skeleton width="200px" height="24px" style={{ marginBottom: '20px' }} />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="flex items-start gap-3 py-2 px-0">
                <Skeleton width="38px" height="38px" borderRadius="50%" />
                <div className="flex-1">
                  <Skeleton width="120px" height="22px" style={{ marginBottom: '8px' }} />
                  <Skeleton width="100%" height="60px" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});

DetailPageSkeleton.displayName = 'DetailPageSkeleton';

// 검색 홈 페이지용 스켈레톤
const SearchHomePageSkeleton: React.FC = memo(() => {
  return (
    <div className="p-6 max-w-300 mx-auto">
      {/* 인기 검색어 섹션 */}
      <section className="mb-12">
        <div>
          <Skeleton width="200px" height="32px" style={{ marginBottom: '24px' }} />
        </div>
        <div className="flex gap-6 md:flex-row md:gap-8 flex-col">
          <div className="flex-1">
            <div className="flex gap-2 md:gap-3 mb-8 py-0 px-4 flex-wrap">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} width="100px" height="36px" borderRadius="18px" />
              ))}
            </div>
            <div className="flex flex-col gap-3 mt-4">
              {Array.from({ length: 10 }, (_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton width="24px" height="24px" borderRadius="50%" />
                  <Skeleton width="200px" height="20px" />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-100 md:shrink-0">
            <Skeleton height="400px" borderRadius="8px" />
          </div>
        </div>
      </section>

      {/* 장르별 영화 섹션 */}
      <section className="mb-8">
        <div className="mb-6">
          <Skeleton width="150px" height="28px" style={{ marginBottom: '8px' }} />
          <Skeleton width="300px" height="20px" />
        </div>
        <CarouselSkeleton height={180} articleWidth={319} layout="overlay" count={4} />
      </section>
    </div>
  );
});

SearchHomePageSkeleton.displayName = 'SearchHomePageSkeleton';

// 검색 결과 페이지용 스켈레톤
const SearchResultPageSkeleton: React.FC = memo(() => {
  return (
    <div className="p-6 max-w-300 mx-auto">
      {/* 검색 결과 헤더 */}
      <div className="mb-8">
        <Skeleton width="300px" height="32px" style={{ marginBottom: '8px' }} />
        <Skeleton width="100px" height="20px" />
      </div>

      {/* 검색 결과 그리드 */}
      <div className="grid gap-3 md:gap-4 grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="flex flex-col">
            <Skeleton height="200px" borderRadius="8px" />
            <Skeleton width="80%" height="16px" style={{ marginTop: '8px' }} />
          </div>
        ))}
      </div>
    </div>
  );
});

SearchResultPageSkeleton.displayName = 'SearchResultPageSkeleton';

const SkeletonComponents = {
  Skeleton,
  OverlayMovieCardSkeleton,
  TopMovieCardSkeleton,
  LeftMovieCardSkeleton,
  NoneMovieCardSkeleton,
  CarouselSkeleton,
  PageSkeleton,
  DetailPageSkeleton,
  SearchHomePageSkeleton,
  SearchResultPageSkeleton,
} as const;

export default SkeletonComponents;
export {
  Skeleton,
  OverlayMovieCardSkeleton,
  TopMovieCardSkeleton,
  LeftMovieCardSkeleton,
  NoneMovieCardSkeleton,
  CarouselSkeleton,
  PageSkeleton,
  DetailPageSkeleton,
  SearchHomePageSkeleton,
  SearchResultPageSkeleton,
};
