// ===== FAST DEAL STORE - THEMES.JS - 20 THEMES - PURI FILE =====
// 10 GLASS + 10 ANIMATION

let themes = [
  // ===== 10 GLASS THEMES =====
  { name: "Glass Pink", type: "glass", bg: "linear-gradient(135deg,#FF5E8A,#A855F7)", btn: "linear-gradient(135deg,#FF5E8A,#A855F7)", accent: "#FF5E8A", card: "rgba(255,255,255,0.12)", anim: "none" },
  { name: "Glass Blue", type: "glass", bg: "linear-gradient(135deg,#2196F3,#00BCD4)", btn: "linear-gradient(135deg,#2196F3,#00BCD4)", accent: "#2196F3", card: "rgba(255,255,255,0.12)", anim: "none" },
  { name: "Glass Green", type: "glass", bg: "linear-gradient(135deg,#00C853,#00E676)", btn: "linear-gradient(135deg,#00C853,#00E676)", accent: "#00C853", card: "rgba(255,255,255,0.12)", anim: "none" },
  { name: "Glass Purple", type: "glass", bg: "linear-gradient(135deg,#7C4DFF,#B388FF)", btn: "linear-gradient(135deg,#7C4DFF,#B388FF)", accent: "#7C4DFF", card: "rgba(255,255,255,0.12)", anim: "none" },
  { name: "Glass Gold", type: "glass", bg: "linear-gradient(135deg,#FFD700,#FFA500)", btn: "linear-gradient(135deg,#FFD700,#FFA500)", accent: "#FFD700", card: "rgba(255,255,255,0.15)", anim: "none" },
  { name: "Glass Red", type: "glass", bg: "linear-gradient(135deg,#FF1744,#FF5252)", btn: "linear-gradient(135deg,#FF1744,#FF5252)", accent: "#FF1744", card: "rgba(255,255,255,0.12)", anim: "none" },
  { name: "Glass Orange", type: "glass", bg: "linear-gradient(135deg,#FF8A00,#FF5E3A)", btn: "linear-gradient(135deg,#FF8A00,#FF5E3A)", accent: "#FF8A00", card: "rgba(255,255,255,0.12)", anim: "none" },
  { name: "Glass Dark", type: "glass", bg: "linear-gradient(135deg,#111111,#333333)", btn: "linear-gradient(135deg,#111111,#333333)", accent: "#ffffff", card: "rgba(255,255,255,0.10)", anim: "none" },
  { name: "Glass Neon", type: "glass", bg: "linear-gradient(135deg,#00FF88,#00BFFF)", btn: "linear-gradient(135deg,#00FF88,#00BFFF)", accent: "#00FF88", card: "rgba(255,255,255,0.12)", anim: "none" },
  { name: "Glass White", type: "glass", bg: "linear-gradient(135deg,#FFFFFF,#E0E0E0)", btn: "linear-gradient(135deg,#FFFFFF,#BDBDBD)", accent: "#111111", card: "rgba(255,255,255,0.25)", anim: "none" },

  // ===== 10 ANIMATION THEMES =====
  { name: "Fire Animation 🔥", type: "animation", bg: "linear-gradient(135deg,#FF3D00,#FF6D00,#FFAB00)", btn: "linear-gradient(135deg,#FF3D00,#FFAB00)", accent: "#FF3D00", card: "rgba(255,255,255,0.12)", anim: "fireAnim 2s infinite" },
  { name: "Water Animation 🌊", type: "animation", bg: "linear-gradient(135deg,#0066FF,#00CCFF,#00FFCC)", btn: "linear-gradient(135deg,#0066FF,#00CCFF)", accent: "#0066FF", card: "rgba(255,255,255,0.12)", anim: "waterAnim 3s infinite" },
  { name: "Rainbow 🌈", type: "animation", bg: "linear-gradient(135deg,#FF0000,#FF7F00,#FFFF00,#00FF00,#0000FF,#8B00FF)", btn: "linear-gradient(135deg,#FF0000,#FF7F00,#FFFF00)", accent: "#FF00FF", card: "rgba(255,255,255,0.12)", anim: "rainbowAnim 4s infinite" },
  { name: "Galaxy 🌌", type: "animation", bg: "linear-gradient(135deg,#0A0033,#2A0066,#4B0082,#FF00FF)", btn: "linear-gradient(135deg,#4B0082,#FF00FF)", accent: "#FF00FF", card: "rgba(255,255,255,0.12)", anim: "galaxyAnim 5s infinite" },
  { name: "Sunset 🌇", type: "animation", bg: "linear-gradient(135deg,#FF512F,#F09819,#FF512F)", btn: "linear-gradient(135deg,#FF512F,#F09819)", accent: "#FF512F", card: "rgba(255,255,255,0.12)", anim: "sunsetAnim 3s infinite" },
  { name: "Ocean 🌊", type: "animation", bg: "linear-gradient(135deg,#000428,#004e92,#000428)", btn: "linear-gradient(135deg,#004e92,#00c6ff)", accent: "#00c6ff", card: "rgba(255,255,255,0.12)", anim: "oceanAnim 3s infinite" },
  { name: "Lava 🌋", type: "animation", bg: "linear-gradient(135deg,#000000,#FF0000,#FF4500)", btn: "linear-gradient(135deg,#FF0000,#FF4500)", accent: "#FF4500", card: "rgba(255,255,255,0.12)", anim: "lavaAnim 2s infinite" },
  { name: "Ice ❄️", type: "animation", bg: "linear-gradient(135deg,#A8EDEA,#FED6E3,#A8EDEA)", btn: "linear-gradient(135deg,#A8EDEA,#74EBD5)", accent: "#74EBD5", card: "rgba(255,255,255,0.25)", anim: "iceAnim 3s infinite" },
  { name: "Sparkle ✨", type: "animation", bg: "linear-gradient(135deg,#FFD700,#FF69B4,#FFD700)", btn: "linear-gradient(135deg,#FFD700,#FF69B4)", accent: "#FFD700", card: "rgba(255,255,255,0.15)", anim: "sparkleAnim 1.5s infinite" },
  { name: "Neon Blink 💡", type: "animation", bg: "linear-gradient(135deg,#000000,#00FF00,#000000)", btn: "linear-gradient(135deg,#00FF00,#00FFFF)", accent: "#00FF00", card: "rgba(255,255,255,0.10)", anim: "neonAnim 1s infinite" }
];

// Current theme - localStorage se
let currentThemeIndex = parseInt(localStorage.getItem('deal_theme') || "0");

// Theme lagane wala function
function applyTheme(i){
  if(i < 0 || i >= themes.length) i = 0;
  currentThemeIndex = i;
  let t = themes[i];
  let root = document.documentElement;
  root.style.setProperty('--btn-bg', t.btn);
  root.style.setProperty('--banner', t.bg);
  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--card-bg', t.card);
  // Header / Banner / Button pe theme lagao
  let header = document.querySelector('header');
  if(header){ header.style.background = t.bg; header.style.animation = t.anim; }
  let banner = document.getElementById('banner');
  if(banner){ banner.style.background = t.bg; banner.style.animation = t.anim; }
  // Glass effect
  if(t.type === "glass"){
    document.body.classList.add('glass-mode');
    document.body.classList.remove('anim-mode');
    document.body.style.backdropFilter = "blur(10px)";
  } else {
    document.body.classList.add('anim-mode');
    document.body.classList.remove('glass-mode');
  }
  try{ localStorage.setItem('deal_theme', String(i)); }catch(e){}
}

// Settings me Themes dikhane ke liye
function renderThemes(){
  let grid = document.getElementById('themeGrid');
  if(!grid) return;
  grid.innerHTML = '';
  themes.forEach((t,i)=>{
    let div = document.createElement('div');
    div.className = 'theme-opt' + (i === currentThemeIndex ? ' selected' : '');
    div.style.background = t.bg;
    div.style.animation = t.anim;
    div.style.padding = '14px 8px';
    div.style.borderRadius = '12px';
    div.style.color = '#fff';
    div.style.fontSize = '12px';
    div.style.fontWeight = '700';
    div.style.textAlign = 'center';
    div.style.cursor = 'pointer';
    div.style.border = i === currentThemeIndex ? '3px solid #00ff88' : '1px solid rgba(255,255,255,0.3)';
    div.textContent = t.name;
    div.onclick = function(){ applyTheme(i); renderThemes(); };
    grid.appendChild(div);
  });
}

// Theme Save button ke liye
function saveTheme(){
  try{ localStorage.setItem('deal_theme', String(currentThemeIndex)); }catch(e){}
  alert('✅ Theme Saved: ' + themes[currentThemeIndex].name);
}
