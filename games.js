// ===== FAST DEAL STORE - GAMES.JS - 8 GAMES - PURI FILE =====
// Har Game: 25K - 200K, Price $ me

let defaultGames = [
{
  name: "PUBG Mobile",
  cat: "Battle Royale",
  price: "From $199",
  badge: "TOPUP",
  icon: "🔫",
  emoji: "🔫",
  img: "",
  coin: "UC",
  userLabel: "Player ID",
  fixedUser: "",
  fixedUid: "",
  note: "25K - 200K UC",
  packs: [
    { name: "25K UC", price: "$199" },
    { name: "50K UC", price: "$379" },
    { name: "100K UC", price: "$699" },
    { name: "200K UC", price: "$1299" }
  ]
},
{
  name: "Free Fire",
  cat: "Battle Royale",
  price: "From $189",
  badge: "TOPUP",
  icon: "🔥",
  emoji: "🔥",
  img: "",
  coin: "Diamonds",
  userLabel: "Player ID",
  fixedUser: "",
  fixedUid: "",
  note: "25K - 200K Diamonds",
  packs: [
    { name: "25K Diamonds", price: "$189" },
    { name: "50K Diamonds", price: "$359" },
    { name: "100K Diamonds", price: "$679" },
    { name: "200K Diamonds", price: "$1249" }
  ]
},
{
  name: "Bigo Live",
  cat: "Live",
  price: "From $199",
  badge: "TOPUP",
  icon: "💎",
  emoji: "💎",
  img: "",
  coin: "Beans",
  userLabel: "Bigo ID",
  fixedUser: "",
  fixedUid: "",
  note: "25K - 200K Beans",
  packs: [
    { name: "25K Beans", price: "$199" },
    { name: "50K Beans", price: "$379" },
    { name: "100K Beans", price: "$699" },
    { name: "200K Beans", price: "$1299" }
  ]
},
{
  name: "Call of Duty",
  cat: "Shooting",
  price: "From $209",
  badge: "TOPUP",
  icon: "🎯",
  emoji: "🎯",
  img: "",
  coin: "CP",
  userLabel: "Player ID",
  fixedUser: "",
  fixedUid: "",
  note: "25K - 200K CP",
  packs: [
    { name: "25K CP", price: "$209" },
    { name: "50K CP", price: "$399" },
    { name: "100K CP", price: "$749" },
    { name: "200K CP", price: "$1399" }
  ]
},
{
  name: "TikTok",
  cat: "Coins",
  price: "From $179",
  badge: "TOPUP",
  icon: "🎵",
  emoji: "🎵",
  img: "",
  coin: "Coins",
  userLabel: "Username",
  fixedUser: "",
  fixedUid: "",
  note: "25K - 200K Coins",
  packs: [
    { name: "25K Coins", price: "$179" },
    { name: "50K Coins", price: "$339" },
    { name: "100K Coins", price: "$629" },
    { name: "200K Coins", price: "$1199" }
  ]
},
{
  name: "Mobile Legends",
  cat: "MOBA",
  price: "From $189",
  badge: "TOPUP",
  icon: "⚔️",
  emoji: "⚔️",
  img: "",
  coin: "Diamonds",
  userLabel: "Player ID",
  fixedUser: "",
  fixedUid: "",
  note: "25K - 200K Diamonds",
  packs: [
    { name: "25K Diamonds", price: "$189" },
    { name: "50K Diamonds", price: "$359" },
    { name: "100K Diamonds", price: "$679" },
    { name: "200K Diamonds", price: "$1249" }
  ]
},
{
  name: "Yalla Ludo",
  cat: "Board",
  price: "From $169",
  badge: "TOPUP",
  icon: "🎲",
  emoji: "🎲",
  img: "",
  coin: "Coins",
  userLabel: "Player ID",
  fixedUser: "",
  fixedUid: "",
  note: "25K - 200K Coins",
  packs: [
    { name: "25K Coins", price: "$169" },
    { name: "50K Coins", price: "$319" },
    { name: "100K Coins", price: "$599" },
    { name: "200K Coins", price: "$1099" }
  ]
},
{
  name: "Sugo",
  cat: "Live",
  price: "From $169",
  badge: "TOPUP",
  icon: "🎁",
  emoji: "🎁",
  img: "",
  coin: "Coins",
  userLabel: "Sugo ID",
  fixedUser: "",
  fixedUid: "",
  note: "25K - 200K Coins",
  packs: [
    { name: "25K Coins", price: "$169" },
    { name: "50K Coins", price: "$319" },
    { name: "100K Coins", price: "$599" },
    { name: "200K Coins", price: "$1099" }
  ]
}
];

// Agar pehle se save games hain to wohi use karo, warna default 8
let games = defaultGames;
try{
  let saved = localStorage.getItem('deal_games');
  if(saved){
    let parsed = JSON.parse(saved);
    if(parsed && parsed.length > 0){ games = parsed; }
  }
}catch(e){ games = defaultGames; }

// Games ko save karne ke liye helper
function saveGamesToStorage(){
  try{ localStorage.setItem('deal_games', JSON.stringify(games)); }catch(e){}
}
