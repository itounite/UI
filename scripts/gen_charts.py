#!/usr/bin/env python3
"""Generate all 10 Upstream Institute white paper charts."""
import subprocess, json, os, sys

OUT = "/home/z/my-project/public/charts"
os.makedirs(OUT, exist_ok=True)

CHARTS = [
  # 1. Thought as the Starting Point
  {
    "name": "thought-starting-point",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:720px;width:100%}
h2{font-size:18px;font-weight:700;color:#1F2937;letter-spacing:0.02em;margin-bottom:24px;text-align:center}
.flow{display:flex;flex-direction:column;gap:0;align-items:center}
.node{background:#F0F4F8;border:1.5px solid #94A3B8;border-radius:6px;padding:14px 28px;text-align:center;font-size:14px;color:#1F2937;font-weight:500;width:340px}
.node.accent{background:#EFF6FF;border-color:#3B82F6;color:#1E40AF}
.node.highlight{background:#DBEAFE;border-color:#2563EB;color:#1E3A8A;font-weight:700}
.arrow{width:2px;height:28px;background:#94A3B8;position:relative}
.arrow::after{content:'▼';position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);color:#94A3B8;font-size:10px}
.label{font-size:11px;color:#64748B;margin-top:2px;margin-bottom:6px;font-style:italic}
.bohm{margin-top:20px;padding:16px 20px;background:#F8FAFC;border-left:3px solid #94A3B8;border-radius:0 6px 6px 0;font-style:italic;font-size:13px;color:#475569;line-height:1.6}
.bohm em{font-style:normal;font-weight:600;color:#1E40AF}
</style></head><body><div class="card">
<h2>Thought Is the Starting Point</h2>
<div class="flow">
  <div class="node highlight">Thought (Conscious &amp; Unconscious)</div>
  <div class="arrow"></div>
  <div class="label">shapes</div>
  <div class="node accent">Abstractions &amp; Assumptions</div>
  <div class="arrow"></div>
  <div class="label">defines</div>
  <div class="node">Perception of Reality</div>
  <div class="arrow"></div>
  <div class="label">governs</div>
  <div class="node">Actions &amp; Systems Built</div>
  <div class="arrow"></div>
  <div class="label">creates</div>
  <div class="node accent">The World We Live In</div>
</div>
<div class="bohm">
  <em>David Bohm:</em> &ldquo;Thought is the ultimate origin or source; if we don&rsquo;t do anything about thought, we won&rsquo;t get anywhere.&rdquo;
</div>
</div></body></html>"""
  },

  # 2. Losing Agency of Thought
  {
    "name": "losing-agency",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:760px;width:100%}
h2{font-size:18px;font-weight:700;color:#1F2937;letter-spacing:0.02em;margin-bottom:28px;text-align:center}
.pipeline{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:28px}
.step{background:#FEF3C7;border:1.5px solid #D97706;border-radius:6px;padding:10px 16px;font-size:12px;color:#92400E;font-weight:500;text-align:center;min-width:100px}
.step.danger{background:#FEE2E2;border-color:#DC2626;color:#991B1B}
.step.final{background:#DBEAFE;border-color:#2563EB;color:#1E3A8A;font-weight:700}
.arr{color:#94A3B8;font-size:16px}
.bottom{display:flex;gap:20px;justify-content:center}
.box{flex:1;max-width:320px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;padding:16px}
.box h3{font-size:13px;font-weight:700;color:#1E40AF;margin-bottom:8px}
.box p{font-size:12px;color:#475569;line-height:1.6}
</style></head><body><div class="card">
<h2>Losing Agency of Thought</h2>
<div class="pipeline">
  <div class="step">Social Media<br>Scrolling</div>
  <div class="arr">→</div>
  <div class="step">Dopamine<br>Hits</div>
  <div class="arr">→</div>
  <div class="step">LLMs &amp;<br>Chatbots</div>
  <div class="arr">→</div>
  <div class="step danger">Numbing of<br>Thinking</div>
  <div class="arr">→</div>
  <div class="step danger">Cannot Refresh<br>or Challenge<br>Assumptions</div>
  <div class="arr">→</div>
  <div class="step final">Handing Over<br>Agency to<br>Machine</div>
</div>
<div class="bottom">
  <div class="box">
    <h3>The Illusion</h3>
    <p>AI appears intelligent &mdash; but it is 0s and 1s, a black box recognizing patterns to produce coherent-sounding output. It is not thought.</p>
  </div>
  <div class="box">
    <h3>The Reality</h3>
    <p>Breakthroughs come from pushing boundaries of thought, not from data and previous thoughts alone. Human ingenuity cannot be outsourced.</p>
  </div>
</div>
</div></body></html>"""
  },

  # 3. The Great Divorce
  {
    "name": "great-divorce",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:740px;width:100%}
h2{font-size:18px;font-weight:700;color:#1F2937;margin-bottom:8px;text-align:center}
.sub{font-size:12px;color:#64748B;margin-bottom:24px;text-align:center;font-style:italic}
.split{display:flex;gap:24px;margin-bottom:24px}
.col{flex:1;border-radius:8px;padding:20px;position:relative}
.col.left{background:#DBEAFE;border:1.5px solid #3B82F6}
.col.right{background:#FEE2E2;border:1.5px solid #EF4444}
.col h3{font-size:14px;font-weight:700;margin-bottom:12px}
.col.left h3{color:#1E40AF}
.col.right h3{color:#991B1B}
.stat{text-align:center;margin-bottom:10px}
.stat .num{font-size:28px;font-weight:700;display:block}
.col.left .num{color:#1E40AF}
.col.right .num{color:#991B1B}
.stat .lbl{font-size:11px;color:#475569}
.divider{display:flex;align-items:center;justify-content:center;margin:12px 0}
.divider span{background:#1F2937;color:#F8FAFC;padding:6px 16px;border-radius:4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase}
.note{background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;padding:14px 18px;font-size:12px;color:#475569;line-height:1.6;text-align:center}
.note strong{color:#1E40AF}
</style></head><body><div class="card">
<h2>The Great Divorce</h2>
<div class="sub">The decoupling of capital markets from the productive, real-world economy</div>
<div class="split">
  <div class="col left">
    <h3>Capital Markets</h3>
    <div class="stat"><span class="num">+18%</span><span class="lbl">S&amp;P 500 return (2024)</span></div>
    <div class="stat"><span class="num">$9,000</span><span class="lbl">Passive income from $50K portfolio</span></div>
  </div>
  <div class="col right">
    <h3>Real-World Labor</h3>
    <div class="stat"><span class="num">−0.3%</span><span class="lbl">Real wage change in single month</span></div>
    <div class="stat"><span class="num">&lt; $600</span><span class="lbl">Annual raise of median worker</span></div>
  </div>
</div>
<div class="divider"><span>Value Extraction &gt; Value Creation</span></div>
<div class="note">
  <strong>The passive return on a $50,000 portfolio</strong> generated more income last year than the annual raise of a median worker. This is the Great Divorce in human terms.
</div>
</div></body></html>"""
  },

  # 4. Why Existing Institutions Fail
  {
    "name": "institutions-fail",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:760px;width:100%}
h2{font-size:18px;font-weight:700;color:#1F2937;margin-bottom:24px;text-align:center}
.cols{display:flex;gap:20px;margin-bottom:20px}
.col{flex:1;border-radius:8px;padding:18px;border:1.5px solid}
.col.old{background:#FEF3C7;border-color:#D97706}
.col.new{background:#ECFDF5;border-color:#059669}
.col h3{font-size:13px;font-weight:700;margin-bottom:10px;letter-spacing:0.02em}
.col.old h3{color:#92400E}
.col.new h3{color:#065F46}
.item{font-size:12px;color:#475569;line-height:1.5;margin-bottom:6px;padding-left:14px;position:relative}
.item::before{content:'';position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%}
.col.old .item::before{background:#D97706}
.col.new .item::before{background:#059669}
.versus{text-align:center;margin:12px 0;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#64748B;text-transform:uppercase}
</style></head><body><div class="card">
<h2>Why Existing Institutions Fail</h2>
<div class="cols">
  <div class="col old">
    <h3>Newtonian Paradigm</h3>
    <div class="item">Economy as mechanistic system</div>
    <div class="item">Independent, isolated agents</div>
    <div class="item">Devoid of humans &amp; nature</div>
    <div class="item">Optimize for shareholder extraction</div>
    <div class="item">Short-term dollar maximization</div>
    <div class="item">Make extraction more palatable</div>
  </div>
  <div class="col new">
    <h3>Entangled Paradigm</h3>
    <div class="item">Economy as interconnected system</div>
    <div class="item">Entangled co-creators</div>
    <div class="item">Humans &amp; nature as core</div>
    <div class="item">Replace extraction with regeneration</div>
    <div class="item">Long-term value for stable state</div>
    <div class="item">System change starts with thought</div>
  </div>
</div>
<div class="versus">Hoover · Cato · Brookings → All operate on the left</div>
</div></body></html>"""
  },

  # 5. ESG Lip Service
  {
    "name": "esg-lip-service",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:700px;width:100%}
h2{font-size:18px;font-weight:700;color:#1F2937;margin-bottom:24px;text-align:center}
.layer{border-radius:8px;padding:18px 20px;margin-bottom:4px;position:relative}
.layer.core{background:#FEE2E2;border:1.5px solid #EF4444}
.layer.veneer{background:#DBEAFE;border:1.5px solid #3B82F6;margin-top:-4px}
.layer h3{font-size:13px;font-weight:700;margin-bottom:6px}
.layer.core h3{color:#991B1B}
.layer.veneer h3{color:#1E40AF}
.layer p{font-size:12px;color:#475569;line-height:1.5}
.issues{display:flex;gap:12px;margin-top:20px}
.issue{flex:1;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;padding:14px;text-align:center}
.issue .icon{font-size:22px;margin-bottom:6px;display:block}
.issue h4{font-size:12px;font-weight:700;color:#1E40AF;margin-bottom:4px}
.issue p{font-size:11px;color:#64748B;line-height:1.4}
</style></head><body><div class="card">
<h2>ESG &amp; Impact Investing: Lip Service</h2>
<div class="layer core">
  <h3>Same Extractive Capital Structure</h3>
  <p>Shareholder optimization in the short term. No challenge to legal or ontological frameworks that enable extraction.</p>
</div>
<div class="layer veneer">
  <h3>+ Thin Ethical Veneer (ESG / Impact)</h3>
  <p>Fragmented thought in action &mdash; applying a surface layer without changing the underlying structure.</p>
</div>
<div class="issues">
  <div class="issue">
    <span class="icon">⚙️</span>
    <h4>False Dichotomy</h4>
    <p>&ldquo;Doing good requires sacrificing return&rdquo; &mdash; a fear-based assumption, not fact</p>
  </div>
  <div class="issue">
    <span class="icon">🧩</span>
    <h4>No Philosophical Arm</h4>
    <p>Deploy capital without challenging the frameworks that make extraction possible</p>
  </div>
  <div class="issue">
    <span class="icon">⏱️</span>
    <h4>Short-Term Memory</h4>
    <p>Forget what happens in a generation &mdash; optimize for this quarter</p>
  </div>
</div>
</div></body></html>"""
  },

  # 6. Three Legs Overview
  {
    "name": "three-legs",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:780px;width:100%}
h2{font-size:18px;font-weight:700;color:#1F2937;margin-bottom:8px;text-align:center}
.sub{font-size:12px;color:#64748B;margin-bottom:28px;text-align:center;font-style:italic}
.legs{display:flex;gap:16px}
.leg{flex:1;border-radius:8px;padding:20px 16px;text-align:center;border:1.5px solid;position:relative}
.leg:nth-child(1){background:#EFF6FF;border-color:#3B82F6}
.leg:nth-child(2){background:#ECFDF5;border-color:#059669}
.leg:nth-child(3){background:#FFF7ED;border-color:#D97706}
.leg .num{font-size:36px;font-weight:300;opacity:0.25;display:block;margin-bottom:4px}
.leg:nth-child(1) .num{color:#3B82F6}
.leg:nth-child(2) .num{color:#059669}
.leg:nth-child(3) .num{color:#D97706}
.leg h3{font-size:14px;font-weight:700;margin-bottom:8px}
.leg:nth-child(1) h3{color:#1E40AF}
.leg:nth-child(2) h3{color:#065F46}
.leg:nth-child(3) h3{color:#92400E}
.leg p{font-size:11px;color:#475569;line-height:1.5}
.loop{text-align:center;margin-top:20px;padding:12px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;font-size:12px;color:#64748B}
.loop strong{color:#1E40AF}
</style></head><body><div class="card">
<h2>Upstream Institute: Three Legs</h2>
<div class="sub">A unified feedback loop where theory informs capital, and capital generates data that refines theory</div>
<div class="legs">
  <div class="leg">
    <span class="num">1</span>
    <h3>Think &amp; Dialogue</h3>
    <p>Pushing boundaries of thought by bringing dialogue back</p>
  </div>
  <div class="leg">
    <span class="num">2</span>
    <h3>Social Policy Lab</h3>
    <p>Living laboratory leveraging Nordic infrastructure</p>
  </div>
  <div class="leg">
    <span class="num">3</span>
    <h3>Capital Deployment</h3>
    <p>Funding research, science, innovation &amp; technology</p>
  </div>
</div>
<div class="loop"><strong>Theory → Capital → Data → Refined Theory</strong> — Not a loose coalition, a unified system</div>
</div></body></html>"""
  },

  # 7. Leg 1: Think & Dialogue
  {
    "name": "leg1-think-dialogue",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:640px;width:100%}
h2{font-size:18px;font-weight:700;color:#1E40AF;margin-bottom:20px;text-align:center}
.items{display:flex;flex-direction:column;gap:12px}
.item{background:#EFF6FF;border:1.5px solid #93C5FD;border-radius:8px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px}
.item .icon{font-size:24px;flex-shrink:0;margin-top:2px}
.item h3{font-size:13px;font-weight:700;color:#1E40AF;margin-bottom:4px}
.item p{font-size:12px;color:#475569;line-height:1.5}
</style></head><body><div class="card">
<h2>Leg 1: Think &amp; Dialogue</h2>
<div class="items">
  <div class="item"><span class="icon">📖</span><div><h3>Content &mdash; Books, Podcasts</h3><p>Long-form exploration of ideas that challenge embedded assumptions and push the boundaries of thought.</p></div></div>
  <div class="item"><span class="icon">📝</span><div><h3>Research Papers, White Papers</h3><p>Rigorous philosophical and economic research that doesn&rsquo;t just patch the model &mdash; it rebuilds the foundation.</p></div></div>
  <div class="item"><span class="icon">🎙️</span><div><h3>Event Properties</h3><p>Dialogues, convenings, and forums where thought is challenged live &mdash; not echo chambers, but arenas for genuine inquiry.</p></div></div>
</div>
</div></body></html>"""
  },

  # 8. Leg 2: Social Policy Lab
  {
    "name": "leg2-social-policy",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:640px;width:100%}
h2{font-size:18px;font-weight:700;color:#065F46;margin-bottom:8px;text-align:center}
.sub{font-size:12px;color:#64748B;margin-bottom:20px;text-align:center;font-style:italic}
.items{display:flex;flex-direction:column;gap:12px}
.item{background:#ECFDF5;border:1.5px solid #6EE7B7;border-radius:8px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px}
.item .icon{font-size:24px;flex-shrink:0;margin-top:2px}
.item h3{font-size:13px;font-weight:700;color:#065F46;margin-bottom:4px}
.item p{font-size:12px;color:#475569;line-height:1.5}
</style></head><body><div class="card">
<h2>Leg 2: Social Policy Lab</h2>
<div class="sub">Leveraging Finland&rsquo;s/Nordics unique administrative infrastructure</div>
<div class="items">
  <div class="item"><span class="icon">👥</span><div><h3>Population-Scale Testing</h3><p>Co-design interventions with the Finnish government &mdash; child poverty, homelessness, social connection &mdash; and track macroeconomic results across entire demographics over time.</p></div></div>
  <div class="item"><span class="icon">🌍</span><div><h3>Environmental-Scale Testing</h3><p>Treat the nation as a living laboratory to experiment with ideas and generate irrefutable data proving entanglement of social equity and economic dynamism.</p></div></div>
</div>
</div></body></html>"""
  },

  # 9. Leg 3: Capital Deployment
  {
    "name": "leg3-capital-deployment",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:640px;width:100%}
h2{font-size:18px;font-weight:700;color:#92400E;margin-bottom:20px;text-align:center}
.items{display:flex;flex-direction:column;gap:12px}
.item{background:#FFF7ED;border:1.5px solid #FCD34D;border-radius:8px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px}
.item .icon{font-size:24px;flex-shrink:0;margin-top:2px}
.item h3{font-size:13px;font-weight:700;color:#92400E;margin-bottom:4px}
.item p{font-size:12px;color:#475569;line-height:1.5}
</style></head><body><div class="card">
<h2>Leg 3: Capital Deployment</h2>
<div class="items">
  <div class="item"><span class="icon">🔬</span><div><h3>Fund Researchers</h3><p>Basic sciences and philosophers in the form of grants &mdash; investing in the thought that precedes all innovation.</p></div></div>
  <div class="item"><span class="icon">🔗</span><div><h3>Outcome Bonds</h3><p>Prove entanglement in the form of debt linked to impact outcomes &mdash; returns tied to measurable social and ecological healing.</p></div></div>
  <div class="item"><span class="icon">🏗️</span><div><h3>SME Patient Capital Vehicles</h3><p>Debt and equity hybrids providing permanent capital to small and medium enterprises, prioritizing community resilience over extractive buyouts.</p></div></div>
  <div class="item"><span class="icon">🧬</span><div><h3>Deep-Tech Funding</h3><p>Funding deep-tech in unusual ways with a long-term mindset and value creation for humanity and nature.</p></div></div>
</div>
</div></body></html>"""
  },

  # 10. Full Causal Chain
  {
    "name": "causal-chain",
    "html": """<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#FAFAFA;font-family:Inter,system-ui,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:40px}
.card{max-width:780px;width:100%}
h2{font-size:18px;font-weight:700;color:#1F2937;margin-bottom:24px;text-align:center}
.chain{display:flex;flex-direction:column;align-items:center;gap:0}
.phase{width:100%;border-radius:8px;padding:16px 20px;margin-bottom:2px;display:flex;align-items:center;gap:16px}
.phase.problem{background:#FEE2E2;border:1.5px solid #FCA5A5}
.phase.bridge{background:#FEF3C7;border:1.5px solid #FCD34D}
.phase.solution{background:#ECFDF5;border:1.5px solid #6EE7B7}
.phase .tag{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;writing-mode:vertical-lr;transform:rotate(180deg);flex-shrink:0}
.phase.problem .tag{color:#991B1B}
.phase.bridge .tag{color:#92400E}
.phase.solution .tag{color:#065F46}
.phase h3{font-size:13px;font-weight:700;margin-bottom:4px}
.phase.problem h3{color:#991B1B}
.phase.bridge h3{color:#92400E}
.phase.solution h3{color:#065F46}
.phase p{font-size:12px;color:#475569;line-height:1.4}
.arr{width:2px;height:16px;background:#94A3B8;position:relative}
.arr::after{content:'▼';position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);color:#94A3B8;font-size:9px}
</style></head><body><div class="card">
<h2>From Problem to Solution: The Full Causal Chain</h2>
<div class="chain">
  <div class="phase problem"><span class="tag">Problem</span><div><h3>Flawed Thought</h3><p>Unchallenged assumptions embedded in conscious/unconscious mind</p></div></div>
  <div class="arr"></div>
  <div class="phase problem"><span class="tag">Problem</span><div><h3>Neo-Liberal Dominance</h3><p>Milton Friedman&rsquo;s opinions amplified without challenge</p></div></div>
  <div class="arr"></div>
  <div class="phase problem"><span class="tag">Problem</span><div><h3>The Great Divorce</h3><p>Capital markets decoupled from real-world economy</p></div></div>
  <div class="arr"></div>
  <div class="phase bridge"><span class="tag">Bridge</span><div><h3>Think Upstream</h3><p>Fuse philosophy + rigorous research + challenging thought</p></div></div>
  <div class="arr"></div>
  <div class="phase solution"><span class="tag">Solution</span><div><h3>Think &amp; Dialogue</h3><p>Push boundaries of thought, content, events</p></div></div>
  <div class="arr"></div>
  <div class="phase solution"><span class="tag">Solution</span><div><h3>Social Policy Lab</h3><p>Prove entanglement at population &amp; environmental scale</p></div></div>
  <div class="arr"></div>
  <div class="phase solution"><span class="tag">Solution</span><div><h3>Capital Deployment</h3><p>Grants, outcome bonds, patient capital, deep-tech funding</p></div></div>
</div>
</div></body></html>"""
  },
]

# Generate each chart using Playwright
for chart in CHARTS:
    html_path = f"/tmp/{chart['name']}.html"
    png_path = f"{OUT}/{chart['name']}.png"
    
    with open(html_path, 'w') as f:
        f.write(chart['html'])
    
    print(f"Generating {chart['name']}...")
    result = subprocess.run([
        'npx', 'playwright', 'screenshot',
        '--browser', 'chromium',
       5       '--full-page',
        html_path,
        png_path
    ], capture_output=True, text=True, timeout=30)
    
    if result.returncode != 0:
        # Fallback: use Node.js script
        print(f"  Playwright CLI failed, trying Node script...")
        js = f"""
const {{ chromium }} = require('playwright');
(async () => {{
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://{html_path}');
  await page.waitForTimeout(500);
  const box = await page.evaluate0.evaluate(() => {{
    const el = document.querySelector('.card');
    return el ? el.getBoundingClientRect() : null;
  }});
  if (box) {{
    await page.setViewportSize({{ width: Math.ceil(box.width) + 80, height: Math.ceil(box.height) + 80 }});
  }}
  await page.screenshot({{ path: '{png_path}', fullPage: true }});
  await browser.close();
}})();
"""
        js_path = f"/tmp/{chart['name']}.mjs"
        with open(js_path, 'w') as f:
            f.write(js.replace('0.evaluate', '.evaluate'))
        result2 = subprocess.run(['node', js_path], capture_output=True, text=True, timeout=30)
        if result2.returncode != 0:
            print(f"  ERROR: {result2.stderr[:200]}")
        else:
            print(f"  OK → {png_path}")
    else:
        print(f"  OK → {png_path}")

print("\nDone! All charts saved to", OUT)
