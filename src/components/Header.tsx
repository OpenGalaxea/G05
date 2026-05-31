import { useState, useEffect } from 'react';

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
      <div className="max-w-[1600px] mx-auto px-6 flex items-center">
        <div className="flex items-center gap-2">
          <img src="images/Galaxea.png" alt="Galaxea Logo" className="h-6" referrerPolicy="no-referrer" />
        </div>
      </div>
    </header>
  );
}
