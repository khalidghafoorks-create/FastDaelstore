// PIN KHATAM - DIRECT SETTINGS PAGE
let storeName=localStorage.getItem('deal_store_name')||"FAST DEAL STORE";
let storeTagline=localStorage.getItem('deal_store_tagline')||"Trending Topups • Fast • Secure • Instant";
let filters=JSON.parse(localStorage.getItem('deal_filters')||'null')||["All","Trending","Battle Royale","Diamonds","Coins"];
let activeFilter="All";let orders=JSON.parse(localStorage.getItem('deal_orders')||'[]');
let defaultStatus=localStorage.getItem('deal_default_status')||"Pending";
let pendingReason=localStorage.getItem('deal_pending_reason')||"Server is busy, please wait.";
let failedReason=localStorage.getItem('deal_failed_reason')||"Payment not verified. Please try again or contact Customer Service.";
function compressImage(file,cb){let r=new FileReader();r.onload=e=>{let img=new Image();img.onload=()=>{let c=document.createElement('canvas');let w=img.width,h=img.height,maxW=700;if(w>maxW){h=h*maxW/w;w=maxW;}c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);cb(c.toDataURL('image/jpeg',0.65));};img.src=e.target.result;};r.readAsDataURL(file);}
function safeSave(key,val){try{localStorage.setItem(key,val);return true;}catch(e){alert('⚠️ Storage full! Purani photo delete karo');return false;}}
function updateDefaultUI(){const a=document.getElementById('defSuccess');if(!a)return;document.getElementById('defSuccess').classList.toggle('on',defaultStatus==="Success");document.getElementById('defPending').classList.toggle('on',defaultStatus==="Pending");document.getElementById('defFailed').classList.toggle('on',defaultStatus==="Failed");document.getElementById('defaultStatusText').textContent="Current: "+(defaultStatus==="Success"?"✅ Success":defaultStatus==="Failed"?"❌ Failed":"⏳ Pending");document.getElementById('pendingReason').value=pendingReason;document.getElementById('failedReason').value=failedReason;}
function setDefaultStatus(s){defaultStatus=s;localStorage.setItem('deal_default_status',s);updateDefaultUI();}
function saveOrderSettings(){localStorage.setItem('deal_default_status',defaultStatus);alert('✅ Order Saved!');}
function saveReasonSettings(){pendingReason=document.getElementById('pendingReason').value;failedReason=document.getElementById('failedReason').value;localStorage.setItem('deal_pending_reason',pendingReason);localStorage.setItem('deal_failed_reason',failedReason);alert('✅ Reasons Saved!');}
function savePaymentSettings(){localStorage.setItem('deal_payCard',document.getElementById('payCard').checked?'1':'0');localStorage.setItem('deal_payApple',document.getElementById('payApple').checked?'1':'0');localStorage.setItem('deal_payUsdt',document.getElementById('payUsdt').checked?'1':'0');localStorage.setItem('deal_payBtc',document.getElementById('payBtc').checked?'1':'0');updatePay();alert('✅ Payment Saved!');}
function saveFilterSettings(){const f=document.getElementById('filterInput').value.split(',').map(s=>s.trim()).filter(Boolean);if(f.length){filters=f;localStorage.setItem('deal_filters',JSON.stringify(filters));renderAll();}alert('✅ Filters Saved!');}
function saveLogo(){const inp=document.getElementById('logoInput');if(!inp.files[0]){alert('First select logo');return;}compressImage(inp.files[0],(small)=>{safeSave('deal_logo',small);updateStoreNameUI();alert('✅ Logo Saved!');});}
function saveContact(){localStorage.setItem('deal_contact',document.getElementById('contactInput').value);localStorage.setItem('deal_address',document.getElementById('addressInput').value);loadAll();alert('✅ Contact Saved!');}
// STORE NAME - YAHAN SE BADLOGE TO HAR JAGAH BADLEGA - HEADER, FOOTER, RECEIPT, TITLE
function applyStoreName(){storeName=document.getElementById('storeNameInput').value.trim()||"FAST DEAL STORE";storeTagline=document.getElementById('storeTaglineInput').value.trim()||"Trending Topups • Fast • Secure • Instant";localStorage.setItem('deal_store_name',storeName);localStorage.setItem('deal_store_tagline',storeTagline);updateStoreNameUI();alert('✅ Store Name Changed: '+storeName+' - Har jagah badal gaya!');}
function updateStoreNameUI(){
  document.getElementById('storeNameTop').textContent=storeName;
  document.getElementById('storeTaglineTop').textContent=storeTagline;
  document.getElementById('storeNameFoot').textContent=storeName;
  document.getElementById('storeDescFoot').textContent=storeName;
  document.getElementById('storeCopyFoot').textContent=storeName;
  document.title=storeName;
  document.getElementById('storeNameInput').value=storeName;
  document.getElementById('storeTaglineInput').value=storeTagline;
  document.getElementById('logo').innerHTML=localStorage.getItem('deal_logo')?'<img src="'+localStorage.getItem('deal_logo')+'">':'<span>'+storeName.slice(0,2).toUpperCase()+'</span>';
  // Receipt me bhi
  let rp=document.querySelector('.store-big'); if(rp) rp.textContent=storeName;
}
function updatePay(){let c=document.getElementById('payCard');if(c)c.checked=localStorage.getItem('deal_payCard')!=='0';let a=document.getElementById('payApple');if(a)a.checked=localStorage.getItem('deal_payApple')!=='0';let u=document.getElementById('payUsdt');if(u)u.checked=localStorage.getItem('deal_payUsdt')!=='0';let b=document.getElementById('payBtc');if(b)b.checked=localStorage.getItem('deal_payBtc')!=='0';}
