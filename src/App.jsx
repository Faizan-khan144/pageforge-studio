import { useMemo, useState, useEffect, useRef } from 'react'
import {
  Eye,
  Download,
  Copy,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Trash2,
  GripVertical,
  Check,
  Sparkles,
} from 'lucide-react'
import { TEMPLATES, SECTION_META, defaultState } from './data/templates.js'
import { buildPage } from './data/build.js'

const WIDTHS = { desktop: 1180, tablet: 768, mobile: 390 }

export default function App() {
  const [state, setState] = useState(defaultState)
  const [order, setOrder] = useState(SECTION_META.map((s) => ({ id: s.id, on: true })))
  const [device, setDevice] = useState('desktop')
  const [tab, setTab] = useState('content')
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState('')
  const frame = useRef(null)
  const [scale, setScale] = useState(1)

  const html = useMemo(() => buildPage(state, order), [state, order])

  useEffect(() => {
    const d = document.getElementById('pf-frame')
    if (d) d.srcdoc = html
  }, [html])

  useEffect(() => {
    const fit = () => {
      const stage = document.getElementById('pf-stage')
      if (!stage) return
      const avail = stage.clientWidth - 48
      setScale(Math.min(1, avail / WIDTHS[device]))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [device])

  const set = (path, value) =>
    setState((prev) => {
      const next = structuredClone(prev)
      const keys = path.split('.')
      let o = next
      for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]]
      o[keys[keys.length - 1]] = value
      return next
    })

  const notify = (msg) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 2200)
  }

  const download = () => {
    const blob = new Blob([html], { type: 'text/html' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${state.brand.toLowerCase().replace(/\s+/g, '-')}.html`
    a.click()
    URL.revokeObjectURL(a.href)
    notify('HTML downloaded')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      notify('Clipboard blocked — use Download')
    }
  }

  const toggleSection = (id) =>
    setOrder((prev) => prev.map((s) => (s.id === id ? { ...s, on: !s.on } : s)))

  const move = (id, dir) =>
    setOrder((prev) => {
      const i = prev.findIndex((s) => s.id === id)
      const j = i + dir
      if (j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-forge-900 text-forge-200">
      {/* top bar */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-forge-800 bg-forge-850 px-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-ember-500" />
          <span className="text-[15px] font-extrabold tracking-tight text-white">PageForge</span>
        </div>

        <div className="mx-2 hidden h-6 w-px bg-forge-700 sm:block" />

        <div className="flex items-center gap-1.5">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                set('template', t.id)
                set('accent', t.accent)
              }}
              data-active={state.template === t.id}
              className="chip rounded-lg px-3 py-1.5 text-xs font-semibold text-forge-300"
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-lg border border-forge-700 p-0.5 sm:flex">
            {[
              ['desktop', Monitor],
              ['tablet', Tablet],
              ['mobile', Smartphone],
            ].map(([d, Icon]) => (
              <button
                key={d}
                onClick={() => setDevice(d)}
                aria-label={d}
                className={`grid h-7 w-7 place-items-center rounded-md transition-colors ${
                  device === d ? 'bg-ember-500 text-white' : 'text-forge-400 hover:text-forge-200'
                }`}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
          <button
            onClick={copy}
            className="chip flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-forge-300"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy HTML'}</span>
          </button>
          <button
            onClick={download}
            className="flex items-center gap-1.5 rounded-lg bg-ember-500 px-3.5 py-2 text-xs font-bold text-white shadow-[0_8px_20px_-8px_#ff6b35] transition-transform hover:-translate-y-0.5"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* left: sections */}
        <aside className="hidden w-56 shrink-0 flex-col border-r border-forge-800 bg-forge-850 md:flex">
          <div className="px-4 pt-4 pb-2 text-[11px] font-bold tracking-[0.14em] text-forge-400 uppercase">
            Sections
          </div>
          <div className="flex-1 overflow-y-auto px-2.5 pb-4">
            {order.map((s) => {
              const meta = SECTION_META.find((m) => m.id === s.id)
              return (
                <div
                  key={s.id}
                  className={`group mb-1 flex items-center gap-2 rounded-lg px-2 py-2 ${
                    s.on ? 'bg-forge-800' : ''
                  }`}
                >
                  <GripVertical size={13} className="shrink-0 text-forge-600" />
                  <button
                    onClick={() => toggleSection(s.id)}
                    disabled={meta?.lock}
                    className={`flex-1 text-left text-[13px] font-medium ${
                      s.on ? 'text-forge-200' : 'text-forge-600'
                    } ${meta?.lock ? 'cursor-default' : ''}`}
                  >
                    {meta?.label}
                  </button>
                  {!meta?.lock && (
                    <span className="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => move(s.id, -1)}
                        aria-label="Move up"
                        className="grid h-5 w-5 place-items-center rounded text-forge-400 hover:bg-forge-700 hover:text-white"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => move(s.id, 1)}
                        aria-label="Move down"
                        className="grid h-5 w-5 place-items-center rounded text-forge-400 hover:bg-forge-700 hover:text-white"
                      >
                        ↓
                      </button>
                    </span>
                  )}
                </div>
              )
            })}
          </div>
          <div className="border-t border-forge-800 p-3">
            <div className="text-[11px] font-bold tracking-[0.14em] text-forge-400 uppercase">
              Accent
            </div>
            <div className="mt-2 flex gap-2">
              {['#ff6b35', '#5b8cff', '#12b981', '#a855f7', '#f43f5e', '#f59e0b'].map((c) => (
                <button
                  key={c}
                  onClick={() => set('accent', c)}
                  aria-label={`Accent ${c}`}
                  className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${
                    state.accent === c ? 'ring-2 ring-white ring-offset-2 ring-offset-forge-850' : ''
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* center: preview */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-forge-800 bg-forge-850/60 px-4 py-2">
            <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-forge-400 uppercase">
              <Eye size={12} /> Live preview
            </span>
            <span className="num ml-auto text-[11px] text-forge-600">
              {Math.round(scale * 100)}% · {(html.length / 1024).toFixed(1)} kB
            </span>
          </div>
          <div
            id="pf-stage"
            className="min-h-0 flex-1 overflow-auto bg-[repeating-linear-gradient(45deg,#0e1016_0_12px,#0b0d12_12px_24px)] p-6"
          >
            <div
              className="stage mx-auto overflow-hidden rounded-xl shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)] ring-1 ring-forge-700/60"
              style={{ width: WIDTHS[device], transform: `scale(${scale})` }}
            >
              <iframe
                id="pf-frame"
                ref={frame}
                title="Preview"
                className="h-[1400px] w-full border-0 bg-white"
                sandbox="allow-same-origin allow-popups"
              />
            </div>
          </div>
        </main>

        {/* right: editor */}
        <aside className="flex w-full shrink-0 flex-col border-l border-forge-800 bg-forge-850 lg:w-80">
          <div className="flex border-b border-forge-800 p-1.5">
            {[
              ['content', 'Content'],
              ['sections', 'Sections'],
            ].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-colors ${
                  tab === k ? 'bg-forge-800 text-white' : 'text-forge-400 hover:text-forge-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {tab === 'content' ? (
              <ContentEditor state={state} set={set} />
            ) : (
              <SectionsEditor order={order} toggle={toggleSection} move={move} />
            )}
          </div>
        </aside>
      </div>

      {toast && (
        <div className="pop fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-forge-700 bg-forge-800 px-4 py-2.5 text-sm font-semibold text-white shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange, area }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1.5 block text-[11px] font-bold tracking-[0.1em] text-forge-400 uppercase">
        {label}
      </span>
      {area ? (
        <textarea
          value={value}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
          className="inp w-full resize-none rounded-lg px-3 py-2 text-[13px] text-forge-200 placeholder:text-forge-600"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="inp w-full rounded-lg px-3 py-2 text-[13px] text-forge-200 placeholder:text-forge-600"
        />
      )}
    </label>
  )
}

function ContentEditor({ state, set }) {
  const [open, setOpen] = useState('hero')
  const groups = [
    {
      id: 'brand',
      title: 'Brand',
      body: (
        <>
          <Field label="Name" value={state.brand} onChange={(v) => set('brand', v)} />
          <Field label="Nav links" value={state.nav.join(', ')} onChange={(v) => set('nav', v.split(',').map((s) => s.trim()).filter(Boolean))} />
        </>
      ),
    },
    {
      id: 'hero',
      title: 'Hero',
      body: (
        <>
          <Field label="Badge" value={state.hero.badge} onChange={(v) => set('hero.badge', v)} />
          <Field label="Headline" value={state.hero.title} onChange={(v) => set('hero.title', v)} area />
          <Field label="Subtitle" value={state.hero.subtitle} onChange={(v) => set('hero.subtitle', v)} area />
          <Field label="Primary button" value={state.hero.primary} onChange={(v) => set('hero.primary', v)} />
          <Field label="Secondary button" value={state.hero.secondary} onChange={(v) => set('hero.secondary', v)} />
          <Field label="Image URL" value={state.hero.image} onChange={(v) => set('hero.image', v)} />
        </>
      ),
    },
    {
      id: 'features',
      title: `Features (${state.features.length})`,
      body: (
        <>
          {state.features.map((f, i) => (
            <div key={i} className="mb-3 rounded-lg border border-forge-700/70 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold text-ember-400">#{i + 1}</span>
                <button
                  onClick={() =>
                    set(
                      'features',
                      state.features.filter((_, j) => j !== i),
                    )
                  }
                  aria-label="Delete feature"
                  className="text-forge-500 transition-colors hover:text-rose-400"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <Field label="Title" value={f.title} onChange={(v) => set(`features.${i}.title`, v)} />
              <Field label="Text" value={f.text} onChange={(v) => set(`features.${i}.text`, v)} area />
            </div>
          ))}
          <button
            onClick={() =>
              set('features', [
                ...state.features,
                { title: 'New feature', text: 'Describe it in one or two lines.', icon: 'spark' },
              ])
            }
            className="chip flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold text-forge-300"
          >
            <Plus size={14} /> Add feature
          </button>
        </>
      ),
    },
    {
      id: 'stats',
      title: 'Stats',
      body: (
        <>
          {state.stats.map((st, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input
                value={st.value}
                onChange={(e) => set(`stats.${i}.value`, e.target.value)}
                className="inp w-20 rounded-lg px-2.5 py-2 text-[13px] text-forge-200"
              />
              <input
                value={st.label}
                onChange={(e) => set(`stats.${i}.label`, e.target.value)}
                className="inp flex-1 rounded-lg px-2.5 py-2 text-[13px] text-forge-200"
              />
            </div>
          ))}
        </>
      ),
    },
    {
      id: 'pricing',
      title: 'Pricing',
      body: (
        <>
          {state.pricing.map((p, i) => (
            <div key={i} className="mb-3 rounded-lg border border-forge-700/70 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold text-ember-400">{p.name}</span>
                <span className="num text-[13px] text-forge-300">${p.price}</span>
              </div>
              <Field label="Price" value={p.price} onChange={(v) => set(`pricing.${i}.price`, v)} />
              <Field label="Note" value={p.note} onChange={(v) => set(`pricing.${i}.note`, v)} />
              <Field
                label="Features (one per line)"
                value={p.features.join('\n')}
                onChange={(v) => set(`pricing.${i}.features`, v.split('\n').filter(Boolean))}
                area
              />
            </div>
          ))}
        </>
      ),
    },
    {
      id: 'cta',
      title: 'Call to action',
      body: (
        <>
          <Field label="Title" value={state.cta.title} onChange={(v) => set('cta.title', v)} area />
          <Field label="Text" value={state.cta.text} onChange={(v) => set('cta.text', v)} area />
          <Field label="Button" value={state.cta.button} onChange={(v) => set('cta.button', v)} />
        </>
      ),
    },
  ]

  return (
    <div className="space-y-2">
      {groups.map((g) => (
        <div key={g.id} className="rounded-lg border border-forge-700/60">
          <button
            onClick={() => setOpen(open === g.id ? '' : g.id)}
            className="flex w-full items-center justify-between px-3 py-2.5 text-[13px] font-bold text-forge-200"
          >
            {g.title}
            <span className={`text-forge-500 transition-transform ${open === g.id ? 'rotate-45' : ''}`}>
              <Plus size={14} />
            </span>
          </button>
          {open === g.id && <div className="border-t border-forge-700/60 p-3">{g.body}</div>}
        </div>
      ))}
    </div>
  )
}

function SectionsEditor({ order, toggle, move }) {
  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-forge-400">
        Toggle sections on/off and reorder them. Nav and footer are locked.
      </p>
      {order.map((s) => {
        const meta = SECTION_META.find((m) => m.id === s.id)
        return (
          <div
            key={s.id}
            className="mb-1.5 flex items-center gap-3 rounded-lg border border-forge-700/60 px-3 py-2.5"
          >
            <button
              onClick={() => toggle(s.id)}
              disabled={meta?.lock}
              aria-label={`Toggle ${meta?.label}`}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                s.on ? 'bg-ember-500' : 'bg-forge-700'
              } ${meta?.lock ? 'opacity-50' : ''}`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  s.on ? 'translate-x-4.5' : 'translate-x-0.5'
                }`}
                style={{ transform: `translateX(${s.on ? 18 : 2}px)` }}
              />
            </button>
            <span className={`flex-1 text-[13px] font-semibold ${s.on ? 'text-forge-200' : 'text-forge-500'}`}>
              {meta?.label}
            </span>
            {!meta?.lock && (
              <span className="flex gap-1">
                <button
                  onClick={() => move(s.id, -1)}
                  aria-label="Move up"
                  className="grid h-6 w-6 place-items-center rounded text-forge-400 hover:bg-forge-700 hover:text-white"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(s.id, 1)}
                  aria-label="Move down"
                  className="grid h-6 w-6 place-items-center rounded text-forge-400 hover:bg-forge-700 hover:text-white"
                >
                  ↓
                </button>
              </span>
            )}
          </div>
        )
      })}
      <div className="mt-5 flex items-start gap-2 rounded-lg border border-forge-700/60 bg-forge-900 p-3">
        <Sparkles size={14} className="mt-0.5 shrink-0 text-ember-400" />
        <p className="text-xs leading-relaxed text-forge-400">
          Exported HTML is fully self-contained — inline styles, no framework, no build step.
          Host it anywhere.
        </p>
      </div>
    </div>
  )
}