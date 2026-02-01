<!-- widgets-apostas v1.5 – SOMENTE BETMGM -->
<script>
(function(){
  if (window.__bet_footer_loaded) return;
  window.__bet_footer_loaded = true;

  const BRAND = {
    id: "BETMGM",
    nome: "BetMGM",
    logo: "https://i.postimg.cc/15sgcmtm/bet-mgm.png",
    cta: "Aposte Agora",
    link: "https://go.terrordasbets.com/BetMGM",
    sub: "Mercados ao vivo, Parlay Builder e estatísticas em tempo real.",
    chips: ["Variedade de Mercados", "Melhores Odds", "Parlay Builder"],
    disc: "Autorização SPA/MF nº 2.098/2024: Publicidade. Aposte com responsabilidade. +18."
  };

  function start(){
    const qs = new URLSearchParams(location.search);
    const SUBID = qs.get('subid');
    const isMobile = matchMedia('(max-width:720px)').matches;

    const withSubid = url => {
      try {
        const u = new URL(url);
        if (SUBID) u.searchParams.set('subid', SUBID);
        return u.toString();
      } catch {
        return url;
      }
    };

    const css = `
    .sorte-footer{position:fixed;bottom:20px;left:20px;right:20px;z-index:9999;display:flex;justify-content:space-between;align-items:center;gap:16px;background:linear-gradient(90deg,rgba(10,88,160,.98),rgba(7,128,100,.95));color:#fff;padding:16px 20px;border-radius:16px;box-shadow:0 8px 28px rgba(0,0,0,.35);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial;max-width:1100px;margin:0 auto;text-decoration:none}
    .sorte-footer__close{position:absolute;top:8px;right:8px;background:rgba(255,255,255,.2);border:none;color:#fff;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer}
    .sorte-footer__left{display:flex;gap:14px;align-items:flex-start;flex:1}
    .sorte-footer__logo img{height:56px;background:#fff;padding:4px;border-radius:8px}
    .sorte-footer__headline{font-size:16px;font-weight:700;margin:0 0 6px}
    .sorte-footer__sub{font-size:13px;margin:0 0 8px}
    .sorte-footer__pool-list{display:flex;gap:8px;list-style:none;margin:0;padding:0;font-size:12px}
    .sorte-footer__pool-list li{background:rgba(255,255,255,.15);padding:6px 10px;border-radius:999px}
    .badge-hot{background:linear-gradient(90deg,#ffb86b,#ff6b6b);color:#111;font-weight:700;padding:2px 6px;border-radius:999px;font-size:11px;margin-right:4px}
    .sorte-footer__right{text-align:center}
    .sorte-btn{background:#fff;color:#072b4a;padding:12px 20px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none}
    .sorte-footer__disc{font-size:10px;opacity:.8;margin-top:6px}
    @media (max-width:720px){
      .sorte-footer{flex-direction:column;left:8px;right:8px;bottom:8px;padding:10px}
      .sorte-footer__logo img{height:36px}
      .sorte-footer__headline{font-size:13px}
      .sorte-footer__sub{font-size:11px}
      .sorte-footer__pool-list{overflow:auto;flex-wrap:nowrap}
      .sorte-btn{width:100%}
    }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const chipsToShow = isMobile ? BRAND.chips.slice(0,3) : BRAND.chips;

    const html = `
      <a id="bet-footer" class="sorte-footer" href="${withSubid(BRAND.link)}" target="_blank" rel="nofollow sponsored">
        <button class="sorte-footer__close" type="button">×</button>
        <div class="sorte-footer__left">
          <div class="sorte-footer__logo"><img src="${BRAND.logo}" alt="BetMGM"></div>
          <div>
            <p class="sorte-footer__headline">🔥 Aposte com a <strong>BetMGM</strong></p>
            <p class="sorte-footer__sub">${BRAND.sub}</p>
            <ul class="sorte-footer__pool-list">
              ${chipsToShow.map((t,i)=>`<li>${i===0?'<span class="badge-hot">Mais procurado</span> ':''}${t}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="sorte-footer__right">
          <span class="sorte-btn">👉 ${BRAND.cta}</span>
          <p class="sorte-footer__disc">${BRAND.disc}</p>
        </div>
      </a>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    document.querySelector('.sorte-footer__close').onclick = e => {
      e.preventDefault();
      document.getElementById('bet-footer').remove();
    };

    document.head.insertAdjacentHTML(
      'beforeend',
      '<style>body{padding-bottom:90px}@media(max-width:720px){body{padding-bottom:80px}}</style>'
    );
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', start, {once:true})
    : start();
})();
</script>
