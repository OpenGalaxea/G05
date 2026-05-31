import { motion, AnimatePresence } from 'motion/react';
import { Quote, X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function Citation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const bibtex = `@article{galaxea2026g05,
  title={Galaxea G0.5 Technical Report},
  author={{Galaxea Team}},
  year={2026},
  url={https://opengalaxea.github.io/G05/}
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bibtex);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="w-full flex justify-center py-16 border-t border-white/5">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 text-[14px] font-medium text-neutral-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10"
      >
        <Quote size={16} />
        Cite this work
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-medium text-white">Citation</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="relative bg-[#0a0a0a] border border-white/5 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm font-mono text-neutral-300 m-0 whitespace-pre-wrap pr-12">
                  <code>{bibtex}</code>
                </pre>
                <button 
                  onClick={handleCopy}
                  className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-neutral-300 transition-colors"
                  title="Copy to clipboard"
                >
                  {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
