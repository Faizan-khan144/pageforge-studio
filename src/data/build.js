import { esc } from './templates.js'

const icon = (name) => {
  const paths = {
    chart: '<path d="M4 19V5m0 14h16M8 15l3.5-4.5L15 14l4-6"/>',
    spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
    bell: '<path d="M18 9a6 6 0 10-12 0c0 5-2 6-2 6h16s-2-1-2-6M10.5 20a2 2 0 003 0"/>',
    code: '<path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>',
  }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">${paths[name] || paths.spark}</svg>`
}

const BRAND_FONT = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const baseCss = (accent, dark) => {
  const bg = dark ? '#0a0c12' : '#ffffff'
  const surface = dark ? '#11141c' : '#f7f8fa'
  const text = dark ? '#eef1f7' : '#0d1117'
  const muted = dark ? '#9aa4b8' : '#5b6676'
  const line = dark ? 'rgba(255,255,255,.09)' : 'rgba(13,17,23,.1)'
  return `
:root{--a:${accent};--bg:${bg};--surface:${surface};--t:${text};--m:${muted};--line:${line}}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${BRAND_FONT};background:var(--bg);color:var(--t);-webkit-font-smoothing:antialiased;line-height:1.55}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
.wrap{width:100%;max-width:1120px;margin-inline:auto;padding-inline:24px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;border:1px solid transparent;transition:transform .18s cubic-bezier(.34,1.56,.64,1),box-shadow .18s ease,background .18s ease}
.btn-p{background:var(--a);color:#fff;box-shadow:0 8px 24px -10px var(--a)}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 14px 32px -10px var(--a)}
.btn-s{border-color:var(--line);color:var(--t);background:transparent}
.btn-s:hover{background:var(--surface)}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--a)}
h1,h2,h3{line-height:1.12;letter-spacing:-.025em;font-weight:800}
h1{font-size:clamp(38px,5.4vw,60px)}
h2{font-size:clamp(28px,3.6vw,40px)}
.lead{font-size:clamp(16px,1.7vw,19px);color:var(--m)}
section{padding:80px 0}
@media(max-width:720px){section{padding:56px 0}}
.grid{display:grid;gap:20px}
@media(min-width:860px){.g2{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}}
.card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:26px;transition:transform .2s ease,border-color .2s ease}
.card:hover{transform:translateY(-3px);border-color:var(--a)}
.muted{color:var(--m)}
.center{text-align:center}
`
}

const navHtml = (s) => `
<header style="position:sticky;top:0;z-index:50;background:color-mix(in srgb, var(--bg) 85%, transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)">
  <div class="wrap" style="display:flex;align-items:center;justify-content:space-between;height:66px">
    <a href="#" style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:19px;letter-spacing:-.02em">
      <span style="width:26px;height:26px;border-radius:8px;background:var(--a);display:inline-block"></span>
      ${esc(s.brand)}
    </a>
    <nav style="display:flex;align-items:center;gap:28px">
      <div style="display:none;gap:26px;font-size:15px;color:var(--m)" class="navlinks">
        ${s.nav.map((n) => `<a href="#" style="color:var(--m)">${esc(n)}</a>`).join('')}
      </div>
      <a href="#" class="btn btn-p" style="padding:9px 18px;font-size:14px">Get started</a>
    </nav>
  </div>
</header>
<style>@media(min-width:860px){.navlinks{display:flex!important}}</style>`

const heroHtml = (s) => `
<section style="padding-top:64px;padding-bottom:64px">
  <div class="wrap" style="display:grid;gap:48px;align-items:center" class="hero-grid">
    <div>
      <span class="eyebrow" style="display:inline-block;padding:6px 12px;border:1px solid var(--line);border-radius:99px">${esc(s.hero.badge)}</span>
      <h1 style="margin-top:20px">${esc(s.hero.title)}</h1>
      <p class="lead" style="margin-top:18px;max-width:520px">${esc(s.hero.subtitle)}</p>
      <div style="display:flex;gap:12px;margin-top:30px;flex-wrap:wrap">
        <a href="#" class="btn btn-p">${esc(s.hero.primary)}</a>
        <a href="#" class="btn btn-s">${esc(s.hero.secondary)}</a>
      </div>
    </div>
    <div style="border-radius:20px;overflow:hidden;border:1px solid var(--line);box-shadow:0 30px 60px -30px rgba(0,0,0,.4)">
      <img src="${esc(s.hero.image)}" alt="Product screenshot" loading="lazy" style="aspect-ratio:16/11;object-fit:cover;width:100%">
    </div>
  </div>
  <style>@media(min-width:960px){.wrap.hero-grid{grid-template-columns:1.05fr 1fr}}</style>
</section>`

const logosHtml = (s) => `
<section style="padding:36px 0;border-block:1px solid var(--line)">
  <div class="wrap" style="display:flex;flex-wrap:wrap;gap:14px 40px;align-items:center;justify-content:center">
    <span class="muted" style="font-size:13px">Trusted by teams at</span>
    ${s.logos.map((l) => `<span style="font-weight:700;font-size:17px;color:var(--m);opacity:.75">${esc(l)}</span>`).join('')}
  </div>
</section>`

const featuresHtml = (s) => `
<section id="features">
  <div class="wrap">
    <div class="center" style="max-width:640px;margin-inline:auto">
      <span class="eyebrow">Features</span>
      <h2 style="margin-top:12px">Everything you need, nothing you don't</h2>
      <p class="lead" style="margin-top:14px">Focused tooling for teams that want signal, not another dashboard to maintain.</p>
    </div>
    <div class="grid g2" style="margin-top:48px">
      ${s.features
        .map(
          (f) => `<div class="card">
        <span style="display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:color-mix(in srgb,var(--a) 16%,transparent);color:var(--a);margin-bottom:16px">${icon(f.icon)}</span>
        <h3 style="font-size:19px">${esc(f.title)}</h3>
        <p class="muted" style="margin-top:8px;font-size:15px">${esc(f.text)}</p>
      </div>`,
        )
        .join('')}
    </div>
  </div>
</section>`

const statsHtml = (s) => `
<section style="background:var(--surface);border-block:1px solid var(--line)">
  <div class="wrap grid g4" style="gap:32px;text-align:center">
    ${s.stats
      .map(
        (st) => `<div>
      <div style="font-size:clamp(28px,3.4vw,40px);font-weight:800;letter-spacing:-.03em;color:var(--a)" class="num">${esc(st.value)}</div>
      <div class="muted" style="font-size:14px;margin-top:6px">${esc(st.label)}</div>
    </div>`,
      )
      .join('')}
  </div>
</section>`

const testimonialsHtml = (s) => `
<section>
  <div class="wrap">
    <div class="center" style="max-width:600px;margin-inline:auto">
      <span class="eyebrow">Loved by builders</span>
      <h2 style="margin-top:12px">Don't take our word for it</h2>
    </div>
    <div class="grid g2" style="margin-top:44px">
      ${s.testimonials
        .map(
          (t) => `<figure class="card" style="margin:0">
        <div style="color:var(--a);font-size:15px;letter-spacing:3px">★★★★★</div>
        <blockquote style="margin-top:14px;font-size:17px;line-height:1.6">"${esc(t.quote)}"</blockquote>
        <figcaption style="display:flex;align-items:center;gap:12px;margin-top:20px">
          <span style="width:42px;height:42px;border-radius:99px;background:var(--a);color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px">${esc(t.initials)}</span>
          <span><span style="display:block;font-weight:700;font-size:15px">${esc(t.name)}</span><span class="muted" style="font-size:13px">${esc(t.role)}</span></span>
        </figcaption>
      </figure>`,
        )
        .join('')}
    </div>
  </div>
</section>`

const pricingHtml = (s) => `
<section id="pricing" style="background:var(--surface);border-block:1px solid var(--line)">
  <div class="wrap">
    <div class="center" style="max-width:600px;margin-inline:auto">
      <span class="eyebrow">Pricing</span>
      <h2 style="margin-top:12px">Simple pricing that scales</h2>
      <p class="lead" style="margin-top:14px">Start free. Upgrade when the volume says so.</p>
    </div>
    <div class="grid g3" style="margin-top:44px;align-items:start">
      ${s.pricing
        .map(
          (p) => `<div class="card" style="${p.popular ? 'border-color:var(--a);box-shadow:0 24px 48px -24px var(--a);position:relative' : ''}">
        ${p.popular ? '<span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--a);color:#fff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:99px">Most popular</span>' : ''}
        <h3 style="font-size:18px">${esc(p.name)}</h3>
        <div style="display:flex;align-items:baseline;gap:6px;margin-top:12px">
          <span style="font-size:44px;font-weight:800;letter-spacing:-.04em">$${esc(p.price)}</span>
          <span class="muted" style="font-size:14px">${esc(p.period)}</span>
        </div>
        <p class="muted" style="font-size:14px;margin-top:6px">${esc(p.note)}</p>
        <a href="#" class="btn ${p.popular ? 'btn-p' : 'btn-s'}" style="width:100%;margin-top:20px">${esc(p.cta)}</a>
        <ul style="list-style:none;margin-top:22px;display:grid;gap:11px">
          ${p.features.map((f) => `<li style="display:flex;gap:10px;font-size:14.5px;color:var(--m)"><span style="color:var(--a);font-weight:700">✓</span>${esc(f)}</li>`).join('')}
        </ul>
      </div>`,
        )
        .join('')}
    </div>
  </div>
</section>`

const ctaHtml = (s) => `
<section>
  <div class="wrap">
    <div style="border-radius:24px;padding:clamp(40px,6vw,72px);text-align:center;background:linear-gradient(140deg,var(--a),color-mix(in srgb,var(--a) 55%, #000));color:#fff">
      <h2 style="color:#fff">${esc(s.cta.title)}</h2>
      <p style="margin-top:14px;opacity:.9;font-size:17px;max-width:520px;margin-inline:auto">${esc(s.cta.text)}</p>
      <a href="#" class="btn" style="margin-top:28px;background:#fff;color:#0d1117">${esc(s.cta.button)}</a>
    </div>
  </div>
</section>`

const footerHtml = (s) => `
<footer style="border-top:1px solid var(--line);padding:56px 0 32px">
  <div class="wrap" style="display:grid;gap:36px" class="fgrid">
    <div style="max-width:280px">
      <div style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px">
        <span style="width:24px;height:24px;border-radius:7px;background:var(--a)"></span>${esc(s.brand)}
      </div>
      <p class="muted" style="font-size:14px;margin-top:12px">${esc(s.footer.blurb)}</p>
    </div>
    ${s.footer.columns
      .map(
        (c) => `<div>
      <h4 style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--m);font-weight:700">${esc(c.title)}</h4>
      <ul style="list-style:none;margin-top:14px;display:grid;gap:10px;font-size:14.5px">
        ${c.links.map((l) => `<li><a href="#" class="muted" style="color:var(--m)">${esc(l)}</a></li>`).join('')}
      </ul>
    </div>`,
      )
      .join('')}
  </div>
  <div class="wrap" style="margin-top:40px;padding-top:22px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
    <span class="muted" style="font-size:13.5px">${esc(s.footer.copyright)}</span>
    <span class="muted" style="font-size:13.5px">Made with PageForge</span>
  </div>
  <style>@media(min-width:860px){.wrap.fgrid{grid-template-columns:1.4fr 1fr 1fr 1fr}}</style>
</footer>`

const RENDERERS = {
  nav: navHtml,
  hero: heroHtml,
  logos: logosHtml,
  features: featuresHtml,
  stats: statsHtml,
  testimonials: testimonialsHtml,
  pricing: pricingHtml,
  cta: ctaHtml,
  footer: footerHtml,
}

export const buildPage = (state, order) => {
  const dark = state.template === 'atlas'
  const body = order
    .filter((o) => RENDERERS[o.id] && o.on)
    .map((o) => RENDERERS[o.id](state))
    .join('\n')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(state.brand)}</title>
<meta name="description" content="${esc(state.hero.subtitle)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>${baseCss(state.accent, dark)}</style>
</head>
<body>
${body}
</body>
</html>`
}