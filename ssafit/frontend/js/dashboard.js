document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("history", JSON.stringify([{id:"swRNeYw1JkY",title:"하루 15분!",part:"전신",channelName:"BUBU",time:15}]));
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  // 요약 숫자 업데이트(있다면)
  setText("watch-count", history.length);
  setText("watch-time", history.reduce((s,v)=>s+(v.time||0),0));

  const partCount = countBy(history, "part");
  const parts = Object.keys(partCount);
  const total = Object.values(partCount).reduce((a,b)=>a+b,0) || 1;

  // 부위 칩
  const chips = document.getElementById("watchPartChips");
  chips.innerHTML = `<span class="chip active" data-part="__all__">전체</span>` +
    parts.map(p=>`<span class="chip" data-part="${p}">${p}</span>`).join("");
  chips.addEventListener("click",(e)=>{
    const p = e.target.dataset.part;
    if(!p) return;
    [...chips.children].forEach(c=>c.classList.toggle("active", c.dataset.part===p));
    renderList(p==="__all__"? history : history.filter(v=>v.part===p));
  });

  // 리스트 초기 렌더
  renderList(history);

  // 도넛 차트
  const ctx = document.getElementById("watchChart");
  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: parts,
      datasets: [{ data: parts.map(p=>partCount[p]) }]
    },
    options: {
      cutout: "55%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            generateLabels: (chart) => {
              const ds = chart.data.datasets[0].data;
              const sum = ds.reduce((a,b)=>a+b,0) || 1;
              return chart.data.labels.map((l, i) => {
                const v = ds[i]||0;
                const pct = Math.round((v/sum)*100);
                const style = Chart.defaults.plugins.legend.labels.generateLabels(chart)[i];
                style.text = `${l} ${pct}%`;
                return style;
              });
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = ctx.raw || 0;
              const pct = Math.round((v/total)*100);
              return `${ctx.label}: ${v}개 (${pct}%)`;
            }
          }
        }
      }
    }
  });

  // 섹터 클릭 -> 해당 부위 리스트
  ctx.onclick = (evt) => {
    const el = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true)[0];
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
