# FlickMosaic

영화 추천 플랫폼 프로젝트입니다.

## 환경 설정

### 1. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경변수를 설정하세요:

```bash
# TMDB API 설정
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w1280
```

### 2. TMDB API 키 발급

1. [TMDB 웹사이트](https://www.themoviedb.org/)에 가입
2. API 키 발급 요청
3. 발급받은 API 키를 `VITE_TMDB_API_KEY`에 설정

## 개발 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 빌드 및 배포

### 로컬 빌드

```bash
pnpm build
```

### GitHub Actions를 통한 자동 배포

이 프로젝트는 GitHub Actions를 통해 S3 + CloudFront로 자동 배포됩니다.

#### 필요한 GitHub Secrets 설정:

1. `VITE_TMDB_API_KEY`: TMDB API 키
2. `AWS_ACCESS_KEY_ID`: AWS 액세스 키 ID
3. `AWS_SECRET_ACCESS_KEY`: AWS 시크릿 액세스 키
4. `AWS_REGION`: AWS 리전 (예: us-east-1)
5. `S3_BUCKET_NAME`: S3 버킷 이름
6. `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront 배포 ID

#### 배포 트리거:

- `main` 또는 `refactoring` 브랜치에 push 시 자동 배포
- Pull Request 생성 시 빌드 테스트

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── hooks/         # 커스텀 훅
├── pages/         # 페이지 컴포넌트
├── queries/       # React Query 관련
├── stores/        # Zustand 스토어
├── styles/        # 글로벌 스타일 (Tailwind CSS v4 설정)
├── types/         # TypeScript 타입 정의
└── utils/         # 유틸리티 함수
```
