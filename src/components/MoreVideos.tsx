import { motion } from 'motion/react';

export function MoreVideos() {
  const videos = [
    { title: 'Contact-rich Tool Use', subtitle: 'Hammering a nail', src: '/videos/oob/hammer_nail.mp4', poster: '/videos/oob/hammer_nail.jpg' },
    { title: 'Long-horizon Cooking', subtitle: 'Stir-frying on the stove', src: '/videos/oob/stir_fry.mp4', poster: '/videos/oob/stir_fry.jpg' },
    { title: 'Cleaning & Hygiene', subtitle: 'Cleaning the toilet', src: '/videos/oob/toilet.mp4', poster: '/videos/oob/toilet.jpg' },
  ];

  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">8. More Videos</h2>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12 max-w-3xl">
        A few highlights of G0.5 handling diverse, contact-rich, and long-horizon everyday tasks.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="group relative bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-brand-orange/40 transition-colors shadow-xl"
          >
            <div className="aspect-video bg-[#0a0a0a] relative overflow-hidden">
              <video
                className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-700"
                poster={vid.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
              >
                <source src={vid.src} type="video/mp4" />
              </video>
            </div>

            <div className="p-6 border-t border-white/5 bg-[#111111]">
              <h3 className="text-lg font-display font-medium text-white group-hover:text-brand-orange transition-colors tracking-tight">{vid.title}</h3>
              <p className="text-[13px] text-neutral-500 font-mono mt-1">{vid.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
