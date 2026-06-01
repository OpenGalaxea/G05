import { useState, useEffect } from 'react';
import { Globe, FileText, Users } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg-dark/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="images/Galaxea.png" alt="Galaxea Logo" className="h-6" referrerPolicy="no-referrer" />
        </div>
        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://galaxea-dynamics.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-3.5 sm:px-4 py-2 text-[13px] sm:text-sm font-medium text-black transition-all hover:bg-brand-orange-light hover:shadow-[0_0_24px_rgba(250,115,23,0.35)]"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Official Website</span>
            <span className="sm:hidden">Website</span>
          </a>
          <a
            href="Galaxea_G0_5.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 sm:px-4 py-2 text-[13px] sm:text-sm font-medium text-neutral-200 transition-all hover:border-brand-orange/50 hover:text-white hover:bg-white/[0.06]"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Read the Paper</span>
            <span className="sm:hidden">Paper</span>
          </a>
          <a
            href="https://galaxea.zhiye.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 sm:px-4 py-2 text-[13px] sm:text-sm font-medium text-neutral-200 transition-all hover:border-brand-orange/50 hover:text-white hover:bg-white/[0.06]"
          >
            <Users className="w-4 h-4" />
            Join Us
          </a>
        </nav>
      </div>
    </header>
  );
}
