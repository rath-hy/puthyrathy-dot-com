/* =========================================================
   Floating site menu for full-screen doodle pages.
   Include from any page under doodles/ with a relative path:
     <script src="../menu.js"></script>
   Links resolve relative to this file, so it works at any depth.
   ========================================================= */
(() => {
  const here = document.currentScript.src;
  const site = new URL('../', here);
  const doodles = new URL('./', here);

  const links = [
    ['Home', new URL('index.html', site)],
    ["Lyricist's Lexicon", new URL('lyricists-lexicon.html', site)],
    ['Writing', new URL('writing.html', site)],
    ['Postcards', new URL('postcards.html', site)],
    ['Doodles', new URL('index.html', doodles)],
  ];

  const path = location.pathname.replace(/index\.html$/, '');
  const onDoodlesIndex = path === doodles.pathname;

  const style = document.createElement('style');
  style.textContent = `
    .dm-toggle {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 9999;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(20, 20, 20, 0.72);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      color: #F5F0E8;
      font-size: 1.1rem;
      line-height: 1;
      cursor: pointer;
      padding: 0;
    }
    .dm-toggle:hover { border-color: #D4AF7A; color: #D4AF7A; }
    .dm-panel {
      position: fixed;
      top: 64px;
      right: 16px;
      z-index: 9999;
      min-width: 200px;
      display: none;
      margin: 0;
      padding: 8px 0;
      list-style: none;
      background: #1c1c1c;
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-weight: 300;
    }
    .dm-panel.open { display: block; }
    .dm-panel a {
      display: block;
      padding: 8px 18px;
      color: #a8a39a;
      font-size: 0.95rem;
      text-decoration: none;
    }
    .dm-panel a:hover { color: #D4AF7A; }
    .dm-panel a.active { color: #F5F0E8; font-weight: 600; }
  `;
  document.head.appendChild(style);

  const toggle = document.createElement('button');
  toggle.className = 'dm-toggle';
  toggle.setAttribute('aria-label', 'Site menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';

  const panel = document.createElement('ul');
  panel.className = 'dm-panel';
  for (const [label, url] of links) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url.href;
    a.textContent = label;
    if (label === 'Doodles' && onDoodlesIndex) a.className = 'active';
    li.appendChild(a);
    panel.appendChild(li);
  }

  const setOpen = (open) => {
    panel.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!panel.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  document.body.append(toggle, panel);
})();
