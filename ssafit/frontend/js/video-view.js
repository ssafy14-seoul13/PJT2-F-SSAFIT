// /frontend/js/video-view.js
const DATA_URL = "/ssafit/frontend/assets/data/video.json";
const qs  = new URLSearchParams(location.search);
const vid = qs.get("id");

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

init().catch(handleFatal);

async function init() {
  requireDom();

  // 검색 → 목록 페이지
  $search.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("q")?.value.trim() ?? "";
    location.href = `./video-main.html${q ? `?q=${encodeURIComponent(q)}` : ""}`;
  });

  if (!vid) return fatal("잘못된 접근입니다.");

  const videos = await fetch(DATA_URL, { cache: "no-store" }).then(ok).then(r=>r.json());
  const v = videos.find(x => x.id === vid);
  if (!v) return fatal("영상을 찾을 수 없습니다.");

  // 메타 표시
  $frame.src        = v.url;
  $title.textContent  = v.title;
  $author.textContent = v.channelName;
  $part.textContent   = v.part;
  $info.textContent   = `영상 ID: ${v.id}`;

  // 시청기록 남기기 (time은 0으로 시작)
  upsertHistory(v);

  // 리뷰
  renderReviews();
  $form.addEventListener("submit", onSubmitReview);
}

/* ---- 히스토리 ---- */
function upsertHistory(v) {
  const key = "history";
  const arr = jsonGet(key, []);
  const i = arr.findIndex(x => x.id === v.id);
  const base = {
    id: v.id,
    title: v.title,
    part: v.part,
    channelName: v.channelName,
    time: arr[i]?.time ?? 0,  // 기존 값 유지, 없으면 0
    lastWatchedAt: Date.now(),
  };
  if (i >= 0) arr[i] = { ...arr[i], ...base };
  else arr.unshift(base);
  localStorage.setItem(key, JSON.stringify(arr.slice(0, 200)));
}

/* ---- 리뷰 ---- */
function onSubmitReview(e){
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
}

function getReviews(){ try{ return JSON.parse(localStorage.getItem(REV_KEY(vid))) ?? []; } catch { return []; } }
function setReviews(list){ try{ localStorage.setItem(REV_KEY(vid), JSON.stringify(list)); } catch(e){ console.warn("스토리지 저장 실패", e); alert("저장 공간 부족. 일부 리뷰 삭제 필요."); } }
function renderReviews(){
  const list = getReviews();
  $reviews.replaceChildren();
  if (!list.length){
    const p = document.createElement("p");
    p.className = "text-muted mb-0";
    p.textContent = "아직 리뷰가 없습니다.";
    $reviews.appendChild(p);
    return;
  }
  [...list].sort((a,b)=>b.at-a.at).forEach(item=>{
    const wrap = document.createElement("div"); wrap.className="d-flex align-items-start gap-2 border-bottom py-2";
    const avatar = document.createElement("img"); 
    avatar.width=36; avatar.height=36; avatar.alt="작성자"; avatar.className="rounded-circle mt-1"; avatar.referrerPolicy="no-referrer";
    avatar.src="/ssafit/frontend/assets/img/avatar.png"; // 로컬 아바타 사용 권장
    const body = document.createElement("div");
    const meta = document.createElement("div"); meta.className="small text-muted"; meta.textContent = fmt.format(item.at);
    const text = document.createElement("p"); text.className="mb-1"; text.textContent=item.content;
    const del = document.createElement("button"); del.type="button"; del.className="btn btn-sm btn-outline-danger"; del.textContent="삭제";
    del.addEventListener("click", ()=>{
      if(!confirm("이 리뷰를 삭제할까요?")) return;
      const next = getReviews().filter(r=>r.id!==item.id);
      setReviews(next); renderReviews();
    });
    body.append(meta, text, del);
    wrap.append(avatar, body);
    $reviews.appendChild(wrap);
  });
}

/* ---- 보조 ---- */
function ok(r){ if(!r.ok) throw new Error("영상 데이터 응답 실패"); return r; }
function jsonGet(key, fb){ try{ return JSON.parse(localStorage.getItem(key)) ?? fb; } catch { return fb; } }
function requireDom(){
  if (!$frame || !$title || !$author || !$info || !$part || !$reviews || !$form || !$textarea || !$search) {
    throw new Error("필수 요소 누락");
  }
}
function fatal(msg){
  document.querySelector(".card")?.replaceChildren(
    Object.assign(document.createElement("p"), { className:"text-danger mb-0", textContent:msg })
  );
}
function handleFatal(err){
  console.error(err);
  fatal("오류가 발생했습니다.");
}
