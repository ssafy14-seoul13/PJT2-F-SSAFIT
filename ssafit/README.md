# SSAFIT Web(Front) Project

## 📌 개요
**SSAFIT**은 YouTube 운동 영상 데이터를 기반으로 영상 검색, 추천, 리뷰, 회원 관리 기능을 제공하는 웹 프론트엔드 애플리케이션입니다.  
HTML, CSS, JavaScript, Bootstrap을 활용하여 반응형 UI와 동적 기능을 구현합니다.

---

## 🎯 프로젝트 목표
- HTML5, CSS3, JavaScript 문법 및 DOM 조작 학습
- Bootstrap 기반 반응형 UI 설계
- 로컬 스토리지 CRUD 기능 구현
- UX/UI 설계 및 접근성 고려
- 생성형 AI를 활용한 프로토타이핑

---

## 🛠 기술 스택
- **언어**: HTML, CSS, JavaScript  
- **라이브러리/프레임워크**: Bootstrap 5, Chart.js (옵션)  
- **데이터**: JSON (YouTube 영상 데이터 샘플)  
- **개발 환경**: VS Code, GitLab  

---

## 📂 디렉토리 구조 (예시)
```
📦ssafit
 ┣ 📂backend
 ┣ 📂frontend
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┗ 📜video.json
 ┃ ┃ ┗ 📂img
 ┃ ┃ ┃ ┗ 📜.gitkeep
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜.gitkeep
 ┃ ┣ 📂js
 ┃ ┃ ┗ 📜.gitkeep
 ┃ ┣ 📂pages
 ┃ ┃ ┗ 📜.gitkeep
 ┃ ┣ 📂partials
 ┃ ┃ ┗ 📜.gitkeep
 ┃ ┗ 📜index.html
 ┗ 📜README.md
```

yaml
코드 복사

---

## ⚡ 주요 기능
### 1. 필수 기능
- **영상 정보 관리**: 등록, 조회, 수정, 삭제
- **영상 검색 및 정렬**: 부위별, 인기순, 리뷰 기준
- **리뷰 관리**: 등록, 조회, 수정, 삭제
- **회원 관리**: 가입, 조회, 수정, 삭제, 로그인/로그아웃

### 2. 추가 기능
- 찜 영상 관리
- 자유 게시판 (CRUD)
- 회원 팔로우/팔로잉
- 운동 계획 (CRUD, 달력 기반 UI)

### 3. 심화 기능
- AI 영상 추천
- AI 운동 코칭
- 팀별 새로운 아이디어 확장

---

## 📸 화면 예시
- 메인 화면
- 리뷰 등록/목록/상세/수정 화면
- 회원 가입 / 로그인 화면
- 찜 영상 관리 화면
- 팔로우/팔로잉 화면
- 운동 계획 화면 (달력 포함)

---

## 🚀 실행 방법
1. 저장소 클론
   ```bash
   git clone <repo-url>
   cd ssafit-web
index.html을 브라우저에서 실행

JSON 데이터(data/videos.json) 기반으로 테스트 가능

📚 참고자료
Bootstrap

Chart.js

YouTube Data API

📝 산출물
구현 소스코드

실행 화면 캡처

README.md (현재 문서)

🏆 채점 기준
기본 기능 (영상 관리, 회원 관리): 60점

추가 기능 (찜, 커뮤니티, 운동 계획): 20점

심화 기능 (AI, 아이디어 구현): 20점