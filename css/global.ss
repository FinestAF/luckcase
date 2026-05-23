/* ===== LOOKLIST LUCK KEYS — GLOBAL STYLES ===== */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500&family=Cinzel:wght@400;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --gold: #c9a96e;
  --gold-light: #e8c97a;
  --gold-dark: #a8843e;
  --silver: #b8c8d8;
  --diamond: #7ee8fa;
  --common: #8a9bb5;
  --bg: #0a0a0a;
  --bg-2: #111111;
  --bg-card: rgba(255,255,255,0.03);
  --border: rgba(201,169,110,0.18);
  --border-hover: rgba(201,169,110,0.45);
  --text: #f5f0e8;
  --text-dim: rgba(245,240,232,0.45);
  --text-muted: rgba(245,240,232,0.2);
  --radius: 3px;
}

html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

/* ====== NAVBAR ====== */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}

.nav-logo {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  letter-spacing: 0.3em;
  color: var(--gold);
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-logo .dot {
  width: 6px; height: 6px;
  background: var(--gold);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--gold);
}

.nav-links {
  display: flex;
  gap: 4px;
  align-items: center;
}

.nav-links a {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: var(--radius);
  transition: all 0.2s;
  text-transform: uppercase;
  font-size: 11px;
}

.nav-links a:hover { color: var(--text); background: rgba(255,255,255,0.04); }
.nav-links a.active { color: var(--gold); }

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lld-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(201,169,110,0.08);
  border: 1px solid rgba(201,169,110,0.2);
  border-radius: 2px;
  padding: 7px 14px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  font-weight: 600;
  color: var(--gold);
}

.lld-badge .lld-icon { font-size: 14px; }
.lld-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: rgba(201,169,110,0.5);
  text-transform: uppercase;
  margin-left: -4px;
}

.nav-username {
  font-size: 13px;
  color: var(--text-dim);
  font-family: 'DM Sans', sans-serif;
}

.key-counts {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}

.key-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 2px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
}

.key-chip.std {
  background: rgba(138,155,181,0.1);
  border: 1px solid rgba(138,155,181,0.2);
  color: var(--common);
}

.key-chip.prem {
  background: rgba(201,169,110,0.1);
  border: 1px solid rgba(201,169,110,0.25);
  color: var(--gold);
}

/* ====== PAGE WRAPPER ====== */
.page-wrap {
  padding-top: 88px;
  padding-bottom: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
}

/* ====== SECTION HEADER ====== */
.section-header {
  margin-bottom: 32px;
}

.section-eyebrow {
  font-family: 'Cinzel', serif;
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 8px;
  opacity: 0.7;
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 0.01em;
}

.section-sub {
  font-size: 14px;
  color: var(--text-dim);
  margin-top: 6px;
  line-height: 1.6;
}

/* ====== CARDS ====== */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  backdrop-filter: blur(12px);
}

/* ====== BUTTONS ====== */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  letter-spacing: 0.04em;
}

.btn-gold {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: #0a0a0a;
  font-weight: 600;
}
.btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(201,169,110,0.35); }

.btn-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
}
.btn-outline:hover { border-color: var(--border-hover); color: var(--text); background: rgba(255,255,255,0.03); }

.btn-ghost {
  background: rgba(255,255,255,0.04);
  color: var(--text-dim);
}
.btn-ghost:hover { background: rgba(255,255,255,0.08); color: var(--text); }

/* ====== RARITY COLOURS ====== */
.r-common { color: var(--common); }
.r-silver { color: var(--silver); }
.r-gold { color: var(--gold); }
.r-diamond { color: var(--diamond); }

.rarity-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 2px;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
}
.rb-common { background: rgba(138,155,181,0.15); color: var(--common); border: 1px solid rgba(138,155,181,0.25); }
.rb-silver { background: rgba(184,200,216,0.15); color: var(--silver); border: 1px solid rgba(184,200,216,0.3); box-shadow: 0 0 10px rgba(184,200,216,0.1); }
.rb-gold { background: rgba(201,169,110,0.15); color: var(--gold); border: 1px solid rgba(201,169,110,0.35); box-shadow: 0 0 12px rgba(201,169,110,0.15); }
.rb-diamond { background: rgba(126,232,250,0.1); color: var(--diamond); border: 1px solid rgba(126,232,250,0.4); box-shadow: 0 0 16px rgba(126,232,250,0.15); }

/* ====== SCROLLBAR ====== */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: rgba(201,169,110,0.4); }

/* ====== TOAST ====== */
.toast-container {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  background: rgba(20,20,20,0.95);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 20px;
  font-size: 13px;
  color: var(--text);
  backdrop-filter: blur(20px);
  animation: toastIn 0.3s ease both;
  max-width: 300px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}

@keyframes toastIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.toast.gold-toast { border-color: rgba(201,169,110,0.5); }
.toast.diamond-toast { border-color: rgba(126,232,250,0.5); }
