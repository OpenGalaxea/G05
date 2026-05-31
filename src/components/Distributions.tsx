import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Galaxea Visual Palette (from color.png) — brand-led, distinguishable on dark.
const PALETTE = [
  '#FF8A1E', '#4B6B88', '#FFA94D', '#3FB68B', '#D9534F', '#7088A1', '#FFB866',
  '#72D5B2', '#C46A5A', '#9FB4C8', '#D96A00', '#A7B0BC', '#31485E', '#A84D00',
];

type Raw = { name: string; hours: number; desc: string; specs: string[] };

// Pre-training hours (from g05_embodiments.py). desc/specs are real-world facts.
const EMB_RAW: Raw[] = [
  { name: 'R1 Lite', hours: 7216.92, desc: "Galaxea AI mobile dual-arm platform for whole-body daily manipulation.", specs: ["Galaxea AI", "Mobile dual-arm", "2×6-DoF arms + torso + base"] },
  { name: 'R1 Pro', hours: 4089.24, desc: "Galaxea AI humanoid upper-body mobile manipulator.", specs: ["Galaxea AI", "Humanoid upper-body", "2×7-DoF arms + 4-DoF torso"] },
  { name: 'AgiBot', hours: 2168.15, desc: "Full-size humanoid from AgiBot (Zhiyuan), source of the AgiBot World data.", specs: ["AgiBot / Zhiyuan", "Full-size humanoid", "Dual 7-DoF arms"] },
  { name: 'Franka', hours: 614.01, desc: "Franka Emika Panda / Research 3 collaborative research arm.", specs: ["Franka Emika (Germany)", "Single 7-DoF arm", "Torque-controlled"] },
  { name: 'Bimanual YAM', hours: 567.25, desc: "Bimanual setup of the low-cost I2RT YAM arm, teleoperated via GELLO.", specs: ["I2RT Robotics", "Dual-arm setup", "2×6-DoF arms"] },
  { name: 'SO100', hours: 180.99, desc: "SO-ARM100, the low-cost open-source arm popularized by Hugging Face LeRobot.", specs: ["TheRobotStudio (open-source)", "Single arm", "5-DoF"] },
  { name: 'Ark', hours: 166.00, desc: "Robot data collected under the open-source ARK robot-learning framework.", specs: ["ARK framework", "Manipulation + navigation", "Embodiment unverified"] },
  { name: 'AIDA L', hours: 115.83, desc: "Realman RMC-AIDA-L half-humanoid mobile manipulator.", specs: ["Realman Robotics (China)", "Half-humanoid on lift", "2×7-DoF arms"] },
  { name: 'WidowX', hours: 105.17, desc: "Trossen Robotics WidowX 250 arm — the BridgeData platform.", specs: ["Trossen Robotics (USA)", "Single arm", "6-DoF"] },
  { name: 'UR5', hours: 79.81, desc: "Universal Robots UR5 collaborative industrial arm.", specs: ["Universal Robots (Denmark)", "Single arm", "6-DoF"] },
  { name: 'Galbot G1', hours: 48.22, desc: "Galbot wheeled semi-humanoid mobile manipulator.", specs: ["Galbot (China)", "Wheeled semi-humanoid", "Dual 7-DoF arms"] },
  { name: 'Tienkung', hours: 39.92, desc: "Tiangong (天工) full-size bipedal humanoid from Beijing's X-Humanoid center.", specs: ["X-Humanoid (Beijing)", "Bipedal humanoid", "~20 DoF, dual arms"] },
  { name: 'Tianqin A2', hours: 9.76, desc: "Half-humanoid bimanual manipulator by TQ-Artisan (source spelling: Tianqing A2).", specs: ["TQ-Artisan (China)", "Half-humanoid", "2×7-DoF arms"] },
  { name: 'Alpha Bot 2', hours: 5.45, desc: "AI2 Robotics AlphaBot 2 wheeled half-humanoid service robot.", specs: ["AI2 Robotics (Shenzhen)", "Wheeled half-humanoid", "2×7-DoF arms + hands"] },
];
// Pre-training hours (from g05_datasets.py).
const DS_RAW: Raw[] = [
  { name: 'Galaxea', hours: 10146.95, desc: "Galaxea AI in-house teleoperated mobile-manipulation data on R1 robots.", specs: ["Galaxea AI (in-house)", "Teleoperated manipulation", "R1 Lite / R1 Pro"] },
  { name: 'AgiBot', hours: 2168.15, desc: "AgiBot World, a large-scale embodied-AI manipulation dataset.", specs: ["AgiBot / Zhiyuan", "1M+ trajectories", "AgiBot G1 humanoid"] },
  { name: 'BEHAVIOR', hours: 1102.73, desc: "Stanford BEHAVIOR-1K simulation benchmark of everyday household activities.", specs: ["Stanford (OmniGibson)", "1,000 activities · 50 scenes", "Simulated"] },
  { name: 'Bimanual YAM', hours: 567.25, desc: "Bimanual manipulation data on the I2RT YAM dual-arm setup.", specs: ["I2RT / community", "Dual 6-DoF YAM arms", "Scale unpublished"] },
  { name: 'DROID', hours: 511.67, desc: "Large-scale in-the-wild Franka manipulation dataset from 13 institutions.", specs: ["Berkeley-led (13 orgs)", "76k traj · 86 tasks", "Franka Panda"] },
  { name: 'RoboMIND', hours: 376.24, desc: "Multi-embodiment teleoperated manipulation benchmark.", specs: ["Peking Univ. + BAAI", "107k traj · 479 tasks", "Franka, Tiangong, UR5e…"] },
  { name: 'RoboCOIN', hours: 235.74, desc: "Open-source multi-embodiment bimanual manipulation dataset.", specs: ["BAAI-led consortium", "180k+ demos · 421 tasks", "15 robot platforms"] },
  { name: 'SO100', hours: 180.99, desc: "Community manipulation data collected on the SO-ARM100.", specs: ["LeRobot / community", "Open-source contributions", "SO-ARM100"] },
  { name: 'BridgeData', hours: 105.17, desc: "Bridge / BridgeData V2, a WidowX tabletop manipulation dataset.", specs: ["UC Berkeley RAIL", "~60k traj · 24 scenes", "WidowX 250"] },
  { name: 'LIBERO', hours: 11.83, desc: "LIBERO lifelong robot-learning simulation benchmark.", specs: ["UT Austin / Sony", "130 tasks · 4 suites", "Simulated Franka"] },
];

type Item = Raw & { pct: number; color: string };
function prep(raw: Raw[]): { total: number; items: Item[] } {
  const total = raw.reduce((s, d) => s + d.hours, 0);
  const items = raw.map((d, i) => ({ ...d, pct: (d.hours / total) * 100, color: PALETTE[i % PALETTE.length] }));
  return { total, items };
}
const fmtH = (h: number) => h.toLocaleString('en-US', { maximumFractionDigits: 0 });
const fmtP = (p: number) => (p < 1 ? p.toFixed(2) : p.toFixed(1));

// ---- Floating detail panel (sits in the page's left/right blank margin) ----
function DetailPanel({ item, rank, count, label }: { item: Item; rank: number; count: number; label: string }) {
  return (
    <div className="relative w-full bg-[#0d0d0d]/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ background: `radial-gradient(circle at 85% 0%, ${item.color}, transparent 70%)` }} />
      <AnimatePresence mode="wait">
        <motion.div key={item.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="relative">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-8 rounded-lg shrink-0 border border-white/10" style={{ boxShadow: `0 0 12px ${item.color}55` }}>
              <span className="block w-full h-full rounded-lg" style={{ background: `radial-gradient(circle, ${item.color}, ${item.color}22 75%)` }} />
            </span>
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-widest font-mono font-bold" style={{ color: item.color }}>{label}</span>
              <h5 className="text-base font-display font-medium text-white leading-tight truncate">{item.name}</h5>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-3xl font-display font-bold text-white leading-none">{fmtP(item.pct)}%</span>
            <span className="text-[10px] text-neutral-500 font-mono">of corpus</span>
          </div>

          {item.desc && <p className="text-[11px] text-neutral-400 font-light leading-relaxed mb-3">{item.desc}</p>}

          <div className="grid grid-cols-2 gap-1.5 mb-3">
            <div className="bg-white/5 rounded-lg px-2.5 py-1.5">
              <div className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Hours</div>
              <div className="text-[13px] font-mono text-white tabular-nums">{fmtH(item.hours)}</div>
            </div>
            <div className="bg-white/5 rounded-lg px-2.5 py-1.5">
              <div className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Rank</div>
              <div className="text-[13px] font-mono text-white tabular-nums">#{rank} <span className="text-neutral-600">/ {count}</span></div>
            </div>
          </div>

          {item.specs.length > 0 && (
            <ul className="flex flex-col gap-1 mb-3">
              {item.specs.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[10px] font-mono text-neutral-300 leading-snug">
                  <span className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: item.color }} />
                  {s}
                </li>
              ))}
            </ul>
          )}

          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ---- Donut + legend card ----
function DonutCard({ title, subtitle, accent, items, active, setActive }: {
  title: string; subtitle: string; accent: string; items: Item[]; active: number; setActive: (i: number) => void;
}) {
  const a = items[active];
  const small = items.filter((x) => x.pct < 2);
  return (
    <div className="bg-[#111111] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[90px] pointer-events-none" style={{ backgroundColor: `${accent}14` }} />
      <h4 className="text-xl font-display font-medium text-white mb-1 tracking-tight">{title}</h4>
      <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">{subtitle}</p>

      <div className="relative w-full h-72 mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items} dataKey="hours" nameKey="name" cx="50%" cy="50%"
              innerRadius={82} outerRadius={112} startAngle={90} endAngle={-270}
              stroke="none" isAnimationActive={false}
              onMouseEnter={(_: any, i: number) => setActive(i)}
              onClick={(_: any, i: number) => setActive(i)}
            >
              {items.map((it, i) => (
                <Cell key={i} fill={it.color} opacity={active === i ? 1 : 0.4}
                  stroke={active === i ? it.color : 'none'} strokeWidth={active === i ? 2 : 0}
                  style={{ filter: active === i ? `drop-shadow(0 0 6px ${it.color})` : 'none', cursor: 'pointer', transition: 'opacity .2s' }} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-8">
          <span className="text-3xl font-display font-bold text-white leading-none">{fmtP(a.pct)}%</span>
          <span className="text-[12px] font-mono mt-1.5 leading-tight" style={{ color: a.color }}>{a.name}</span>
          <span className="text-[10px] text-neutral-500 font-mono mt-1">{fmtH(a.hours)} h</span>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 max-h-[240px] overflow-y-auto pr-1">
        {items.map((it, i) => (
          <button key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
            className={`flex items-center gap-2.5 px-2 py-1 rounded-md text-left transition-colors ${active === i ? 'bg-white/5' : 'hover:bg-white/[0.03]'}`}>
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: it.color, opacity: active === i ? 1 : 0.65 }} />
            <span className={`text-[12px] font-mono flex-1 truncate ${active === i ? 'text-white' : 'text-neutral-400'}`}>{it.name}</span>
            <span className={`text-[12px] font-mono tabular-nums ${active === i ? 'text-white' : 'text-neutral-500'}`}>{fmtP(it.pct)}%</span>
            <span className="text-[11px] font-mono tabular-nums text-neutral-600 w-16 text-right hidden sm:inline">{fmtH(it.hours)} h</span>
          </button>
        ))}
      </div>

      <p className="text-[11px] text-neutral-500 font-light mt-4 pt-3 border-t border-white/5">
        {items.length} entries · {fmtH(items.reduce((s, x) => s + x.hours, 0))} h · {small.length} below 2% ({small.reduce((s, x) => s + x.pct, 0).toFixed(1)}% combined)
      </p>
    </div>
  );
}

export function Distributions({ onInViewChange }: { onInViewChange?: (v: boolean) => void }) {
  const emb = prep(EMB_RAW);
  const ds = prep(DS_RAW);
  const [ea, setEa] = useState(0);
  const [da, setDa] = useState(0);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // While this section is in view, App swaps the left TOC for the embodiments
  // panel and reveals the dataset panel in the right spacer.
  useEffect(() => {
    const el = ref.current;
    if (!el || !onInViewChange) return;
    const obs = new IntersectionObserver(([e]) => onInViewChange(e.isIntersecting), { rootMargin: '-20% 0px -20% 0px' });
    obs.observe(el);
    return () => { onInViewChange(false); obs.disconnect(); };
  }, [onInViewChange]);

  const leftSlot = mounted ? document.getElementById('distro-left-slot') : null;
  const rightSlot = mounted ? document.getElementById('distro-right-slot') : null;

  return (
    <section ref={ref} className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">4. Pre-training</h2>
      <div className="flex flex-col gap-6 text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        <p>
          G0.5 is pre-trained in a single stage on a heterogeneous mixture of robot demonstrations and web-scale vision–language data. The robot portion covers <strong className="text-white font-medium">18 embodiments</strong> across real and simulated ontologies, all cast into a single 27-dimensional unified action space — partitioned as <code className="bg-surface/60 px-2 py-1 rounded-md text-brand-orange-light font-mono text-[15px] border border-white/10 mx-0.5">left_control(9) | left_gripper(1) | right_control(9) | right_gripper(1) | lower_body(7)</code> — so robots of differing morphology share one output head without per-robot adapters.
        </p>
        <p>
          An automated labeling pipeline turns raw episodes into multi-granularity annotations: rule-based segmentation plus multimodal APIs (Gemini 3, Doubao Seed 2.0 Pro) produce action hints and atomic/episode instructions, foundation models with SAM3 tracking generate per-frame bounding boxes, and forward kinematics projects bimanual end-effector traces onto the image plane. To retain general language ability we co-train with roughly <strong className="text-white font-medium">100M vision–language samples</strong> (generic + embodied VQA) at a 1:4 VQA-to-action ratio, all under the same next-token objective. Each robot sample is assigned one of eight CoT formats by weighted sampling, with subtask-text weighted most heavily.
        </p>
        <p>
          The breakdown below shows how the corpus is composed by robot embodiment (left) and by source dataset (right). <span className="text-brand-orange font-medium">Click or hover</span> a slice or legend row; the detail appears in the page margins on either side.
        </p>
      </div>

      <figure className="mb-12">
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-white/10 shadow-2xl">
          <img src="/images/embodiments.png" alt="Robot platforms represented in pre-training" loading="lazy" className="w-full h-auto rounded-lg select-none pointer-events-none" referrerPolicy="no-referrer" />
        </div>
        <figcaption className="mt-3 text-sm font-mono text-neutral-500 text-center tracking-wide">
          The 18 real and simulated robot platforms that make up the pre-training mixture, from single arms to bimanual mobile manipulators and full-size humanoids.
        </figcaption>
      </figure>

      <div id="distribution-data" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 scroll-mt-32">
        <DonutCard title="Embodiments Distribution" subtitle="Pre-training hours by physical robot embodiment." accent="#FF8A1E" items={emb.items} active={ea} setActive={setEa} />
        <DonutCard title="Datasets Distribution" subtitle="Pre-training hours by source dataset." accent="#4B6B88" items={ds.items} active={da} setActive={setDa} />
      </div>

      <p className="text-sm text-neutral-500 font-light leading-relaxed mb-12 border-l-2 border-white/10 pl-4">
        <span className="font-mono text-neutral-400">Recipe.</span> Trained with AdamW under a single cross-entropy objective (plus the auxiliary flow-matching loss) for ~120K steps. Observations are 6 frames sampled at 1 s over a 5 s window; 30% of memory frames are dropped as regularization for the visual-memory module.
      </p>

      <figure className="mb-4">
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-white/10 shadow-2xl">
          <img src="/images/data_analyze.png" alt="Top-50 action verbs and object nouns in the pre-training corpus" loading="lazy" className="w-full h-auto rounded-lg select-none pointer-events-none" referrerPolicy="no-referrer" />
        </div>
        <figcaption className="mt-3 text-sm font-mono text-neutral-500 text-center tracking-wide">
          Top-50 action verbs and object nouns in the pre-training corpus (log scale). Both follow a long-tailed distribution — dominated by manipulation primitives (pick, place, move) and everyday household objects, with a diverse tail of rarer skills.
        </figcaption>
      </figure>

      {leftSlot && createPortal(<DetailPanel item={emb.items[ea]} rank={ea + 1} count={emb.items.length} label="Embodiment" />, leftSlot)}
      {rightSlot && createPortal(<DetailPanel item={ds.items[da]} rank={da + 1} count={ds.items.length} label="Source dataset" />, rightSlot)}
    </section>
  );
}
