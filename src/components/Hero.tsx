import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { ChevronDown, ArrowRight, ShieldCheck, Timer } from 'lucide-react';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const target = new Date("2026-06-01T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      {/* 3D Background Video with Parallax Effect */}
      <motion.div 
        style={lowPerfMode ? undefined : { rotateX, rotateY }}
        initial={lowPerfMode ? undefined : { scale: 1.1 }}
        animate={lowPerfMode ? undefined : { scale: 1 }}
        transition={lowPerfMode ? undefined : { duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {/* YouTube Video for Desktop */}
        <div className="hidden lg:block w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/vVJmX80zP-I?autoplay=1&mute=1&loop=1&playlist=vVJmX80zP-I&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
            className="absolute top-1/2 left-1/2 w-[180vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none border-none"
            allow="autoplay; encrypted-media"
            title="Mecca Animation"
          />
        </div>
        
        {/* High-quality Fallback Image for Mobile (YouTube is buggy on mobile background) */}
        <div className="lg:hidden w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=70&w=1200" 
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
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute -top-12 -right-12 hidden lg:flex flex-col items-center justify-center w-32 h-32 bg-brand-gold rounded-full shadow-2xl rotate-12 group hover:rotate-0 transition-all duration-500"
          >
            <ShieldCheck size={32} className="text-brand-emerald mb-1" />
            <span className="text-[10px] font-black text-brand-emerald text-center leading-none uppercase tracking-tighter">
              Agréé <br/> État du Niger
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 md:mb-8"
          >
            Premium Pilgrimage Experience
          </motion.span>

          {/* COUNTDOWN UI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center justify-center gap-4 mb-8 md:mb-12"
          >
            {[
              { label: 'Jours', value: timeLeft.days },
              { label: 'H', value: timeLeft.hours },
              { label: 'M', value: timeLeft.mins },
              { label: 'S', value: timeLeft.secs },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-xl md:text-3xl font-black text-white tabular-nums">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-[8px] md:text-[10px] uppercase tracking-widest font-black text-brand-gold">
                  {unit.label}
                </div>
              </div>
            ))}
            <div className="h-8 w-px bg-white/20 mx-2 hidden md:block" />
            <div className="hidden md:flex items-center gap-2 text-white/60">
              <Timer size={16} className="animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-left leading-tight">Avant le <br/> Prochain Départ</span>
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-9xl font-display font-black text-white leading-[0.8] mb-8 tracking-tighter drop-shadow-2xl">
            SPIRITUALITÉ <br />
            <span className="font-serif font-light italic text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold animate-shimmer">D'Exception</span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-white font-medium max-w-3xl mx-auto mb-12 leading-relaxed px-4 drop-shadow-md">
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
