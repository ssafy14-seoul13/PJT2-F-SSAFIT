// /frontend/js/video-view.js
const DATA_URL = "/ssafit/frontend/assets/data/video.json";
const qs  = new URLSearchParams(location.search);
const vid = qs.get("id");



/*
  와 이런 방법도 있구나...
*/
// DOM
const $frame    = document.getElementById("video-frame");
const $title    = document.getElementById("video-title");
const $author   = document.getElementById("video-author");
const $info     = document.getElementById("video-info");
const $part     = document.getElementById("video-part");
const $reviews  = document.getElementById("reviews-list");
const $form     = document.getElementById("review-form");
const $textarea = document.getElementById("review-content");
const $search   = document.getElementById("search-form");

// 날짜 포맷
const fmt = new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" });
const REV_KEY = (id) => `ssafit.reviews.${id}`;

init().catch(err => {
  console.error(err);
  document.querySelector(".card")?.replaceChildren(
    Object.assign(document.createElement("p"), { className:"text-danger mb-0", textContent:"오류가 발생했습니다." })
  );
});

async function init() {
  if (!$frame || !$title || !$author || !$info || !$part || !$reviews || !$form || !$textarea || !$search) {
    throw new Error("필수 요소 누락");
  }

  // 검색 → 같은 폴더의 목록 페이지
  $search.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("q")?.value.trim() ?? "";
    location.href = `./video-main.html${q ? `?q=${encodeURIComponent(q)}` : ""}`;
  });

  if (!vid) {
    document.querySelector(".card").innerHTML = `<p class="text-danger mb-0">잘못된 접근입니다.</p>`;
    return;
  }

  const videos = await fetch(DATA_URL, { cache: "no-store" }).then(r => {
    if (!r.ok) throw new Error("영상 데이터 응답 실패");
    return r.json();
  });

  const v = videos.find(x => x.id === vid);
  if (!v) {
    document.querySelector(".card").innerHTML = `<p class="text-danger mb-0">영상을 찾을 수 없습니다.</p>`;
    return;
  }

  // 상세 렌더
  $frame.src         = v.url;
  $title.textContent = v.title;
  $author.textContent= v.channelName;
  $part.textContent  = v.part;
  $info.textContent  = `영상 ID: ${v.id}`;

  // 리뷰 렌더
  renderReviews();

  // 리뷰 작성
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = $textarea.value.trim();
    if (!content) return;
    if (content.length > 500) { alert("리뷰는 500자 이내."); return; }

    const list = getReviews();
    const id = (crypto?.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random().toString(16).slice(2);
    list.push({ id, content, at: Date.now() });
    setReviews(list);
    $textarea.value = "";
    renderReviews();
  });
}

// ---- 리뷰 스토리지 ----
function getReviews() {
  try {
    return JSON.parse(localStorage.getItem(REV_KEY(vid))) ?? [];
  } catch {
    return [];
  }
}
function setReviews(list) {
  try {
    localStorage.setItem(REV_KEY(vid), JSON.stringify(list));
  } catch (e) {
    console.warn("스토리지 저장 실패", e);
    alert("저장 공간 부족. 일부 리뷰 삭제 필요.");
  }
}

function renderReviews() {
  const list = getReviews();
  $reviews.replaceChildren();

  if (!list.length) {
    const p = document.createElement("p");
    p.className = "text-muted mb-0";
    p.textContent = "아직 리뷰가 없습니다.";
    $reviews.appendChild(p);
    return;
  }

  [...list].sort((a,b) => b.at - a.at).forEach(item => {
    const wrap = document.createElement("div");
    wrap.className = "d-flex align-items-start gap-2 border-bottom py-2";

    const avatar = document.createElement("img");
    avatar.src = "https://via.placeholder.com/36";
    avatar.className = "rounded-circle mt-1";
    avatar.alt = "작성자";
    avatar.referrerPolicy = "no-referrer";

    const body = document.createElement("div");
    const meta = document.createElement("div");
    meta.className = "small text-muted";
    meta.textContent = fmt.format(item.at);

    const text = document.createElement("p");
    text.className = "mb-1";
    text.textContent = item.content;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "btn btn-sm btn-outline-danger";
    del.textContent = "삭제";
    del.addEventListener("click", () => {
      if (!confirm("이 리뷰를 삭제할까요?")) return;
      const next = getReviews().filter(r => r.id !== item.id);
      setReviews(next);
      renderReviews();
    });

    body.append(meta, text, del);
    wrap.append(avatar, body);
    $reviews.appendChild(wrap);
  });
}
