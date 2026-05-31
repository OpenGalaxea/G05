import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Play } from 'lucide-react';

// Zero-shot instruction → demo clip. Clips live in public/videos/oob/.
const ZEROSHOT = [
  { instruction: 'Toast the bread in the toaster', src: 'videos/oob/toast_bread.mp4', poster: 'videos/oob/toast_bread.jpg' },
  { instruction: 'Cook with the air fryer', src: 'videos/oob/air_fryer.mp4', poster: 'videos/oob/air_fryer.jpg' },
  { instruction: 'Stir-fry the dish on the stove', src: 'videos/oob/stir_fry.mp4', poster: 'videos/oob/stir_fry.jpg' },
  { instruction: 'Start the rice cooker', src: 'videos/oob/rice_cooker.mp4', poster: 'videos/oob/rice_cooker.jpg' },
  { instruction: 'Tidy the clothes and slippers', src: 'videos/oob/tidy_clothes.mp4', poster: 'videos/oob/tidy_clothes.jpg' },
  { instruction: 'Clean the washbasin', src: 'videos/oob/washbasin.mp4', poster: 'videos/oob/washbasin.jpg' },
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
          Zero-Shot
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
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">6. Emergent Capabilities</h2>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12">
        Because reasoning and action share one set of weights, preserving the autoregressive interface transfers the VLM's in-context learning capacity directly to action generation. The result is a class of behaviors not previously demonstrated in the VLM-as-Encoder family: prompts reshape the next-action distribution itself, not just a compressed condition feeding an external expert.
      </p>

      <h3 id="zero-shot" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">6.1. Zero-shot Instruction Following</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        G0.5 interprets arbitrary natural-language instructions and interacts with novel objects out of the box, without object-specific engineering. Pick an instruction below to watch the corresponding rollout.
      </p>

      <InstructionPicker />

      <h3 id="prompt-control" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">6.2. Prompt-driven Behavior Control</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        We probe three axes of prompt-level control, all emerging without additional training. <strong className="text-white font-medium">Action granularity</strong>: complexity modifiers in the prompt elicit finer-grained motor behavior. <strong className="text-white font-medium">Task horizon</strong>: compositional instructions induce coherent long-horizon execution. <strong className="text-white font-medium">Out-of-distribution generalization</strong>: rewriting a minimal sub-goal into an adverbially and spatially enriched variant (e.g. "open the door" → "gently open the door fully") steers the policy onto unseen scenes — adding up to +15.0 points on the zero-shot Air Fryer task with no fine-tuning.
      </p>

      <h3 id="agentic-planning" className="text-2xl md:text-3xl font-display font-medium text-white mb-6 mt-16 tracking-tight scroll-mt-32">6.3. Native Reasoning &amp; Replanning</h3>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-8">
        Enabling the native chain-of-thought lets G0.5 decompose long-horizon goals into sub-steps and ground task-relevant objects before acting — and these contributions accumulate over longer horizons, lifting zero-shot success by +30 to +35 points on five-stage household tasks. Hand-scored CoT correctness stays around 80–90%, and because the reasoning lives in the same stream, the policy can re-plan closed-loop from each new observation.
      </p>
    </section>
  );
}
