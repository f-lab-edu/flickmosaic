# 🎬 FlickMosaic

영화 추천 사이트 프로젝트
(https://flickmosaic.p-e.kr/)

## 📋 프로젝트 소개

이 프로젝트는 영화 정보 플랫폼을 구현한 Next.js 애플리케이션과 재사용 가능한 Carousel 컴포넌트 라이브러리로 구성된 모노레포입니다.

### 🏗️ 모노레포 구조

```
flickmosaic/
├── apps/
│   └── flickmosaic/    # 메인 Next.js 애플리케이션
└── packages/
    ├── carousel/               # Carousel 컴포넌트 라이브러리
    ├── eslint-config/         # 공유 ESLint 설정
    ├── prettier-config/       # 공유 Prettier 설정
    └── tsconfig/              # 공유 TypeScript 설정
```

## 🚀 빠른 시작

### 필수 요구사항

- Node.js >= 22.13.0
- pnpm >= 10.15.1

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (포트 3000)
pnpm dev

# 전체 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 환경변수 설정

`apps/flickmosaic/` 디렉토리에 `.env` 파일을 생성하세요:

```bash
# TMDB API 설정
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w1280
```

**TMDB API 키 발급 방법:**

1. [TMDB 웹사이트](https://www.themoviedb.org/) 가입
2. 계정 설정에서 API 키 발급 요청
3. 발급받은 API 키를 환경변수에 설정

## 📦 프로젝트 구성

### 🎬 FlickMosaic App

영화 정보를 탐색하고 검색할 수 있는 Next.js 기반 웹 애플리케이션입니다.

**주요 기술 스택:**

- **프레임워크**: Next.js 15.5.4 (Pages Router)
- **UI 라이브러리**: React 19.1.1
- **스타일링**: Tailwind CSS v4
- **상태 관리**:
  - Zustand (클라이언트 상태)
  - TanStack Query (서버 상태)
- **HTTP 클라이언트**: Axios
- **날짜 처리**: Day.js

**주요 기능:**

- 영화 목록 탐색 (인기, 최신, 장르별)
- 영화 상세 정보 조회
- 영화 검색 기능
- 반응형 디자인

**프로젝트 구조:**

```
apps/flickmosaic/src/
├── components/     # 재사용 가능한 UI 컴포넌트
├── hooks/         # 커스텀 React 훅
├── layouts/       # 레이아웃 컴포넌트
├── pages/         # Next.js 페이지
├── queries/       # TanStack Query 설정
├── stores/        # Zustand 스토어
├── styles/        # 글로벌 스타일 (Tailwind CSS v4 설정)
├── types/         # TypeScript 타입 정의
└── utils/         # 유틸리티 함수
```

**개발 명령어:**

```bash
cd apps/flickmosaic

# 개발 서버 실행
pnpm dev

# 타입 체크
pnpm type-check

# 린트
pnpm lint

# 린트 자동 수정
pnpm lint:fix

# 코드 포맷팅
pnpm format

# 빌드
pnpm build
```

### 🎠 Carousel Package

재사용 가능한 React Carousel 컴포넌트 라이브러리입니다.

**패키지 정보:**

- **이름**: `@orbital0m0/carousel`
- **버전**: 1.0.1
- **라이센스**: ISC

**주요 기능:**

- React 19 기반 Carousel 컴포넌트
- TypeScript 지원
- Compound Component 패턴
- Tailwind CSS 기반 스타일링
- Storybook 문서화

**설치:**

```bash
pnpm add @orbital0m0/carousel
```

**사용 예시:**

```tsx
import { Carousel } from "@orbital0m0/carousel";
import "@orbital0m0/carousel/styles";

function App() {
  return (
    <Carousel.Root height={400} articleWidth={200} slides={data}>
      <Carousel.LeftButton />
      <Carousel.Track articleWidth={200}>
        <Carousel.Article articleWidth={200} layout="overlay">
          {(item) => <div>{item.title}</div>}
        </Carousel.Article>
      </Carousel.Track>
      <Carousel.RightButton />
    </Carousel.Root>
  );
}
```

**Storybook:**

- 📚 [배포된 Storybook 문서](https://f-lab-edu.github.io/flickmosaic/)
- 로컬 실행: `pnpm --F @orbital0m0/carousel storybook`

**개발 명령어:**

```bash
cd packages/carousel

# Storybook 개발 서버
pnpm storybook

# Storybook 빌드
pnpm build-storybook

# 패키지 빌드
pnpm build

# 타입 체크
pnpm type-check

# 린트
pnpm lint
```

## 🛠️ 개발 스크립트

### 루트 레벨 명령어

```bash
# 전체 프로젝트 빌드
pnpm build

# 개발 서버 실행
pnpm dev

# 프로덕션 서버 실행
pnpm start

# 모든 패키지 타입 체크
pnpm type-check

# 모든 패키지 린트
pnpm lint

# 모든 패키지 린트 자동 수정
pnpm lint:fix

# 모든 패키지 포맷팅
pnpm format

# 포맷팅 검사
pnpm format:check
```

### 특정 워크스페이스 명령어

```bash
# 특정 패키지에서 명령어 실행
pnpm --F <package-name> <command>

# 예시:
pnpm --F flickmosaic dev
pnpm --F @orbital0m0/carousel build
```

## 🔄 CI/CD

### GitHub Actions 자동 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 배포됩니다:

**메인 애플리케이션 배포:**

- S3 + CloudFront로 배포
- `main` 또는 `refactoring` 브랜치 push 시 자동 실행

**Storybook 배포:**

- GitHub Pages로 배포
- Carousel 패키지 문서 자동 업데이트

**필요한 GitHub Secrets:**

```
NEXT_PUBLIC_TMDB_API_KEY    # TMDB API 키
AWS_ACCESS_KEY_ID           # AWS 액세스 키
AWS_SECRET_ACCESS_KEY       # AWS 시크릿 키
AWS_REGION                  # AWS 리전
S3_BUCKET_NAME              # S3 버킷 이름
CLOUDFRONT_DISTRIBUTION_ID  # CloudFront 배포 ID
```

## 🧹 코드 품질

### Husky & Lint-staged

프로젝트는 커밋 전 자동으로 코드 품질을 검사합니다:

- **ESLint**: 코드 린팅
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 체크

### 공유 설정

모노레포의 모든 패키지는 다음 공유 설정을 사용합니다:

- `@flickmosaic/eslint-config`: ESLint 설정
- `@flickmosaic/prettier-config`: Prettier 설정
- `@flickmosaic/tsconfig`: TypeScript 설정

## 📚 추가 문서

- [Storybook 배포 가이드](./.github/STORYBOOK_DEPLOY.md)
- [GitHub Pages 설정](./.github/GITHUB_PAGES_SETUP.md)

## 🔗 링크

- **Repository**: [https://github.com/f-lab-edu/flickmosaic](https://github.com/f-lab-edu/flickmosaic)
- **Issues**: [https://github.com/f-lab-edu/flickmosaic/issues](https://github.com/f-lab-edu/flickmosaic/issues)
- **Storybook**: [https://f-lab-edu.github.io/flickmosaic/](https://f-lab-edu.github.io/flickmosaic/)

## 📄 라이센스

ISC

---

**Made with ❤️ by Orbital0m0**
