import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode } from 'react';

import Carousel from '../components/Carousel';
import { CarouselProps, RootProps } from '../types/Carousel';

// 샘플 데이터
const sampleMovies: CarouselProps[] = [
  {
    id: 1,
    rank: 1,
    image: 'https://picsum.photos/200/300?random=1',
    title: '영화 제목 1',
    description: '영화 설명 1',
    href: '/movie/1',
  },
  {
    id: 2,
    rank: 2,
    image: 'https://picsum.photos/200/300?random=2',
    title: '영화 제목 2',
    description: '영화 설명 2',
    href: '/movie/2',
  },
  {
    id: 3,
    rank: 3,
    image: 'https://picsum.photos/200/300?random=3',
    title: '영화 제목 3',
    description: '영화 설명 3',
    href: '/movie/3',
  },
  {
    id: 4,
    rank: 4,
    image: 'https://picsum.photos/200/300?random=4',
    title: '영화 제목 4',
    description: '영화 설명 4',
    href: '/movie/4',
  },
  {
    id: 5,
    rank: 5,
    image: 'https://picsum.photos/200/300?random=5',
    title: '영화 제목 5',
    description: '영화 설명 5',
    href: '/movie/5',
  },
];

// 공통 래퍼 컴포넌트
const CarouselWrapper = ({ args, children }: { args: RootProps; children: ReactNode }) => (
  <div style={{ width: '1000px', position: 'relative' }}>
    <Carousel.Root {...args}>
      <Carousel.LeftButton />
      <Carousel.RightButton />
      <Carousel.Track articleWidth={args.articleWidth}>{children}</Carousel.Track>
    </Carousel.Root>
  </div>
);

// 레이아웃별 렌더 함수들
const renderOverlayWithRank = (movie: CarouselProps) => (
  <div style={{ position: 'relative', height: '100%' }}>
    <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '10px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        color: 'white',
      }}
    >
      {Boolean(movie.rank) && <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{movie.rank}</div>}
      <div style={{ fontSize: '16px' }}>{movie.title}</div>
    </div>
  </div>
);

const renderOverlay = (movie: CarouselProps) => (
  <div style={{ position: 'relative', height: '100%' }}>
    <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
      }}
    >
      <div>{movie.title}</div>
    </div>
  </div>
);

const renderTop = (movie: CarouselProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', background: '#000', height: '100%' }}>
    <div
      style={{
        flex: 1,
        padding: '12px',
        background: '#000',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '8px 8px 0 0',
        order: 1,
      }}
    >
      {Boolean(movie.rank) && (
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{movie.rank}</div>
      )}
      <div
        style={{
          fontSize: '14px',
          color: 'white',
          marginBottom: '4px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {movie.title}
      </div>
      {movie.description && (
        <div
          style={{
            fontSize: '11px',
            color: '#ccc',
            opacity: 0.8,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}
        >
          {movie.description}
        </div>
      )}
    </div>
    <div style={{ height: '70%', borderRadius: '0 0 8px 8px', overflow: 'hidden', order: 2, position: 'relative' }}>
      <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </div>
);

const renderLeft = (movie: CarouselProps) => (
  <div style={{ display: 'flex', height: '100%' }}>
    <div style={{ width: '150px', flexShrink: 0 }}>
      <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ flex: 1, padding: '15px', background: '#fff', border: '1px solid #ddd' }}>
      {Boolean(movie.rank) && (
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{movie.rank}</div>
      )}
      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{movie.title}</div>
      <div style={{ fontSize: '14px', color: '#666' }}>{movie.description}</div>
    </div>
  </div>
);

const renderNone = (movie: CarouselProps) => (
  <div style={{ height: '100%' }}>
    <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
);

const meta = {
  title: 'Components/Carousel',
  component: Carousel.Root,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Carousel 컴포넌트

복합 컴포넌트 패턴을 사용한 유연하고 재사용 가능한 캐러셀 컴포넌트입니다.

## 주요 기능

- 🔄 **무한 스크롤**: 자연스러운 무한 루프 기능
- 🎨 **다양한 레이아웃**: overlay, top, left, none 등 4가지 레이아웃 옵션
- 🎯 **복합 컴포넌트**: Root, Track, Article, Button 등으로 구성
- 📱 **반응형**: 다양한 화면 크기 지원
- ♿ **접근성**: 키보드 네비게이션 및 ARIA 지원

## 기본 구조

\`\`\`tsx
<Carousel.Root height={400} articleWidth={200} slides={data}>
  <Carousel.LeftButton />
  <Carousel.Track articleWidth={200}>
    <Carousel.Article articleWidth={200} layout="overlay">
      {(item) => <div>{item.title}</div>}
    </Carousel.Article>
  </Carousel.Track>
  <Carousel.RightButton />
</Carousel.Root>
\`\`\`

## 설치

\`\`\`bash
npm install @orbital0m0/carousel
# or
pnpm add @orbital0m0/carousel
\`\`\`

## 스타일 가져오기

\`\`\`tsx
import "@orbital0m0/carousel/styles";
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number' },
      description: '캐러셀의 높이 (픽셀 단위)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '400' },
      },
    },
    articleWidth: {
      control: { type: 'number' },
      description: '각 슬라이드의 너비 (픽셀 단위)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    slides: {
      description: '캐러셀에 표시할 데이터 배열',
      table: {
        type: { summary: 'Array<any>' },
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Carousel.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 캐러셀
export const Default: Story = {
  args: {
    height: 400,
    articleWidth: 200,
    slides: sampleMovies,
  } as RootProps,
  parameters: {
    docs: {
      description: {
        story: `
가장 기본적인 형태의 캐러셀입니다. 순위와 제목이 오버레이되어 표시됩니다.

**사용 예시:**
\`\`\`tsx
<Carousel.Root height={400} articleWidth={200} slides={movies}>
  <Carousel.LeftButton />
  <Carousel.Track articleWidth={200}>
    <Carousel.Article articleWidth={200} layout="overlay">
      {(movie) => (
        <div>
          <img src={movie.image} alt={movie.title} />
          <div className="overlay">
            <h3>{movie.rank}</h3>
            <p>{movie.title}</p>
          </div>
        </div>
      )}
    </Carousel.Article>
  </Carousel.Track>
  <Carousel.RightButton />
</Carousel.Root>
\`\`\`
        `,
      },
    },
  },
  render: (args: RootProps) => (
    <CarouselWrapper args={args}>
      <Carousel.Article articleWidth={args.articleWidth} layout="overlay">
        {(slide) => renderOverlayWithRank(slide as CarouselProps)}
      </Carousel.Article>
    </CarouselWrapper>
  ),
};

// Overlay 레이아웃
export const OverlayLayout: Story = {
  args: {
    height: 400,
    articleWidth: 200,
    slides: sampleMovies,
  } as RootProps,
  parameters: {
    docs: {
      description: {
        story: `
이미지 위에 텍스트가 오버레이되는 레이아웃입니다. 영화, 비디오 썸네일 등에 적합합니다.

**특징:**
- 이미지가 전체 영역을 차지
- 하단에 텍스트 정보가 오버레이
- 그라데이션 배경으로 가독성 확보

**활용 사례:** 넷플릭스, 왓챠, 유튜브 등의 비디오 플랫폼
        `,
      },
    },
  },
  render: (args: RootProps) => (
    <CarouselWrapper args={args}>
      <Carousel.Article articleWidth={args.articleWidth} layout="overlay">
        {(slide) => renderOverlay(slide as CarouselProps)}
      </Carousel.Article>
    </CarouselWrapper>
  ),
};

// Top 레이아웃
export const TopLayout: Story = {
  args: {
    height: 450,
    articleWidth: 200,
    slides: sampleMovies,
  } as RootProps,
  parameters: {
    docs: {
      description: {
        story: `
텍스트 정보가 이미지 위에 위치하는 레이아웃입니다.

**특징:**
- 제목과 순위가 상단에 표시
- 이미지가 하단에 위치
- 정보를 먼저 보여주고 싶을 때 유용

**활용 사례:** 랭킹 리스트, 차트 등
        `,
      },
    },
  },
  render: (args: RootProps) => (
    <CarouselWrapper args={args}>
      <Carousel.Article articleWidth={args.articleWidth} layout="top">
        {(slide) => renderTop(slide as CarouselProps)}
      </Carousel.Article>
    </CarouselWrapper>
  ),
};

// Left 레이아웃
export const LeftLayout: Story = {
  args: {
    height: 300,
    articleWidth: 400,
    slides: sampleMovies,
  } as RootProps,
  parameters: {
    docs: {
      description: {
        story: `
이미지가 왼쪽, 텍스트 정보가 오른쪽에 나란히 배치되는 레이아웃입니다.

**특징:**
- 가로로 넓은 카드 형태
- 이미지와 텍스트가 나란히 배치
- 설명이 긴 콘텐츠에 적합

**활용 사례:** 뉴스 기사, 블로그 포스트, 상품 상세 정보 등

**권장 설정:**
- \`articleWidth\`: 400px 이상
- \`height\`: 300px 정도
        `,
      },
    },
  },
  render: (args: RootProps) => (
    <CarouselWrapper args={args}>
      <Carousel.Article articleWidth={args.articleWidth} layout="left">
        {(slide) => renderLeft(slide as CarouselProps)}
      </Carousel.Article>
    </CarouselWrapper>
  ),
};

// None 레이아웃 (정보 없음)
export const NoneLayout: Story = {
  args: {
    height: 300,
    articleWidth: 200,
    slides: sampleMovies,
  } as unknown as RootProps,
  parameters: {
    docs: {
      description: {
        story: `
추가적인 레이아웃 스타일 없이 순수하게 콘텐츠만 렌더링하는 레이아웃입니다.

**특징:**
- 기본 스타일이 적용되지 않음
- 완전한 커스터마이징이 가능
- 자유로운 디자인 구현

**활용 사례:**
- 완전히 커스텀한 디자인이 필요한 경우
- 이미지 갤러리
- 배너 슬라이더

**장점:**
- 최대한의 유연성
- 기존 스타일과의 충돌 방지
        `,
      },
    },
  },
  render: (args: RootProps) => (
    <CarouselWrapper args={args}>
      <Carousel.Article articleWidth={args.articleWidth} layout="none">
        {(slide) => renderNone(slide as CarouselProps)}
      </Carousel.Article>
    </CarouselWrapper>
  ),
};

// 데이터 없는 경우
export const NoData: Story = {
  args: {
    height: 400,
    articleWidth: 200,
    slides: [],
    children: <></>,
  } as unknown as RootProps,
  parameters: {
    docs: {
      description: {
        story: `
데이터가 없는 경우의 캐러셀 상태입니다.

**처리 방법:**
\`\`\`tsx
function MyCarousel({ data }) {
  if (!data || data.length === 0) {
    return <EmptyState message="표시할 항목이 없습니다" />;
  }

  return (
    <Carousel.Root slides={data} {...props}>
      {/* ... */}
    </Carousel.Root>
  );
}
\`\`\`

**권장 사항:**
- 데이터 로딩 중일 때는 스켈레톤 UI 표시
- 데이터가 없을 때는 안내 메시지 표시
- 에러 발생 시 적절한 에러 메시지 표시
        `,
      },
    },
  },
  render: (args: RootProps) => (
    <CarouselWrapper args={args}>
      <Carousel.Article articleWidth={args.articleWidth}>
        {(slide) => <div>{(slide as CarouselProps).title}</div>}
      </Carousel.Article>
    </CarouselWrapper>
  ),
};
