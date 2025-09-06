
const DATA_URL = "/ssafit/frontend/assets/data/video.json";

let videos = [];
document.addEventListener("DOMContentLoaded", init);

function init() {
  loadData().then(() => {
    buildPartFilter(); // 필터 UI 생성
    bindSearch(); // 검색 기능
    bindReset(); // 리셋 버튼
    renderVideos();
  });
}

/*
 @todo 비디오가 지금은 적지만 엄청 많다면??? 그걸 매번 for문 돌려서 필터링??? 흠...
 아니면 미리 부위별로 분류된 객체를 만들어 놓을까???
 아니면, 어차피 페이지단위로 끊어야 하니, 백엔드에서 부위별로 끊어서 API를 제공??? 
*/
// filter UI 생성
function buildPartFilter() {
  const filter = document.getElementById("part-filter");
  const select = document.createElement("select");
  select.id = "part-select";
  select.className = "form-select w-auto";

  const parts = Array.from(new Set(videos.map((v) => v.part))).sort();
  select.append(new Option("부위: 전체", "")); // 전체
  parts.forEach((p) => select.append(new Option(p, p))); // 전신/상체/하체/복부...

  filter.replaceChildren(select);

  select.addEventListener("change", () => {
    const selected = select.value;
    if (selected === "") {
      renderVideos(videos); // 전체
    } else {
      const filtered = videos.filter((v) => v.part === selected);
      renderVideos(filtered); // 필터링된 목록
    }
  });
}

function bindSearch() {
  const q = document.getElementById("search-input");
  const btn = document.getElementById("search-button");
  const run = () => applyFilters();
  btn.addEventListener("click", run);
  q.addEventListener("keydown", (e) => {
    if (e.key === "Enter") run();
  });
}

function bindReset() {
  const resetBtn = document.getElementById("reset-button");
  const qInput = document.getElementById("search-input");
  const partSel = document.getElementById("part-select");

  resetBtn.addEventListener("click", () => {
    qInput.value = "";
    if (partSel) partSel.value = ""; // 부위 필터 초기화
    renderVideos(videos); // 전체 목록 다시 출력
  });
}

function applyFilters() {
  const qInput = document.getElementById("search-input");
  const q = qInput.value.trim().toLowerCase();
  const part = document.getElementById("part-select")?.value || "";

  const list = videos.filter((v) => {
    const matchPart = !part || v.part === part;
    const matchText = !q || v.title.toLowerCase().includes(q);
    return matchPart && matchText;
  });

  if (q && list.length === 0) {
    // 검색어가 있는데 결과가 없을 때
    console.log("검색어에 맞는 영상이 없습니다.");
    const input = document.getElementById("search-input");
    input.classList.add("is-invalid");

    // 1초 뒤 초기화
    setTimeout(() => input.classList.remove("is-invalid"), 1200);
    return;
  }

  renderVideos(list);
}

// data 부분 --------------------
function loadData() {
  return fetch(DATA_URL)
    .then((res) => {
      if (!res.ok) throw new Error("응답 실패");
      return res.json();
    })
    .then((data) => {
      videos = data;
    });
}

// 비디오 카드 생성기
async function renderVideos(list = videos) {
  const row = document.getElementById("videos-container");
  row.replaceChildren();

  if (!list.length) {
    row.innerHTML = '<p class="text-muted">표시할 운동 영상이 없습니다.</p>';
    return;
  }

  for (const v of list) {
    const col = document.createElement("div");
    col.className = "col-auto";

    // card 생성
    const card = document.createElement("div");
    card.id = "card-" + v.id;
    card.className = "card h-100 shadow-lg m-2 p-0";
    card.style.width = "18rem";

    // 썸네일 이미지 생성
    const thumb = document.createElement("img");
    thumb.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
    thumb.className = "card-img-top";
    thumb.alt = v.title;

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = v.title;

    const channel = document.createElement("h6");
    channel.className = "card-subtitle mb-2 text-muted";
    channel.textContent = v.channelName;

    const badge = document.createElement("span");
    badge.className = "badge bg-third";
    badge.textContent = v.part;

    body.append(title, channel, badge);
    card.append(thumb, body);
    col.appendChild(card);
    row.appendChild(col);

    // 클릭 이벤트
    card.style.cursor = "pointer"; // 마우스 포인터 변경
    card.addEventListener("click", () => {
      const videoId = card.id.replace("card-", "");
      window.location.href = `/ssafit/frontend/pages/videos/video-view.html?id=${videoId}`;
    });
  }

}
