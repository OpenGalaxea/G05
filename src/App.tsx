import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Abstract } from './components/Abstract';
import { InteractiveDiagram } from './components/InteractiveDiagram';
import { Distributions } from './components/Distributions';
import { Autoregressive } from './components/Autoregressive';
import { Capabilities } from './components/Capabilities';
import { Experiments } from './components/Experiments';
import { RobotGallery } from './components/RobotGallery';
import { MoreVideos } from './components/MoreVideos';
import { Citation } from './components/Citation';
import { TeaserVideo } from './components/TeaserVideo';
import { Footer } from './components/Footer';

function TOC() {
  const sections = [
    { id: "introduction", label: "1. Introduction" },
    { id: "autoregressive-pretraining", label: "2. VLM-as-Encoder → VLM-as-Actor" },
    { id: "introducing-g05", label: "3. G0.5 Model Design" },
    { id: "action-codec", label: "3.1. Cross-Embodiment Action Codec", isSub: true },
    { id: "native-cot", label: "3.2. Native Chain-of-Thought", isSub: true },
    { id: "visual-memory", label: "3.3. Visual Memory", isSub: true },
    { id: "pretraining", label: "4. Pre-training" },
    { id: "experiments", label: "5. Experiments" },
    { id: "real-world", label: "5.1. Real-World Fine-Tuning", isSub: true },
    { id: "droid-zeroshot", label: "5.2. DROID Zero-shot", isSub: true },
    { id: "behavior", label: "5.3. BEHAVIOR-1K Challenge", isSub: true },
    { id: "simulation", label: "5.4. Simulation Benchmarks", isSub: true },
    { id: "pp-bench", label: "5.5. Pick-and-Place Benchmark", isSub: true },
    { id: "cot-probe", label: "5.6. CoT & Action Head", isSub: true },
    { id: "capabilities", label: "6. Emergent Capabilities" },
    { id: "zero-shot", label: "6.1. Zero-shot Following", isSub: true },
    { id: "prompt-control", label: "6.2. Prompt-driven Control", isSub: true },
    { id: "out-of-box", label: "7. Out-of-box Application" },
    { id: "pick-place", label: "Pick up Anything & Place Anywhere", isSub: true },
    { id: "videos", label: "8. More Videos" }
  ];
  
  const [activeId, setActiveId] = useState("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[13px] font-medium text-neutral-400">Blog / Research</div>
      <nav className="flex flex-col gap-0 border-l border-white/10 relative">
        {sections.map(s => {
          const isActive = activeId === s.id;
          return (
            <a 
              key={s.id} 
              href={`#${s.id}`}
              className={`transition-all duration-300 border-l-2 py-2 ${
                s.isSub ? 'pl-8 text-[13px]' : 'pl-4 text-[14px]'
              } ${
                isActive 
                  ? 'border-brand-orange text-brand-orange font-medium bg-brand-orange/5' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {s.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  // When the distributions section is in view, the left TOC yields to the
  // embodiments detail panel (and the right spacer shows the dataset panel).
  const [distro, setDistro] = useState(false);

  return (
    <div className="min-h-screen bg-bg-dark text-neutral-200 font-sans selection:bg-brand-orange/30 selection:text-white">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-orange z-[9999] origin-left drop-shadow-md" 
        style={{ scaleX }} 
      />
      <Header />
      <div className="w-full max-w-[1600px] mx-auto px-6 pt-32 pb-32 flex flex-col items-center">
        {/* Dynamic responsive grid aligned to sidebar left and main content right */}
        <div className="w-full max-w-[840px] xl:max-w-[1480px] flex flex-col items-center xl:items-start select-none">
          
          {/* Teaser Video: Aligned horizontally from left of TOC sidebar to right of main content */}
          <div className="w-full max-w-[840px] xl:max-w-[1160px] mb-16 select-text">
            <TeaserVideo />
          </div>

          {/* Core horizontal layout block */}
          <div className="w-full flex items-start justify-center xl:justify-start select-text">
            {/* Left Sidebar TOC — yields to the embodiments detail panel over the distributions section */}
            <aside className="w-64 shrink-0 hidden xl:block self-stretch mr-16 mt-4">
              <div className="sticky top-32 relative">
                <div className={`transition-opacity duration-300 ${distro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <TOC />
                </div>
                <div id="distro-left-slot" className={`absolute inset-x-0 top-0 transition-opacity duration-300 ${distro ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
              </div>
            </aside>
            
            {/* Centered Main Content */}
            <main className="w-full max-w-[840px] flex flex-col gap-32">
              <div id="introduction" className="flex flex-col gap-10 scroll-mt-32">
                <div className="flex flex-col gap-1">
                  <span className="text-base font-medium text-neutral-200">Galaxea AI Research</span>
                  <span className="text-[15px] text-neutral-500">May 28, 2026</span>
                </div>
                
                <Hero />
                <Abstract />
              </div>
              
              <div id="autoregressive-pretraining" className="scroll-mt-32">
                <Autoregressive />
              </div>

              <div id="introducing-g05" className="scroll-mt-32">
                <InteractiveDiagram />
              </div>

              <div id="pretraining" className="scroll-mt-32">
                <Distributions onInViewChange={setDistro} />
              </div>

              <div id="experiments" className="scroll-mt-32">
                <Experiments />
              </div>

              <div id="capabilities" className="scroll-mt-32">
                <Capabilities />
              </div>

              <div id="out-of-box" className="scroll-mt-32">
                <RobotGallery />
              </div>
              
              <div id="videos" className="scroll-mt-32">
                <MoreVideos />
              </div>

              <Citation />
            </main>

            {/* Right spacer — hosts the dataset detail panel over the distributions section */}
            <div className="w-64 shrink-0 hidden xl:block self-stretch ml-16">
              <div className="sticky top-32">
                <div id="distro-right-slot" className={`transition-opacity duration-300 ${distro ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
