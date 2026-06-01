import { motion } from 'motion/react';
import { Layers, Brain, Clock } from 'lucide-react';

export function Abstract() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#111111] border border-white/5 shadow-2xl rounded-2xl p-10 md:p-14 relative overflow-hidden"
      >
        <p className="text-lg md:text-xl text-neutral-200 leading-[1.8] font-light tracking-wide relative z-10">
          The prevailing recipe for Vision-Language-Action (VLA) models couples a pre-trained VLM with a separately trained flow-matching action expert, which makes the VLM a context encoder rather than a decision-maker. Instead, we argue for focusing on the VLM backbone: a unified model with a single set of weights that generates both reasoning and actions within a single autoregressive token stream. We introduce <strong className="text-white font-medium">G0.5</strong>, a pretrained autoregressive VLA in which a single transformer decoder emits reasoning and action tokens under a single objective. Because reasoning and action share a single set of weights, the pretrained VLM's capabilities carry over to physical behavior: the model follows instructions closely, and prompts directly steer action granularity, task horizon, and out-of-distribution scene handling — without further training.
        </p>
        <p className="text-lg md:text-xl text-neutral-300 leading-[1.8] font-light tracking-wide relative z-10 mt-6">
          Pretrained on a large collection of robot datasets together with VQA samples, G0.5 surpasses state-of-the-art models across <strong className="text-white font-medium">seven independent regimes</strong> — including real-world R1-Lite/R1-Pro fine-tuning (<span className="text-brand-orange-light font-medium">76.7%</span> vs. 53.3% for π0.5 and 24.4% for GR00T-N1.7), the BEHAVIOR-1K Challenge (<span className="text-brand-orange-light font-medium">31.4%</span> task score vs. 26.3% for π0.5 and 26.1% for the challenge winner, single generalist policy), zero-shot DROID (<span className="text-brand-orange-light font-medium">82.5%</span>), LIBERO (<span className="text-brand-orange-light font-medium">98.9%</span>), RoboTwin 2.0 (<span className="text-brand-orange-light font-medium">93.3%</span>), and SimplerEnv-Bridge (<span className="text-brand-orange-light font-medium">87.3%</span>).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mt-12 border-t border-white/5 pt-12">
          <div className="flex flex-col gap-3 relative">
            <Layers className="w-6 h-6 text-brand-orange mb-1" />
            <h3 className="font-medium text-white text-base">Cross-Embodiment Action Codec</h3>
            <p className="text-[15px] text-neutral-400 leading-[1.7] mt-1">A learned tokenizer maps heterogeneous robot actions — across degrees of freedom and morphologies — into one shared discrete vocabulary.</p>
          </div>
          <div className="flex flex-col gap-3 relative">
            <Brain className="w-6 h-6 text-brand-orange mb-1" />
            <h3 className="font-medium text-white text-base">Native Chain-of-Thought</h3>
            <p className="text-[15px] text-neutral-400 leading-[1.7] mt-1">Task decomposition, object grounding, and action hints are interleaved with action tokens in the same stream, sharing the decoder and objective.</p>
          </div>
          <div className="flex flex-col gap-3 relative">
            <Clock className="w-6 h-6 text-brand-orange mb-1" />
            <h3 className="font-medium text-white text-base">Visual Memory</h3>
            <p className="text-[15px] text-neutral-400 leading-[1.7] mt-1">A lightweight memory module injects multi-second visual history through the vision encoder for long-horizon, closed-loop control.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
