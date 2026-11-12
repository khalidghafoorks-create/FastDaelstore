// ===== FAST DEAL STORE - SETTINGS.JS - PURI FILE =====
// PIN KHATAM - Store Name, Banner, Order Status, Payment, Games, Backup

let storeName = localStorage.getItem('deal_store_name') || "FAST DEAL STORE";
let storeTagline = localStorage.getItem('deal_store_tagline') || "Trending Topups • Fast • Secure • Instant";
let filters = JSON.parse(localStorage.getItem('deal_filters') || 'null') || ["All","Trending","Battle Royale","Diamonds","Coins"];
let activeFilter = "All";
let orders = JSON.parse(localStorage.getItem('deal_orders') || '[]');
let defaultStatus = localStorage.getItem('deal_default_status') || "Pending";
let pendingReason = localStorage.getItem('deal_pending_reason') || "Server is busy, please wait.";
let failedReason = localStorage.getItem('deal_failed_reason') || "Payment not verified. Please try again or contact Customer Service.";
let bannerPhotos = JSON.parse(localStorage.getItem('deal_banners') || '[]');
let currentBannerIdx = 0;

// ===== IMAGE COMPRESS =====
function compressImage(file, cb){
  let r = new FileReader();
  r.onload = e => {
    let img = new Image();
    img.onload = () => {
      let c = document.createElement('canvas');
      let w = img.width, h = img.height, maxW = 700;
      if(w > maxW){ h = h * maxW / w; w = maxW; }
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      cb(c.toDataURL('image/jpeg', 0.65));
    };
    img.src = e.target.result;
  };
  r.readAsDataURL(file);
}
function safeSave(key, val){
  try{ localStorage.setItem(key, val); return true; }
  catch(e){ alert('⚠️ Storage full! Purani photo delete karo'); return false; }
}

// ===== STORE NAME - HAR JAGAH BADLEGA =====
function applyStoreName(){
  storeName = document.getElementById('storeNameInput').value.trim() || "FAST DEAL STORE";
  storeTagline = document.getElementById('storeTaglineInput').value.trim() || "Trending Topups • Fast • Secure • Instant";
  localStorage.setItem('deal_store_name', storeName);
  localStorage.setItem('deal_store_tagline', storeTagline);
  updateStoreNameUI();
  alert('✅ Store Name Changed: ' + storeName);
}
function updateStoreNameUI(){
  let a = document.getElementById('storeNameTop'); if(a) a.textContent = storeName;
  let b = document.getElementById('storeTaglineTop'); if(b) b.textContent = storeTagline;
  let c = document.getElementById('storeNameFoot'); if(c) c.textContent = storeName;
  let d = document.getElementById('storeDescFoot'); if(d) d.textContent = storeName;
  let e = document.getElementById('storeCopyFoot'); if(e) e.textContent = storeName;
  document.title = storeName;
  let f = document.getElementById('storeNameInput'); if(f) f.value = storeName;
  let g = document.getElementById('storeTaglineInput'); if(g) g.value = storeTagline;
  let logo = document.getElementById('logo');
  if(logo){
    let savedLogo = localStorage.getItem('deal_logo');
    logo.innerHTML = savedLogo ? '<img src="'+savedLogo+'">' : '<span>'+storeName.slice(0,2).toUpperCase()+'</span>';
  }
  let rp = document.querySelector('.store-big'); if(rp) rp.textContent = storeName;
  let ci = document.getElementById('contactInput'); if(ci) ci.value = localStorage.getItem('deal_contact') || "";
  let ai = document.getElementById('addressInput'); if(ai) ai.value = localStorage.getItem('deal_address') || "";
  let sc = document.getElementById('showContact'); if(sc) sc.textContent = localStorage.getItem('deal_contact') || "Not set yet";
  let sa = document.getElementById('showAddress'); if(sa) sa.textContent = localStorage.getItem('deal_address') || "Not set yet";
}

// ===== BANNER PHOTOS =====
function uploadBannerPhotos(event){
  let files = event.target.files;
  for(let i=0;i<files.length;i++){
    compressImage(files[i], (small)=>{
      bannerPhotos.push(small);
      safeSave('deal_banners', JSON.stringify(bannerPhotos));
      renderBannerList();
      updateBannerUI();
    });
  }
}
function renderBannerList(){
  let list = document.getElementById('bannerPhotosList'); if(!list) return;
  list.innerHTML = '';
  bannerPhotos.forEach((src,i)=>{
    let d = document.createElement('div');
    d.style.position = 'relative';
    d.innerHTML = '<img src="'+src+'" style="width:100%;height:90px;object-fit:cover;border-radius:10px"><button onclick="deleteBanner('+i+')" style="position:absolute;top:4px;right:4px;background:#ff1744;padding:4px 8px;font-size:12px">✖</button>';
    list.appendChild(d);
  });
  let ct = document.getElementById('bannerCountText'); if(ct) ct.textContent = bannerPhotos.length + ' Banners';
}
function deleteBanner(i){ bannerPhotos.splice(i,1); safeSave('deal_banners', JSON.stringify(bannerPhotos)); renderBannerList(); updateBannerUI(); }
function saveMainBanners(){ safeSave('deal_banners', JSON.stringify(bannerPhotos)); updateBannerUI(); alert('✅ Banners Saved!'); }
function clearAllBanners(){ bannerPhotos = []; localStorage.removeItem('deal_banners'); renderBannerList(); updateBannerUI(); alert('🗑️ All Banners Deleted'); }
function updateBannerUI(){
  let banner = document.getElementById('banner'); if(!banner) return;
  if(bannerPhotos.length === 0){
    banner.style.background = ''; let bt = document.getElementById('bannerText'); if(bt) bt.style.display = 'block';
    let dots = document.getElementById('bannerDots'); if(dots) dots.innerHTML = '';
    return;
  }
  banner.style.backgroundImage = 'url('+bannerPhotos[currentBannerIdx % bannerPhotos.length]+')';
  banner.style.backgroundSize = 'cover'; banner.style.backgroundPosition = 'center';
  let dots = document.getElementById('bannerDots');
  if(dots){
    dots.innerHTML = '';
    bannerPhotos.forEach((_,i)=>{
      let s = document.createElement('span');
      s.style.cssText = 'display:inline-block;width:8px;height:8px;border-radius:50%;background:'+(i===currentBannerIdx?'#fff':'rgba(255,255,255,0.4)')+';margin:0 3px';
      dots.appendChild(s);
    });
  }
  currentBannerIdx = (currentBannerIdx + 1) % bannerPhotos.length;
}
setInterval(()=>{ if(bannerPhotos.length > 1) updateBannerUI(); }, 4000);

// ===== ORDER STATUS =====
function updateDefaultUI(){
  let a = document.getElementById('defSuccess'); if(!a) return;
  document.getElementById('defSuccess').classList.toggle('on', defaultStatus === "Success");
  document.getElementById('defPending').classList.toggle('on', defaultStatus === "Pending");
  document.getElementById('defFailed').classList.toggle('on', defaultStatus === "Failed");
  document.getElementById('defaultStatusText').textContent = "Current: " + (defaultStatus==="Success"?"✅ Success":defaultStatus==="Failed"?"❌ Failed":"⏳ Pending");
  document.getElementById('pendingReason').value = pendingReason;
  document.getElementById('failedReason').value = failedReason;
}
function setDefaultStatus(s){ defaultStatus = s; localStorage.setItem('deal_default_status', s); updateDefaultUI(); }
function saveOrderSettings(){ localStorage.setItem('deal_default_status', defaultStatus); alert('✅ Order Saved!'); }
function saveReasonSettings(){
  pendingReason = document.getElementById('pendingReason').value;
  failedReason = document.getElementById('failedReason').value;
  localStorage.setItem('deal_pending_reason', pendingReason);
  localStorage.setItem('deal_failed_reason', failedReason);
  alert('✅ Reasons Saved!');
}

// ===== ORDERS =====
function renderOrders(){
  let el = document.getElementById('ordersList'); if(!el) return;
  if(orders.length === 0){ el.innerHTML = '<p style="opacity:.6;font-size:13px">No orders yet</p>'; return; }
  el.innerHTML = '';
  orders.slice().reverse().forEach(o=>{
    let d = document.createElement('div');
    d.style.cssText = 'background:rgba(0,0,0,.3);padding:10px;border-radius:10px;margin-bottom:8px;font-size:13px';
    d.innerHTML = '<b>'+o.game+' - '+o.pack+'</b><br>👤 '+o.username+' | 🆔 '+o.uid+'<br>💰 '+o.price+' | '+o.pay+'<br>Order: '+o.id+' | '+(o.status||'Pending');
    el.appendChild(d);
  });
}
function clearOrders(){ orders = []; localStorage.setItem('deal_orders', JSON.stringify(orders)); renderOrders(); alert('🗑️ Orders Cleared'); }

// ===== PAYMENT / FILTER / LOGO / CONTACT =====
function savePaymentSettings(){
  localStorage.setItem('deal_payCard', document.getElementById('payCard').checked ? '1' : '0');
  localStorage.setItem('deal_payApple', document.getElementById('payApple').checked ? '1' : '0');
  localStorage.setItem('deal_payUsdt', document.getElementById('payUsdt').checked ? '1' : '0');
  localStorage.setItem('deal_payBtc', document.getElementById('payBtc').checked ? '1' : '0');
  alert('✅ Payment Saved!');
}
function updatePay(){
  let c = document.getElementById('payCard'); if(c) c.checked = localStorage.getItem('deal_payCard') !== '0';
  let a = document.getElementById('payApple'); if(a) a.checked = localStorage.getItem('deal_payApple') !== '0';
  let u = document.getElementById('payUsdt'); if(u) u.checked = localStorage.getItem('deal_payUsdt') !== '0';
  let b = document.getElementById('payBtc'); if(b) b.checked = localStorage.getItem('deal_payBtc') !== '0';
}
function saveFilterSettings(){
  let f = document.getElementById('filterInput').value.split(',').map(s=>s.trim()).filter(Boolean);
  if(f.length){ filters = f; localStorage.setItem('deal_filters', JSON.stringify(filters)); }
  if(typeof renderAll === 'function') renderAll();
  alert('✅ Filters Saved!');
}
function saveLogo(){
  let inp = document.getElementById('logoInput');
  if(!inp.files[0]){ alert('First select logo'); return; }
  compressImage(inp.files[0], (small)=>{ safeSave('deal_logo', small); updateStoreNameUI(); alert('✅ Logo Saved!'); });
}
function saveContact(){
  localStorage.setItem('deal_contact', document.getElementById('contactInput').value);
  localStorage.setItem('deal_address', document.getElementById('addressInput').value);
  updateStoreNameUI();
  alert('✅ Contact Saved!');
}

// ===== GAMES CONTROL - ADD / EDIT / DELETE =====
function addGame(){
  let name = document.getElementById('newName').value.trim();
  if(!name){ alert('❌ Game Name likho'); return; }
  let cat = document.getElementById('newCat').value.trim() || "Game";
  let price = document.getElementById('newPrice').value.trim() || "From $199";
  let badge = document.getElementById('newBadge').value.trim() || "TOPUP";
  let icon = document.getElementById('newIcon').value.trim() || "🎮";
  let userLabel = document.getElementById('newUserLabel').value.trim() || "Player ID";
  let fixedUser = document.getElementById('newFixedUser').value.trim() || "";
  let fixedUid = document.getElementById('newFixedUid').value.trim() || "";
  let coin = price;
  let newGame = {
    name: name, cat: cat, price: price, badge: badge, icon: icon, emoji: icon, img: "", coin: coin,
    userLabel: userLabel, fixedUser: fixedUser, fixedUid: fixedUid, note: price,
    packs: [
      { name: "25K " + coin, price: "$199" },
      { name: "50K " + coin, price: "$379" },
      { name: "100K " + coin, price: "$699" },
      { name: "200K " + coin, price: "$1299" }
    ]
  };
  games.push(newGame);
  saveGamesToStorage();
  renderGamesEditor();
  if(typeof renderAll === 'function') renderAll();
  document.getElementById('newName').value = "";
  alert('✅ Game Added: ' + name);
}
function deleteGame(i){
  if(!confirm('Delete ' + games[i].name + ' ?')) return;
  games.splice(i,1);
  saveGamesToStorage();
  renderGamesEditor();
  if(typeof renderAll === 'function') renderAll();
}
function renderGamesEditor(){
  let el = document.getElementById('gamesEditor'); if(!el) return;
  el.innerHTML = '';
  games.forEach((g,i)=>{
    let d = document.createElement('div');
    d.style.cssText = 'background:rgba(0,0,0,.3);padding:10px;border-radius:10px;margin-top:8px;display:flex;justify-content:space-between;align-items:center;gap:8px';
    d.innerHTML = '<span><b>'+(g.icon||'🎮')+' '+g.name+'</b><br><small>'+g.cat+' | '+g.price+'</small></span><button onclick="deleteGame('+i+')" style="background:#ff1744;padding:6px 10px;font-size:12px">🗑️ Delete</button>';
    el.appendChild(d);
  });
}

// ===== BACKUP =====
function saveAll(){
  localStorage.setItem('deal_store_name', storeName);
  localStorage.setItem('deal_store_tagline', storeTagline);
  localStorage.setItem('deal_default_status', defaultStatus);
  saveGamesToStorage();
  alert('💾 SAVE ALL Done!');
}
function exportBackup(){
  let data = {};
  for(let i=0;i<localStorage.length;i++){ let k = localStorage.key(i); data[k] = localStorage.getItem(k); }
  let txt = JSON.stringify(data);
  if(navigator.clipboard){ navigator.clipboard.writeText(txt).then(()=> alert('📋 Backup Copied!')); }
  else { prompt('Copy this backup:', txt); }
}
function importBackup(){
  let txt = prompt('Paste Backup here:');
  if(!txt) return;
  try{
    let data = JSON.parse(txt);
    Object.keys(data).forEach(k=> localStorage.setItem(k, data[k]));
    alert('✅ Backup Restored! Page reload hoga');
    location.reload();
  }catch(e){ alert('❌ Wrong Backup!'); }
}

// ===== LOAD ALL ON START =====
function loadAll(){
  updateStoreNameUI();
  updatePay();
  updateDefaultUI();
  renderBannerList();
  updateBannerUI();
  renderOrders();
  renderGamesEditor();
  if(typeof renderThemes === 'function') renderThemes();
  if(typeof applyTheme === 'function') applyTheme(currentThemeIndex);
  let fi = document.getElementById('filterInput'); if(fi) fi.value = filters.join(', ');
}
