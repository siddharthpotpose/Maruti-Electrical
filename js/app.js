/* ============================================================
   Maruti Electrical - app.js (shared: header, footer, cart, WhatsApp, lightbox)
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const inr = n => '\u20B9' + Number(n).toLocaleString('en-IN');
const img = n => 'images/products/' + n + '.jpg';
const getP = id => PRODUCTS.find(p => p.id === id);
const off = p => Math.round((1 - p.price / p.mrp) * 100);

/* ---------- Cart ---------- */
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem('me_cart')) || []; } catch (e) { return []; } },
  save(c) { try { localStorage.setItem('me_cart', JSON.stringify(c)); } catch (e) {} Cart.badge(); },
  add(id, q = 1) {
    const c = Cart.get(), i = c.find(x => x.id === id);
    i ? i.qty = Math.min(i.qty + q, 99) : c.push({ id, qty: q });
    Cart.save(c);
  },
  set(id, q) { let c = Cart.get(); if (q <= 0) c = c.filter(x => x.id !== id); else c.find(x => x.id === id).qty = Math.min(q, 99); Cart.save(c); },
  clear() { Cart.save([]); },
  count() { return Cart.get().reduce((a, b) => a + b.qty, 0); },
  lines() { return Cart.get().map(i => ({ ...i, p: getP(i.id) })).filter(i => i.p); },
  totals() {
    const l = Cart.lines(), sub = l.reduce((a, i) => a + i.p.price * i.qty, 0), mrp = l.reduce((a, i) => a + i.p.mrp * i.qty, 0);
    const ship = sub === 0 || sub >= SITE.freeDeliveryAbove ? 0 : SITE.deliveryFee;
    return { sub, mrp, save: mrp - sub, ship, total: sub + ship };
  },
  badge() { $$('.cart-count').forEach(b => { const n = Cart.count(); b.textContent = n; b.classList.toggle('d-none', !n); b.classList.remove('bump'); void b.offsetWidth; if (n) b.classList.add('bump'); }); }
};

/* ---------- Toast ---------- */
function toast(msg, icon = 'fa-circle-check') {
  let w = $('#toastWrap'); if (!w) { w = document.createElement('div'); w.id = 'toastWrap'; document.body.appendChild(w); }
  const t = document.createElement('div'); t.className = 'me-toast'; t.innerHTML = `<i class="fa-solid ${icon}"></i><span>${msg}</span>`;
  w.appendChild(t); requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2200);
}

/* ---------- Product card ---------- */
function stars(r) { let s = ''; for (let i = 1; i <= 5; i++) s += `<i class="fa-${r >= i ? 'solid' : (r > i - 1 ? 'solid' : 'regular')} fa-star${r >= i ? '' : (r > i - 1 ? '-half-stroke' : '')}"></i>`; return s; }
function card(p) {
  return `<div class="col-6 col-md-4 col-lg-3"><article class="pcard">
    <a href="product.html?id=${p.id}" class="pimg"><img src="${img(p.imgs[0])}" alt="${p.name}" loading="lazy">
      <span class="pdisc">${off(p)}% OFF</span>${p.badge ? `<span class="pbadge">${p.badge}</span>` : ''}</a>
    <div class="pbody">
      <a href="product.html?id=${p.id}" class="pname">${p.name}</a>
      <div class="prate"><span class="rbox">${p.rating} <i class="fa-solid fa-star"></i></span><small>(${p.reviews})</small></div>
      <div class="pprice"><b>${inr(p.price)}</b><s>${inr(p.mrp)}</s></div>
      <button class="btn btn-flame btn-sm w-100 add-btn" data-id="${p.id}"><i class="fa-solid fa-cart-plus me-1"></i>Add to Cart</button>
    </div></article></div>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('.add-btn'); if (!b) return;
  Cart.add(b.dataset.id); toast('Added to cart'); b.classList.add('added');
  const o = b.innerHTML; b.innerHTML = '<i class="fa-solid fa-check me-1"></i>Added'; setTimeout(() => { b.innerHTML = o; b.classList.remove('added'); }, 1200);
});

/* ---------- Header / Footer ---------- */
const NAV = [['index.html', 'Home'], ['shop.html', 'Shop'], ['about.html', 'About'], ['contact.html', 'Contact']];
function buildChrome() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const links = NAV.map(([h, t]) => `<a class="nav-link ${h === here ? 'active' : ''}" href="${h}">${t}</a>`).join('');
  const wa = `https://wa.me/${SITE.whatsapp}`;
  $('#site-header').innerHTML = `
  <div class="topbar"><div class="container d-flex justify-content-between align-items-center">
    <span><i class="fa-solid fa-bolt me-1"></i>Genuine electrical products &bull; Free delivery above ${inr(SITE.freeDeliveryAbove)}</span>
    <a href="${wa}" target="_blank" rel="noopener" class="d-none d-md-inline"><i class="fa-brands fa-whatsapp me-1"></i>${SITE.phoneDisplay}</a></div></div>
  <header class="mainbar"><div class="container d-flex align-items-center gap-2 gap-md-4">
    <button class="icon-btn d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#menu" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
    <a href="index.html" class="brand"><img src="images/logo.jpg" alt="Maruti Electrical logo"><span class="d-none d-sm-block">Maruti<small>Electrical</small></span></a>
    <nav class="nav d-none d-lg-flex ms-3">${links}</nav>
    <form class="search ms-auto" id="searchForm" role="search"><i class="fa-solid fa-magnifying-glass"></i><input id="q" type="search" placeholder="Search switches, lights..." autocomplete="off" aria-label="Search"><div id="sugg"></div></form>
    <a href="cart.html" class="icon-btn cart-btn" aria-label="Cart"><i class="fa-solid fa-cart-shopping"></i><span class="cart-count d-none">0</span></a>
  </div></header>
  <div class="offcanvas offcanvas-start" id="menu" tabindex="-1"><div class="offcanvas-header"><img src="images/logo.jpg" height="48" alt=""><button class="btn-close" data-bs-dismiss="offcanvas"></button></div>
    <div class="offcanvas-body d-flex flex-column">${links.replaceAll('nav-link', 'm-link')}
    <div class="m-cats"><p>Categories</p>${CATEGORIES.map(c => `<a href="shop.html?cat=${c.id}"><i class="fa-solid ${c.icon}"></i>${c.name}</a>`).join('')}</div>
    <a class="btn btn-wa mt-auto" href="${wa}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp me-2"></i>Chat on WhatsApp</a></div></div>`;
  $('#site-footer').innerHTML = `
  <footer class="footer"><div class="container"><div class="row g-4">
    <div class="col-lg-4"><img src="images/logo.jpg" class="flogo" alt="Maruti Electrical"><p class="mt-3">Your trusted shop for modular switches, sockets and LED lighting. Quality products, honest prices, quick WhatsApp ordering.</p></div>
    <div class="col-6 col-lg-2"><h6>Quick Links</h6>${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="cart.html">My Cart</a></div>
    <div class="col-6 col-lg-3"><h6>Categories</h6>${CATEGORIES.map(c => `<a href="shop.html?cat=${c.id}">${c.name}</a>`).join('')}</div>
    <div class="col-lg-3"><h6>Order on WhatsApp</h6><a href="${wa}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp me-2"></i>${SITE.phoneDisplay}</a><a href="tel:+${SITE.whatsapp}"><i class="fa-solid fa-phone me-2"></i>Call us</a></div>
  </div><div class="copy">&copy; ${new Date().getFullYear()} Maruti Electrical. All rights reserved.</div></div></footer>
  <a href="${wa}?text=${encodeURIComponent('Hello Maruti Electrical, I want to enquire about your products.')}" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
  <nav class="bottom-nav d-lg-none">
    <a href="index.html" class="${here === 'index.html' ? 'on' : ''}"><i class="fa-solid fa-house"></i>Home</a>
    <a href="shop.html" class="${here === 'shop.html' ? 'on' : ''}"><i class="fa-solid fa-store"></i>Shop</a>
    <a href="cart.html" class="${here === 'cart.html' ? 'on' : ''}"><i class="fa-solid fa-cart-shopping"></i>Cart<span class="cart-count d-none">0</span></a>
    <a href="contact.html" class="${here === 'contact.html' ? 'on' : ''}"><i class="fa-solid fa-headset"></i>Help</a></nav>`;
  // search + suggestions
  const f = $('#searchForm'), q = $('#q'), sg = $('#sugg');
  f.addEventListener('submit', e => { e.preventDefault(); location.href = 'shop.html?q=' + encodeURIComponent(q.value.trim()); });
  q.addEventListener('input', () => {
    const v = q.value.trim().toLowerCase(); if (v.length < 2) { sg.innerHTML = ''; return; }
    const r = PRODUCTS.filter(p => p.name.toLowerCase().includes(v)).slice(0, 5);
    sg.innerHTML = r.map(p => `<a href="product.html?id=${p.id}"><img src="${img(p.imgs[0])}" alt=""><span>${p.name}<b>${inr(p.price)}</b></span></a>`).join('') || '<em>No products found</em>';
  });
  document.addEventListener('click', e => { if (!f.contains(e.target)) sg.innerHTML = ''; });
  Cart.badge();
}

/* ---------- WhatsApp order ---------- */
function waOrder(cust) {
  const l = Cart.lines(), t = Cart.totals();
  let m = `*New Order - ${SITE.name}*\n\n`;
  if (cust) m += `*Name:* ${cust.name}\n*Mobile:* ${cust.phone}\n*Address:* ${cust.address}\n${cust.note ? '*Note:* ' + cust.note + '\n' : ''}\n`;
  m += `*Order Items*\n`;
  l.forEach((i, n) => { m += `${n + 1}. ${i.p.name}\n    Qty: ${i.qty} x ${inr(i.p.price)} = ${inr(i.p.price * i.qty)}\n`; });
  m += `\nSubtotal: ${inr(t.sub)}\nDelivery: ${t.ship ? inr(t.ship) : 'FREE'}\n*Total: ${inr(t.total)}*\n\nPlease confirm my order. Thank you!`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(m)}`;
}

/* ---------- Lightbox with zoom in/out ---------- */
const Lightbox = (() => {
  let el, im, list = [], idx = 0, s = 1, x = 0, y = 0; const ptr = new Map(); let d0 = 0, s0 = 1, drag = null, lastTap = 0;
  const apply = () => { im.style.transform = `translate(${x}px,${y}px) scale(${s})`; im.style.cursor = s > 1 ? 'grab' : 'zoom-in'; $('#lbPct', el).textContent = Math.round(s * 100) + '%'; };
  const zoom = n => { s = Math.min(5, Math.max(1, n)); if (s === 1) { x = 0; y = 0; } apply(); };
  const show = i => { idx = (i + list.length) % list.length; im.src = list[idx]; s = 1; x = y = 0; apply(); $('#lbCount', el).textContent = (idx + 1) + ' / ' + list.length; };
  const close = () => { el.classList.remove('open'); document.body.classList.remove('lb-lock'); };
  function build() {
    el = document.createElement('div'); el.id = 'lightbox';
    el.innerHTML = `<div class="lb-bar"><span id="lbCount"></span><div><button data-a="out" aria-label="Zoom out"><i class="fa-solid fa-magnifying-glass-minus"></i></button><span id="lbPct">100%</span><button data-a="in" aria-label="Zoom in"><i class="fa-solid fa-magnifying-glass-plus"></i></button><button data-a="reset" aria-label="Reset"><i class="fa-solid fa-expand"></i></button><button data-a="close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button></div></div>
      <button class="lb-nav prev" data-a="prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button><div class="lb-stage"><img id="lbImg" alt="" draggable="false"></div><button class="lb-nav next" data-a="next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
      <p class="lb-hint">Scroll / pinch to zoom &bull; drag to move &bull; double-tap to zoom</p>`;
    document.body.appendChild(el); im = $('#lbImg', el);
    el.addEventListener('click', e => { const a = e.target.closest('[data-a]'); if (a) { ({ in: () => zoom(s + .5), out: () => zoom(s - .5), reset: () => zoom(1), close, prev: () => show(idx - 1), next: () => show(idx + 1) })[a.dataset.a](); } else if (e.target.classList.contains('lb-stage')) { const r = im.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } });
    el.addEventListener('wheel', e => { e.preventDefault(); zoom(s + (e.deltaY < 0 ? .3 : -.3)); }, { passive: false });
    const st = $('.lb-stage', el);
    st.addEventListener('pointerdown', e => { st.setPointerCapture(e.pointerId); ptr.set(e.pointerId, e); if (ptr.size === 2) { const [a, b] = [...ptr.values()]; d0 = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); s0 = s; } else { drag = { x: e.clientX - x, y: e.clientY - y, sx: e.clientX }; const n = Date.now(); if (n - lastTap < 300 && e.target === im) zoom(s > 1 ? 1 : 2.5); lastTap = n; } });
    st.addEventListener('pointermove', e => { if (!ptr.has(e.pointerId)) return; ptr.set(e.pointerId, e); if (ptr.size === 2) { const [a, b] = [...ptr.values()]; zoom(s0 * Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) / d0); } else if (drag && s > 1) { x = e.clientX - drag.x; y = e.clientY - drag.y; apply(); } });
    const up = e => { ptr.delete(e.pointerId); if (drag && s === 1 && ptr.size === 0 && e.type === 'pointerup') { const dx = e.clientX - drag.sx; if (Math.abs(dx) > 60) show(idx + (dx < 0 ? 1 : -1)); } if (!ptr.size) drag = null; };
    st.addEventListener('pointerup', up); st.addEventListener('pointercancel', up);
    document.addEventListener('keydown', e => { if (!el.classList.contains('open')) return; ({ Escape: close, ArrowLeft: () => show(idx - 1), ArrowRight: () => show(idx + 1), '+': () => zoom(s + .5), '=': () => zoom(s + .5), '-': () => zoom(s - .5) })[e.key]?.(); });
  }
  return { open(l, i = 0) { if (!el) build(); list = l; show(i); el.classList.add('open'); document.body.classList.add('lb-lock'); } };
})();

document.addEventListener('DOMContentLoaded', () => {
  buildChrome();
  if (window.AOS) AOS.init({ duration: 700, once: true, offset: 40, easing: 'ease-out-cubic' });
  // header shadow on scroll
  const hb = $('.mainbar'); const onS = () => hb.classList.toggle('scrolled', scrollY > 10); onS(); addEventListener('scroll', onS, { passive: true });
});
