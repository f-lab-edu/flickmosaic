# CSS → Tailwind 마이그레이션 실수 정리

> Footer, Header, Layout, ThemeTab, Status, Skeleton 컴포넌트를 Tailwind로 전환하면서 발생한 오류 모음

---

## 1. 오타 (Typo)

### `item` → `items-center`

- **파일**: `Header.tsx`
- **위치**: `<ul>` 태그
- **잘못된 코드**: `flex item`
- **수정**: `flex items-center`
- **설명**: `items-center`는 `align-items: center`를 의미하는 Tailwind 클래스. `item`은 존재하지 않음

### `after:-trsnslate-x-1/2` → `after:-translate-x-1/2`

- **파일**: `Header.tsx`
- **위치**: 네비게이션 링크 `<span>` after 의사요소
- **잘못된 코드**: `after:-trsnslate-x-1/2`
- **수정**: `after:-translate-x-1/2`
- **설명**: `translate`를 `trsnslate`로 오타. 클래스가 아예 적용되지 않음

### `appearence-none` → `appearance-none`

- **파일**: `Header.tsx`
- **위치**: 검색 `<input>`
- **잘못된 코드**: `appearence-none`
- **수정**: `appearance-none`
- **설명**: `appearance`를 `appearence`로 오타

### `disable:` → `disabled:`

- **파일**: `Header.tsx`
- **위치**: 검색 초기화 버튼
- **잘못된 코드**: `disable:visibility-hidden`
- **수정**: `disabled:invisible`
- **설명**: Tailwind의 비활성 상태 의사클래스는 `disabled:`. 또한 `visibility-hidden`은 없는 클래스이고 `invisible`이 맞음

---

## 2. 클래스명 내 공백 오류

Tailwind에서 `variant:` 뒤에 공백이 있으면 해당 클래스 전체가 무시된다.

### `active:hover: text-[#84868d]`

- **파일**: `Header.tsx`
- **잘못된 코드**: `active:hover: text-[#84868d]`
- **수정**: `data-[active=true]:hover:text-[#84868d]`
- **설명**: `hover:` 뒤에 공백 → 클래스가 파싱되지 않음

### `after: text-[#84868d]`

- **파일**: `Header.tsx`
- **잘못된 코드**: `after: text-[#84868d]`
- **수정**: `after:bg-[#84868d]`
- **설명**: `after:` 뒤에 공백 → 무시됨. 더불어 속성도 잘못됨 (아래 3번 참고)

---

## 3. 잘못된 CSS 속성 변환

### `background-color` → `text-` 로 잘못 변환

- **파일**: `Header.tsx`
- **위치**: after 의사요소의 밑줄 색상
- **원본 CSS**: `background-color: #84868d`
- **잘못된 코드**: `after:text-[#84868d]`
- **수정**: `after:bg-[#84868d]`
- **설명**: `::after`의 밑줄은 `background-color`로 그리는 것. `text-`는 `color` 속성이므로 의사요소에 의미 없음

### `width: 0` 초기값 누락

- **파일**: `Header.tsx`
- **위치**: after 의사요소 (호버 시 확장되는 밑줄)
- **원본 CSS**:
  ```css
  .header-nav-link-content::after {
    width: 0;
  }
  .header-nav-link:hover .header-nav-link-content::after {
    width: 80%;
  }
  ```
- **잘못된 코드**: `after:w-4/5` (항상 80% 표시)
- **수정**: `after:w-0 group-hover:after:w-4/5`
- **설명**: 밑줄이 hover 전부터 항상 보이는 버그 발생

---

## 4. CSS 의사클래스 혼용

### `active:` (클릭 상태) ≠ 네비게이션 활성 상태

- **파일**: `Header.tsx`
- **잘못된 코드**: `active:font-semibold active:text-white`
- **수정**: `data-[active=true]:font-semibold data-[active=true]:text-white`
- **설명**: Tailwind의 `active:`는 CSS `:active` (마우스 클릭 중 상태). 현재 페이지 활성 표시와는 다른 의미. 네비게이션 활성 상태는 `data-active` 속성 + `data-[active=true]:` variant로 처리해야 함

```tsx
// 잘못된 방식
<a className="active:font-semibold active:text-white">

// 올바른 방식
<a data-active={pathname === '/'} className="data-[active=true]:font-semibold data-[active=true]:text-white">
```

---

## 5. 의사요소 variant 체이닝 오류

### `before:after:*` 형태로 동시 적용 불가

- **파일**: `Header.tsx`
- **위치**: 검색 초기화 버튼 (`::before`, `::after` 둘 다 필요한 X 아이콘)
- **잘못된 코드**: `before:after:content-[''] before:after:absolute before:after:w-[0.6em] ...`
- **수정**:
  ```
  before:content-[''] before:absolute before:w-[0.6em] ...
  after:content-[''] after:absolute after:w-[0.6em] ...
  ```
- **설명**: `before:after:`는 유효하지 않음. `::before`와 `::after`는 별도 클래스로 각각 적용해야 함

---

## 6. Tailwind에 없는 클래스 사용

### `rotate-z-*`

- **파일**: `Header.tsx`
- **잘못된 코드**: `rotate-z-45`, `after:rotate-z-90`
- **수정**: `rotate-45`, `after:rotate-90`
- **설명**: Tailwind의 rotate 유틸리티는 `rotate-{deg}` 형태. `rotate-z-*`는 존재하지 않음

### `active:text-semibold`

- **파일**: `Header.tsx`
- **잘못된 코드**: `active:text-semibold`
- **수정**: `active:font-semibold` (하지만 의미 자체가 잘못됨 → 4번 참고)
- **설명**: font-weight 유틸리티는 `font-semibold`. `text-semibold`는 없음

---

## 7. CSS 클래스 방치 (미전환)

### `.layout` 클래스 미정의

- **파일**: `Layout.tsx`
- **잘못된 코드**: `<div className="layout">`
- **수정**: `<div className="flex flex-col min-h-screen">`
- **설명**: `layout` 클래스가 어떤 CSS 파일에도 정의되어 있지 않아 스타일이 전혀 적용되지 않음

### CSS 클래스 혼용

- **파일**: `Header.tsx`
- **잘못된 코드**: `header-nav-link--active` 하드코딩 (CSS 클래스)
- **수정**: `data-active` 속성 기반으로 동적 처리
- **설명**: Tailwind 전환 중간에 구 CSS 클래스를 남겨두면 CSS 파일 삭제 후 스타일 깨짐

---

## 8. 클래스 중복

### 같은 클래스 반복

- **파일**: `Header.tsx`
- **위치**: 여러 Button 컴포넌트
- **잘못된 코드**: `cursor-pointer transition cursor-pointer transition`
- **수정**: `cursor-pointer transition`
- **설명**: 동일 클래스 중복 선언은 무해하지만 코드 가독성을 해침

---

---

## Skeleton.tsx 변환 실수 (2026-02-24)

> 첫 번째 검토에서 발견된 오류와 수정 후 두 번째 검토에서 추가로 발견된 오류를 모두 포함

---

### S-1. CSS 속성값을 Tailwind 클래스명으로 그대로 사용

CSS에서 `align-items: flex-start`의 값인 `flex-start`를 Tailwind 클래스명에 그대로 붙인 오류.
Tailwind는 CSS 속성값과 클래스명이 다르다.

- **파일**: `Skeleton.tsx`
- **위치**: `DetailPageSkeleton` 내 여러 div

| 잘못된 코드          | 수정            | 원인                                |
| -------------------- | --------------- | ----------------------------------- |
| `items-flex-start`   | `items-start`   | CSS `flex-start` → Tailwind `start` |
| `justify-flex-start` | `justify-start` | CSS `flex-start` → Tailwind `start` |
| `justify-flex-end`   | `justify-end`   | CSS `flex-end` → Tailwind `end`     |

이 클래스들은 Tailwind에 존재하지 않아 스타일이 전혀 적용되지 않음. `DetailPageSkeleton`의 레이아웃이 의도와 다르게 렌더링됨.

```tsx
// ❌ 잘못된 코드
<div className="flex flex-col gap-6 px-5 md:flex-row items-flex-start h-full">
  <div className="flex-1 flex flex-col justify-flex-start h-full">

// ✅ 수정 후
<div className="flex flex-col gap-6 px-5 md:flex-row items-start h-full">
  <div className="flex-1 flex flex-col justify-start h-full">
```

---

### S-2. Tailwind에 없는 클래스 사용

- **파일**: `Skeleton.tsx`
- **위치**: `Skeleton` 컴포넌트 (기본 스켈레톤 div)

| 잘못된 코드                       | 수정                                | 설명                                               |
| --------------------------------- | ----------------------------------- | -------------------------------------------------- |
| `will-change-background-position` | `will-change-[background-position]` | arbitrary value 문법 누락                          |
| `md:shrink-[0]`                   | `md:shrink-0`                       | `shrink-0`은 표준 유틸리티, arbitrary value 불필요 |

```tsx
// ❌ 잘못된 코드
className = "... will-change-background-position ... md:shrink-[0]";

// ✅ 수정 후
className = "... will-change-[background-position] ... md:shrink-0";
```

---

### S-3. arbitrary value 내 공백으로 클래스 파싱 실패

Tailwind는 클래스명을 공백으로 구분한다. `[...]` 안에 공백이 있으면 클래스가 분리되어 파싱에 실패한다.
**공백은 언더스코어(`_`)로 대체해야 한다.**

- **파일**: `Skeleton.tsx`
- **위치**: `SearchResultPageSkeleton`

```tsx
// ❌ 잘못된 코드 — 공백으로 인해 클래스가 3개로 쪼개져 그리드 레이아웃 전혀 적용 안 됨
className = "grid-cols-[repeat(auto-fill, minmax(150px, 1fr))]";
//                                    ^ 이 공백에서 클래스가 끊김

// ✅ 수정 후 — 공백을 _ 로 치환
className = "grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))]";
```

---

### S-4. 그라디언트 방향 반전

`bg-gradient-to-t`는 아래(from)에서 위(to)로 색이 이행된다.
하단 오버레이는 "아래=어두움, 위=투명"이어야 하는데 색이 반대로 지정되었다.

- **파일**: `Skeleton.tsx`
- **위치**: `OverlayMovieCardSkeleton`의 텍스트 오버레이 div
- **근거**: `Detail.css` `.preview-overlay`의 원본 → `linear-gradient(to top, rgba(0,0,0,0.8), ..., transparent)`

```tsx
// ❌ 잘못된 코드 — 하단이 투명하고 상단이 어두움 (반전)
<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-black/80">

// ✅ 수정 후 — 하단이 어둡고 상단으로 갈수록 투명
<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
```

**`bg-gradient-to-t` 방향 이해:**

```
to-transparent  ← 상단 (to 방향)
    ↑
from-black/80   ← 하단 (from 방향, 시작점)
```

---

### S-5. CSS 클래스 누락으로 접근성 미디어쿼리 미적용

`Skeleton.css`는 `_app.tsx`에서 import되어 있지만, 전환된 컴포넌트에 `.skeleton` 클래스가 없어서
`prefers-reduced-motion`, `prefers-contrast` 미디어쿼리가 완전히 무효가 된다.

- **파일**: `Skeleton.tsx`
- **위치**: `Skeleton` 컴포넌트 (기본 스켈레톤 div)

```css
/* Skeleton.css — .skeleton 클래스가 없으면 아래 스타일이 아예 적용 안 됨 */
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background: #2a2a2a;
  }
}
@media (prefers-contrast: high) {
  .skeleton {
    background: #000;
    border: 1px solid #fff;
  }
}
```

```tsx
// ❌ 잘못된 코드 — skeleton 클래스 없음
className={`block animate-skeleton-loading ...`}

// ✅ 수정 후 — skeleton 클래스 추가
className={`skeleton block animate-skeleton-loading ...`}
```

---

### S-6. Dead class 방치

정의된 곳이 없는 CSS 클래스를 그대로 남겨둔 경우.

- **파일**: `Skeleton.tsx`
- **위치**: `SearchHomePageSkeleton`

```tsx
// ❌ 잘못된 코드 — skeleton-popular-header는 어디에도 정의 없음
<div className="skeleton-popular-header">

// ✅ 수정 후 — 클래스 제거
<div>
```

---

### S-7. 불필요한 클래스 / 클래스 중복

| 잘못된 코드                         | 수정                       | 설명                                                                                                         |
| ----------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `transform` (단독 사용)             | 제거                       | Tailwind v3+에서 `transform` 단독 클래스는 no-op. transform 유틸리티(translate/rotate 등)가 없으면 의미 없음 |
| `relative overflow-hidden relative` | `relative overflow-hidden` | `relative` 중복 선언                                                                                         |

---

### S-8. 접근성 미디어쿼리를 CSS 파일로 분리 → Tailwind variant로 통합 가능

CSS 파일에 남아 있던 접근성 미디어쿼리를 Tailwind 내장 variant로 완전히 대체할 수 있다.
변환 후 별도 CSS 파일이 불필요해지므로 파일 삭제 및 import 제거까지 가능하다.

#### 미디어쿼리 ↔ Tailwind variant 대응표

| CSS 미디어쿼리                                   | Tailwind variant | 비고         |
| ------------------------------------------------ | ---------------- | ------------ |
| `@media (prefers-reduced-motion: reduce)`        | `motion-reduce:` | 내장 variant |
| `@media (prefers-contrast: more)`                | `contrast-more:` | 내장 variant |
| `@media (prefers-reduced-motion: no-preference)` | `motion-safe:`   | 내장 variant |
| `@media (prefers-contrast: less)`                | `contrast-less:` | 내장 variant |

> ⚠️ 원본 CSS의 `prefers-contrast: high`는 비표준 값이다. 표준은 `more`이며 Tailwind도 `contrast-more:`로 표준을 따른다.

#### 변환 전후 비교

```css
/* ❌ 변환 전 — Skeleton.css (별도 파일) */
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background: #2a2a2a;
  }
}
@media (prefers-contrast: high) {
  /* high는 비표준 */
  .skeleton {
    background: #000000;
    border: 1px solid #ffffff;
  }
}
```

```tsx
// ✅ 변환 후 — Skeleton.tsx (컴포넌트에 직접 인라인)
className={`
  block animate-skeleton-loading
  bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700
  bg-size-[200%_100%] will-change-[background-position]

  motion-reduce:animate-none          /* 애니메이션 중단 */
  motion-reduce:bg-none               /* 그라디언트(background-image) 제거 */
  motion-reduce:bg-[#2a2a2a]         /* 단색 배경으로 대체 */

  contrast-more:bg-none               /* 그라디언트 제거 */
  contrast-more:bg-black              /* 검정 배경 */
  contrast-more:border                /* 1px 테두리 */
  contrast-more:border-white          /* 흰색 테두리 */
  ...
`}
```

#### `bg-none`이 필요한 이유

그라디언트는 `background-color`가 아닌 `background-image`로 렌더링된다.
`motion-reduce:bg-[#2a2a2a]`는 `background-color`만 바꾸므로 그라디언트가 위에 덮여 여전히 보인다.
`motion-reduce:bg-none`으로 `background-image: none`을 먼저 제거해야 단색이 표시된다.

```
background-image (그라디언트)  ← bg-none으로 제거
background-color (#2a2a2a)    ← bg-[#2a2a2a]로 표시
```

#### 변환 후 정리 작업

1. 컴포넌트에서 접근성용 CSS 클래스(`.skeleton`) 제거
2. 해당 CSS 파일 삭제 (`Skeleton.css`)
3. `_app.tsx`의 CSS import 제거

---

## 요약

| 카테고리                              | 건수          | 영향                 |
| ------------------------------------- | ------------- | -------------------- |
| 오타                                  | 4건           | 클래스 미적용        |
| 공백 오류 (variant 뒤)                | 2건           | 클래스 미적용        |
| **공백 오류 (arbitrary value 내)**    | **1건**       | **레이아웃 파괴**    |
| 잘못된 속성 변환                      | 2건           | 시각적 버그          |
| **CSS 속성값 → Tailwind 클래스 혼용** | **3건**       | **스타일 미적용**    |
| **그라디언트 방향 반전**              | **1건**       | **시각적 버그**      |
| 의사클래스 혼용                       | 1건           | 동작 오류            |
| 의사요소 체이닝                       | 1건           | 클래스 미적용        |
| 없는 클래스                           | 2건 + **2건** | 클래스 미적용        |
| 미전환 CSS 방치 / Dead class          | 2건 + **2건** | 스타일 누락          |
| **접근성 미디어쿼리 미전환**          | **1건**       | **접근성 기능 손실** |
| 클래스 중복 / 불필요                  | 3건 + **2건** | 가독성 저하          |

---

---

## SearchHomePage.tsx / SearchResultPage.tsx 변환 실수 (2026-02-25)

> Search.css를 SearchHomePage, SearchResultPage에 적용하면서 발생한 오류 모음

---

### SR-1. `[&element]:` 선택자 패턴 오류 — 전체 파일에 걸친 핵심 실수

Tailwind arbitrary variant에서 `[&element]:` 형태는 `.classnameelement { }` CSS를 생성하므로 **자식 선택자가 아님**. 자식/후손 요소를 타겟하려면 반드시 공백(`_`)이 필요하다.

- **파일**: `SearchResultPage.tsx` 전반, `SearchHomePage.tsx` 일부
- **영향 범위**: `[&h3]:`, `[&h2]:`, `[&ul]:`, `[&img]:`, `[&div]:`, `[&a]:`, `[&h4]:`, `[&p]:` 전부 무효

| 잘못된 패턴         | 생성되는 CSS                 | 올바른 패턴         | 생성되는 CSS               |
| ------------------- | ---------------------------- | ------------------- | -------------------------- |
| `[&h3]:text-white`  | `.classnameh3 { }` (무효)    | `[&_h3]:text-white` | `.classname h3 { }` (후손) |
| `[&>h2]:text-white` | `.classname > h2 { }` (직계) | `[&_h2]:text-white` | `.classname h2 { }` (후손) |

```tsx
// ❌ 잘못된 코드 — 전혀 동작하지 않음
<div className="[&h3]:text-white [&h3]:text-lg">

// ✅ 수정 후 — 후손 선택자
<div className="[&_h3]:text-white [&_h3]:text-lg">
```

> `[&>element]:` (직계 자식)도 유효한 패턴이지만, 직계 자식이 확실할 때만 사용.
> 불확실하면 `[&_element]:` (후손) 을 사용하는 것이 안전.

---

### SR-2. 스타일 완전 누락 — 요소에 className 미부착

CSS 클래스를 Tailwind로 전환 후, 해당 요소에 클래스를 부착하지 않고 비워둔 경우.

- **파일**: `SearchHomePage.tsx`
- **위치**: `<h2>인기 검색어 TOP 10</h2>`
- **원본**: `.popular-keyword-title { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 24px; letter-spacing: -0.5px; }`

```tsx
// ❌ 잘못된 코드 — 스타일 없음
<h2>인기 검색어 TOP 10</h2>

// ✅ 수정 후
<h2 className="text-2xl font-bold text-white mb-6 tracking-[-0.5px]">인기 검색어 TOP 10</h2>
```

---

### SR-3. 존재하지 않는 Tailwind 유틸리티 — mask-image

Tailwind v4에는 `mask-linear-*` 형태의 유틸리티가 없다. `mask-image`는 arbitrary property로 작성해야 한다.

- **파일**: `SearchHomePage.tsx`
- **위치**: 배경 이미지 div

```tsx
// ❌ 잘못된 코드 — 존재하지 않는 클래스
<div className="mask-linear-90 mask-linear-from-10% mask-linear-to-20%">

// ✅ 수정 후 — arbitrary CSS property
<div className="[mask-image:linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_10%,rgba(0,0,0,1)_20%,rgba(0,0,0,1)_100%)]">
```

---

### SR-4. border shorthand → border-b 변환 오류

`border-bottom: 1px solid color`를 `border`로 잘못 변환하여 4면 모두 테두리가 생김.

- **파일**: `SearchResultPage.tsx`
- **위치**: 검색 결과 헤더 div

```tsx
// ❌ 잘못된 코드 — 4면 테두리
<div className="border border-[#2a2a2a]">

// ✅ 수정 후 — 하단만
<div className="border-b border-[#2a2a2a]">
```

---

### SR-5. arbitrary value 내 공백/쉼표 혼동

CSS `minmax(180px, 1fr)`에서 공백(`, ` 뒤)을 underscore로 치환해야 하는데, 쉼표(`,`)까지 공백으로 바꾼 오류.

- **파일**: `SearchResultPage.tsx`
- **위치**: 검색 결과 grid

```tsx
// ❌ 잘못된 코드 — 쉼표가 없어 minmax 문법 오류
grid-cols-[repeat(auto-fill,minmax(180px_1fr))]
//                                   ^ 쉼표여야 함

// ✅ 수정 후 — 공백만 _ 로 치환 (쉼표는 그대로)
grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]
```

> **규칙**: `[...]` 안에서 **공백** → `_`, **쉼표** → `,` (변환 불필요)

---

### SR-6. 중복 height 클래스

같은 요소에 height 클래스가 두 개 선언됨. Tailwind는 HTML className 순서가 아닌 stylesheet 생성 순서로 우선순위를 결정하므로 어느 쪽이 적용될지 예측 불가.

- **파일**: `SearchResultPage.tsx`

```tsx
// ❌ 잘못된 코드 — h-[350px]와 h-[345px] 공존
<li className="flex flex-col h-[350px] bg-[#1a1a1a] h-[345px] ...">

// ✅ 수정 후 — 의도한 값 하나만 유지
<li className="flex flex-col h-[345px] bg-[#1a1a1a] ...">
```

---

### SR-7. 조건부 스타일이 부모에만 적용되고 자식 미적용

CSS에서 `.parent.highlighted .child { ... }` 패턴을 Tailwind로 전환할 때, 부모(li)의 조건부 클래스만 적용하고 자식 span의 스타일 변경을 누락.

- **파일**: `SearchHomePage.tsx`
- **원본 CSS**:
  ```css
  .trending-item.highlighted .trending-rank {
    color: #f82f62;
    font-weight: 700;
  }
  .trending-item.highlighted .trending-title {
    color: #ffffff;
    font-weight: 600;
  }
  ```

```tsx
// ❌ 잘못된 코드 — li에만 조건부 적용, 자식 span은 기본 상태 고정
<li className={`... ${isHighlighted ? 'scale-[1.02]' : ''}`}>
  <span className="text-[#f82f62]">{index + 1}</span>
  <span className="text-[#84868d]">{movie.title}</span>

// ✅ 수정 후 — 자식 span에도 각각 조건부 적용
<li className={`... ${isHighlighted ? 'scale-[1.02]' : ''}`}>
  <span className={`text-[#f82f62] ${isHighlighted ? 'font-bold' : ''}`}>{index + 1}</span>
  <span className={`${isHighlighted ? 'text-white font-semibold' : 'text-[#84868d]'}`}>{movie.title}</span>
```

---

### SR-8. 기본 스타일 속성 누락 (flex-1)

highlighted 상태 처리에 집중하다 기본 상태의 `flex: 1` 속성을 누락.

- **파일**: `SearchHomePage.tsx`
- **위치**: title span (`.trending-title { flex: 1; }`)

```tsx
// ❌ 잘못된 코드 — flex-1 없음
<span className="text-lg text-[#84868d] leading-6 overflow-hidden ...">

// ✅ 수정 후
<span className="text-lg flex-1 leading-6 overflow-hidden ...">
```

---

### SR-9. 복수 opacity 클래스 충돌 + 잘못된 선택자

- **파일**: `SearchHomePage.tsx`

```tsx
// ❌ 잘못된 코드 — opacity-0과 opacity-30이 공존 (어느 쪽이 적용될지 불확실)
// 선택자도 [&img]: 로 잘못됨
<div className="[&img]:opacity-0 [&img]:opacity-30">

// ✅ 수정 후 — 의도한 opacity-30만 유지, 선택자 수정
<div className="[&_img]:opacity-30">
```

---

### SR-10. `tracking-tight` ≠ `letter-spacing: -0.5px`

Tailwind `tracking-tight` = `-0.025em` ≈ `-0.4px` (16px 기준). `-0.5px` literal과 다르다.

- **파일**: `SearchHomePage.tsx`, `SearchResultPage.tsx`

| 잘못된 코드      | 실제 값             | 올바른 코드         |
| ---------------- | ------------------- | ------------------- |
| `tracking-tight` | `-0.025em ≈ -0.4px` | `tracking-[-0.5px]` |

---

### SR-11. 오타

| 파일                   | 잘못된 코드   | 수정          |
| ---------------------- | ------------- | ------------- |
| `SearchHomePage.tsx`   | `ease-[easy]` | `ease-[ease]` |
| `SearchResultPage.tsx` | `felx-col`    | `flex-col`    |

---

---

## [id].tsx (Detail 페이지) 변환 실수 (2026-02-27)

> Detail.css를 [id].tsx에 적용하면서 발생한 오류 모음

---

### D-1. `bg-linear-gradient(...)` — 유효하지 않은 Tailwind 문법

배경 그라디언트를 arbitrary value 형식이 아닌 CSS 함수 그대로 클래스명에 사용한 오류.
이 클래스는 **전혀 적용되지 않아** 헤더 배경이 투명하게 렌더링된다.

- **파일**: `[id].tsx`
- **위치**: 히어로 섹션 최상위 div
- **원본 CSS**: `.detail { background: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(0,0,0,1) 45%, rgba(77,77,77,1) 100%); }`

```tsx
// ❌ 잘못된 코드 — Tailwind 클래스가 아님, 배경 미적용
<div className="bg-linear-gradient(90deg, rgba(89, 89, 89, 1)_0%, rgba(0, 0, 0, 1)_45%, rgba(77, 77, 77, 1)_100%)">

// ✅ 수정 후 — arbitrary value 형식 + 공백을 _ 로 치환
<div className="bg-[linear-gradient(90deg,_rgba(89,89,89,1)_0%,_rgba(0,0,0,1)_45%,_rgba(77,77,77,1)_100%)]">
```

**arbitrary value 배경 그라디언트 작성 규칙:**

- `bg-[...]` 형태로 감싸야 함
- `[...]` 안 공백은 모두 `_` 로 치환
- 쉼표(`,`) 는 그대로 유지

---

### D-2. `decoration-none` — 존재하지 않는 Tailwind 클래스

CSS `text-decoration: none`에 해당하는 Tailwind 클래스는 `no-underline`이다.
`decoration-none`은 Tailwind에 없는 클래스로, 링크 밑줄이 제거되지 않음.

- **파일**: `[id].tsx`
- **위치**: 관련 동영상 섹션 video item 내 `<a>` 태그

```tsx
// ❌ 잘못된 코드 — 없는 클래스, 밑줄 제거 안 됨
<div className="[&_a]:decoration-none">

// ✅ 수정 후
<div className="[&_a]:no-underline">
```

| CSS 속성                     | 잘못된 Tailwind        | 올바른 Tailwind |
| ---------------------------- | ---------------------- | --------------- |
| `text-decoration: none`      | `decoration-none` ❌   | `no-underline`  |
| `text-decoration: underline` | `decoration-underline` | `underline`     |

---

### D-3. Dead Class 방치 — `detail-page`, `detail-genre`, `member-item`

원본 CSS에 정의된 적 없는 클래스명을 className에 그대로 남겨둔 경우.
시각적 영향은 없지만 코드에 의미 없는 클래스가 남아 혼란을 준다.

- **파일**: `[id].tsx`

| 클래스명       | 사용 위치          | 정의 여부               | 처리           |
| -------------- | ------------------ | ----------------------- | -------------- |
| `detail-page`  | 최상위 wrapper div | 없음 (원본도 없었음)    | className 제거 |
| `detail-genre` | 장르 `<span>`      | 없음 (부모 스타일 상속) | className 제거 |
| `member-item`  | 출연진 item div    | 없음 (원본도 없었음)    | className 제거 |

```tsx
// ❌ 잘못된 코드 — dead class
<div className="detail-page">
<span key={genre.id} className="detail-genre">
<div key={person.id} className="member-item">

// ✅ 수정 후 — 클래스 제거
<div>
<span key={genre.id}>
<div key={person.id}>
```

---

### D-4. 높이 값 불일치 — `h-162` vs `h-[646px]`

Tailwind spacing scale 계산 오류로 원본과 2px 차이 발생.

- **파일**: `[id].tsx`
- **원본 CSS**: `.detail { height: 646px; }`

| 잘못된 코드 | 실제 렌더링       | 올바른 코드 | 렌더링 |
| ----------- | ----------------- | ----------- | ------ |
| `h-162`     | 648px (162 × 4px) | `h-[646px]` | 646px  |

> **규칙**: 원본 CSS의 `px` 값이 spacing scale(4px 배수)에 정확히 맞지 않으면 arbitrary value(`h-[646px]`)를 사용한다.

---

### D-5. 그라디언트 중간 stop 누락

원본 CSS의 3단계 그라디언트를 2단계로 변환하여 중간 stop이 사라짐.

- **파일**: `[id].tsx`
- **위치**: 이미지 프리뷰 오버레이
- **원본 CSS**: `background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)`

```tsx
// ❌ 잘못된 코드 — 2단계 (중간 stop 없음)
<div className="bg-gradient-to-t from-black/80 to-transparent">

// ✅ 수정 후 — 3단계 (via로 중간 stop 추가)
<div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent">
```

**Tailwind 그라디언트 3단계 대응:**

| CSS stop 순서 (to top) | Tailwind         |
| ---------------------- | ---------------- |
| 1번째 (from, 하단)     | `from-black/80`  |
| 2번째 (중간)           | `via-black/40`   |
| 3번째 (to, 상단)       | `to-transparent` |

---

## 체크리스트 (다음 전환 시 참고)

- [ ] variant 뒤에 공백 없는지 확인 (`hover: text-*` ❌ → `hover:text-*` ✅)
- [ ] **`[...]` arbitrary value 안에 공백 있으면 `_`로 치환** (`minmax(150px, 1fr)` ❌ → `minmax(150px,_1fr)` ✅)
- [ ] `background-color` → `bg-`, `color` → `text-` 구분
- [ ] **CSS 속성값과 Tailwind 클래스명 구분** (`flex-start` → `start`, `flex-end` → `end`)
- [ ] **그라디언트 `from-`/`to-`가 `bg-gradient-to-{direction}` 방향과 일치하는지 확인**
- [ ] **그라디언트를 단색으로 덮을 때 `bg-none`으로 `background-image` 먼저 제거**
- [ ] `::before` / `::after` 는 각각 `before:` / `after:` 로 별도 적용
- [ ] 활성 상태는 `active:` (클릭) vs `data-[active=true]:` (현재 페이지) 구분
- [ ] `rotate-z-*` 없음. `rotate-{deg}` 사용
- [ ] 동적 상태 표현은 CSS 클래스가 아닌 `data-*` 속성으로
- [ ] 초기값 포함 확인 (e.g. `width: 0` → `w-0` 누락 주의)
- [ ] 클래스 정의 여부 확인 후 전환 (`layout`, `header-actions`, `skeleton-popular-header` 등)
- [ ] **접근성 미디어쿼리는 별도 CSS 파일 대신 `motion-reduce:` / `contrast-more:` variant로 인라인 처리**
- [ ] **`prefers-contrast: high`는 비표준 → `contrast-more:` (`prefers-contrast: more`) 사용**
- [ ] **CSS 파일 전환 완료 후 파일 삭제 + import 제거까지 완료**
- [ ] **자식 요소 선택자는 `[&_element]:` (후손) 또는 `[&>element]:` (직계) — `[&element]:` 는 무효**
- [ ] `border-bottom` → `border-b`, `border-top` → `border-t` (shorthand border와 구분)
- [ ] `[...]` arbitrary value에서 **공백** → `_`, **쉼표** → `,` (쉼표는 그대로 유지)
- [ ] `tracking-tight` (-0.025em) ≠ `tracking-[-0.5px]` — letter-spacing 값이 px이면 arbitrary value 사용
- [ ] 조건부 스타일이 부모뿐 아니라 **자식 요소에도 모두 적용됐는지** 확인 (`parent.active .child { }` 패턴)
- [ ] 같은 속성 클래스 중복 없는지 확인 (`h-[350px] h-[345px]` → 하나만)
- [ ] arbitrary CSS property 문법: `[mask-image:...]`, `[grid-template:...]` 형태로 작성
- [ ] **배경 그라디언트는 반드시 `bg-[linear-gradient(...)]` — `bg-linear-gradient(...)` 형태는 존재하지 않음**
- [ ] **`text-decoration: none` → `no-underline` (`decoration-none` 은 없는 클래스)**
- [ ] **원본 CSS `px` 값이 4의 배수가 아니면 spacing scale 대신 `h-[px값]` arbitrary value 사용**
- [ ] **그라디언트 stop이 3개 이상이면 `via-` 로 중간 stop 추가**
- [ ] **CSS 전환 후 dead class(어디에도 정의 없는 클래스명) 전부 제거**
