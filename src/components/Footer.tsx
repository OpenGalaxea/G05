import { Hexagon, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img src="/images/Galaxea.png" alt="Galaxea Logo" className="h-6" referrerPolicy="no-referrer" />
            <span className="font-display font-bold text-xl tracking-wide text-white uppercase ml-1">
              Dynamics
            </span>
          </div>
          <p className="text-neutral-400 text-sm max-w-sm leading-relaxed mb-6">
            Pioneering the next generation of embodied artificial intelligence. Building robots that understand and interact with the physical world safely and intelligently.
          </p>
          <div className="flex items-center gap-4 text-neutral-500">
            <a href="#" className="hover:text-brand-orange transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-brand-orange transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-brand-orange transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Research</h4>
          <ul className="flex flex-col gap-3 text-sm text-neutral-400">
            <li><a href="https://opengalaxea.github.io/G05/" className="hover:text-brand-orange flex items-center gap-1 transition-colors">G0.5 Project Page <ArrowUpRight size={14} /></a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Publications</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Open Source</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Simulations</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="flex flex-col gap-3 text-sm text-neutral-400">
            <li><a href="#" className="hover:text-brand-orange transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Press</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>&copy; 2026 Galaxea Dynamics. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
