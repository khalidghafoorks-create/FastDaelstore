// ===== FAST DEAL STORE - APP.JS - PURI FILE =====
// Home + Game Open + Pack Animation + Verify + Payment + Loading + Receipt + Confetti

let curGame = null;
let curPack = null;
let curPay = "Visa Credit";
let _curBrand = "VISA";
let _curCard = "•••• 4821";
let curOrderId = "";
let verifiedUid = "";
let verifiedUser = "";
let deferredPrompt = null;

// ===== 5 CLICK = SETTINGS - NO PIN =====
let clickCount = 0, clickTimer = null;
function secretClick(){
  clickCount++;
  if(clickTimer) clearTimeout(clickTimer);
  clickTimer = setTimeout(()=>{ clickCount = 0; }, 2000);
  if(clickCount >= 5){ clickCount = 0; openSettingsPage(); }
}
function openSettingsPage(){
  document.getElementById('settingsPage').style.display = 'block';
  window.scrollTo(0,0);
  if(typeof loadAll === 'function') loadAll();
}
function closeSettingsPage(){ document.getElementById('settingsPage').style.display = 'none'; }
function lockSettings(){ closeSettingsPage(); }

// ===== INSTALL APP =====
window.addEventListener('beforeinstallprompt', (e)=>{ e.preventDefault(); deferredPrompt = e; });
function installApp(){
  if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt.userChoice.then(()=>{ deferredPrompt = null; }); }
  else { alert('📱 Browser ke menu (⋮) me ja ke "Add to Home Screen" dabao'); }
}

// ===== HOME - RENDER ALL =====
function renderAll(){
  renderFilters();
  renderHomeGames();
}
function renderFilters(){
  let bar = document.getElementById('filterBar'); if(!bar) return;
  bar.innerHTML = '';
  filters.forEach(f=>{
    let b = document.createElement('button');
    b.textContent = f;
    b.className = activeFilter === f ? 'filter-btn active' : 'filter-btn';
    b.style.cssText = activeFilter === f ? 'background:#ff1744;color:#fff;padding:8px 14px;border-radius:20px;border:none;margin-right:6px' : 'background:#222;padding:8px 14px;border-radius:20px;border:none;color:#fff;margin-right:6px';
    b.onclick = ()=>{ activeFilter = f; renderAll(); };
    bar.appendChild(b);
  });
}
function getFilteredGames(){
  if(!activeFilter || activeFilter === "All" || activeFilter === "Trending") return games;
  return games.filter(g => g.cat === activeFilter || g.coin === activeFilter || g.name.includes(activeFilter));
}
function renderHomeGames(){
  let trending = document.getElementById('trendingGrid'); if(!trending) return;
  let all = document.getElementById('allGrid'); if(!all) return;
  let list = getFilteredGames();
  trending.innerHTML = '';
  all.innerHTML = '';
  // Trending = pehle 4
  list.slice(0,4).forEach((g,i)=>{
    trending.appendChild(makeGameCard(g, games.indexOf(g)));
  });
  // All = sab
  list.forEach((g)=>{
    all.appendChild(makeGameCard(g, games.indexOf(g)));
  });
}
function makeGameCard(g, idx){
  let d = document.createElement('div');
  d.className = 'game-card';
  d.style.cssText = 'background:rgba(255,255,255,0.08);border-radius:16px;padding:12px;text-align:center;cursor:pointer;border:1px solid rgba(255,255,255,0.15)';
  let imgHtml = g.img ? '<img src="'+g.img+'" style="width:100%;height:110px;object-fit:cover;border-radius:12px">' : '<div style="font-size:52px;height:110px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);border-radius:12px">'+(g.icon||g.emoji||'🎮')+'</div>';
  d.innerHTML = img
