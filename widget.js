/* widgets-apostas v1.0 – sticky footer rotativo (Apostas Esportivas) */
(function(){
  if (window.__apw_loaded) return; window.__apw_loaded = true;

  // ---- Config: marcas (tabela do cliente) ----
  const BRANDS = [
    { id:"OP1", nome:"EstrelaBet", logo:"https://i.postimg.cc/sx9Md8nC/f12bet-1.png",
      cta:"Aposte Agora", link:"https://go.terrordasbets.com/estrelabet", cor:"#FFB800", peso:20,
      chips:["Depósito Mínimo R$1","Promoções Incríveis","Rodadas Grátis"],
      disc:"Autorização SPA/MF nº 320/2025: Publicidade. Aposte com responsabilidade. +18." },
    { id:"OP2", nome:"F12bet", logo:"https://i.postimg.cc/MZyMQMz3/f12bet.png",
      cta:"Aposte Agora", link:"https://go.terrordasbets.com/f12bet", cor:"#A7F432", peso:20,
      chips:["Depósito Mínimo R$2","Melhores Cotações","Freebets"],
      disc:"Autorização SPA/MF nº 0010/2024: Publicidade. Aposte com responsabilidade. +18." },
    { id:"OP3", nome:"Blaze", logo:"https://i.postimg.cc/Wb8d5BFM/blaze.png",
      cta:"Aposte Agora", link:"https://go.terrordasbets.com/blaze", cor:"#FF0D0D", peso:20,
      chips:["Jogos Exclusivos","Clube VIP","Rodadas Grátis"],
      disc:"Autorização SPA/MF nº 471/2025: Publicidade. Aposte com responsabilidade. +18." },
    { id:"OP4", nome:"BetMGM", logo:"https://i.postimg.cc/15sgcmtm/bet-mgm.png",
      cta:"Aposte Agora", link:"https://go.terrordasbets.com/BetMGM", cor:"#B19661", peso:20,
      chips:["Variedade de Mercados","Melhores Odds","Bolão Grátis"],
      disc:"Autorização SPA/MF nº 2.098/2024: Publicidade. Aposte com responsabilidade. +18." },
    { id:"OP5", nome:"Sorte Online", logo:"https://i.postimg.cc/0yNbFVDh/sorte-online.png",
      cta:"Aposte Agora", link:"https://go.terrordasbets.com/sorte-online", cor:"#BD13BA", peso:20,
      chips:["Raspabetz","Cashback até 25%","Roleta da Sorte"],
      disc:"Autorização SPA/MF nº 259/2025 (Licença nº 0040): Publicidade. Aposte com responsabilidade. +18." }
  ];

  // ---- Helpers ----
  const qs = new URLSearchParams(location.search);
  const SUBID = qs.get('subid');
  const FORCE = qs.get('op');             // OP1..OP5
  const $ = (s, el=document) => el.querySelector(s);
  const pad = () => {
    // evita cobrir conteúdo do site
    document.documentElement.style.scrollPaddingBottom = '120px';
    document.body.style.paddingBottom = (innerWidth <= 560 ? '96px' : '110px');
  };
  const pickWeighted = list => {
    const tot = list.reduce((a,b)=>a+(b.peso||0),0);
    let r = Math.random()*tot;
    for (const it of list){ r -= (it.peso||0); if (r<=0) return it; }
    return list[0];
  };
  const shade = (hex, amt) => {
    hex = (hex||'#222').replace('#','');
    let [r,g,b] = hex.match(/.{1,2}/g).map(x=>parseInt(x,16));
    r = Math.max(0,Math.min(255, r + Math.round(255*amt/100)));
    g = Math.max(0,Math.min(255, g + Math.round(255*amt/100)));
    b = Math.max(0,Math.min(255, b + Math.round(255*amt/100)));
    return `#${[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`;
  };

  // ---- CSS isolado (prefixo apw-) ----
  const css = `
  .apw-wrap{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483647;color:#fff;
    font:15px/1.45 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;border-radius:20px;
    box-shadow:0 16px 40px rgba(0,0,0,.22);padding:14px;background:#0b5b7a;
    background-image:linear-gradient(135deg,#0b5b7a 0%,#0f7a5e 60%,#119c48 100%);}
  .apw-inner{display:grid;align-items:center;gap:14px;grid-template-columns:auto 1fr auto}
  .apw-logo img{width:72px;height:72px;object-fit:contain;background:#fff;border-radius:16px;padding:10px;box-shadow:0 4px 16px rgba(0,0,0,.15)}
  .apw-title{margin:0 0 6px;font-size:18px}
  .apw-sub{margin:0 0 10px;color:#e7f6ffcc}
  .apw-chips{display:flex;flex-wrap:wrap;gap:8px}
  .apw-chip{background:#ffffff1f;color:#fff;padding:8px 12px;border-radius:999px;font-weight:600;font-size:13px;backdrop-filter:blur(4px)}
  .apw-cta{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;background:#fff;color:#0f172a;
    font-weight:800;padding:14px 18px;border-radius:14px;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.18);
    transition:transform .06s ease,filter .06s ease}
  .apw-cta:hover{filter:brightness(.98)} .apw-cta:active{transform:translateY(1px)}
  .apw-disc{margin:10px 0 0;font-size:12px;opacity:.9}
  .apw-close{position:absolute;top:10px;right:12px;width:28px;height:28px;border:0;border-radius:999px;background:#ffffff2b;color:#fff;cursor:pointer;font-size:16px;display:grid;place-items:center}
  .apw-close:hover{background:#ffffff3f}
  @media (max-width:860px){
    .apw-inner{grid-template-columns:56px 1fr;grid-template-areas:"logo cta" "logo copy";}
    .apw-logo{grid-area:logo}.apw-copy{grid-area:copy}
    .apw-cta{grid-area:cta;justify-self:end;font-size:14px;padding:12px 14px}
    .apw-logo img{width:56px;height:56px}.apw-title{font-size:16px}.apw-chip{font-size:12px;padding:6px 10px}
  }
  @media (max-width:560px){
    .apw-wrap{left:8px;right:8px;bottom:8px;padding:12px;border-radius:14px}
    .apw-inner{grid-template-columns:44px 1fr;gap:10px}
    .apw-logo img{width:44px;height:44px;border-radius:10px;padding:6px}
    .apw-title{font-size:15px}.apw-cta{padding:10px 12px;font-size:13.5px}
    .apw-disc{display:none}
  }`;

  // ---- HTML container ----
  const wrap = document.createElement('div');
  wrap.id = 'apw-sticky';
  wrap.className = 'apw-wrap';
  wrap.innerHTML = `
    <button class="apw-close" title="Fechar" aria-label="Fechar">×</button>
    <div class="apw-inner">
      <div class="apw-logo"><img id="apw-logo" alt="" loading="lazy"/></div>
      <div class="apw-copy">
        <h3 class="apw-title" id="apw-title">⚽ Aumente suas Chances nas Apostas Esportivas!</h3>
        <p class="apw-sub" id="apw-sub">Mais mercados, melhores odds e bônus selecionados.</p>
        <div class="apw-chips" id="apw-chips" role="list"></div>
        <p class="apw-disc" id="apw-disc"></p>
      </div>
      <a class="apw-cta" id="apw-cta" href="#" target="_blank" rel="sponsored nofollow">Aposte Agora</a>
    </div>`;
  const style = document.createElement('style'); style.textContent = css;

  // ---- Render ----
  function render(op){
    pad();
    wrap.style.backgroundImage = `linear-gradient(135deg, ${shade(op.cor,-30)} 0%, ${shade(op.cor,-10)} 55%, ${op.cor} 100%)`;
    const logo = $('#apw-logo', wrap); logo.src = op.logo; logo.alt = op.nome;
    $('#apw-title', wrap).innerHTML = `⚽ Aumente suas Chances — <strong>${op.nome}</strong>`;
    $('#apw-sub', wrap).textContent = 'Mais mercados, melhores odds e bônus selecionados.';
    const chips = $('#apw-chips', wrap); chips.innerHTML = '';
    (op.chips||[]).slice(0,5).forEach(t=>{
      const el = document.createElement('span'); el.className='apw-chip'; el.role='listitem'; el.textContent = t; chips.appendChild(el);
    });
    const a = $('#apw-cta', wrap); a.textContent = op.cta || 'Aposte Agora';
    try{ const u = new URL(op.link); if(SUBID) u.searchParams.set('subid', SUBID); a.href = u.toString(); }
    catch{ a.href = op.link; }
    $('#apw-disc', wrap).textContent = op.disc || '';
  }

  // ---- Fechar e lembrar por 24h ----
  function setupClose(){
    const key='apw_closed_until';
    const now=Date.now();
    const until=Number(localStorage.getItem(key)||0);
    if(until>now){ wrap.style.display='none'; return true; }
    $('.apw-close', wrap).addEventListener('click',()=>{
      wrap.style.display='none';
      localStorage.setItem(key, String(now + 24*60*60*1000));
    });
    return false;
  }

  // ---- Montagem ----
  document.head.appendChild(style);
  document.body.appendChild(wrap);
  if (setupClose()) return;

  let current = (FORCE && BRANDS.find(b=>b.id===FORCE)) || pickWeighted(BRANDS);
  render(current);

  // Pausa no hover + rotação a cada 12s
  let paused=false;
  wrap.addEventListener('mouseenter', ()=>paused=true);
  wrap.addEventListener('mouseleave', ()=>paused=false);
  setInterval(()=>{
    if(paused) return;
    let next = pickWeighted(BRANDS);
    if(next.id===current.id) next = pickWeighted(BRANDS);
    current = next; render(current);
  }, 12000);
})();
