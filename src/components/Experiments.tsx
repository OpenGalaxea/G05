import { motion } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, LabelList } from 'recharts';

// ---------------------------------------------------------------------------
// Data (numbers taken from the G0.5 technical report experiments)
// ---------------------------------------------------------------------------
const realSuccess = [
  { name: 'GR00T N1.7', value: 24.4, color: '#3f3f3f' },
  { name: 'π0.5', value: 53.0, color: '#5f5f5f' },
  { name: 'G0.5 (Ours)', value: 76.7, color: 'url(#expOurs)' },
];
const realProcess = [
  { name: 'GR00T N1.7', value: 68.9, color: '#3f3f3f' },
  { name: 'π0.5', value: 102.3, color: '#5f5f5f' },
  { name: 'G0.5 (Ours)', value: 129.2, color: 'url(#expOurs)' },
];
const droidSuccess = [
  { name: 'MolmoAct2-DROID', value: 51.0, color: '#3f3f3f' },
  { name: 'π0.5-DROID', value: 58.5, color: '#5f5f5f' },
  { name: 'G0.5 (Ours)', value: 78.5, color: 'url(#expOurs)' },
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

// ---------------------------------------------------------------------------
// Reusable pieces
// ---------------------------------------------------------------------------
function ChartTooltip({ active, payload, label, unit }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl">
        <p className="text-white font-medium mb-1 text-sm">{label}</p>
        <p className="text-brand-orange font-mono text-sm">
          <span className="bg-brand-orange/10 px-2 py-0.5 rounded text-brand-orange-light font-bold">
            {payload[0].value}{unit}
          </span>
        </p>
      </div>
    );
  }
  return null;
}

function MetricBar({ title, data, unit = '', domain }: { title: string; data: any[]; unit?: string; domain?: [number, number] }) {
  return (
    <div className="bg-[#111111] border border-white/5 shadow-2xl rounded-3xl p-8">
      <h4 className="text-base font-medium text-white/90 mb-6 text-center m-0">{title}</h4>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 16, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="expOurs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FA7317" stopOpacity={1} />
                <stop offset="95%" stopColor="#FA7317" stopOpacity={0.35} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis dataKey="name" stroke="#525252" tick={{ fill: '#a3a3a3', fontSize: 12 }} axisLine={{ stroke: '#262626' }} tickLine={false} dy={8} interval={0} />
            <YAxis stroke="#525252" tick={{ fill: '#a3a3a3', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}${unit}`} domain={domain} dx={-6} />
            <Tooltip content={(p) => <ChartTooltip {...p} unit={unit} />} cursor={{ fill: '#ffffff05' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={72} isAnimationActive={false}>
              <LabelList dataKey="value" position="top" formatter={(v: number) => `${v}${unit}`} fill="#e5e5e5" fontSize={12} />
              {data.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
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

// ---------------------------------------------------------------------------
export function Experiments() {
  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">Experiments</h2>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        We evaluate G0.5 along two complementary axes: <strong className="text-white font-medium">real-world fine-tuning</strong> on two physically distinct robot embodiments, and <strong className="text-white font-medium">zero-shot deployment</strong> on an unseen robot and environment. Across both, G0.5 is compared against strong open-source VLA baselines under matched data and compute budgets.
      </p>

      {/* 5.1 Real-world fine-tuning ------------------------------------------------ */}
      <h3 id="real-world" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">5.1. Real-World Fine-Tuning</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        We fine-tune G0.5 on two embodiments with different kinematic structures — <strong className="text-white font-medium">R1 Lite</strong> (two 6-DoF arms, 3-DoF torso, omnidirectional base) and <strong className="text-white font-medium">R1 Pro</strong> (two 7-DoF arms, 4-DoF torso, omnidirectional base) — and compare against <span className="font-mono text-neutral-200">π0.5</span> and <span className="font-mono text-neutral-200">GR00T N1.7</span>. Every model is fine-tuned on the same data with an aligned compute budget (16× H20 GPUs, matched wall-clock), and evaluated under an identical observation space, action space, and control stack.
      </p>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        The four tasks instantiate <strong className="text-white font-medium">six task–embodiment settings</strong>, spanning deformable-object manipulation, contact-rich assembly, sequential object interaction, and whole-body bimanual coordination. Each setting is run over 15 real-world episodes, reporting both task success rate and a stage-wise process score, with models evaluated in interleaved order to control for environmental drift.
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
        Averaged across all six settings, G0.5 reaches a <strong className="text-white font-medium">76.7% success rate</strong> and a <strong className="text-white font-medium">129.2 process score</strong>, versus 53.0% / 102.3 for π0.5 and 24.4% / 68.9 for GR00T N1.7. G0.5 attains the best success rate in five of the six settings; the sole exception is R1 Pro box stacking, where π0.5 edges it on final success (93.3% vs 80.0%) while remaining close on process score (148.0 vs 142.5).
      </p>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        Performance is also balanced across embodiments — 75.6% / 124.5 on the 7-DoF R1 Pro and 77.8% / 133.8 on the 6-DoF R1 Lite — indicating that a single recipe adapts effectively to markedly different morphologies. On the four shared task–embodiment settings, G0.5 averages 75.0% success versus 42.7% (π0.5) and 13.3% (GR00T N1.7).
      </p>

      <FigureCard src="/images/exp/gbench_success_rate.png" caption="Per-setting task success rate across the six real-world fine-tuning settings on R1 Pro and R1 Lite." />
      <FigureCard src="/images/exp/gbench_process_score.png" caption="Per-setting process score across the six settings, capturing partial task progress under stage-wise criteria." />

      {/* 5.2 DROID zero-shot ------------------------------------------------------- */}
      <h3 id="droid-zeroshot" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-20 tracking-tight scroll-mt-32">5.2. DROID Zero-shot Generalization</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        To test out-of-the-box generalization, we deploy G0.5 on the <strong className="text-white font-medium">DROID</strong> platform — a Franka Research 3 arm with a Robotiq 2F-85 gripper — without any fine-tuning on this robot, relying solely on natural-language instructions at inference. We evaluate 10 tabletop tasks across 8 scene setups, spanning object placement, colour-conditioned selection, small-aperture insertion, deformable manipulation, spatial displacement, and multi-step sequencing.
      </p>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        For a controlled comparison we group baselines by training data: G0.5-PaliGemma versus <span className="font-mono text-neutral-200">π0.5-DROID</span> on the original DROID dataset, and G0.5-Qwen3 versus <span className="font-mono text-neutral-200">MolmoAct2-DROID</span> on the MolmoAct2-preprocessed data.
      </p>

      <TaskGallery items={droidTasks} cols="md:grid-cols-4" />
      <p className="mt-4 mb-12 text-sm text-neutral-500 font-light leading-relaxed text-center">
        DROID zero-shot evaluation tasks on a Franka Research 3 arm, covering placement, colour-conditioned selection, insertion, deformable manipulation, spatial displacement, and sequential execution.
      </p>

      <div className="my-12">
        <MetricBar title="DROID Zero-Shot · Average Success Rate" data={droidSuccess} unit="%" domain={[0, 100]} />
      </div>

      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-6">
        Both G0.5 variants consistently outperform their matched baselines, averaging <strong className="text-white font-medium">78.5%</strong> success — 20.0 points above π0.5-DROID (58.5%) and 27.5 points above MolmoAct2-DROID (51.0%). Gains are largest on tasks demanding precise object discrimination, colour-conditioned selection, and multi-step reasoning: most notably, MolmoAct2-DROID fails entirely on the sequential <em>insert-then-close-drawer</em> task, whereas G0.5 succeeds on over half its trials.
      </p>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-10">
        Both variants are relatively weaker on drawer-insertion tasks, which we attribute to the semi-transparent cabinet providing weak visual contrast for localising the drawer aperture — a shared, identifiable failure mode rather than a general limitation.
      </p>

      <FigureCard src="/images/exp/droid_results.png" caption="Per-task success rate (%) on the DROID zero-shot benchmark for π0.5-DROID, MolmoAct2-DROID, G0.5-PaliGemma, and G0.5-Qwen3 across 10 manipulation tasks." />
    </section>
  );
}
