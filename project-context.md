---
project: "02_silkroad-study-web"
type: "spec"
tool: "gemini"
status: "active"
visibility: "internal"
---
# 🏛️ 프로젝트 02: SILKWG06 인사/급여 학습 웹 포털 (SilkRoad Study Web Portal)

## 📌 1. 개요 및 목적
- **목적:** `D:\silkroad\SILKWG06 (2)\_study` 내 27개 WAGE 모듈 HTML 가이드 문서를 바탕으로, 공공기관 및 대기업 C-Level 보고 수준의 최고급 대화형 실크로드 인사/급여 모듈 학습 포털 구축.
- **주요 기능:**
  - 27개 모듈(WG1000 ~ WG9500) 및 공통 라이브러리 인터랙티브 대시보드.
  - 모듈별 아키텍처, 3-Tier 데이터 흐름, C# 실행 파일 및 DB 쿼리(INSERT/UPDATE/DELETE) 가이드 포털.
  - 좌측 픽스드 Sticky 카테고리 네비게이션 사이드바 (WAGE 1000 ~ 9000 시리즈 구분).
  - 모듈 실시간 통합 키워드 검색.
  - Vercel 0.05초 초고속 정적 배포(SSG).

## 🛠️ 2. 기술 스택
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** TailwindCSS (Vanilla) + Enterprise Glassmorphic Dark Design System (`.harness_engineering/ui-ux-design-rules.md` 준수)
- **Icons:** `lucide-react`
- **Deployment:** Vercel (Root: `01_projects/02_silkroad-study-web`)
