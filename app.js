const PRODUCTS = [
  { id:1, name:"Leather Tote Bag",    emoji:"👜", price:3499, original:4999, badge:"new",  category:"bags",    desc:"Hand-stitched full-grain leather with brass hardware." },
  { id:2, name:"Silk Blend Shirt",    emoji:"👔", price:1899, original:2499, badge:"sale", category:"fashion", desc:"Luxuriously soft silk-cotton blend, relaxed fit." },
  { id:3, name:"Ceramic Diffuser",    emoji:"🕯️", price:1299, original:null, badge:"hot",  category:"home",    desc:"Hand-thrown ceramic with 3 essential oil blends." },
  { id:4, name:"Radiance Serum",      emoji:"✨", price:2199, original:2799, badge:"sale", category:"beauty",  desc:"Triple-active vitamin C with hyaluronic acid." },
  { id:5, name:"Canvas Weekender",    emoji:"🎒", price:4299, original:5499, badge:"new",  category:"bags",    desc:"Waxed canvas with full-grain leather trim." },
  { id:6, name:"Linen Co-ord Set",    emoji:"👗", price:3199, original:null, badge:null,   category:"fashion", desc:"Stone-washed linen blend, effortlessly elegant." },
  { id:7, name:"Minimalist Clock",    emoji:"🕐", price:1599, original:1999, badge:"sale", category:"home",    desc:"Brushed brass hands on matte ceramic face." },
  { id:8, name:"Rose Quartz Roller",  emoji:"💎", price:899,  original:1199, badge:"hot",  category:"beauty",  desc:"Genuine rose quartz with 18K gold-plated handle." },
];

function getCart() { try { return JSON.parse(localStorage.getItem('nova_cart')) || []; } catch(e) { return []; } }
function saveCart(c) { localStorage.setItem('nova_cart', JSON.stringify(c)); }

function addToCart(id, qty=1) {
  const c = getCart();
  const ex = c.find(i=>i.id===id);
  if (ex) ex.qty += qty;
  else { const p = PRODUCTS.find(p=>p.id===id); if(p) c.push({...p, qty}); }
  saveCart(c);
  updateCartBadge();
  showToast('Added to cart! 🛒');
}

function removeFromCart(id) {
  saveCart(getCart().filter(i=>i.id!==id));
  updateCartBadge();
}

function setQty(id, qty) {
  if (qty < 1) { removeFromCart(id); return; }
  const c = getCart();
  const ex = c.find(i=>i.id===id);
  if (ex) ex.qty = qty;
  saveCart(c);
  updateCartBadge();
}

function cartCount() { return getCart().reduce((s,i)=>s+i.qty,0); }
function cartSubtotal() { return getCart().reduce((s,i)=>s+i.price*i.qty,0); }

function updateCartBadge() {
  const el = document.getElementById('cart-badge');
  if (!el) return;
  const c = cartCount();
  el.textContent = c > 0 ? `🛒 Cart (${c})` : '🛒 Cart';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._tt);
  window._tt = setTimeout(()=>t.classList.remove('show'), 2500);
}

function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }

document.addEventListener('DOMContentLoaded', updateCartBadge);
