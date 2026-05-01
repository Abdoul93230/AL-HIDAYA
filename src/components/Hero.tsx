import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse), (max-width: 900px)');
    const updateDeviceClass = () => setIsCoarsePointer(mediaQuery.matches);
    updateDeviceClass();

    mediaQuery.addEventListener('change', updateDeviceClass);
    return () => mediaQuery.removeEventListener('change', updateDeviceClass);
  }, []);

  const lowPerfMode = isCoarsePointer || prefersReducedMotion;

  const xMouse = useMotionValue(0);
  const yMouse = useMotionValue(0);

  const mouseXSpring = useSpring(xMouse);
  const mouseYSpring = useSpring(yMouse);

  const rotateX = useTransform(mouseYSpring, [-100, 100], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-100, 100], ["-10deg", "10deg"]);

  const floatingOrbs = useMemo(
    () =>
      [...Array(5)].map((_, i) => ({
        id: i,
        width: Math.random() * 300 + 200,
        height: Math.random() * 300 + 200,
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
      })),
    [],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX - innerWidth / 2;
    const y = clientY - innerHeight / 2;
    xMouse.set(x / 10);
    yMouse.set(y / 10);
  };

  return (
    <section 
      onMouseMove={lowPerfMode ? undefined : handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-emerald py-20 lg:py-0"
      style={{ perspective: "1200px" }}
    >
      {/* Background Image with Parallax Effect */}
      <motion.div 
        style={lowPerfMode ? undefined : { rotateX, rotateY }}
        initial={lowPerfMode ? undefined : { scale: 1.1 }}
        animate={lowPerfMode ? undefined : { scale: 1 }}
        transition={lowPerfMode ? undefined : { duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {/* High-quality Background Image for All Screens */}
        <div className="w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=70&w=1400" 
            className="w-full h-full object-cover"
            alt="Mecca background"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/90 via-black/40 to-brand-emerald/80" />
      </motion.div>

      {/* Floating 3D Elements (Visual Depth) */}
      {!lowPerfMode && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden md:block">
        {floatingOrbs.map((orb) => (
          <motion.div
            key={orb.id}
            className="absolute bg-brand-gold/10 rounded-full blur-[80px]"
            style={{
              width: orb.width,
              height: orb.height,
              top: orb.top,
              left: orb.left,
            }}
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15 + orb.id * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        </div>
      )}
      
      <motion.div 
        style={lowPerfMode ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-20 max-w-6xl mx-auto px-6 text-center"
      >
        <motion.div
          style={{ transform: "translateZ(100px)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative"
        >
          {/* Accreditation Badge - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute -top-12 -right-12 md:-top-16 md:-right-16 flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-brand-gold rounded-full shadow-2xl rotate-12 group hover:rotate-0 transition-all duration-500 z-20"
          >
            <ShieldCheck size={24} className="text-brand-emerald mb-1 md:w-8 md:h-8" />
            <span className="text-[10px] font-black text-brand-emerald text-center leading-none uppercase tracking-tighter">
              Agréé <br/> État du Niger
            </span>
          </motion.div>

          <div>
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-display font-black text-white leading-[0.8] mb-4 tracking-tighter drop-shadow-2xl">
              AL-HIDAYA
            </h1>
            <p className="text-sm md:text-base font-serif font-light italic text-brand-gold mb-12 drop-shadow-md max-w-2xl mx-auto">
              Le meilleur choix pour un meilleur encadrement
            </p>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-white font-medium max-w-3xl mx-auto mb-12 leading-relaxed px-4 drop-shadow-md">
            L'excellence d'un voyage sacré, encadré par des professionnels pour une quiétude absolue de l'âme.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.a
              href="#offres"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-12 py-5 bg-brand-gold text-brand-emerald font-black rounded-full shadow-[0_20px_50px_rgba(197,160,89,0.3)] text-xl uppercase tracking-widest transition-all"
            >
              Découvrir 2026
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ bg: "rgba(255,255,255,0.2)" }}
              className="w-full sm:w-auto px-12 py-5 bg-white/5 backdrop-blur-lg border border-white/20 text-white font-bold rounded-full text-xl uppercase tracking-widest transition-all"
            >
              Consultation
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
      
      {/* 3D Scroll Indicator */}
      <motion.div 
        animate={lowPerfMode ? undefined : { y: [0, 10, 0] }}
        transition={lowPerfMode ? undefined : { repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-bold">Découvrir</span>
        <div className="w-px h-16 bg-gradient-to-b from-brand-gold/0 via-brand-gold to-brand-gold/0" />
      </motion.div>
    </section>
  );
}
