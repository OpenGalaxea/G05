import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function TeaserVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // When autoplay is blocked (e.g. iOS Low-Power / Android Data-Saver mode), the
  // <video> never animates. Fall back to an animated WebP, which loops on every
  // browser regardless of autoplay policy.
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => setFallback(true));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full rounded-3xl border border-white/10 overflow-hidden bg-[#0a0a0a] shadow-[0_0_50px_rgba(250,115,23,0.1)] group"
    >
      {fallback ? (
        <img
          src="videos/header.webp"
          alt="G0.5 — zero-shot embodied foundation model"
          className="w-full h-auto aspect-[21/9] object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src="videos/header.mp4"
          poster="videos/header.jpg"
          className="w-full h-auto aspect-[21/9] object-cover"
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}

      {/* Subtle Video Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}
