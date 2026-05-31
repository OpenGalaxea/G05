import { motion } from 'motion/react';
import { Database, Zap, ShieldCheck } from 'lucide-react';

export function Abstract() {
  return (
    <section>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#111111] border border-white/5 shadow-2xl rounded-2xl p-10 md:p-14 relative overflow-hidden"
      >
        <p className="text-xl md:text-2xl text-neutral-200 leading-[1.8] font-light tracking-wide relative z-10">
          We present <strong className="text-white font-medium">G0.5</strong>, the industry's first fully autoregressive pre-trained Vision-Language-Action (VLA) model. By reimagining the embodied learning paradigm, G0.5 achieves unprecedented training efficiency and global top-tier data utilization. It features native robust zero-shot instruction following capabilities out of the box, and provides highly-capable "Pickup Anything & Place Anywhere" post-training weights ready for immediate deployment in dynamic physical environments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mt-12 border-t border-white/5 pt-12">
          <div className="flex flex-col gap-3 relative">
            <Database className="w-6 h-6 text-brand-orange mb-1" />
            <h3 className="font-medium text-white text-base">Autoregressive VLA</h3>
            <p className="text-[15px] text-neutral-400 leading-[1.7] mt-1">Industry-first fully autoregressive pre-training, delivering upgraded training efficiency and unparalleled data utilization.</p>
          </div>
          <div className="flex flex-col gap-3 relative">
            <Zap className="w-6 h-6 text-brand-orange mb-1" />
            <h3 className="font-medium text-white text-base">Zero-Shot Following</h3>
            <p className="text-[15px] text-neutral-400 leading-[1.7] mt-1">Exceptional pre-training performance yielding robust zero-shot capability for complex physical instructions.</p>
          </div>
          <div className="flex flex-col gap-3 relative">
            <ShieldCheck className="w-6 h-6 text-brand-orange mb-1" />
            <h3 className="font-medium text-white text-base">Universal Manipulation</h3>
            <p className="text-[15px] text-neutral-400 leading-[1.7] mt-1">Out-of-the-box post-training weights specialized in "Pickup Anything & Place Anywhere" across diverse settings.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
