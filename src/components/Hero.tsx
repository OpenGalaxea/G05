import { motion } from 'motion/react';
import { Globe, FileText } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full pb-10">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mt-4"
      >
        <h1 className="text-5xl md:text-[4rem] font-display font-medium text-white leading-[1.1] mb-8 tracking-tight">
          Introducing G0.5: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-orange-light font-bold pb-2 inline-block">
            One Autoregressive Stream for Reasoning and Action
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-neutral-400 font-light leading-[1.6] max-w-3xl mb-8">
          A pretrained autoregressive Vision-Language-Action model in which a single transformer decoder emits both reasoning and action tokens under one objective — keeping the VLM the decision-maker, not just a context encoder.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://galaxea-dynamics.com/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-brand-orange px-5 py-2.5 text-[15px] font-medium text-black transition-all hover:bg-brand-orange-light hover:shadow-[0_0_28px_rgba(250,115,23,0.35)]"
          >
            <Globe className="w-4 h-4" />
            Official Website
          </a>
          <a
            href="Galaxea_G0_5.pdf"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-[15px] font-medium text-neutral-200 transition-all hover:border-brand-orange/50 hover:text-white hover:bg-white/[0.06]"
          >
            <FileText className="w-4 h-4" />
            Read the Paper
          </a>
        </div>
      </motion.div>
    </section>
  );
}


