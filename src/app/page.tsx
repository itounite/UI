'use client'

import { useEffect, useState, createContext, useContext, useCallback } from 'react'

/* ───────────────────────── THEME ───────────────────────── */

type Theme = 'dark' | 'light'

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'light', toggle: () => {} })

function useTheme() {
  return useContext(ThemeCtx)
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem('ui-theme') as Theme) || 'light'
  })

  useEffect(() => {
    localStorage.setItem('ui-theme', theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}

function v(theme: Theme) {
  const d = theme === 'dark'
  return {
    bg:       d ? '#000000' : '#FFFFFF',
    text:     d ? '#FFFFFF' : '#000000',
    muted:    d ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)',
    faint:    d ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)',
    ghost:    d ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
    divider:  d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    navBg:    d ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
    forestHome:   d ? 'rgba(180,150,100,0.18)' : 'rgba(160,130,80,0.14)',
    forestWP:     d ? 'rgba(120,190,120,0.18)' : 'rgba(80,160,80,0.14)',
  }
}

/* ───────────────────────── TOGGLE (top-right) ───────────────────────── */

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const col = v(theme)
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      className="fixed cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{
        top: '1.25rem',
        right: '1.25rem',
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        border: `1.5px solid ${col.muted}`,
        background: col.bg,
        zIndex: 9999,
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke={col.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  )
}

/* ───────────────────────── Nordic Forest SVG (left & right only) ───────────────────────── */

function NordicForest({ color }: { color: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg className="absolute bottom-0 left-0 w-full" style={{ height: '75vh' }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" fill="none">
        <g stroke={color} strokeWidth="0.7" opacity="0.5">
          <line x1="20" y1="900" x2="20" y2="620" /><polygon points="20,620 2,710 38,710" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="80" y1="900" x2="80" y2="580" /><polygon points="80,580 58,680 102,680" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="150" y1="900" x2="150" y2="600" /><polygon points="150,600 128,700 172,700" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="220" y1="900" x2="220" y2="560" /><polygon points="220,560 196,665 244,665" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="300" y1="900" x2="300" y2="590" /><polygon points="300,590 278,690 322,690" fill="none" stroke={color} strokeWidth="0.5" />
        </g>
        <g stroke={color} strokeWidth="1" opacity="0.7">
          <line x1="50" y1="900" x2="50" y2="480" />
          <polygon points="50,480 20,600 80,600" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="50,550 28,640 72,640" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="130" y1="900" x2="130" y2="450" />
          <polygon points="130,450 95,580 165,580" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="130,530 108,620 152,620" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="210" y1="900" x2="210" y2="470" />
          <polygon points="210,470 178,595 242,595" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="210,540 190,625 230,625" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="290" y1="900" x2="290" y2="500" />
          <polygon points="290,500 260,610 320,610" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="290,565 272,640 308,640" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="360" y1="900" x2="360" y2="490" />
          <polygon points="360,490 332,600 388,600" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="360,555 342,630 378,630" fill="none" stroke={color} strokeWidth="0.8" />
        </g>
        <g stroke={color} strokeWidth="1.3" opacity="0.9">
          <line x1="35" y1="900" x2="35" y2="370" />
          <polygon points="35,370 -5,510 75,510" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="35,440 10,545 60,545" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="35,510 18,585 52,585" fill="none" stroke={color} strokeWidth="1" />
          <line x1="170" y1="900" x2="170" y2="350" />
          <polygon points="170,350 130,490 210,490" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="170,420 145,525 195,525" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="170,490 152,570 188,570" fill="none" stroke={color} strokeWidth="1" />
          <line x1="320" y1="900" x2="320" y2="380" />
          <polygon points="320,380 282,515 358,515" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="320,450 298,545 342,545" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="320,520 305,590 335,590" fill="none" stroke={color} strokeWidth="1" />
        </g>

        <g stroke={color} strokeWidth="0.7" opacity="0.5">
          <line x1="1140" y1="900" x2="1140" y2="610" /><polygon points="1140,610 1118,705 1162,705" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="1210" y1="900" x2="1210" y2="570" /><polygon points="1210,570 1186,670 1234,670" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="1280" y1="900" x2="1280" y2="590" /><polygon points="1280,590 1258,690 1302,690" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="1350" y1="900" x2="1350" y2="550" /><polygon points="1350,550 1326,655 1374,655" fill="none" stroke={color} strokeWidth="0.5" />
          <line x1="1420" y1="900" x2="1420" y2="620" /><polygon points="1420,620 1402,710 1438,710" fill="none" stroke={color} strokeWidth="0.5" />
        </g>
        <g stroke={color} strokeWidth="1" opacity="0.7">
          <line x1="1080" y1="900" x2="1080" y2="490" />
          <polygon points="1080,490 1050,605 1110,605" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1080,560 1060,640 1100,640" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="1160" y1="900" x2="1160" y2="460" />
          <polygon points="1160,460 1128,585 1192,585" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1160,535 1140,625 1180,625" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="1240" y1="900" x2="1240" y2="480" />
          <polygon points="1240,480 1210,600 1270,600" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1240,550 1222,635 1258,635" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="1320" y1="900" x2="1320" y2="470" />
          <polygon points="1320,470 1292,595 1348,595" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1320,540 1304,625 1336,625" fill="none" stroke={color} strokeWidth="0.8" />
          <line x1="1400" y1="900" x2="1400" y2="500" />
          <polygon points="1400,500 1375,605 1425,605" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="1400,565 1385,635 1415,635" fill="none" stroke={color} strokeWidth="0.8" />
        </g>
        <g stroke={color} strokeWidth="1.3" opacity="0.9">
          <line x1="1120" y1="900" x2="1120" y2="360" />
          <polygon points="1120,360 1080,500 1160,500" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1120,430 1095,535 1145,535" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1120,500 1102,580 1138,580" fill="none" stroke={color} strokeWidth="1" />
          <line x1="1270" y1="900" x2="1270" y2="340" />
          <polygon points="1270,340 1230,480 1310,480" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1270,410 1248,520 1292,520" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1270,480 1255,565 1285,565" fill="none" stroke={color} strokeWidth="1" />
          <line x1="1400" y1="900" x2="1400" y2="375" />
          <polygon points="1400,375 1365,505 1435,505" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1400,445 1380,540 1420,540" fill="none" stroke={color} strokeWidth="1" />
          <polygon points="1400,515 1388,585 1412,585" fill="none" stroke={color} strokeWidth="1" />
        </g>
      </svg>
    </div>
  )
}

/* ───────────────────────── GRAIN ───────────────────────── */

function Grain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        opacity: 0.018,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
    />
  )
}

/* ───────────────────────── COMING SOON ───────────────────────── */

function ComingSoon() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const s = v(theme)
  const isDark = theme === 'dark'

  const glow = isDark
    ? '0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.08)'
    : '0 0 40px rgba(0,0,0,0.12), 0 0 80px rgba(0,0,0,0.06)'

  const btnGlow = isDark
    ? '0 0 20px rgba(255,255,255,0.08)'
    : '0 0 20px rgba(0,0,0,0.06)'

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative transition-colors duration-500"
      style={{ background: s.bg, color: s.text }}
    >
      <NordicForest color={s.forestHome} />
      <Grain />

      <div className={`flex flex-col items-center transition-all duration-[2000ms] ease-out relative ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ zIndex: 2 }}
      >
        <h1
          className="tracking-[0.35em] uppercase text-center select-none"
          style={{
            fontSize: 'clamp(1.25rem, 3.5vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '0.35em',
            lineHeight: 1.4,
            textShadow: glow,
          }}
        >
          Upstream<br />Institute
        </h1>

        <div className="w-12 my-8" style={{ height: '1px', background: s.divider }} />

        <p className="text-center max-w-xs"
          style={{ color: s.muted, fontSize: 'clamp(0.7rem, 1.2vw, 0.8125rem)', fontWeight: 300, letterSpacing: '0.08em', lineHeight: 1.7 }}
        >
          Reimagining capital stewardship<br />for intergenerational prosperity.
        </p>

        {/* Modern Read White Paper Button */}
        <button
          onClick={() => { window.location.hash = 'white-paper' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="mt-10 cursor-pointer transition-all duration-300"
          style={{
            padding: '0.7rem 2rem',
            border: `1px solid ${hovered ? s.text : s.muted}`,
            borderRadius: '2px',
            background: 'transparent',
            color: s.text,
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            boxShadow: hovered ? btnGlow : 'none',
          }}
        >
          Read Think Upstream
        </button>

        <div className="mt-8 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: s.text, animation: 'pulse 2.5s ease-in-out infinite' }} />
          <span className="uppercase"
            style={{ color: s.faint, fontSize: '0.625rem', letterSpacing: '0.2em', fontWeight: 400 }}
          >
            Helsinki, 2026
          </span>
        </div>

        <a href="mailto:hello@upstreaminstitute.org"
          className="mt-6 transition-colors duration-700"
          style={{ color: s.faint, fontSize: '0.6875rem', letterSpacing: '0.06em', fontWeight: 300 }}
          onMouseEnter={e => (e.currentTarget.style.color = s.text)}
          onMouseLeave={e => (e.currentTarget.style.color = s.faint)}
        >
          hello@upstreaminstitute.org
        </a>
      </div>

      <div className="absolute bottom-6" style={{ zIndex: 2 }}>
        <span style={{ color: s.ghost, fontSize: '0.5rem', letterSpacing: '0.15em', fontWeight: 300 }}>&reg;</span>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </main>
  )
}

/* ───────────────────────── WHITE PAPER ───────────────────────── */

const TOC = [
  { id: 'where-thoughts', label: 'Where Do Thoughts Come From?' },
  { id: 'losing-agency', label: 'Losing Agency of Thought' },
  { id: 'finance-disconnect', label: 'The Finance Disconnect' },
  { id: 'institutions-fail', label: 'Why Existing Institutions Fail' },
  { id: 'esg-lip-service', label: 'ESG: Lip Service' },
  { id: 'think-upstream', label: 'Think Upstream' },
  { id: 'thought-initiators', label: 'Upstream Thought Initiators' },
]

function WhitePaper() {
  const { theme } = useTheme()
  const [ready, setReady] = useState(false)
  const s = v(theme)

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionProperty: 'opacity, background-color, color', background: s.bg, color: s.text }}
    >
      <NordicForest color={s.forestWP} />
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-center px-6 md:px-12 py-5"
        style={{ background: s.navBg, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: 100 }}
      >
        <button
          onClick={() => { window.location.hash = '' }}
          className="transition-colors duration-500 cursor-pointer"
          style={{ color: s.text, fontSize: '0.6875rem', letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' as const, background: 'none', border: 'none' }}
        >
          Upstream Institute
        </button>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <p className="uppercase mb-8"
          style={{ color: s.muted, fontSize: '0.625rem', letterSpacing: '0.3em', fontWeight: 600 }}
        >
          Think Upstream
        </p>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          Where Do Thoughts Come From?
        </h1>
        <p className="mt-5 max-w-lg mx-auto"
          style={{ color: s.muted, fontSize: 'clamp(0.8125rem, 1.3vw, 1rem)', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.65 }}
        >
          A New School of Thought for Finance, Policy, and Planetary Regeneration
        </p>
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap"
          style={{ fontSize: '0.6875rem', fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.6, color: s.muted }}
        >
          <span>Dr. Paavo Pylkk&auml;nen</span>
          <span style={{ color: s.ghost }}>|</span>
          <span>Dr. Elina Pylkk&auml;nen</span>
          <span style={{ color: s.ghost }}>|</span>
          <span>Sagar Tandon</span>
        </div>
        <p className="mt-3" style={{ color: s.faint, fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.04em' }}>
          Helsinki, Finland &middot; June 2026
        </p>
      </header>

      {/* Table of Contents */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 mb-16">
        <div style={{ borderTop: `1px solid ${s.divider}`, borderBottom: `1px solid ${s.divider}` }} className="py-8">
          <p className="uppercase mb-5" style={{ color: s.faint, fontSize: '0.625rem', letterSpacing: '0.2em', fontWeight: 600 }}>Index</p>
          <ol className="space-y-3">
            {TOC.map((item, i) => (
              <li key={item.id}>
                <button
                  onClick={(e) => { e.preventDefault(); scrollTo(item.id) }}
                  className="transition-colors duration-300 cursor-pointer text-left w-full"
                  style={{ color: s.muted, fontSize: '0.8125rem', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.5, background: 'none', border: 'none', padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = s.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = s.muted)}
                >
                  <span style={{ color: s.faint, marginRight: '0.75rem', fontSize: '0.75rem' }}>{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Body */}
      <article
        className="max-w-2xl mx-auto px-6 md:px-12 pb-32"
        style={{ fontSize: 'clamp(0.9375rem, 1.15vw, 1.0625rem)', fontWeight: 300, lineHeight: 1.85, color: s.text }}
      >
        <WPSection id="where-thoughts" title="Where Do Thoughts Come From?">
          <p>Where do thoughts come from? How do thoughts define the physical world we live in? Do we even think critically about our thoughts before jumping on the bandwagon to research basic sciences, innovate, create, and scale technologies, or even finance the sciences and technologies and seek returns from that?</p>
          <p>As David Bohm eloquently put it,</p>
          <blockquote className="my-6 pl-5 italic" style={{ borderLeft: `1px solid ${s.divider}`, color: s.muted }}>
            <p>&ldquo;Thought is the ultimate origin or source; if we don&rsquo;t do anything about thought, we won&rsquo;t get anywhere. We may momentarily relieve the population problem, the ecological problem, and so on, but they will come back in another way.&rdquo;</p>
          </blockquote>
          <p>Thought is the starting point; if we put thought out of the window while trying to do research, innovate, or create something, we are not really going beyond the thought that is already embedded in our conscious/unconscious mind, and that affects everything; hence, the abstractions we get out of the thoughts will be affected, and hence overall perception will be affected too.</p>
        </WPSection>

        <WPSection id="losing-agency" title="Losing Agency of Thought">
          <p>With the advent of mindless scrolling because of social media, dopamine hits and instant gratification from LLMs, agents, and chatbots are numbing us; it is slowing the thinking process but most importantly it is damaging our thoughts to even refresh or reboot, and challenge the assumptions of our own thoughts and start a thought process from scratch. We are slowly handing over agency of thought to the machine, in the name of artificial intelligence, that is still nothing but 0s and 1s, a black box to recognize patterns to spit out a cohesive-sounding sentence, but it is not thought, and if it is not, worth contemplating on as it misses the human ingenuity. The discoveries are not made on just some data and previous thoughts, but breakthroughs come to live when we can push boundaries of thought.</p>
        </WPSection>

        <WPSection id="finance-disconnect" title="The Finance Disconnect">
          <p>The world of finance that I come from is not just a passive culprit, but actively involved in destroying the very essence of human principles, not because it is inherently evil, but rather because of the thought, or the lack of challenging, the status quo. Several assumptions about the current form of finance and capitalism are purely based on the opinions of neo-liberal economists like Milton Friedman, which have been overly amplified and adopted without knowing the facts or challenging the thoughts not just enough, but not at all, and that is the core issue, which has rotten the field of finance. With time, it has become more and more disconnected from the real world and the reality that humans live in and where nature exists.</p>
          <p>Think tanks have become key in propagating a certain way of thinking, and it affects not just policymakers and capitalists but also ordinary people; it is so deeply entrenched now that we have lost the ability to think. From quantum computers to basic science, innovation and technological advancement have loosened our grip on thinking; as a result, we haphazardly fund abstractions, which shapes our worldview of the real world and the reality we live in.</p>
          <p>We are living through the &ldquo;Great Divorce&rdquo;: the decoupling of the capital markets from the productive, real-world economy. When the Price-to-Earnings (PE) ratio rises to historically high levels, the real-world disconnect happens. And right now, that disconnect is threatening to send net real value creation &ldquo;into the toilet.&rdquo;</p>
          <p>In the race between labor and capital, capital is lapping the field. Last year, real wages &mdash; the actual purchasing power of the average American worker &mdash; fell by 0.3% in a single month, reversing years of hard-won gains. Meanwhile, those sitting on assets saw a windfall. If you had your money in the S&P 500, you enjoyed an 18% return. To put that in human terms: the passive return on a $50,000 portfolio generated more income last year than the annual raise of a median worker. This is value extraction over value creation.</p>
          <p>This has adverse effects on everything in the real world we live in&mdash;the world that is getting shaped by flawed thoughts, hence abstractions, overall affecting our perceptions.</p>
        </WPSection>

        <WPSection id="institutions-fail" title="Why Existing Institutions Fail">
          <p>Institutions like the Hoover Institution, the Cato Institute, and the Brookings Institution operate on assumptions and ideas largely rooted in the Newtonian paradigm. They view the economy as a mechanistic system, devoid of humans and nature, and as independent agents, which is further from the truth. They optimize for maximum extraction in the name of shareholder value creation, as if that is the ultimate motto for human existence, survival, and purpose, which affects humanity in profound ways, as it challenges not only the role of the state but also challenges the role of even humans. It is based on the premise of only one thought, shareholder increase in dollar terms, which is a very short-sighted thing to do as it could be argued they support long-term shareholder destruction in value, as there is no value for the shareholder when there is no stable state to live, humans not flourishing and nature is dying.</p>
          <p>These institutions seek to make extraction more palatable, not to replace extraction with regeneration, by looking at the interconnectedness of the system, and that the system change starts with the one thought, as it is the starting point, that affects the inner system and hence affects the whole system essentially, as everything is entangled with each other in profound ways.</p>
        </WPSection>

        <WPSection id="esg-lip-service" title="ESG: Lip Service">
          <p>To me, the response to these neo-liberal thoughts in the form of ESG and impact investing is nothing but lip service, as this is often fragmented thought in action, applying a thin ethical veneer to the same extractive capital structures, which are based on one thought of shareholder optimization in the short term, forgetting what will happen in a generation or so. They accept a false dichotomy that doing good requires sacrificing financial return; this is also a fear-based assumption, not a factual one. They lack a rigorous philosophical arm; hence, they deploy capital without challenging the legal and ontological frameworks that make extraction possible in the first place.</p>
        </WPSection>

        <WPSection id="think-upstream" title="Think Upstream">
          <p>We need to think upstream: fuse philosophy with rigorous research through challenging thought and dialogue, and deploy capital in ways that push science beyond the current limits of our thinking, fund breakthroughs, and compound impact for humanity and nature.</p>
          <p>Essentially, Upstream Institute has three legs:</p>
          <WPSubSection title="Think & Dialogue">
            <p>Pushing the boundaries of thought by bringing dialogue back.</p>
            <ul>
              <li>Content &mdash; Books, Podcasts</li>
              <li>Research Papers, White Papers</li>
              <li>Event Properties</li>
            </ul>
          </WPSubSection>
          <WPSubSection title="Social Policy Lab">
            <p>Leveraging Finland&rsquo;s/Nordics unique administrative infrastructure, the Lab treats the nation as a living laboratory to experiment with ideas.</p>
            <ul>
              <li>Population-Scale Testing</li>
              <li>Environmental-Scale Testing</li>
            </ul>
          </WPSubSection>
          <WPSubSection title="Capital Deployment">
            <p>That funds the research, basic sciences, innovation, and technology.</p>
            <ul>
              <li>Funds researchers &mdash; basic sciences and philosophers in the form of grants</li>
              <li>Outcome Bonds to prove entanglement in the form of debt linked to impact outcomes</li>
              <li>SME Patient Capital Vehicles: Debt and equity hybrids that provide permanent capital to small and medium enterprises, prioritizing community resilience over extractive buyouts.</li>
              <li>Funding the Deep-tech in unusual ways with a long-term mindset and value creation for humanity and nature.</li>
            </ul>
          </WPSubSection>
          <p style={{ color: s.muted, fontStyle: 'italic' }}>
            From Finland, we invite the world to think upstream.
          </p>
        </WPSection>

        {/* Upstream Thought Initiators */}
        <WPSection id="thought-initiators" title="Upstream Thought Initiators">
          <WPAuthor name="Dr. Paavo Pylkk&auml;nen" role="Philosophical Director">
            Dr. Pylkk&auml;nen is a distinguished philosopher whose decades of work on physicist David Bohm&rsquo;s theories of quantum physics and consciousness provide the ontological foundation for the Upstream Institute. He has extensively researched the concept of the &ldquo;Implicate Order&rdquo;&mdash;the view that reality is an unbroken, flowing whole rather than a collection of isolated parts. At the Institute, Dr. Pylkk&auml;nen directs intellectual coherence, ensuring that all research, policy design, and capital deployment transcend the limitations of fragmented, mechanical thought.
          </WPAuthor>
          <WPAuthor name="Dr. Elina Pylkk&auml;nen" role="Social Policy Director">
            Dr. Pylkk&auml;nen is a distinguished economist currently serving as Under-Secretary of State at Finland&rsquo;s Ministry of Economic Affairs and Employment. She holds a PhD in Economics and has previously served as Director of the Labor Institute for Economic Research (LABORE), Senior Economist at the OECD in Paris, and Visiting Scholar at Stanford University. Dr. Pylkk&auml;nen brings unparalleled expertise in labor markets, taxation, and social policy design. She leads the Upstream Nordic Social Policy Research Lab, translating philosophical frameworks into rigorous, population-scale economic interventions.
          </WPAuthor>
          <WPAuthor name="Sagar Tandon" role="Impact Finance Director">
            Sagar Tandon is a Partner at Beyond Impact VC, investing in industrial biotech and climate-bio companies globally. He also advises the Society for Cell Agriculture APAC and supports several climate initiatives, including WePlanet.org and Atlan.fi, EIT, Good Food Institute, Big Ideas Ventures, Fashion For Good, and Rethinking Materials as a strategic advisor and mentor. A 2X Global Forum member, he promotes gender and climate-smart impact investing. Currently, he serves as an honorary advisory board member of EIT Community New European Bauhaus. In his investing career, he has led investments in more than 25+ startups and launched 3 funds from emerging markets - India and Southeast Asia to developed markets (Europe, the US, and East Asia). He has built and run an accelerator for aspiring female fund managers, supported by an Australian government-funded project, Frontier Lab Asia, and Gray Matters Capital. He writes a substack newsletter (https://firstfollowers.substack.com/) with more than 4,000 subscribers about venture capital, private markets, impact investing, venture studios, and more.
          </WPAuthor>
        </WPSection>

        {/* Footer */}
        <footer className="mt-24 pt-8" style={{ borderTop: `1px solid ${s.divider}` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p style={{ color: s.text, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em' }}>
                The Upstream Institute
              </p>
              <p style={{ color: s.faint, fontSize: '0.6875rem', fontWeight: 300 }}>
                Helsinki, Finland
              </p>
            </div>
            <a href="mailto:hello@upstreaminstitute.org"
              className="transition-colors duration-500"
              style={{ color: s.faint, fontSize: '0.6875rem', fontWeight: 300, letterSpacing: '0.03em' }}
              onMouseEnter={e => (e.currentTarget.style.color = s.text)}
              onMouseLeave={e => (e.currentTarget.style.color = s.faint)}
            >
              hello@upstreaminstitute.org
            </a>
          </div>
        </footer>
      </article>
    </div>
  )
}

/* ───────────────────────── WHITE PAPER COMPONENTS ───────────────────────── */

function WPSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 md:mb-20" style={{ scrollMarginTop: '5rem' }}>
      <h2 className="mb-8" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', fontWeight: 700, letterSpacing: '0.02em', lineHeight: 1.35 }}>
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function WPSubSection({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useTheme()
  const s = v(theme)
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-3" style={{ fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)', fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.45 }}>
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function WPAuthor({ name, role, children }: { name: string; role: string; children: React.ReactNode }) {
  const { theme } = useTheme()
  const s = v(theme)
  return (
    <div className="mb-8 last:mb-0">
      <p style={{ fontWeight: 600, lineHeight: 1.5 }}>
        <span dangerouslySetInnerHTML={{ __html: name }} />
        <span className="ml-2" style={{ color: s.faint, fontSize: '0.875em' }}>| {role}</span>
      </p>
      <p className="mt-2">{children}</p>
    </div>
  )
}

function WPPremise({ number, label, oldPremise, newPremise }: {
  number: string; label: string; oldPremise: string; newPremise: string
}) {
  const { theme } = useTheme()
  const s = v(theme)
  return (
    <div className="my-8 pl-5" style={{ borderLeft: `1px solid ${s.divider}` }}>
      <p className="mb-3" style={{ fontWeight: 600, lineHeight: 1.4 }}>
        <span className="mr-2" style={{ color: s.faint }}>{number}.</span>
        {label}
      </p>
      <p className="mb-2" style={{ color: s.muted, fontSize: '0.9em' }}>
        <span className="uppercase" style={{ color: s.faint, fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 600 }}>The Old Premise: </span>
        <span dangerouslySetInnerHTML={{ __html: oldPremise }} />
      </p>
      <p>
        <span className="uppercase" style={{ color: s.muted, fontSize: '0.625rem', letterSpacing: '0.12em', fontWeight: 600 }}>The Upstream Premise: </span>
        <span dangerouslySetInnerHTML={{ __html: newPremise }} />
      </p>
    </div>
  )
}

/* ───────────────────────── ROUTER ───────────────────────── */

export default function Home() {
  const [view, setView] = useState<'landing' | 'white-paper'>(() =>
    typeof window !== 'undefined' && window.location.hash === '#white-paper' ? 'white-paper' : 'landing'
  )

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      if (hash === '#white-paper') {
        setView('white-paper')
      } else {
        setView('landing')
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <ThemeProvider>
      <ThemeToggle />
      {view === 'white-paper' ? <WhitePaper /> : <ComingSoon />}
    </ThemeProvider>
  )
}