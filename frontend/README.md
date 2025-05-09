This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```
├── src/                       # 소스 코드
│   ├── app/                   # Next.js 앱 디렉토리
│   │   ├── api/               # API 라우트
│   │   │   └── gemini/        # Gemini AI API 연동
│   │   │       └── route.ts   # API 라우트 핸들러
│   │   ├── globals.scss       # 전역 스타일
│   │   ├── layout.tsx         # 앱 레이아웃 컴포넌트
│   │   └── page.tsx           # 메인 페이지 컴포넌트
│   ├── components/            # 컴포넌트 디렉토리
│   │   ├── AIDesign/          # AI 디자인 추천 컴포넌트
│   │   │   ├── AiDesign.module.scss
│   │   │   └── AiDesign.tsx
│   │   ├── AIOptimizer/       # AI 코드 최적화 컴포넌트
│   │   │   ├── AIOptimizer.module.scss
│   │   │   └── AIOptimizer.tsx
│   │   ├── Button/            # 버튼 컴포넌트
│   │   │   ├── Button.module.scss
│   │   │   ├── ButtonCodeGenerator.tsx
│   │   │   ├── ButtonOptions.tsx
│   │   │   └── ButtonPreview.tsx
│   │   ├── Card/              # 카드 컴포넌트
│   │   │   ├── Card.module.scss
│   │   │   ├── CardCode.tsx
│   │   │   ├── CardCodeGenerator.tsx
│   │   │   ├── CardOptions.tsx
│   │   │   └── CardPreview.tsx
│   │   ├── Generator/         # 메인 생성기 컴포넌트
│   │   │   ├── Generator.module.scss
│   │   │   └── Generator.tsx
│   │   ├── Navbar/            # 네비게이션 바 컴포넌트
│   │   │   ├── Navbar.module.scss
│   │   │   ├── NavbarCodeGenerator.tsx
│   │   │   ├── NavbarOptions.tsx
│   │   │   └── NavbarPreview.tsx
│   │   └── TrendDesign/       # 트렌드 디자인 컴포넌트
│   │       ├── TrendDesign.module.scss
│   │       └── TrendDesign.tsx
│   ├── store/                 # 상태 관리
│   │   └── useComponentStore.ts  # Zustand 스토어
│   ├── types/                 # 타입 정의
│   │   └── index.ts           # 공통 타입 정의
│   └── utils/                 # 유틸리티 함수
│       └── CodeDisplay.tsx    # 코드 표시 및 생성 유틸리티
└── tsconfig.json              # TypeScript 설정
```

# UI 컴포넌트 제너레이터

![UI Component Generator](https://via.placeholder.com/800x400?text=UI+Component+Generator)

## 프로젝트 소개

UI 컴포넌트 제너레이터는 웹 개발자 및 디자이너가 React 기반의 UI 컴포넌트를 쉽고 빠르게 생성할 수 있는 도구입니다. 사용자가 선택한 옵션에 따라 실시간으로 컴포넌트를 시각화하고, 원하는 형식(Tailwind CSS 또는 SCSS)으로 코드를 생성합니다. 또한 AI를 활용하여 코드 최적화 및 디자인 제안 기능을 제공합니다.

## 주요 기능

- **다양한 컴포넌트 지원**: 버튼, 카드, 네비게이션 바 등 다양한 UI 컴포넌트 생성
- **실시간 프리뷰**: 설정한 옵션에 따라 즉시 시각적 결과 확인
- **코드 생성**: Tailwind CSS 또는 SCSS 형식으로 React 컴포넌트 코드 자동 생성
- **AI 코드 최적화**: Google Gemini AI를 활용한 코드 개선 및 최적화
- **AI 디자인 추천**: 다양한 디자인 스타일(미니멀리스트, 뉴모픽, 글래스모픽 등) 자동 생성

## 기술 스택

- **프론트엔드**: React, TypeScript, Next.js
- **스타일링**: SCSS, Tailwind CSS
- **상태 관리**: Zustand
- **AI 통합**: Google Gemini AI API
- **코드 하이라이팅**: highlight.js

## 설치 및 실행 방법

### 사전 요구사항

- Node.js 18.0.0 이상
- pnpm (권장) 또는 npm

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/ui-component-generator.git
cd ui-component-generator

# 의존성 설치
pnpm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```
Gemini_API=your_gemini_api_key_here
```

### 개발 서버 실행

```bash
pnpm dev
```

http://localhost:3000에서 애플리케이션에 접속할 수 있습니다.

## 사용 방법

1. 상단의 컴포넌트 유형(버튼, 카드, 네비게이션 바) 중 하나를 선택합니다.
2. 왼쪽 패널에서 컴포넌트의 다양한 속성을 설정합니다.
3. 중앙 패널에서 실시간으로 변경사항을 확인합니다.
4. 오른쪽 패널에서 생성된 코드를 확인하고 Tailwind CSS 또는 SCSS 형식을 선택할 수 있습니다.
5. AI 최적화 버튼을 클릭하여 코드를 개선하거나, AI 디자인 추천 기능을 통해 새로운 디자인을 탐색할 수 있습니다.

## 주요 특징

### 타입스크립트 타입 시스템

컴포넌트의 속성과 옵션에 타입 안전성을 제공하여 개발 경험을 향상시키고 오류를 방지합니다.

```typescript
// 컴포넌트 타입과 옵션 타입 정의
export type ComponentType = "button" | "card" | "navbar";

export interface ButtonOptions {
  backgroundColor: string;
  color: string;
  text: string;
  size: "small" | "medium" | "large";
  borderRadius: string;
  hoverEffect: "scale" | "lift" | "glow";
  clickEffect: "press" | "ripple" | "none";
  disabled: boolean;
}
```

### Zustand를 활용한 상태 관리

```typescript
const useComponentStore = create<ComponentStore>((set) => ({
  // 초기 상태 값
  selectedComponent: "button",
  componentOptions: ButtonDefaults as ComponentOptionsTypeMap[ComponentType],
  codeFormat: "react-tailwind",
  // ...상태 및 액션
}));
```

### AI 통합

Google Gemini API를 활용한 코드 최적화 및 디자인 추천 기능:

```typescript
const optimizationPrompt = `코드 최적화 요청:
  - 형식: ${codeFormat === "react-tailwind" ? "React tailwind" : "react-scss"}
  - 컴포넌트: ${componentType}
  - 옵션: ${JSON.stringify(options)}
  
  개선 목표:
  1. 현재 코드의 기본 구조와 형식은 유지하면서 개선
  2. 접근성 속성 추가 (aria-label 등)
  // ...
`;
```

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다: `git checkout -b feature/amazing-feature`
3. 변경사항을 커밋합니다: `git commit -m 'Add some amazing feature'`
4. 브랜치에 푸시합니다: `git push origin feature/amazing-feature`
5. Pull Request를 생성합니다.

## 라이선스

MIT 라이선스에 따라 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 연락처

프로젝트 관리자: [최원준]

프로젝트 링크: [https://github.com/hagalaz-star/design-tool]
