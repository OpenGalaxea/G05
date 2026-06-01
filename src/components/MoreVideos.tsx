import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X } from 'lucide-react';

// Real-home deployment clips. Files live in public/videos/oob/.
const DEMOS = [
  { title: 'Toasting Bread', src: 'videos/oob/toast_bread.mp4', poster: 'videos/oob/toast_bread.jpg' },
  { title: 'Operating the Air Fryer', src: 'videos/oob/air_fryer.mp4', poster: 'videos/oob/air_fryer.jpg' },
  { title: 'Stir-frying on the Stove', src: 'videos/oob/stir_fry.mp4', poster: 'videos/oob/stir_fry.jpg' },
  { title: 'Using the Rice Cooker', src: 'videos/oob/rice_cooker.mp4', poster: 'videos/oob/rice_cooker.jpg' },
  { title: 'Hammering a Nail', src: 'videos/oob/hammer_nail.mp4', poster: 'videos/oob/hammer_nail.jpg' },
  { title: 'Folding Clothes & Slippers', src: 'videos/oob/tidy_clothes.mp4', poster: 'videos/oob/tidy_clothes.jpg' },
  { title: 'Tidying the Vanity', src: 'videos/oob/vanity.mp4', poster: 'videos/oob/vanity.jpg' },
  { title: 'Wiping Away Stains', src: 'videos/oob/clean_stain.mp4', poster: 'videos/oob/clean_stain.jpg' },
  { title: 'At the Washbasin', src: 'videos/oob/washbasin.mp4', poster: 'videos/oob/washbasin.jpg' },
  { title: 'Cleaning the Toilet', src: 'videos/oob/toilet.mp4', poster: 'videos/oob/toilet.jpg' },
];

const DemoCard: FC<{ title: string; src: string; poster: string; idx: number; onOpen: () => void }> = ({ title, src, poster, idx, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (idx % 3) * 0.06 }}
      onClick={onOpen}
      className="group relative bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-brand-orange/40 transition-colors shadow-xl cursor-zoom-in"
    >
      <div className="aspect-video bg-[#0a0a0a] relative overflow-hidden">
        <video
          className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-500"
          poster={poster}
          loop
          muted
          playsInline
          preload="none"
          onMouseOver={(e) => e.currentTarget.play().catch(() => {})}
          onMouseOut={(e) => e.currentTarget.pause()}
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
            <Play className="w-5 h-5 ml-0.5" />
          </div>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-white/5">
        <h4 className="text-sm font-display font-medium text-white group-hover:text-brand-orange transition-colors tracking-tight">{title}</h4>
      </div>
    </motion.div>
  );
};

export function MoreVideos() {
  const [active, setActive] = useState<number | null>(null);

  // Close the enlarged view on Escape, and lock background scroll while open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [active]);

  const cur = active !== null ? DEMOS[active] : null;

  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">8. More Videos</h2>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12 max-w-3xl">
        G0.5 following everyday instructions across real homes — operating appliances, preparing food, contact-rich tool use, and tidying clutter. Hover any clip to preview it; click to enlarge.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEMOS.map((d, i) => (
          <DemoCard key={i} title={d.title} src={d.src} poster={d.poster} idx={i} onOpen={() => setActive(i)} />
        ))}
      </div>

      {/* Enlarged lightbox — click the video, the backdrop, the ✕, or press Esc to shrink it back. */}
      <AnimatePresence>
        {cur && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setActive(null)} />
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative w-full max-w-5xl"
            >
              <video
                key={cur.src}
                className="w-full max-h-[80vh] rounded-2xl border border-white/10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] bg-black cursor-zoom-out"
                poster={cur.poster}
                autoPlay
                loop
                muted
                playsInline
                onClick={() => setActive(null)}
              >
                <source src={cur.src} type="video/mp4" />
              </video>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#111111] border border-white/15 text-neutral-300 hover:text-white hover:border-brand-orange/50 flex items-center justify-center shadow-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <p className="mt-4 text-center text-sm font-display font-medium text-white tracking-tight">{cur.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
