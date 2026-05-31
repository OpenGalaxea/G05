import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, LabelList } from 'recharts';

// ---------------------------------------------------------------------------
// Data — taken directly from the G0.5 technical report (tables & figures).
// ---------------------------------------------------------------------------
const realSuccess = [
  { name: 'GR00T N1.7', value: 24.4, color: '#3f3f3f' },
  { name: 'π0.5', value: 53.0, color: '#5f5f5f' },
  { name: 'G0.5 (Ours)', value: 76.7, color: 'url(#expOurs)' },
];
const realProcess = [
  { name: 'GR00T N1.7', value: 68.9, color: '#3f3f3f' },
  { name: 'π0.5', value: 105.2, color: '#5f5f5f' },
  { name: 'G0.5 (Ours)', value: 129.2, color: 'url(#expOurs)' },
];
const droidSuccess = [
  { name: 'MolmoAct2-DROID', value: 52.0, color: '#3f3f3f' },
  { name: 'π0.5-DROID', value: 57.5, color: '#5f5f5f' },
  { name: 'G0.5 (Ours)', value: 82.5, color: 'url(#expOurs)' },
];
// BEHAVIOR-1K Challenge — primary metric is the Task Success Score (partial credit).
const behaviorScore = [
  { name: 'Comet (2nd)', value: 0.183, color: '#3f3f3f' },
  { name: 'RLC (1st · 4 ckpt)', value: 0.2605, color: '#4a4a4a' },
  { name: 'π0.5 (4 ep)', value: 0.2612, color: '#5f5f5f' },
  { name: 'G0.5 (1 ep)', value: 0.2904, color: 'url(#expOurs)' },
];
const realTasks = [
  { src: '/images/exp/r1lite_fold_towel.jpg', label: 'R1 Lite · Folding Towel' },
  { src: '/images/exp/r1lite_fold_carton.jpg', label: 'R1 Lite · Folding Carton' },
  { src: '/images/exp/r1lite_stationery_incase.jpg', label: 'R1 Lite · Pencil-Case Packing' },
  { src: '/images/exp/r1pro_fold_towel.jpg', label: 'R1 Pro · Folding Towel' },
  { src: '/images/exp/r1pro_fold_carton.jpg', label: 'R1 Pro · Folding Carton' },
  { src: '/images/exp/r1pro_stack_box.jpg', label: 'R1 Pro · Box Transfer & Stacking' },
];
const droidTasks = [
  { src: '/images/exp/droid_carrot_peach_bowl.png', label: 'Carrot / Peach → Bowl' },
  { src: '/images/exp/droid_block_plate.png', label: 'Block → Green / Red Plate' },
  { src: '/images/exp/droid_block_cup.png', label: 'Block → Cup' },
  { src: '/images/exp/droid_towel_drawer.png', label: 'Towel → Open Drawer' },
  { src: '/images/exp/droid_pen_drawer.png', label: 'Pen → Open Drawer' },
  { src: '/images/exp/droid_bowl_left.png', label: 'Bowl → Left' },
  { src: '/images/exp/droid_towel_bowl_plate.png', label: 'Towel: Bowl → Plate' },
  { src: '/images/exp/droid_block_drawer_close.png', label: 'Block → Drawer + Close' },
];

// Simulation leaderboards (selected rows; G0.5 highlighted).
const liberoRows = [
  ['π0', '98.0', '96.8', '94.4', '88.4', '94.4'],
  ['GR00T-N1.7', '97.7', '98.5', '97.5', '94.4', '97.0'],
  ['OpenVLA-OFT', '97.6', '98.4', '97.9', '94.5', '97.1'],
  ['π0.5', '98.8', '98.2', '98.0', '92.4', '96.9'],
  ['EO-1', '99.7', '99.8', '99.2', '94.8', '98.4'],
  ['Xiaomi-Robotics-0', '98.8', '100.0', '98.8', '97.2', '98.7'],
  ['G0.5 (Ours)', '98.4', '100.0', '98.6', '98.6', '98.9'],
];
const robotwinRows = [
  ['π0', '65.9', '58.4', '62.2'],
  ['π0.5', '82.7', '76.8', '79.8'],
  ['StarVLA', '88.7', '87.8', '88.3'],
  ['Fast-WAM', '91.9', '91.8', '91.8'],
  ['LingBot-VA', '92.9', '91.5', '92.2'],
  ['G0.5 (Ours)', '93.7', '92.8', '93.3'],
];
const bridgeRows = [
  ['π0.5', '49.3', '64.7', '44.7', '69.7', '57.1'],
  ['GR00T-N1.5', '75.3', '54.3', '57.0', '61.3', '61.9'],
  ['MemoryVLA', '75.0', '75.0', '37.5', '100.0', '71.9'],
  ['Xiaomi-Robotics-0', '95.8', '62.5', '75.0', '83.3', '79.2'],
  ['G0.5 (Ours)', '97.5', '75.0', '83.3', '93.3', '87.3'],
];
// Observational-context ablation (PP Bench, Table 5).
const contextRows = [
  ['Language Following Rate', '84.4%', '85.9%', '98.4%'],
  ['Task Success Rate', '75.0%', '76.6%', '84.4%'],
];
// Zero-shot probe of action head (AR vs FM) and CoT (Table 6).
const probeRows = [
  ['PP Bench', 'AR, no CoT', '59.4', '–', '65.6'],
  ['PP Bench', 'AR, CoT', '62.5', '–', '68.8'],
  ['PP Bench', 'FM, no CoT', '57.8', '–', '64.1'],
  ['PP Bench', 'FM, CoT', '59.4', '–', '65.6'],
  ['Air Fryer', 'AR, no CoT', '20.0', '2.4', '35.0'],
  ['Air Fryer', 'AR, CoT', '50.0', '3.8', '70.0'],
  ['Air Fryer', 'AR, CoT + rewrite', '65.0', '4.2', '85.0'],
  ['Air Fryer', 'FM, no CoT', '15.0', '2.1', '30.0'],
  ['Air Fryer', 'FM, CoT', '25.0', '2.7', '50.0'],
  ['Cook Bacon', 'AR, no CoT', '10.0', '1.5', '25.0'],
  ['Cook Bacon', 'AR, CoT', '45.0', '3.5', '65.0'],
  ['Cook Bacon', 'AR, CoT + rewrite', '55.0', '3.9', '80.0'],
  ['Cook Bacon', 'FM, no CoT', '5.0', '1.2', '22.0'],
  ['Cook Bacon', 'FM, CoT', '15.0', '2.0', '45.0'],
];

// ---------------------------------------------------------------------------
// Reusable pieces
// ---------------------------------------------------------------------------
function ChartTooltip({ active, payload, label, unit }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl">
        <p className="text-white font-medium mb-1 text-sm">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-brand-orange font-mono text-sm">
            <span className="bg-brand-orange/10 px-2 py-0.5 rounded text-brand-orange-light font-bold">
              {p.name ? `${p.name}: ` : ''}{p.value}{unit}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

const OursDefs = () => (
  <defs>
    <linearGradient id="expOurs" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#FA7317" stopOpacity={1} />
      <stop offset="95%" stopColor="#FA7317" stopOpacity={0.35} />
    </linearGradient>
  </defs>
);

function MetricBar({ title, data, unit = '', domain, fmt }: { title: string; data: any[]; unit?: string; domain?: [number, number]; fmt?: (v: number) => string }) {
  return (
    <div className="bg-[#111111] border border-white/5 shadow-2xl rounded-3xl p-8">
      <h4 className="text-base font-medium text-white/90 mb-6 text-center m-0">{title}</h4>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 16, left: -8, bottom: 0 }}>
            <OursDefs />
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis dataKey="name" stroke="#525252" tick={{ fill: '#a3a3a3', fontSize: 11 }} axisLine={{ stroke: '#262626' }} tickLine={false} dy={8} interval={0} />
            <YAxis stroke="#525252" tick={{ fill: '#a3a3a3', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${fmt ? fmt(v) : v}${unit}`} domain={domain} dx={-6} />
            <Tooltip content={(p) => <ChartTooltip {...p} unit={unit} />} cursor={{ fill: '#ffffff05' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={72} isAnimationActive={false}>
              <LabelList dataKey="value" position="top" formatter={(v: number) => `${fmt ? fmt(v) : v}${unit}`} fill="#e5e5e5" fontSize={12} />
              {data.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DataTable({ headers, rows, highlightLast = true, highlightCol }: { headers: string[]; rows: string[][]; highlightLast?: boolean; highlightCol?: number }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111111] shadow-2xl my-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            {headers.map((h, i) => (
              <th key={i} className={`px-4 py-3 font-mono text-[12px] uppercase tracking-wider text-neutral-400 font-medium ${i === 0 ? 'text-left' : 'text-right'}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => {
            const isOurs = highlightLast && r === rows.length - 1;
            return (
              <tr key={r} className={`border-b border-white/5 last:border-0 transition-colors ${isOurs ? 'bg-brand-orange/[0.07]' : 'hover:bg-white/[0.02]'}`}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`px-4 py-2.5 tabular-nums ${c === 0 ? 'text-left font-mono' : 'text-right font-mono'} ${
                      isOurs ? 'text-white font-semibold' : 'text-neutral-300'
                    } ${highlightCol !== undefined && c === highlightCol && !isOurs ? 'text-white' : ''} ${
                      isOurs && c === 0 ? 'text-brand-orange' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StatCard({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] bg-brand-orange/10 pointer-events-none" />
      <span className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orange-light leading-none mb-3">{value}</span>
      <span className="text-base font-medium text-white">{label}</span>
      <span className="text-[13px] text-neutral-500 font-mono mt-1.5">{sub}</span>
    </div>
  );
}

function TaskGallery({ items, cols }: { items: { src: string; label: string }[]; cols: string }) {
  return (
    <div className={`grid grid-cols-2 ${cols} gap-4`}>
      {items.map((it, idx) => (
        <motion.figure
          key={idx}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (idx % 4) * 0.08 }}
          className="group bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-brand-orange/40 transition-colors"
        >
          <div className="aspect-[4/3] bg-[#0a0a0a] overflow-hidden">
            <img src={it.src} alt={it.label} loading="lazy" className="w-full h-full object-cover brightness-90 group-hover:brightness-110 group-hover:scale-[1.04] transition-all duration-500" />
          </div>
          <figcaption className="px-3 py-2.5 text-[12px] font-mono text-neutral-400 border-t border-white/5">{it.label}</figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

function FigureCard({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-8">
      <div className="bg-white rounded-2xl p-4 border border-white/10 shadow-2xl">
        <img src={src} alt={caption} loading="lazy" className="w-full h-auto rounded-lg" />
      </div>
      <figcaption className="mt-3 text-sm text-neutral-500 font-light leading-relaxed text-center">{caption}</figcaption>
    </figure>
  );
}

function Finding({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-brand-orange/60 pl-5 py-1 my-6">
      <h4 className="text-base font-medium text-white mb-1.5">{title}</h4>
      <p className="text-[15px] md:text-base text-neutral-400 font-light leading-[1.7] m-0">{children}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function Experiments() {
  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">5. Experiments</h2>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        We evaluate G0.5 across seven settings that probe distinct facets of a general-purpose VLA: real-world fine-tuning on two bimanual platforms, zero-shot deployment on an unseen robot, a long-horizon household challenge, three standardized simulation suites, a language-following benchmark, and a controlled probe of the autoregressive interface itself.
      </p>

      {/* 5.1 Real-world fine-tuning ------------------------------------------------ */}
      <h3 id="real-world" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">5.1. Real-World Fine-Tuning</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        We fine-tune G0.5 on two embodiments with different kinematic structures — <strong className="text-white font-medium">R1 Lite</strong> (two 6-DoF arms, 3-DoF torso, omnidirectional base) and <strong className="text-white font-medium">R1 Pro</strong> (two 7-DoF arms, 4-DoF torso, omnidirectional base) — and compare against <span className="font-mono text-neutral-200">π0.5</span> and <span className="font-mono text-neutral-200">GR00T N1.7</span>. Every model is fine-tuned on the same data with an aligned compute budget (16× H20 GPUs, matched wall-clock) and evaluated under an identical observation space, action space, and control stack.
      </p>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        Four tasks instantiate <strong className="text-white font-medium">six task–embodiment settings</strong>, spanning deformable-object manipulation, contact-rich assembly, sequential object interaction, and whole-body bimanual coordination. Each setting is run over 15 real-world episodes, reporting both task success rate and a stage-wise process score, with models evaluated in interleaved order to control for environmental drift.
      </p>

      <TaskGallery items={realTasks} cols="md:grid-cols-3" />
      <p className="mt-4 mb-12 text-sm text-neutral-500 font-light leading-relaxed text-center">
        The six real-world fine-tuning settings. Towel folding and carton folding are shared across both embodiments, enabling direct cross-embodiment comparison under the same task objective.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <MetricBar title="Average Success Rate" data={realSuccess} unit="%" domain={[0, 100]} />
        <MetricBar title="Average Process Score" data={realProcess} domain={[0, 160]} />
      </div>

      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-6">
        Averaged across all six settings, G0.5 reaches a <strong className="text-white font-medium">76.7% success rate</strong> and a <strong className="text-white font-medium">129.2 process score</strong>, versus 53.0% / 105.2 for π0.5 and 24.4% / 68.9 for GR00T N1.7. G0.5 attains the best success rate in five of the six settings; the sole exception is R1 Pro box stacking, where π0.5 edges it on final success (93.3% vs 80.0%) while remaining close on process score (148.0 vs 142.5).
      </p>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        Performance is also balanced across embodiments — 75.6% / 124.5 on the 7-DoF R1 Pro and 77.8% / 133.8 on the 6-DoF R1 Lite — indicating that a single recipe adapts effectively to markedly different morphologies. On the four shared task–embodiment settings, G0.5 averages 75.0% success versus 43.3% (π0.5) and 13.3% (GR00T N1.7).
      </p>

      <FigureCard src="/images/exp/gbench_success_rate.png" caption="Per-setting task success rate across the six real-world fine-tuning settings on R1 Pro and R1 Lite." />
      <FigureCard src="/images/exp/gbench_process_score.png" caption="Per-setting process score across the six settings, capturing partial task progress under stage-wise criteria." />

      {/* 5.2 DROID zero-shot ------------------------------------------------------- */}
      <h3 id="droid-zeroshot" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-20 tracking-tight scroll-mt-32">5.2. DROID Zero-shot Evaluation</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        To test out-of-the-box generalization, we deploy G0.5 on the <strong className="text-white font-medium">DROID</strong> platform — a Franka Research 3 arm with a Robotiq 2F-85 gripper — without any fine-tuning on this robot, relying solely on natural-language instructions at inference. We evaluate 10 tabletop tasks across 8 scene setups, spanning object placement, colour-conditioned selection, small-aperture insertion, deformable manipulation, spatial displacement, and multi-step sequencing, and compare against <span className="font-mono text-neutral-200">π0.5-DROID</span> and <span className="font-mono text-neutral-200">MolmoAct2-DROID</span>.
      </p>

      <TaskGallery items={droidTasks} cols="md:grid-cols-4" />
      <p className="mt-4 mb-12 text-sm text-neutral-500 font-light leading-relaxed text-center">
        DROID zero-shot evaluation tasks on a Franka Research 3 arm, covering placement, colour-conditioned selection, insertion, deformable manipulation, spatial displacement, and sequential execution.
      </p>

      <div className="my-12">
        <MetricBar title="DROID Zero-Shot · Average Success Rate" data={droidSuccess} unit="%" domain={[0, 100]} />
      </div>

      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-6">
        G0.5 averages <strong className="text-white font-medium">82.5%</strong> success — 25.0 points above π0.5-DROID (57.5%) and 30.5 points above MolmoAct2-DROID (52.0%) — and outperforms both baselines on all 10 tasks. Gains are largest on tasks demanding precise object discrimination, colour-conditioned selection, and multi-step reasoning: most notably, MolmoAct2-DROID fails entirely on the sequential <em>insert-then-close-drawer</em> task, whereas G0.5 succeeds on over half its trials.
      </p>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        One identifiable weakness: the white semi-transparent drawer cabinet offers little visual contrast for localising the aperture, and G0.5 is more sensitive to this than π0.5-DROID. Adding high-contrast markers to the drawer lifts G0.5 to 100% on the towel-insertion task.
      </p>

      <FigureCard src="/images/exp/droid_results.png" caption="Per-task success rate (%) on the DROID zero-shot benchmark for π0.5-DROID, MolmoAct2-DROID, and G0.5 across 10 manipulation tasks." />

      {/* 5.3 Long-horizon — BEHAVIOR-1K ------------------------------------------- */}
      <h3 id="behavior" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-20 tracking-tight scroll-mt-32">5.3. Long-Horizon · BEHAVIOR-1K Challenge</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        The 2025 BEHAVIOR Challenge selects <strong className="text-white font-medium">50 full-length household tasks</strong> on an R1 Pro in the photorealistic OmniGibson simulator — rearrangement, cooking, cleaning, installation — where each episode averages 6.6 minutes and demands coordinated navigation and bimanual manipulation. The ranking metric is the Task Success Score, which awards partial credit for completed goal predicates. We co-train a <strong className="text-white font-medium">single policy</strong> on all 10,000 demonstrations and evaluate one checkpoint.
      </p>

      <div className="my-12">
        <MetricBar title="BEHAVIOR-1K · Task Success Score (Primary Metric)" data={behaviorScore} domain={[0, 0.32]} fmt={(v) => v.toFixed(2)} />
      </div>

      <Finding title="Training efficiency">
        A single G0.5 checkpoint trained for just <strong className="text-white">one</strong> post-training epoch (score 0.290) surpasses π0.5 trained for four epochs (0.261) by +11.2% — the same downstream data yields more, faster, from a stronger backbone.
      </Finding>
      <Finding title="Single-policy generalization">
        Across all 50 tasks G0.5 beats the first-place challenge solution (RLC, 0.261) by +11.5% using one checkpoint, where the winner relied on a set of four. G0.5 leads on 23 of 50 tasks; π0.5 leads on 14.
      </Finding>
      <Finding title="What the pre-training shaped">
        Structured action decomposition decouples navigation from manipulation, and visual-memory pre-training boosts navigation-heavy long-horizon tasks. The remaining gap is distributional — appliance/cabinet-interaction skills (e.g. microwave popcorn) are underrepresented in pre-training, pointing to a clear data path forward.
      </Finding>

      {/* 5.4 Simulation benchmarks ------------------------------------------------ */}
      <h3 id="simulation" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-20 tracking-tight scroll-mt-32">5.4. Simulation Benchmarks</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        On three standardized suites, G0.5 matches or surpasses the strongest published baselines, reaching state-of-the-art overall accuracy on LIBERO — with the best score on its challenging Long suite.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <StatCard value="98.9%" label="LIBERO" sub="avg over 4 suites · SOTA" />
        <StatCard value="93.3%" label="RoboTwin 2.0" sub="clean + randomized avg" />
        <StatCard value="87.3%" label="SimplerEnv-Bridge" sub="4-task average" />
      </div>

      <h4 className="text-lg font-medium text-white/90 mt-12 mb-2">LIBERO <span className="text-neutral-500 font-light text-sm">— success rate (%) by suite</span></h4>
      <DataTable headers={['Method', 'Spatial', 'Object', 'Goal', 'Long', 'Avg']} rows={liberoRows} highlightCol={4} />

      <h4 className="text-lg font-medium text-white/90 mt-12 mb-2">RoboTwin 2.0 <span className="text-neutral-500 font-light text-sm">— success rate (%)</span></h4>
      <DataTable headers={['Method', 'Clean', 'Rand.', 'Avg']} rows={robotwinRows} />

      <h4 className="text-lg font-medium text-white/90 mt-12 mb-2">SimplerEnv-Bridge <span className="text-neutral-500 font-light text-sm">— success rate (%) by task</span></h4>
      <DataTable headers={['Method', 'Spoon', 'Carrot', 'Stack', 'Eggplant', 'Avg']} rows={bridgeRows} highlightCol={4} />

      {/* 5.5 Pick-and-Place Benchmark --------------------------------------------- */}
      <h3 id="pp-bench" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-20 tracking-tight scroll-mt-32">5.5. Pick-and-Place Benchmark</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        Large-scale pre-training should improve not just low-level action but <strong className="text-white font-medium">language following in cluttered scenes</strong>. PP Bench disentangles the two by separately reporting the language-following rate (did the robot move toward the correct target among 16 distractors?) and the task success rate (did it complete the full pick-and-place?). We sweep post-training data from zero-shot up to 50 hours on R1 Lite.
      </p>

      <figure className="my-10">
        <div className="bg-white rounded-2xl p-3 border border-white/10 shadow-2xl">
          <img src="/images/pp_objects.jpg" alt="Pick-and-Place benchmark object set" loading="lazy" className="w-full h-auto rounded-lg" />
        </div>
        <figcaption className="mt-3 text-sm text-neutral-500 font-light leading-relaxed text-center">
          The PP Bench object set — 64 object categories and 3 containers. Each trial presents 16 randomly arranged items, requiring the policy to ground the instructed target among distractors.
        </figcaption>
      </figure>

      <FigureCard src="/images/ppbench.png" caption="PP Bench results. Language-following rate (left) and task success rate (right) for G0.5 and π0.5 across zero-shot, 1H, 10H, and 50H post-training scales." />

      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-6">
        Even <strong className="text-white font-medium">zero-shot</strong>, G0.5 follows instructions 65.6% of the time and completes 59.4% of tasks. Post-training scales both metrics (84.4% / 75.0% at 50H). Under the matched 50H setting, G0.5 still outperforms π0.5 by 12.4 points in language following and 22.0 points in task success — we attribute this to web-data co-training (open-vocabulary grounding) and R1 Lite pre-training (action priors).
      </p>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-6">
        Many residual errors are visually ambiguous long-tail objects. Appending cropped <strong className="text-white font-medium">visual context</strong> of the target — encoded by the same vision encoder through G0.5's multi-image interface — lifts language following to 98.4%, while textual box coordinates alone do not help.
      </p>

      <h4 className="text-lg font-medium text-white/90 mt-10 mb-2">Effect of observational context <span className="text-neutral-500 font-light text-sm">— PP Bench (50H)</span></h4>
      <DataTable headers={['Metric', 'Name-only', '+ Box Coord.', '+ Target Visual']} rows={contextRows} highlightLast={false} highlightCol={3} />

      {/* 5.6 CoT & action-head probe ---------------------------------------------- */}
      <h3 id="cot-probe" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-20 tracking-tight scroll-mt-32">5.6. Probing Chain-of-Thought &amp; the Action Head</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        Do the autoregressive interface and native CoT actually deliver the gains we claim? We freeze a single pretrained checkpoint and switch only the inference-time configuration: the decoder (<strong className="text-white font-medium">AR</strong> action tokens vs. the <strong className="text-white font-medium">FM</strong> flow-matching expert) and the CoT stream (on/off). The probe spans PP Bench (single stage) and two unseen long-horizon tasks — <em>Bread → Air Fryer</em> and <em>Cook Bacon</em> — each decomposed into five sequential stages.
      </p>

      <DataTable headers={['Task', 'Mode', 'Success ↑', 'Stage ↑', 'LF ↑']} rows={probeRows} highlightLast={false} />

      <Finding title="Finding 1 — CoT gain scales with task horizon">
        Enabling CoT lifts AR success by only +3.1 points on single-stage PP Bench, but by +30.0 on Air Fryer and +35.0 on Bacon. On top of that, rewriting each minimal sub-goal prompt into an enriched variant (e.g. "gently open the door fully") adds another +15.0 / +10.0 — steering the policy onto out-of-distribution tasks purely through prompts, no retraining.
      </Finding>
      <Finding title="Finding 2 — AR follows CoT more faithfully than the FM expert">
        With the same CoT stream and the same post-CoT hidden state, AR captures far more reasoning signal than FM (Air Fryer: +30.0 vs +10.0; Bacon: +35.0 vs +10.0). Because both decoders share the trunk, the gap reflects how the action is decoded: AR action tokens stay in the reasoning stream and attend to the CoT trace directly, whereas the flow-matching expert collapses that trace into a compressed condition first.
      </Finding>
    </section>
  );
}
