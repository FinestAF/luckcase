// ===== LOOKLIST LUCK KEYS — SHARED JS =====

// ---- STATE ----
const State = {
  get username() { return sessionStorage.getItem('lk_username') || 'Guest'; },
  get lld() { return parseFloat(sessionStorage.getItem('lk_lld') || '250'); },
  set lld(v) { sessionStorage.setItem('lk_lld', v.toFixed(2)); },
  get stdKeys() { return parseInt(sessionStorage.getItem('lk_std_keys') || '0'); },
  set stdKeys(v) { sessionStorage.setItem('lk_std_keys', v); },
  get premKeys() { return parseInt(sessionStorage.getItem('lk_prem_keys') || '0'); },
  set premKeys(v) { sessionStorage.setItem('lk_prem_keys', v); },
  get inventory() { return JSON.parse(sessionStorage.getItem('lk_inventory') || '[]'); },
  set inventory(v) { sessionStorage.setItem('lk_inventory', JSON.stringify(v)); },
  addItem(item) {
    const inv = this.inventory;
    item.id = Date.now() + Math.random();
    item.acquired = new Date().toISOString();
    inv.unshift(item);
    this.inventory = inv;
  }
};

// Redirect to login if not authenticated
function requireAuth() {
  if (!sessionStorage.getItem('lk_username')) {
    window.location.href = '../index.html';
  }
}

// ---- NAVBAR ----
function buildNavbar(activePage) {
  const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.innerHTML = `
    <a href="${basePath}index.html" class="nav-logo">
      <span class="dot"></span>Looklist
    </a>
    <div class="nav-links">
      <a href="${basePath}pages/hub.html" class="${activePage === 'hub' ? 'active' : ''}">🏠 Home</a>
      <a href="${basePath}pages/store.html" class="${activePage === 'store' ? 'active' : ''}">🗝️ Store</a>
      <a href="${basePath}pages/open.html" class="${activePage === 'open' ? 'active' : ''}">📦 Open</a>
      <a href="${basePath}pages/inventory.html" class="${activePage === 'inventory' ? 'active' : ''}">🎁 Inventory</a>
      <a href="${basePath}pages/odds.html" class="${activePage === 'odds' ? 'active' : ''}">📊 Odds</a>
    </div>
    <div class="nav-right">
      <div class="key-counts">
        <div class="key-chip std">🔑 <span id="nav-std">${State.stdKeys}</span> Std</div>
        <div class="key-chip prem">🗝️ <span id="nav-prem">${State.premKeys}</span> Prem</div>
      </div>
      <div class="lld-badge">
        <span class="lld-icon">◈</span>
        <span id="nav-lld">${State.lld.toFixed(2)}</span>
        <span class="lld-label">LLD</span>
      </div>
      <div class="nav-username">${State.username}</div>
    </div>
  `;
  document.body.prepend(navbar);
}

function refreshNavbar() {
  const stdEl = document.getElementById('nav-std');
  const premEl = document.getElementById('nav-prem');
  const lldEl = document.getElementById('nav-lld');
  if (stdEl) stdEl.textContent = State.stdKeys;
  if (premEl) premEl.textContent = State.premKeys;
  if (lldEl) lldEl.textContent = State.lld.toFixed(2);
}

// ---- TOAST ----
function showToast(msg, type = '') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = '0.3s'; setTimeout(() => t.remove(), 320); }, 3200);
}

// ---- ITEM DATABASE ----
const ITEMS = {
  common: [
    { name: 'Basic Comb', value: 0.40, emoji: '🪮', img: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=200&q=80' },
    { name: 'Pocket Mirror', value: 0.60, emoji: '🪞', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Hair Clips Set', value: 0.80, emoji: '📎', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Scrunchie Pack', value: 1.00, emoji: '🎀', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Makeup Sponge Set', value: 1.00, emoji: '🟠', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Powder Puff', value: 0.70, emoji: '🫧', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Nail File Kit', value: 0.80, emoji: '💅', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=80' },
    { name: 'Wig Cap Set', value: 1.00, emoji: '👒', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Edge Brush', value: 1.00, emoji: '🪥', img: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=200&q=80' },
    { name: 'Lip Balm', value: 1.00, emoji: '💋', img: 'https://images.unsplash.com/photo-1599733589046-833b383e3ef6?w=200&q=80' },
    { name: 'Travel Cosmetic Bag', value: 1.20, emoji: '👜', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Face Cleansing Band', value: 1.00, emoji: '🩹', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Sleep Mask', value: 1.20, emoji: '😴', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Silicone Face Scrubber', value: 1.50, emoji: '✨', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Makeup Remover Cloth', value: 1.50, emoji: '🧻', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Looklist Branded Mirror', value: 1.50, emoji: '🪞', img: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=200&q=80' },
  ],
  silver: [
    { name: 'Brush Set', value: 3.00, emoji: '🖌️', img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=200&q=80' },
    { name: 'LED Makeup Mirror', value: 4.00, emoji: '💡', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Press On Nail Kit', value: 3.00, emoji: '💅', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=80' },
    { name: 'Satin Bonnet', value: 4.00, emoji: '👑', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Heatless Curl Set', value: 5.00, emoji: '🌀', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Lash Kit', value: 4.00, emoji: '👁️', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Mini Ring Light', value: 5.00, emoji: '💫', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Scalp Massager', value: 3.00, emoji: '🧠', img: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=200&q=80' },
    { name: 'Silk Pillowcase', value: 5.00, emoji: '🛏️', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Jade Roller', value: 4.00, emoji: '🪨', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Gua Sha Tool', value: 4.00, emoji: '💎', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Makeup Organiser Tray', value: 5.00, emoji: '🗂️', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Wig Stand', value: 5.00, emoji: '🪆', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Portable Brush Holder', value: 4.00, emoji: '🧴', img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=200&q=80' },
    { name: 'Looklist Credit', value: 2.00, emoji: '◈', isCredit: true, creditMin: 1, creditMax: 3, img: null },
  ],
  gold: [
    { name: 'Premium Brush Collection', value: 10.00, emoji: '✨', img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=200&q=80' },
    { name: 'Professional LED Vanity Mirror', value: 12.00, emoji: '🪞', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Luxury Cosmetic Storage Box', value: 15.00, emoji: '📦', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Electric Facial Brush', value: 10.00, emoji: '⚡', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Mini Cordless Nail Drill', value: 15.00, emoji: '🔩', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=80' },
    { name: 'Luxury Press On Nail Bundle', value: 12.00, emoji: '💎', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=80' },
    { name: 'Hair Extension Starter Set', value: 15.00, emoji: '💇', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Premium Silk Bonnet Set', value: 10.00, emoji: '👑', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Wireless Ring Light Stand', value: 15.00, emoji: '🔆', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Looklist Credit', value: 4.50, emoji: '◈', isCredit: true, creditMin: 4, creditMax: 5, img: null },
  ],
  diamond: [
    { name: 'High Quality Lace Front Wig', value: 60.00, emoji: '👸', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Luxury Beauty Hamper', value: 50.00, emoji: '🎀', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Professional Nail Kit', value: 60.00, emoji: '💅', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=80' },
    { name: 'Large Ring Light Kit', value: 50.00, emoji: '🔆', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Premium Influencer Makeup Case', value: 70.00, emoji: '💼', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80' },
    { name: 'Limited Edition Looklist Beauty Bundle', value: 100.00, emoji: '✨', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
    { name: 'Mystery Diamond Voucher', value: 100.00, emoji: '🎟️', isVoucher: true, img: null },
  ]
};

// Roll a single item
function rollRarity(chances) {
  const r = Math.random() * 100;
  let cumulative = 0;
  for (const [rarity, chance] of Object.entries(chances)) {
    cumulative += chance;
    if (r < cumulative) return rarity;
  }
  return 'common';
}

function pickItem(rarity) {
  const pool = ITEMS[rarity];
  const item = pool[Math.floor(Math.random() * pool.length)];
  const result = { ...item, rarity };
  if (item.isCredit) {
    result.value = +(item.creditMin + Math.random() * (item.creditMax - item.creditMin)).toFixed(2);
    result.name = `Looklist Credit £${result.value.toFixed(2)}`;
  }
  return result;
}

// Standard box: 6 items, guaranteed 3 common + 1 silver+
function openStandardBox() {
  const standardChances = { common: 70, silver: 24, gold: 5, diamond: 1 };
  const items = [];
  // Slot 1-3: guaranteed common
  for (let i = 0; i < 3; i++) items.push(pickItem('common'));
  // Slot 4: guaranteed silver or higher
  const silverPlusChances = { silver: 80, gold: 16.7, diamond: 3.3 };
  items.push(pickItem(rollRarity(silverPlusChances)));
  // Slot 5-6: open rolls
  for (let i = 0; i < 2; i++) items.push(pickItem(rollRarity(standardChances)));
  return items.sort(() => Math.random() - 0.5);
}

// Premium box: 6 items, guaranteed structure
function openPremiumBox() {
  const premChances = { common: 45, silver: 40, gold: 13, diamond: 2 };
  const items = [];
  // Slot 1-2: guaranteed common
  for (let i = 0; i < 2; i++) items.push(pickItem('common'));
  // Slot 3-4: guaranteed silver
  for (let i = 0; i < 2; i++) items.push(pickItem('silver'));
  // Slot 5: Silver/Gold
  items.push(pickItem(rollRarity({ silver: 60, gold: 35, diamond: 5 })));
  // Slot 6: Gold/Diamond
  items.push(pickItem(rollRarity({ gold: 80, diamond: 20 })));
  return items.sort(() => Math.random() - 0.5);
}

function getRarityColor(rarity) {
  const map = { common: '#8a9bb5', silver: '#b8c8d8', gold: '#c9a96e', diamond: '#7ee8fa' };
  return map[rarity] || '#8a9bb5';
}

function getRarityClass(rarity) {
  return `rb-${rarity}`;
}

// Save pending open to sessionStorage for the open page
function setPendingOpen(type) {
  sessionStorage.setItem('lk_pending_open', type);
}
