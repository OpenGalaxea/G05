import { motion } from 'motion/react';

export function TeaserVideo() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full rounded-3xl border border-white/10 overflow-hidden bg-[#0a0a0a] shadow-[0_0_50px_rgba(250,115,23,0.1)] group"
    >
      <video
        src="videos/header.mp4"
        className="w-full h-auto aspect-[21/9] object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Subtle Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}
