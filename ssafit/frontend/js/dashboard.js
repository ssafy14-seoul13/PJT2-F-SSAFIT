// /frontend/js/dashboard.js 핵심 패치
document.addEventListener("DOMContentLoaded", () => {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  setText("watch-count", history.length);
  setText("watch-time", history.reduce((s,v)=>s+(+v.time||0),0));

  const partCount = countBy(history.filter(v=>v && v.part), "part");
  const entries = Object.entries(partCount)
    .filter(([k,v]) => k && v > 0);          // 빈 라벨/0개 제거
  const parts = entries.map(([k]) => k);
  const data  = entries.map(([,v]) => v);
  const total = data.reduce((a,b)=>a+b,0) || 1;

  // 칩
  const chips = document.getElementById("watchPartChips");
  chips.innerHTML =
    `<span class="chip active" data-part="__all__">전체</span>` +
    parts.map(p=>`<span class="chip" data-part="${p}">${p}</span>`).join("");
  chips.addEventListener("click",(e)=>{
    const p = e.target.dataset.part;
    if(!p) return;
    [...chips.children].forEach(c=>c.classList.toggle("active", c.dataset.part===p));
    renderList(p==="__all__"? history : history.filter(v=>v.part===p));
  });

  renderList(history);

  // 차트
  const ctx = document.getElementById("watchChart");
  const chart = new Chart(ctx, {
    type: "doughnut",
    data: { labels: parts, datasets: [{ data }] },
    options: {
      cutout: "55%",
      plugins: {
        // 범례 기본값 사용 => 불안정한 generateLabels 제거
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = +ctx.raw || 0;
              const pct = Math.round((v/total)*100);
              return `${ctx.label}: ${v}개 (${pct}%)`;
            }
          }
        }
      }
    }
  });

  // 섹터 클릭
  ctx.onclick = (evt) => {
    const el = chart.getElementsAtEventForMode(evt,"nearest",{intersect:true},true)[0];
    if(!el) return;
    const part = chart.data.labels[el.index];
    [...chips.children].forEach(c=>c.classList.toggle("active", c.dataset.part===part));
    renderList(history.filter(v=>v.part===part));
  };

  // 유틸
  function renderList(arr){
    const ul = document.getElementById("watchList");
    if(!arr.length){ ul.innerHTML = `<li class="text-muted">데이터 없음</li>`; return; }
    ul.innerHTML = arr.map(v=>`
      <li>
        <span class="badge text-bg-light me-1">${safe(v.part)}</span>
        <span class="fw-semibold">${safe(v.title)}</span>
        <small class="text-muted">· ${safe(v.channelName||"")}${v.time?` · ${v.time}분`:``}</small>
      </li>
    `).join("");
  }
  function countBy(arr,key){ return arr.reduce((m,o)=>(m[o[key]]=(m[o[key]]||0)+1,m),{}); }
  function setText(id, val){ const el=document.getElementById(id); if(el) el.textContent=val; }
  function safe(s){ return String(s??"").replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[m])); }
});
