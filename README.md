# (주)아이엠티그룹 (IMT Group) 통합 홈페이지

> **소유의 한계를 넘어, 영구적인 가치를 짓다.**
> 부동산 개발 · 글로벌 헬스케어 · 프리미엄 라이프 서비스를 아우르는 IMT Group 공식 디지털 게이트웨이.

---

## 🎯 프로젝트 목표

- 강릉 두바이 팰리스, 마이롯지, 영결원, 샹그릴라, 두바이 코리아 타운 — **5대 핵심 비즈니스를 통합 브랜딩**
- 하이엔드 자산가·투자자·B2B 파트너 대상 **고관여 리드(Lead) 수집** 최적화
- **CVR 극대화**: 모든 페이지 → Contact 폼으로 흐르는 단일 전환 퍼널 설계

---

## 🎨 디자인 시스템

| 구분 | 컬러 / 값 | 용도 |
|---|---|---|
| **Key Color** | `#FF6B00` Vivid Orange | CTA · 가격 혁명 · 시선 강탈 |
| **Sub Color** | `#1A2238` Deep Navy | 전체 배경 · 신뢰 / 영구성 |
| **Accent** | `#0B1020` / `#FFB347` | 깊이감 / 그라데이션 |
| **Font** | Pretendard, Inter, Noto Sans KR | 미래 지향적 가독성 |

---

## ✅ 완성된 기능 (Currently Completed Features)

### 1. 글로벌 디자인 시스템
- Deep Navy + Vivid Orange 기반 다크 테마
- 공통 GNB (Glass-blur, Scroll-aware)
- 공통 Footer 자동 주입
- 모바일 햄버거 메뉴 + 드롭다운
- IntersectionObserver 기반 fade-up 스크롤 인터랙션
- 전 페이지 반응형 (Desktop / Tablet / Mobile)

### 2. [Home] 메인 페이지 (`index.html`)
- **4단 Hero 자동 슬라이더** (6초 자동 전환 + 좌우 컨트롤 + 도트)
  - 강릉 두바이 팰리스 → 마이롯지 → 영결원 → 두바이 팰리스 외관
- **KPI Bar**: 완공 2027, 분양가 396만, 골드비자 100년, 핵심 5대 사업 (카운트업 애니메이션)
- **5 Core Projects 카드 그리드**: Hover 시 흑백 → 컬러 전환
- **Why IMT Group**: 가격혁명 · 영구가치 · 글로벌확장성 · 고수익운영
- **Big CTA 섹션**

### 3. [Company] 회사 소개 (`company.html`)
- Hero: "기존 라이프 케어의 한계를 넘어..."
- **회사 개요 3-Card**: 사명, 대표, 설립일
- **3대 핵심 비즈니스 영역 그리드**: 부동산 / 헬스케어 / 라이프 서비스
- **Sticky 타임라인 연혁**: 2024~Present / 2021~2023 / 2012~2020 (3 Era)

### 4. [Business] 5개 상세 페이지
| 페이지 | 핵심 메시지 |
|---|---|
| `business-gangneung.html` | 2027년 강릉 국가정원 첫 관문 독점 / 3D 프린팅 모듈 / 운영비 1~2% |
| `business-mylodge.html` | **396만 원** 영구 소유 별장 / 비교 테이블 / 4가지 지분 옵션 (1/120, 1/60, 1/30, 1/24) |
| `business-younggyul.html` | **3無 시스템** (갱신료/관리비/목돈 부담 無) / 영구 부동산 등기 |
| `business-shangrila.html` | **999만 원** 호텔식 프리미엄 예식 / B2B 파트너 모델 |
| `business-dubai.html` | 초기 자본 5% / 38년 분납 / 골드비자 100년 / 가로형 정착 로드맵 |

### 5. [Contact] 상담 페이지 (`contact.html`)
- **다크 테마 Google Map** (Invert + Hue-rotate 필터링)
- **회사 정보 4종** (주소·이메일·대표·상담시간)
- **CRM 연동 인콰이어리 폼**:
  - 관심 분야 5종 체크박스 (아이콘 카드 UI, 멀티 선택)
  - URL 파라미터 자동 선택 (`?interest=mylodge` 등)
  - 이름·연락처·메시지·개인정보 동의
  - **RESTful API 전송**: `POST /tables/contacts`
  - 전송 성공/실패 인라인 피드백
  - 폼 검증 (필수 항목 / 동의 / 관심분야 1개 이상)

---

## 🌐 페이지 URL 구조

| 경로 | 설명 |
|---|---|
| `/index.html` | Home (메인 게이트웨이) |
| `/company.html` | 회사 소개 (#overview, #core, #history 앵커) |
| `/business-gangneung.html` | 강릉 두바이 팰리스 |
| `/business-mylodge.html` | 마이롯지 |
| `/business-younggyul.html` | 영결원 |
| `/business-shangrila.html` | 샹그릴라 |
| `/business-dubai.html` | 두바이 코리아 타운 |
| `/contact.html` | 상담 신청 (#map, #form 앵커) |
| `/contact.html?interest=<key>` | 관심 분야 사전 선택 (mylodge / dubai-palace / dubai-koreatown / younggyul / shangrila) |

---

## 🗂 데이터 모델 (Data Model)

### `contacts` 테이블 (RESTful Table API)

| Field | Type | 설명 |
|---|---|---|
| `id` | text | 고유 ID (자동) |
| `name` | text | 고객명 |
| `phone` | text | 연락처 |
| `interests` | array | 관심 분야 (5개 옵션 중 복수 선택) |
| `message` | rich_text | 남기실 말씀 |
| `agree_privacy` | bool | 개인정보 수집·이용 동의 |
| `created_at` | datetime | 신청 일시 |

### API 엔드포인트
- `POST tables/contacts` — 신규 상담 신청 등록
- `GET tables/contacts` — 신청 목록 조회 (관리자용)
- `PATCH tables/contacts/{id}` — 부분 업데이트
- `DELETE tables/contacts/{id}` — 삭제(소프트)

---

## 📂 파일 구조

```
imt-group/
├── index.html                      # Home (Hero Slider + 5 Core)
├── company.html                    # Company (Overview + Timeline)
├── business-gangneung.html         # 강릉 두바이 팰리스
├── business-mylodge.html           # 마이롯지
├── business-younggyul.html         # 영결원
├── business-shangrila.html         # 샹그릴라
├── business-dubai.html             # 두바이 코리아 타운
├── contact.html                    # Contact (Map + Form)
├── css/
│   ├── style.css                   # 글로벌 디자인 시스템 / GNB / Footer
│   ├── home.css                    # Hero Slider / KPI / Core Grid
│   ├── company.css                 # Overview / Timeline
│   ├── business.css                # Business 공통 (Hero / Value Block / Spec Grid / HTimeline)
│   └── contact.css                 # Map / Form / Checkbox Card
└── js/
    ├── main.js                     # GNB / Footer 주입 / Fade-up
    ├── home.js                     # Hero Slider / KPI Counter
    └── contact.js                  # Form 제출 / URL 파라미터
```

---

## 🚧 미구현 / 향후 권장 단계 (Recommended Next Steps)

### Phase 2 — 콘텐츠 강화
- [ ] 실제 조감도 / 인테리어 이미지 자료(저작권 보유) 교체
- [ ] **마이롯지 가상투어 (3D Tour)** — Matterport / Pannellum 임베드
- [ ] **두바이 팰리스 영상 Hero** — MP4 백그라운드 비디오 도입
- [ ] **블로그 / 인사이트** 페이지 (SEO 강화)

### Phase 3 — 전환율 (CVR) 최적화
- [ ] 마이롯지 **분양가 시뮬레이터** (지분 × 사용횟수 자동 계산)
- [ ] 두바이 코리아 타운 **38년 분납 계산기**
- [ ] **카카오톡 채널 상담** 위젯 연동 (즉시 응대)
- [ ] **A/B 테스트** 인프라 (Hero Copy, CTA Color)
- [ ] Google Analytics 4 + Meta Pixel 전환 이벤트 설정

### Phase 4 — 글로벌 / 운영
- [ ] 영문 / 아랍어 다국어 대응 (i18n)
- [ ] 관리자 대시보드 (`/admin`) — `contacts` CRUD UI
- [ ] 이메일 자동 통보 (Zapier / Make 연동으로 imtgroupglobal@gmail.com 송부)
- [ ] 스프레드시트 자동 연동 (Google Apps Script Webhook)
- [ ] 보안: reCAPTCHA v3 / 봇 방지

---

## 🚀 배포

배포는 **Publish 탭**에서 원클릭으로 진행하실 수 있습니다.
배포 후 발급되는 라이브 URL을 마케팅 채널(Naver, Google Ads, Meta Ads, Kakao Moment)에 활용하십시오.

---

## 📞 Contact

- **(주)아이엠티그룹 (IMT Group)**
- 대표이사: 황재호
- 본사: 서울시 강남구 가로수길 18 (신사동)
- 이메일: imtgroupglobal@gmail.com

© 2026 IMT Group Co., Ltd. All Rights Reserved.
