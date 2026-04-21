import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '../lib/utils';

type NavPage = 'home' | 'blog';

interface NavbarProps {
  onNavigate?: (page: NavPage) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#', type: 'page', key: 'home' as NavPage },
    { name: 'Offres Hadj', href: '#hadj', type: 'anchor' },
    { name: 'Offres Oumra', href: '#oumra', type: 'anchor' },
    { name: 'Blog', href: '#blog', type: 'page', key: 'blog' as NavPage },
    { name: 'À Propos', href: '#apropos', type: 'anchor' },
    { name: 'Documents', href: '#documents', type: 'anchor' },
    { name: 'Galerie', href: '#galerie', type: 'anchor' },
    { name: 'Contact', href: '#contact', type: 'anchor' },
  ];

  const handlePageNavigate = (page: NavPage) => {
    if (onNavigate) {
      onNavigate(page);
    }

    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const blogSection = document.querySelector('#blog');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4',
        isScrolled ? 'bg-brand-emerald/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handlePageNavigate('home')}
        >
          <span className="text-xl md:text-2xl font-extrabold tracking-widest text-white">
            AL-HIDAYA
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => {
                if (link.type === 'page' && link.key) {
                  e.preventDefault();
                  handlePageNavigate(link.key);
                }
              }}
              className={cn(
                "text-[13px] font-bold uppercase tracking-wider transition-opacity hover:opacity-100",
                isScrolled ? "text-white opacity-80" : "text-white/80 opacity-80"
              )}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="tel:+22789502485"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-brand-gold text-brand-emerald px-6 py-2 rounded-full font-bold text-sm shadow-md transition-all hover:-translate-y-1 active:scale-95"
          >
            <Phone size={14} />
            <span>Appeler</span>
          </motion.a>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={isScrolled ? "text-white" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-white" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden fixed top-20 right-6 left-6 bg-brand-emerald border border-brand-gold/20 rounded-[30px] shadow-2xl overflow-hidden z-[100]"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => {
                    setMobileMenuOpen(false);

                    if (link.type === 'page' && link.key) {
                      e.preventDefault();
                      handlePageNavigate(link.key);
                    }
                  }}
                  className="text-xl font-bold text-white/80 hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="h-px w-full bg-white/10 my-2" />
              <a
                href="tel:+22789502485"
                className="flex items-center justify-center gap-3 bg-brand-gold text-brand-emerald p-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl"
              >
                <Phone size={18} />
                <span>+227 89 50 24 85</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
