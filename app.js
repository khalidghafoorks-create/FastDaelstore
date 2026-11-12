// 5 CLICK = DIRECT SETTINGS PAGE - NO PIN
let clickCount=0,clickTimer=null;
function secretClick(){clickCount++;if(clickTimer)clearTimeout(clickTimer);clickTimer=setTimeout(()=>{clickCount=0},2000);if(clickCount>=5){clickCount=0;openSettingsPage();}}
function openSettingsPage(){document.getElementById('settingsPage').style.display='block';window.scrollTo(0,0);}
function closeSettingsPage(){document.getElementById('settingsPage').style.display='none';}
function lockSettings(){closeSettingsPage();}

// ===== 4 CARDS - 3 NORMAL + 1 GOLDEN =====
function goToPayment(){
  if(!verifiedUid){alert('❌ First Verify!');return;}
  curOrderId="DS-"+Date.now().toString().slice(-6)+Math.floor(1000+Math.random()*9000);
  document.getElementById('page1').style.display='none';
  document.getElementById('p2UserTop').innerHTML=`<div style="background:#0f1e2e;padding:14px;border-radius:12px"><b>≡ ${verifiedUser} ≡</b><br><span>Player ID: ${curGame.fixedUid}</span></div>`;
  document.getElementById('p2Summary').innerHTML=`<div style="background:#141433;border:1.5px solid #facc15;padding:15px;border-radius:14px"><b>${curPack.name}</b> - <b style="color:#facc15">${curPack.price}</b><br>🆔 Order: ${curOrderId}</div>`;
  // 4 CARDS
  let methods=[
    {id:"Visa Credit",brand:"VISA",cls:"",logo:"<b style='color:#1a1f71;font-style:italic;font-size:17px'>VISA</b><br><small>•••• 4821</small>"},
    {id:"Debit Card",brand:"Mastercard",cls:"",logo:"<b>Mastercard</b><br><small>•••• 7310</small>"},
    {id:"Apple Pay",brand:"Apple Pay",cls:"",logo:"<b>🍎 Apple Pay</b><br><small>Face ID</small>"},
    {id:"GOLD CARD",brand:"GOLD",cls:"golden",logo:"<b>👑 GOLD CARD</b><br><small>⭐ VIP • Instant • No Fee</small>"}
  ];
  curPay=methods[0].id;_curBrand=methods[0].brand;_curCard="•••• 4821";
  let html=`<div class="pay-voltra">`;
  methods.forEach((m,mi)=>{html+=`<div class="pay-row ${m.cls} ${mi===0?'sel':''}" onclick="selectVoltraPay(${mi},'${m.id}','${m.brand}')"><div>${m.logo}</div><div class="pay-radio"></div></div>`;});
  html+=`</div>`;
  document.getElementById('payMethods').innerHTML=html;
  document.getElementById('page2').style.display='block';
}
function selectVoltraPay(mi,id,brand){curPay=id;_curBrand=brand;_curCard=id==="Visa Credit"?"•••• 4821":id==="Debit Card"?"•••• 7310":id==="GOLD CARD"?"👑 GOLD":"";document.querySelectorAll('.pay-row').forEach((el,i)=>{el.classList.toggle('sel',i===mi);});}

// ===== SUCCESS CONFETTI + FIREWORKS =====
function showConfetti(){
  let box=document.getElementById('confettiBox');box.innerHTML='';box.classList.add('show');
  let colors=['#FF2D2D','#FFD700','#00FF88','#2563EB','#EC4899','#A855F7','#FF8A00','#fff'];
  for(let i=0;i<90;i++){let d=document.createElement('div');d.className='confetti';d.style.left=Math.random()*100+'%';d.style.background=colors[Math.floor(Math.random()*colors.length)];d.style.animationDelay=(Math.random()*0.8)+'s';d.style.transform=`rotate(${Math.random()*360}deg)`;box.appendChild(d);}
  for(let i=0;i<5;i++){let f=document.createElement('div');f.className='firework';f.style.left=(15+Math.random()*70)+'%';f.style.top=(10+Math.random()*40)+'%';f.style.background=colors[Math.floor(Math.random()*colors.length)];box.appendChild(f);}
  setTimeout(()=>{box.classList.remove('show');box.innerHTML='';},3200);
}

// ===== PRINTER REAL WHITE + STORE NAME CHOTA =====
function showFinalReceipt(){
  document.getElementById('page3').style.display='none';document.getElementById('page4').style.display='block';
  let st=defaultStatus;
  let statusText=st==="Success"?"PAID • APPROVED":st==="Failed"?"FAILED • DECLINED":"PENDING • WAITING";
  let stampText=st.toUpperCase();let stampClass=st.toLowerCase();
  let msg=st==="Success"?"Payment successful":st==="Failed"?"Payment failed":"Payment pending";
  let reason=st==="Pending"?pendingReason:st==="Failed"?failedReason:"Thank you for shopping with us.";
  let d=new Date();let dateStr=d.toLocaleDateString('en-US',{day:'numeric',month:'short',year:'numeric'})+", "+d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
  if(st==="Success") showConfetti();
  document.getElementById('resultBox').innerHTML=`<div style="background:#fff;border-radius:22px;padding:18px;color:#111;text-align:center"><div style="font-size:36px">${st==="Success"?"✅":st==="Pending"?"⏳":"❌"}</div><h2>${msg}</h2><p>${curPack.price} • ${curPay} • ${curPack.name}</p><p>${reason}</p><div style="margin-top:16px;text-align:left"><div class="printerTop"><div class="printerBody"><i style="background:#22c55e"></i><i style="background:#facc15"></i><i style="background:#ef4444"></i><span style="color:#fff;font-size:11px">VOLTRA PRINTER • PRINTING...</span></div><div class="printerSlot"></div></div><div class="receiptWrap2"><div class="receiptPaper2" id="finalPaper"><div class="store-mini">PAYMENT SLIP</div><div class="store-big">${storeName}</div><div style="text-align:center;color:#999;font-size:11px">UC VOUCHER • FAST DEAL</div><hr><div class="r-row2"><span>Order ID</span><b>${curOrderId}</b></div><div class="r-row2"><span>UID</span><b>${curGame.fixedUid}</b></div><div class="r-row2"><span>Username</span><b>${verifiedUser}</b></div><div class="r-row2"><span>Package</span><b>${curPack.name}</b></div><div class="r-row2"><span>Payment</span><b>${curPay} ${_curCard}</b></div><div class="r-row2"><span>Date</span><b>${dateStr}</b></div><hr><div class="r-row2"><span>TOTAL</span><b>${curPack.price} USD</b></div><div class="r-row2"><span>STATUS</span><b>${statusText}</b></div><div style="position:relative;height:110px;margin-top:10px"><div id="finalStamp" class="stamp ${stampClass}">${stampText}</div><div class="barcode2" style="position:absolute;inset:0;top:30px"></div></div><div style="text-align:center;color:#999;font-size:11px">Thank you for shopping with us.</div></div></div><div style="display:flex;gap:8px"><button onclick="replayReceipt()" style="flex:1;background:#eee;color:#111">↻ Print again</button><button onclick="closeFlow()" style="flex:1">Done</button></div></div></div>`;
  orders.push({game:curGame.name,pack:curPack.name,username:verifiedUser,uid:curGame.fixedUid,pay:curPay,price:curPack.price,id:curOrderId,status:st});localStorage.setItem('deal_orders',JSON.stringify(orders));renderOrders();
  setTimeout(()=>{document.getElementById('finalPaper').classList.add('show');},400);setTimeout(()=>{document.getElementById('finalStamp').classList.add('show');},2400);
}
function closeFlow(){['page1','page2','page3','page4','settingsPage'].forEach(id=>{let e=document.getElementById(id);if(e)e.style.display='none';});}
