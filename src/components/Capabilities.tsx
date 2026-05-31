import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Play } from 'lucide-react';

// Zero-shot instruction → demo clip. Drop the MP4s into public/videos/zeroshot/.
// Posters fall back to the task photos so the picker works before clips are added.
const ZEROSHOT = [
  { instruction: 'Fold the towel', src: '/videos/zeroshot/fold_towel.mp4', poster: '/images/exp/r1lite_fold_towel.jpg' },
  { instruction: 'Fold the carton into a box', src: '/videos/zeroshot/fold_carton.mp4', poster: '/images/exp/r1lite_fold_carton.jpg' },
  { instruction: 'Pack the stationery into the pencil case', src: '/videos/zeroshot/pencil_case.mp4', poster: '/images/exp/r1lite_stationery_incase.jpg' },
  { instruction: 'Transfer and stack the boxes', src: '/videos/zeroshot/stack_box.mp4', poster: '/images/exp/r1pro_stack_box.jpg' },
  { instruction: 'Move the block into the cup', src: '/videos/zeroshot/block_cup.mp4', poster: '/images/exp/droid_block_cup.png' },
  { instruction: 'Put the pen into the open drawer', src: '/videos/zeroshot/pen_drawer.mp4', poster: '/images/exp/droid_pen_drawer.png' },
];

function InstructionPicker() {
  const [sel, setSel] = useState(0);
  const [open, setOpen] = useState(false);
  const cur = ZEROSHOT[sel];

  return (
    <div className="my-12">
      {/* Instruction dropdown */}
      <div className="relative max-w-xl mb-4 z-30">
        <span className="block text-[11px] uppercase tracking-widest text-neutral-500 font-mono mb-2">Choose an instruction</span>
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-[#111111] border border-white/10 rounded-xl text-left hover:border-brand-orange/40 transition-colors"
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 shadow-[0_0_8px_#FA7317]" />
            <span className="text-sm text-white font-light truncate">“{cur.instruction}”</span>
          </span>
          <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 mt-2 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1"
            >
              {ZEROSHOT.map((z, i) => (
                <li key={i}>
                  <button
                    onClick={() => { setSel(i); setOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${i === sel ? 'bg-brand-orange/10 text-brand-orange' : 'text-neutral-300 hover:bg-white/5'}`}
                  >
                    <Play className="w-3 h-3 shrink-0" />
                    <span className="font-light">{z.instruction}</span>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Player */}
      <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-3 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
        <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-[13px] font-mono text-white border border-white/20 uppercase tracking-widest shadow-lg">
          Zero-Shot Evaluation
        </div>
        <video
          key={cur.src}
          className="w-full aspect-video object-cover rounded-2xl bg-[#0a0a0a]"
          autoPlay
          loop
          muted
          playsInline
          poster={cur.poster}
        >
          <source src={cur.src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export function Capabilities() {
  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">Capabilities</h2>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        Evaluating across a broad suite of real-world physical manipulation tasks, G0.5 demonstrates a marked leap in systematic generalization compared to domain-specific specialist algorithms. Furthermore, the pre-training yields a powerful zero-shot instruction following capability out of the box.
      </p>

      <h3 id="zero-shot" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">4.1. Zero-shot Instruction Following</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        G0.5 interprets arbitrary natural language instructions to interact with novel objects in zero-shot settings, bypassing the need for object-specific coding. Pick an instruction below to watch the corresponding rollout.
      </p>

      <InstructionPicker />

      <h3 id="posttraining-efficiency" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">4.2. Posttraining Efficiency</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        Compared to training from scratch, fine-tuning the pre-trained G0.5 model requires significantly less data and computational time to achieve mastery in complex multi-stage tasks. Quantitative comparisons against baselines are reported in the Experiments section.
      </p>

      <h3 id="agentic-planning" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">4.3. Agentic Planning</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        Equipped with long-horizon reasoning capabilities, G0.5 acts as an autonomous agent that visually grounds complex goals into step-by-step actionable plans across diverse scenes.
      </p>
    </section>
  );
}
