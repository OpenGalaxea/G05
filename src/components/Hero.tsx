import { motion } from 'motion/react';

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

        <p className="text-xl md:text-2xl text-neutral-400 font-light leading-[1.6] max-w-3xl mb-4">
          A pretrained autoregressive Vision-Language-Action model in which a single transformer decoder emits both reasoning and action tokens under one objective — keeping the VLM the decision-maker, not just a context encoder.
        </p>
      </motion.div>
    </section>
  );
}


