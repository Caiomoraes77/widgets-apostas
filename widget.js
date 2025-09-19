/* widgets-apostas – banner no estilo do seu HTML, dinâmico com disclaimer */
(function(){
  if (window.__bet_footer_loaded) return; window.__bet_footer_loaded = true;

  // ---- Dados das casas ----
  const BRANDS = [
    { id:"OP1", nome:"EstrelaBet", logo:"https://i.postimg.cc/sx9Md8nC/f12bet-1.png",
      cta:"Aposte Agora", link:"https://go.terrordasbets.com/estrelabet",
      chips:["Depósito Mínimo R$1","Promoções Incríveis","Rodadas Grátis"],
      disc:"Autorização SPA/MF nº 320/2025: Publicidade. Aposte com responsabilidade. +18." },
    { id:"OP2", nome:"F12bet", logo:"https://i.postimg.cc/MZyMQMz3/f12bet.png",
      cta:"Aposte Agora", link:"https://go.terrordasbets.com/f12bet",
      chips:["Depósito Mínimo R$2","Melhores Cotações","Freebets"],
      disc:"Autorização SPA/MF nº 0010/2024: Publicidade. Aposte com responsabilidade. +18." },
    { id:"OP3", nome:"Blaze", logo:"https://i.postimg.cc/Wb8d5BFM/blaze.png",
      cta:"Aposte Agora", link:"https://go.terrordasbets.com/blaze",
      chips:["Jogos Exclusivos","Clube VIP","Rodadas Grátis"],
      disc:"Autorização SPA/MF nº 471/2025: Publicidade. Aposte com responsabilidade. +18." },
    { id:"OP4", nome:"BetMGM", logo:"https://i.postimg.cc/15sgcmtm/bet-mgm.png",
      cta:"Aposte Agora", link:"https://go.terrordasbets.com/BetMGM",
      chips:["Variedade de Mercados","Melhores Odds","Bolão Grátis"],
      disc:"Autorização SPA/MF nº 2.098/2024: Publicidade. Aposte com responsabilidade. +18." },
    { id:"OP5", nome:"Sorte Online", logo:"https://i.postimg.cc/0yNbFVDh/sorte-online.png",
      cta:"Participar do Bolão", link:"https://go.terrordasbets.com/sorte-online",
      chips:["Raspabetz","Cashback até 25%","Roleta da Sorte"],
      disc:"Autorização SPA/MF nº 259/2025 (Licença nº 0040): Publicidade. Aposte com responsabilidade. +18." }
  ];

  const qs = new URLSearchParams(location.search);
  const SUBID = qs.get('subid');
  const FORCE = qs.get('op');
  const last = sessionStorage.getItem('bf_last') || null;

  function pickOne(list, avoid){ const pool = avoid ? list.filter(x=>x.id!==avoid) : list; return pool[Math.floor(Math.random()*pool.length)]; }
  function withSubid(url){ try{ const u=new URL(url); if(SUBID) u.searchParams.set('subid',SUBID); return u.toString(); }catch{ return url; } }

  const brand = (FORCE && BRANDS.find(b=>b.id===FORCE)) || pickOne(BRANDS,last);
  sessionStorage.setItem('bf_last', brand.id);

  // ---- CSS (idêntico ao seu HTML) ----
  const css = `
  .sorte-footer{position:fixed;bottom:20px;left:20px;right:20px;z-index:9999;display:flex;justify-content:space-between;align-items:center;gap:16px;background:linear-gradient(90deg,rgba(10,88,160,.98),rgba(7,128,100,.95));color:#fff;padding:16px 20px;border-radius:16px;box-shadow:0 8px 28px rgba(0,0,0,.35);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial;max-width:1100px;margin:0 auto;text-decoration:none}
  .sorte-footer__close{position:absolute;top:8px;right:8px;background:rgba(255,255,255,.2);border:none;color:#fff;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s;z-index:10000}
  .sorte-footer__close:hover{background:rgba(255,255,255,.3)}
  .sorte-footer__left{display:flex;gap:14px;align-items:flex-start;flex:1}
  .sorte-footer__logo img{height:56px;width:auto;background:#fff;padding:4px;border-radius:8px}
  .sorte-footer__content{flex:1}
  .sorte-footer__headline{font-size:16px;font-weight:700;margin:0 0 6px 0}
  .sorte-footer__sub{font-size:13px;opacity:.95;margin:0 0 8px 0}
  .sorte-footer__pool-list{display:flex;gap:8px;flex-wrap:wrap;list-style:none;margin:0;padding:0;font-size:12px}
  .sorte-footer__pool-list li{background:rgba(255,255,255,.15);padding:6px 10px;border-radius:999px}
  .badge-hot{background:linear-gradient(90deg,#ffb86b,#ff6b6b);color:#111;font-weight:700;padding:2px 6px;border-radius:999px;font-size:11px;margin-right:4px}
  .sorte-footer__right{display:flex;align-items:center;justify-content:center}
  .sorte-btn{display:inline-block;background:#fff;color:#072b4a;padding:12px 20px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;box-shadow:0 6px 18px rgba(0,0,0,.25);animation:pulse 2.4s infinite ease-in-out}
  @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}
  .sorte-footer__disc{margin:10px 0 0;font-size:11px;opacity:.85}
  @media (max-width:720px){
    .sorte-footer{flex-direction:column;text-align:center;left:8px;right:8px;bottom:8px;padding:8px;gap:6px;border-radius:12px}
    .sorte-footer__left{flex-direction:column;align-items:center;text-align:center;gap:6px}
    .sorte-footer__logo img{height:40px}
    .sorte-footer__headline{font-size:13px;margin:0 0 4px 0}
    .sorte-footer__sub{font-size:11px;margin:0 0 6px 0}
    .sorte-footer__pool-list{justify-content:center;gap:6px;font-size:11px}
    .sorte-footer__pool-list li{padding:4px 8px}
    .sorte-footer__right{margin-top:6px;width:100%}
    .sorte-btn{width:100%;text-align:center;padding:10px 12px;font-size:14px}
    .sorte-footer__disc{font-size:10px}
  }
  @media (prefers-reduced-motion:reduce){.sorte-btn{animation:none!important}}
  `;

  // ---- HTML a ser injetado ----
  const html = `
  <a id="bet-footer" class="sorte-footer" href="${withSubid(brand.link)}" target="_blank" rel="noopener noreferrer nofollow sponsored" aria-label="Aposte agora com ${brand.nome}">
    <button class="sorte-footer__close" type="button" aria-label="Fechar banner">×</button>
    <div class="sorte-footer__left">
      <div class="sorte-footer__logo"><img src="${brand.logo}" alt="${brand.nome}"></div>
      <div class="sorte-footer__content">
        <p class="sorte-footer__headline">🎉 Aumente suas Chances — <strong>${brand.nome}</strong>!</p>
        <p class="sorte-footer__sub">Mais bilhetes, mais números e muito mais chances de ganhar. <strong>Vagas limitadas!</strong></p>
        <ul class="sorte-footer__pool-list">
          ${brand.chips.map((t,i)=>`<li>${i===0?'<span class="badge-hot">🔥 Mais Procurado</span> ':''}${t}</li>`).join("")}
        </ul>
        <p class="sorte-footer__disc">${brand.disc}</p>
      </div>
    </div>
    <div class="sorte-footer__right"><span class="sorte-btn">👉 ${brand.cta || 'Aposte Agora'}</span></div>
  </a>`;

  // ---- Injeta na página ----
  const style = document.createElement('style'); style.textContent = css;
  document.head.appendChild(style);
  const container = document.createElement('div'); container.innerHTML = html;
  document.body.appendChild(container.firstElementChild);

  // Botão fechar
  document.querySelector('.sorte-footer__close').addEventListener('click', (e)=>{
    e.preventDefault(); e.stopPropagation();
    document.getElementById('bet-footer').style.display = 'none';
  });

  // Empurra o conteúdo da página para não ficar coberto (opcional)
  const pad = document.createElement('style');
  pad.textContent = `body{padding-bottom:105px}@media(max-width:720px){body{padding-bottom:92px}}`;
  document.head.appendChild(pad);
})();
