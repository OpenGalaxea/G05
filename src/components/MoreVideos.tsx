import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export function MoreVideos() {
  const videos = [
    {
      title: "Dexterous Manipulation",
      src: "https://storage.googleapis.com/aistudio-chat-blob-prod/video_placeholder1.mp4",
      poster: "https://storage.googleapis.com/aistudio-chat-blob-prod/7f2cb098522e8fb7a3c3f3ab4eaabf0490b07acdbcfba61ff75aa9be0fa7b789/R1.png"
    },
    {
      title: "Navigation & Obstacle Avoidance",
      src: "https://storage.googleapis.com/aistudio-chat-blob-prod/video_placeholder2.mp4",
      poster: "https://storage.googleapis.com/aistudio-chat-blob-prod/8a688b1dca50a9ade7e163b2166a98c8c253ff605051bdf285ae14467d30d979/R1_Lite.png"
    },
    {
      title: "Human-Robot Interaction",
      src: "https://storage.googleapis.com/aistudio-chat-blob-prod/video_placeholder3.mp4",
      poster: "https://storage.googleapis.com/aistudio-chat-blob-prod/7f2cb098522e8fb7a3c3f3ab4eaabf0490b07acdbcfba61ff75aa9be0fa7b789/R1.png"
    }
  ];

  return (
    <section className="w-full">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 tracking-tight">More Videos</h2>
      <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.8] mb-12 max-w-3xl">
        Watch G0.5 in action across a variety of complex real-world zero-shot scenarios.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="group relative bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-brand-orange/40 transition-colors shadow-xl"
          >
            <div className="aspect-video bg-[#0a0a0a] relative overflow-hidden">
               <video 
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
                  poster={vid.poster}
                  loop
                  muted
                  playsInline
                  onMouseOver={e => e.currentTarget.play().catch(() => {})}
                  onMouseOut={e => e.currentTarget.pause()}
               >
                  <source src={vid.src} type="video/mp4" />
               </video>
               <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                 <div className="w-14 h-14 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                    <Play className="w-6 h-6 ml-1" />
                 </div>
               </div>
            </div>
            
            <div className="p-6 border-t border-white/5 bg-[#111111]">
              <h3 className="text-lg font-display font-medium text-white group-hover:text-brand-orange transition-colors tracking-tight">{vid.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
