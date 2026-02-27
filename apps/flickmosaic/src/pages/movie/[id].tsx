import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import { movieDetailKeys } from '../../queries/detail/queryKeys';
import { fetchMovieDetail, fetchMovieReviews, fetchPopularMovieList } from '../../utils/api';

import AssessmentIcon from '@/assets/assuessment.svg';
import InterestIcon from '@/assets/interest.svg';
import MoreIcon from '@/assets/more.svg';
import PartyIcon from '@/assets/party.svg';
import AppErrorBoundary from '@/components/AppErrorBoundary';
import Button from '@/components/Button';
import { DetailPageSkeleton } from '@/components/Skeleton';
import useMovieDetail from '@/hooks/useMovieDetail';
import { Genre, Member, Review, Video } from '@/types/Movie';
import { buildImageUrl } from '@/utils/transform';

// 어떤 페이지를 미리 생성할지
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // 인기 영화 목록 빌드 타임에 생성
    const movies = await fetchPopularMovieList();

    const paths = movies.slice(0, 50).map((movie) => ({
      params: { id: movie.id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking', // 나머지 영화는 첫 요청 시 생성
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);

    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

// getStaticProps - 각 페이지의 데이터 prefetch
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = params?.id as string;
  const queryClient = new QueryClient();

  try {
    // 영화 상세 정보와 리뷰를 병렬로 prefetch
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: movieDetailKeys.detail(movieId),
        queryFn: () => fetchMovieDetail(movieId),
      }),
      queryClient.prefetchQuery({
        queryKey: movieDetailKeys.reviews(movieId),
        queryFn: () => fetchMovieReviews(movieId),
      }),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 86400, // 24시간마다 재생성 (영화 정보는 거의 안 바뀜)
    };
  } catch (error) {
    console.error(`Error fetching movie ${movieId}:`, error);

    // 404 페이지로
    return {
      notFound: true,
    };
  }
};

const DetailPageContent: React.FC = () => {
  const { movieData, reviews, getReleaseYear, changeTimeFormat } = useMovieDetail();

  // 로딩 상태 처리
  if (!movieData) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center min-h-100 text-center text-white p-10 [&_h2]:text-2xl [&_h2]:text-white [&_h2]:mb-4 [&_p]:text-base [&_p]:mb-6 [&_p]:text-[#84868d] [&_p]:leading-[1.5] [&_button]:bg-[#f82f62] [&_button]:text-white [&_button]:border-none [&_button]:py-3 [&_button]:px-6 [&_button]:text-sm [&_button]:rounded-1.5 [&_button]:cursor-pointer [&_button]:transition-[background-color] [&_button]:duration-200 [&_button]:ease-[ease] hover:[&_button]:bg-[#d91e4f]">
          <h2>영화 정보를 불러오는 중...</h2>
          <p>잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (movieData && !movieData.id) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center min-h-100 text-center text-white p-10 [&_h2]:text-2xl [&_h2]:text-white [&_h2]:mb-4 [&_p]:text-base [&_p]:mb-6 [&_p]:text-[#84868d] [&_p]:leading-[1.5] [&_button]:bg-[#f82f62] [&_button]:text-white [&_button]:border-none [&_button]:py-3 [&_button]:px-6 [&_button]:text-sm [&_button]:rounded-1.5 [&_button]:cursor-pointer [&_button]:transition-[background-color] [&_button]:duration-200 [&_button]:ease-[ease] hover:[&_button]:bg-[#d91e4f]">
          <h2>영화 정보를 찾을 수 없습니다</h2>
          <p>요청하신 영화의 정보가 존재하지 않습니다.</p>
          <button onClick={() => window.history.back()}>이전 페이지로</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{movieData.title} - FlickMosaic</title>
      </Head>
      <div>
        <div className="relative h-[646px] z-2 flex flex-col gap-6 pt-10 mb-8 bg-[linear-gradient(90deg,_rgba(89,89,89,1)_0%,_rgba(0,0,0,1)_45%,_rgba(77,77,77,1)_100%)]">
          <div className="flex flex-row gap-8 items-start py-0 px-10 h-full">
            <section className="min-w-[25em] max-w-[37.25em] flex-1 flex flex-col justify-start h-full pt-10">
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-col justify-end [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:leading-[1.2] [&_h1]:text-white">
                  <h1>{movieData.title}</h1>
                </div>
                <div className="text-white flex flex-row flex-wrap items-center min-h-5.5 gap-1 text-base leading-[22px] tracking-normal [&>span:not(:last-child)]:after:content-['•'] [&>span:not(:last-child)]:after:mx-1 [&_>span:not(:last-child)]:after:text-white/70 [&_>span:not(:last-child)]:after:inline-block">
                  <span>{getReleaseYear(movieData.releaseDate)}</span>
                  {movieData.runtime && <span>{changeTimeFormat(movieData.runtime)}</span>}
                  {movieData.genres.map((genre: Genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>
                <div className="text-white text-base leading-[1.5] relative opacity-70 [&_p]:line-clamp-3 [&_p]:overflow-hidden [&_p]:text-ellipsis [&_p]:text-base [&_p]:leading-[22px] [&_p]:tracking-normal">
                  <p>{movieData.overview}</p>
                </div>
              </div>
              <div className="flex items-center min-h-23 justify-start gap-[70px] my-6 mx-0">
                <div className="flex flex-col">
                  <span className="text-white text-[34px] leading-[44px] font-semibold">
                    {movieData.voteAverage?.toFixed(1) || '0.0'}
                  </span>
                  <span className="text-white/70 leading-[20px] text-sm">평균 별점</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[34px] leading-[44px] font-semibold">
                    {movieData.voteCount?.toLocaleString() || '0'}
                  </span>
                  <span className="text-white/70 leading-[20px] text-sm">평가 수</span>
                </div>
              </div>
              <div className="flex flex-col gap-6 justify-end">
                <div className="flex gap-2.5">
                  <Button className="text-white bg-[#f82f62] border-none py-2.5 px-10 text-[15px] leading-5 cursor-pointer rounded-1 font-medium hover:bg-[#e02856]">
                    구매하기
                  </Button>
                  <Button className="text-white bg-[#f82f62] border-none py-2.5 px-10 text-[15px] leading-5 cursor-pointer rounded-1 font-medium hover:bg-[#e02856]">
                    선물하기
                  </Button>
                </div>
                <div className="flex flex-row gap-2.5 justify-start items-stretch">
                  <Button
                    className="flex flex-col gap-2 items-center justify-center py-3.5 px-2 bg-black/60 border-0 rounded-1.5 text-white w-30 h-19.5 cursor-pointer text-[13px] transition-[background-color] duration-200 ease-[ease] hover:bg-black/80 [&_p]:m-0 [&_p]:font-normal"
                    icon={<InterestIcon />}
                  >
                    <p>보고싶어요</p>
                  </Button>
                  <Button
                    className="flex flex-col gap-2 items-center justify-center py-3.5 px-2 bg-black/60 border-0 rounded-1.5 text-white w-30 h-19.5 cursor-pointer text-[13px] transition-[background-color] duration-200 ease-[ease] hover:bg-black/80 [&_p]:m-0 [&_p]:font-normal"
                    icon={<AssessmentIcon />}
                  >
                    <p>평가하기</p>
                  </Button>
                  <Button
                    className="flex flex-col gap-2 items-center justify-center py-3.5 px-2 bg-black/60 border-0 rounded-1.5 text-white w-30 h-19.5 cursor-pointer text-[13px] transition-[background-color] duration-200 ease-[ease] hover:bg-black/80 [&_p]:m-0 [&_p]:font-normal"
                    icon={<PartyIcon />}
                  >
                    <p>파티</p>
                  </Button>
                  <Button
                    className="flex flex-col gap-2 items-center justify-center py-3.5 px-2 bg-black/60 border-0 rounded-1.5 text-white w-30 h-19.5 cursor-pointer text-[13px] transition-[background-color] duration-200 ease-[ease] hover:bg-black/80 [&_p]:m-0 [&_p]:font-normal"
                    icon={<MoreIcon />}
                  >
                    <p>더보기</p>
                  </Button>
                </div>
              </div>
            </section>
            <div className="flex-1 relative min-h-[270px] rounded-2 overflow-hidden block mt-10 [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:block">
              {movieData.backdrop && (
                <>
                  <Image
                    src={buildImageUrl(movieData.backdrop)}
                    alt="Detail Image"
                    width={1280}
                    height={720}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end z-1 h-15">
                    <Button className="text-white bg-none border-none text-sm cursor-pointer font-medium">
                      {'미리보기 >'}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          {/* 컬렉션 섹션 */}
          <section>
            <div className="relative flex items-end justify-between mb-5 text-xl font-bold text-white">관련 콘텐츠</div>
            {movieData.collection && (
              <ul className="relative z-0 h-72 list-none">
                <li className="w-[12.5%] [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:border-0 [&_img]:rounded-1">
                  <Image
                    src={buildImageUrl(movieData.collection.poster_path)}
                    alt={movieData.collection.name}
                    width={300}
                    height={450}
                    style={{ objectFit: 'cover' }}
                  />
                </li>
              </ul>
            )}
          </section>

          {/* 관련 동영상 섹션 */}
          <section className="mt-10 bg-black/90">
            <div className="relative flex items-end justify-between mb-5 text-xl font-bold text-white">관련 동영상</div>
            {movieData.videos.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {movieData.videos.slice(0, 4).map((video: Video) => (
                  <div
                    key={video.id}
                    className="bg-white/10 rounded-2 p-4 text-white [&_h4]:text-sm [&_h4]:font-medium [&_h4]:mb-2 [&_a]:text-[13px] [&_a]:text-[#f82f62] [&_a]:no-underline"
                  >
                    <h4>{video.name}</h4>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={video.name}
                    >
                      보기
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 감독/출연 섹션 */}
          <section className="mt-10 bg-black/90">
            <div className="relative flex items-end justify-between mb-5 text-xl font-bold text-white">감독/출연</div>
            <div className="grid grid-cols-2 gap-y-5 gap-x-10 mt-5">
              {movieData.member.length > 0 &&
                movieData.member.slice(0, 10).map((person: Member) => (
                  <div key={person.id}>
                    <div className="flex items-center cursor-pointer">
                      <div className="w-12.5 h-12.5 rounded-full overflow-hidden mr-3 shrink-0 bg-white/10 [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:border-none">
                        <Image
                          src={buildImageUrl(person.profile_path)}
                          alt={person.name}
                          width={50}
                          height={50}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-base leading-[22px] text-white font-medium mb-[2px]">{person.name}</div>
                        <div className="text-[13px] leading-[18px] text-[#84868d]">
                          {person.job === 'Director' ? '감독' : '배우'}
                          {person.character && ` · ${person.character}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* 리뷰 섹션 */}
          <section className="mt-10 bg-black/90">
            <div className="relative flex items-end justify-between mb-5 text-xl font-bold text-white">
              플릭모자이크 사용자 평
            </div>
            {reviews.length > 0 && (
              <ul>
                {reviews.map((review: Review) => (
                  <li key={review.id}>
                    <article className="flex items-start py-2 px-0">
                      <div className="w-9.5 h-9.5 rounded-full overflow-hidden mr-2.5 shrink-0 bg-[#f82f62] border-none">
                        {review.author_details.avatar_path ? (
                          <Image
                            src={buildImageUrl(review.author_details.avatar_path)}
                            alt={review.author}
                            width={38}
                            height={38}
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div>{''}</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="mr-1">{review.author}</div>
                          <div>{review.author_details.rating}</div>
                        </div>
                        <div className="text-[#84868d] text-[15px] leading-[20px] whitespace-pre-wrap max-h-15 overflow-hidden tracking-normal break-all">
                          {review.content}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

const DetailPage: React.FC = () => {
  return (
    <AppErrorBoundary>
      <React.Suspense fallback={<DetailPageSkeleton />}>
        <DetailPageContent />
      </React.Suspense>
    </AppErrorBoundary>
  );
};

export default DetailPage;
