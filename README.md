# POS Menu Manager

Smart POS는 드래그 또는 터치 이벤트를 통해 메뉴를 커스터마이징할 수 있는 포스 프로젝트입니다. 이 프로젝트는 React와 Next.js를 기반으로 하며, Tailwind CSS를 사용하여 스타일링되었습니다.

## 주요 기능

- **메뉴 관리**: 사용자는 드래그 앤 드롭 또는 터치 이벤트를 통해 메뉴 항목을 재정렬할 수 있습니다.
- **반응형 디자인**: 다양한 디바이스에서 최적화된 사용자 경험을 제공합니다.
- **유연한 구성**: Tailwind CSS를 사용하여 쉽게 스타일을 커스터마이징할 수 있습니다.

## 설치 및 실행

### 요구 사항

- Node.js 14 이상
- npm 또는 Yarn

### 설치
저장소 클론
```
git clone <repository-url>
cd smart-pos
```

### 의존성 설치
```
npm install
```


## 주요 구성 요소

### `useMenuManager` 훅

`useMenuManager` 훅은 메뉴 항목의 드래그 앤 드롭 및 터치 이벤트를 관리합니다. 이 훅은 다음과 같은 기능을 제공합니다:

- **드래그 시작 및 종료**: 사용자가 메뉴 항목을 드래그할 때 시작 및 종료 이벤트를 처리합니다.
- **목표 인덱스 설정**: 드래그 중인 항목의 목표 위치를 설정합니다.
- **메뉴 리스트 업데이트**: 드래그 앤 드롭이 완료되면 메뉴 리스트를 업데이트합니다.

### `MenuProvider` 컴포넌트

`MenuProvider`는 메뉴 데이터를 전역적으로 관리하는 컨텍스트를 제공합니다. 이 컴포넌트는 메뉴 리스트, 선택된 카테고리, 터치 디바이스 여부 등의 상태를 관리합니다.

## 기술 스택

- **React**: 사용자 인터페이스를 구축하기 위한 라이브러리
- **Next.js**: 서버 사이드 렌더링 및 정적 사이트 생성 지원
- **Tailwind CSS**: 유틸리티 기반의 CSS 프레임워크
- **TypeScript**: 정적 타입을 지원하는 JavaScript의 상위 집합

