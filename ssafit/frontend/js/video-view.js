// ----- LS helpers -----
const getJSON = (k, d = null) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : d;
  } catch {
    return d;
  }
};
const setJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// ----- Seed if empty (샘플 데이터) -----
function seedIfNeeded() {
  const videosKey = "ssafit:videos";
  const curKey = "ssafit:video:current";
  if (!getJSON(videosKey)) {
    const sample = [
      {
        id: "v1",
        title: "스쿼트 기초",
        author: "홍길동",
        part: "하체",
        info: "하체 강화 기본 루틴",
        youtubeId: "dQw4w9WgXcQ",
      },
    ];
    setJSON(videosKey, sample);
    setJSON(curKey, "v1");
    setJSON(`ssafit:reviews:v1`, [
      {
        id: crypto.randomUUID(),
        nickname: "user01",
        content: "자세 설명이 좋아요",
        ts: new Date().toISOString(),
      },
    ]);
  }
  if (!getJSON("ssafit:user")) setJSON("ssafit:user", { nickname: "게스트" });
}

// ----- Video render -----
function renderVideo(v) {
  document.getElementById("video-title").textContent = v.title;
  document.getElementById("video-author").textContent = v.author;
  document.getElementById("video-info").textContent = v.info || "";
  document.getElementById("video-part").textContent = v.part || "";
  document.getElementById(
    "video-frame"
  ).src = `https://www.youtube.com/embed/${v.youtubeId}`;
}

// ----- Reviews -----
function renderReviews(videoId) {
  const box = document.getElementById("reviews-list");
  box.innerHTML = "";
  const reviews = getJSON(`ssafit:reviews:${videoId}`, []);
  if (reviews.length === 0) {
    box.innerHTML = '<p class="text-muted mb-0">첫 리뷰를 남겨보세요.</p>';
    return;
  }
  reviews
    .sort((a, b) => new Date(b.ts) - new Date(a.ts))
    .forEach((r) => {
      const row = document.createElement("div");
      row.className = "d-flex mb-3 shadow p-2";
      row.innerHTML = `
            <img src="" class="rounded-circle me-2" alt="프로필">
            <div class="flex-grow-1 p-2 rounded">
              <div class="d-flex justify-content-between">
                <strong>${escapeHtml(r.nickname)}</strong>
                <small class="text-muted">${formatTs(r.ts)}</small>
              </div>
              <p class="mb-0">${escapeHtml(r.content)}</p>
            </div>`;
      box.appendChild(row);
    });
}

// ----- Utils -----
function formatTs(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
function escapeHtml(s) {
  return s.replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        m
      ])
  );
}

// ----- Events -----
document.addEventListener("DOMContentLoaded", () => {
  seedIfNeeded();

  // 검색 폼: 쿼리만 저장(다른 페이지에서 사용)
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", (e) => {
    const q = document.getElementById("q").value.trim();
    setJSON("ssafit:search:q", q);
    // 필요 시 이 페이지에서 검색 처리하려면 e.preventDefault();
    // e.preventDefault();
  });

  // 현재 비디오 로드
  const videos = getJSON("ssafit:videos", []);
  const currentId = getJSON("ssafit:video:current", videos[0]?.id);
  const video = videos.find((v) => v.id === currentId) || videos[0];
  renderVideo(video);
  renderReviews(video.id);

  // 리뷰 등록
  const reviewForm = document.getElementById("review-form");
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("review-content").value.trim();
    if (!content) return;
    const user = getJSON("ssafit:user", { nickname: "게스트" });
    const key = `ssafit:reviews:${video.id}`;
    const arr = getJSON(key, []);
    arr.push({
      id: crypto.randomUUID(),
      nickname: user.nickname,
      content,
      ts: new Date().toISOString(),
    });
    setJSON(key, arr);
    document.getElementById("review-content").value = "";
    renderReviews(video.id);
  });
});
