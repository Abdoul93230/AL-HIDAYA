import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActualites = location.pathname === '/actualites';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'À Propos', href: '#apropos' },
    { name: 'Nos Offres', href: '#offres' },
    { name: 'FAQ', href: '#FAQ' },
    { name: 'Galerie', href: '#galerie' },
    { name: 'Contact', href: '#contact' },
    { name: 'Actualités', href: '/actualites' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (isActualites) {
        navigate('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      e.preventDefault();
      setMobileMenuOpen(false);
      navigate(href);
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4',
        isActualites || isScrolled
          ? 'bg-brand-emerald/90 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={encodeURI('/Agence de Voyage AL - HIDAYA  HADJ & OUMRA.png')}
            alt="AL-HIDAYA"
            className="h-20 w-auto max-w-[320px] object-contain md:h-24"
          />
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => handleClick(e, link.href)}
              className={cn(
                'text-[13px] font-bold uppercase tracking-wider transition-opacity hover:opacity-100',
                isActualites && link.href === '/actualites'
                  ? 'text-brand-gold opacity-100'
                  : 'text-white opacity-80'
              )}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="tel:+22788627379"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-brand-gold text-brand-emerald px-6 py-2 rounded-full font-bold text-sm shadow-md transition-all hover:-translate-y-1 active:scale-95"
          >
            <Phone size={14} />
            <span>Appeler</span>
          </motion.a>
        </div>

        {/* Mobile Menu Trigger */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
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
                  onClick={(e) => handleClick(e, link.href)}
                  className={cn(
                    'text-xl font-bold hover:text-brand-gold transition-colors',
                    isActualites && link.href === '/actualites' ? 'text-brand-gold' : 'text-white/80'
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="h-px w-full bg-white/10 my-2" />
              <a
                href="tel:+22788627379"
                className="flex items-center justify-center gap-3 bg-brand-gold text-brand-emerald p-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl"
              >
                <Phone size={18} />
                <span>+227 88 62 73 79</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
