SSAFIT Web(Front) 프로젝트

YYYY.MM.DD verX.X

📅 기간

2025.MM.DD (n일) n시간

👤 팀원

팀장 : 이름

팀원 : 이름

📌 프로젝트 개요

SSAFIT은 YouTube 운동 영상 데이터를 기반으로, 영상 추천 / 검색 / 리뷰 / 회원 관리 기능을 제공하는 웹 프론트엔드 애플리케이션입니다.
HTML, CSS, JavaScript, Bootstrap을 활용하여 반응형 UI와 기본적인 동적 기능을 구현합니다.

🎯 프로젝트 목표

HTML5, CSS3, JavaScript 문법과 DOM 조작 학습

Bootstrap 기반 반응형 UI 설계

로컬 스토리지 CRUD 기능 구현

UX/UI 설계 및 접근성 고려

생성형 AI를 활용한 프로토타입 제작

🛠 기술 스택

언어: HTML, CSS, JavaScript

라이브러리/프레임워크: Bootstrap 5, Chart.js (옵션)

데이터: JSON (YouTube 영상 데이터 샘플)

개발 환경: VS Code, GitLab

🌿 Git 브랜치 전략
main
└── develop
    ├── feature/video
    ├── feature/review
    ├── feature/user
    ├── feature/community
    └── feature/plan

브랜치명	설명
main	최종 제출용 코드
develop	공통 개발 브랜치
feature/*	기능 단위 작업 (예: feature/video)
📈 프로젝트 설계

화면 설계: 메인 화면, 리뷰 화면, 회원 가입/로그인, 커뮤니티, 운동계획 등

데이터 처리: JSON 데이터 기반, localStorage 활용

구조: HTML + CSS + JS 분리, 기능별 JS 관리

📂 폴더 구조
ssafit-front/
├── index.html
├── video/
│   ├── list.html
│   ├── detail.html
│   └── form.html
├── review/
│   ├── list.html
│   └── form.html
├── user/
│   ├── login.html
│   ├── signup.html
│   └── profile.html
├── community/
│   ├── list.html
│   └── form.html
├── plan/
│   └── calendar.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── video.js
│   │   ├── review.js
│   │   ├── user.js
│   │   └── community.js
│   └── img/
├── data/
│   └── videos.json
└── README.md

📌 구현 기능
분류	기능명	설명	check
영상	영상 등록	영상 정보를 등록	☐
영상	영상 조회	영상 정보를 조회	☐
영상	영상 수정	영상 정보를 수정	☐
영상	영상 삭제	영상 정보를 삭제	☐
영상	영상 검색	정렬 및 검색 기능	☐
리뷰	리뷰 작성	리뷰 작성	☐
리뷰	리뷰 조회	리뷰 조회	☐
리뷰	리뷰 수정	리뷰 수정	☐
리뷰	리뷰 삭제	리뷰 삭제	☐
회원	회원 가입	회원 등록 기능	☐
회원	회원 조회	회원 조회 기능	☐
회원	회원 수정	회원 수정 기능	☐
회원	회원 삭제	회원 삭제 기능	☐
회원	로그인/로그아웃	로그인/로그아웃	☐
추가	찜 영상	관심 영상 관리	☐
추가	팔로우/커뮤니티	팔로우, 게시판	☐
추가	운동 계획	운동계획 관리 (달력 등)	☐
심화	AI 추천	AI 기반 추천 기능	☐
심화	AI 운동 코칭	AI 코칭 기능	☐
📝 기능 설명
영상

등록 / 조회 / 수정 / 삭제 / 검색

리뷰

작성 / 조회 / 수정 / 삭제

회원

가입 / 조회 / 수정 / 삭제 / 로그인-로그아웃

추가 기능

찜 영상

커뮤니티(게시판, 팔로우)

운동계획(달력)

심화 기능

AI 영상 추천

AI 운동 코칭

📚 학습/목표

DOM 조작 및 이벤트 처리

로컬 스토리지 활용

반응형 UI 구현

UX/UI 설계 경험

🚀 추가 개선점

사용자 인증 강화

찜/좋아요 기능 고도화

Chart.js 기반 통계 시각화

API 연동 확장

💬 느낀 점

프로젝트를 통해 배운 점, 개선할 점 정리