export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const TEMPLATES = [
  { id: 'nova', name: 'Nova', desc: 'SaaS product', accent: '#ff6b35', dark: false },
  { id: 'atlas', name: 'Atlas', desc: 'Studio / agency', accent: '#5b8cff', dark: true },
  { id: 'bloom', name: 'Bloom', desc: 'Local business', accent: '#12b981', dark: false },
]

export const SECTION_META = [
  { id: 'nav', label: 'Navigation', lock: true },
  { id: 'hero', label: 'Hero' },
  { id: 'logos', label: 'Logo strip' },
  { id: 'features', label: 'Features' },
  { id: 'stats', label: 'Stats' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'cta', label: 'Call to action' },
  { id: 'footer', label: 'Footer', lock: true },
]

export const defaultState = {
  template: 'nova',
  accent: '#ff6b35',
  brand: 'Novaflow',
  tagline: 'Analytics that answer the question before you ask it.',
  nav: ['Features', 'Pricing', 'Docs', 'Sign in'],
  hero: {
    badge: 'Now in public beta',
    title: 'Ship better products with clarity',
    subtitle:
      'Novaflow turns raw product events into answers your whole team can act on — no SQL, no dashboards nobody opens.',
    primary: 'Start free trial',
    secondary: 'Watch demo',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=70&auto=format&fit=crop',
  },
  logos: ['Linear', 'Vercel', 'Framer', 'Raycast', 'Supabase', 'Resend'],
  features: [
    {
      title: 'Session intelligence',
      text: 'See exactly where users stall, then replay the moment without instrumenting anything new.',
      icon: 'chart',
    },
    {
      title: 'Answers in plain English',
      text: 'Ask a question, get a chart and the reasoning behind it. Every number links to its source.',
      icon: 'spark',
    },
    {
      title: 'Alerts that respect you',
      text: 'Anomaly detection tuned per metric, so you hear about real regressions and nothing else.',
      icon: 'bell',
    },
    {
      title: 'Ships with your stack',
      text: 'Twenty lines of snippet, or a first-party SDK for Node, Go, Python and iOS.',
      icon: 'code',
    },
  ],
  stats: [
    { value: '4.2M', label: 'events parsed daily' },
    { value: '120ms', label: 'median query time' },
    { value: '99.98%', label: 'uptime last 12 months' },
    { value: '3,100', label: 'teams shipping with us' },
  ],
  testimonials: [
    {
      quote: 'We cut our weekly metrics meeting from forty minutes to six. The chart was already in Slack.',
      name: 'Priya Raman',
      role: 'Head of Product, Kettle',
      initials: 'PR',
    },
    {
      quote: 'I asked one question on a Friday and found a checkout bug that had cost us a month of revenue.',
      name: 'Marco Silva',
      role: 'Founder, Tessera',
      initials: 'MS',
    },
  ],
  pricing: [
    { name: 'Starter', price: '0', period: 'forever', note: 'For side projects', cta: 'Get started', features: ['50k events / month', '7 day retention', '1 seat'] },
    { name: 'Team', price: '49', period: 'per month', note: 'For growing teams', cta: 'Start trial', popular: true, features: ['5M events / month', '12 month retention', 'Unlimited seats', 'Slack alerts'] },
    { name: 'Scale', price: '199', period: 'per month', note: 'For serious volume', cta: 'Talk to us', features: ['Unlimited events', 'Custom retention', 'SSO + audit log', 'Support SLA'] },
  ],
  cta: {
    title: 'Start reading your product in minutes',
    text: 'Free for 14 days. No card, no sales call, no onboarding webinar.',
    button: 'Create workspace',
  },
  footer: {
    blurb: 'Built for teams who would rather ship than configure.',
    columns: [
      { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
      { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
      { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA'] },
    ],
    copyright: '© 2026 Novaflow Inc. All rights reserved.',
  },
}