import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Users, Hotel, Heart, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function WhyUs() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (!container) return;

    const offset = Math.round(container.clientWidth * 0.8);
    container.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  const items = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Agréé Officiellement",
      desc: "Licence officielle délivrée par l'État du Niger pour une sécurité totale.",
      size: "large",
      color: "bg-brand-emerald text-white"
    },
    {
      icon: <Hotel size={32} />,
      title: "Hébergements bien situés",
      desc: "Des chambres spacieuses, bien aménagées",
      size: "small",
      color: "bg-brand-gold text-brand-emerald"
    },
    {
      icon: <Users size={32} />,
      title: "Guides Locaux",
      desc: "Une équipe nigérienne dévouée à vos côtés.",
      size: "small",
      color: "bg-white text-brand-emerald border border-brand-gold/20"
    },
    {
      icon: <Clock size={32} />,
      title: "Accompagnement H24",
      desc: "Une assistance religieuse et logistique permanente.",
      size: "small",
      color: "bg-brand-sand text-brand-emerald border border-brand-gold/10"
    },
    {
      icon: <Award size={40} />,
      title: "Excellence depuis 2019",
      desc: "Une expérience bâtie depuis 2019 pour garantir exigence, sérieux et crédibilité dans l'encadrement des pèlerins.",
      size: "large",
      color: "bg-white text-brand-emerald shadow-xl border border-brand-gold/5"
    },
    {
      icon: <Heart size={32} />,
      title: "Focus Spirituel",
      desc: "Nous gérons tout pour que vous restiez concentré sur vos prières.",
      size: "small",
      color: "bg-brand-emerald/10 text-brand-emerald"
    }
  ];

  return (
    <section id="apropos" className="py-24 bg-white relative overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6" style={{marginTop:"-50px"}}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h4 className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Pourquoi AL-HIDAYA ?</h4>
            <h2 className="text-4xl md:text-7xl font-serif font-light text-brand-emerald leading-[0.9] tracking-tighter">
              L'excellence <span className="italic">redéfinie</span> pour votre pèlerinage
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm font-medium mb-2">
            Nous ne nous contentons pas d'organiser un voyage, nous bâtissons une expérience sacrée inoubliable.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            aria-label="Défiler vers la gauche"
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-brand-emerald text-white shadow-xl"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            aria-label="Défiler vers la droite"
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-brand-emerald text-white shadow-xl"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={carouselRef}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none hide-scrollbar -mx-6 md:mx-0 px-6 md:px-0"
          >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={cn(
                "p-6 md:p-8 rounded-[30px] md:rounded-[40px] flex flex-col transition-all duration-300 flex-none w-[95vw] md:w-auto snap-center",
                item.size === 'large' ? "md:col-span-2" : "col-span-1",
                item.color
              )}
            >
              <div className="mb-4 md:mb-6">{item.icon}</div>
              <h3 className={cn(
                "font-display font-black mb-3 md:mb-4 uppercase tracking-tighter",
                item.size === 'large' ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
              )}>
                {item.title}
              </h3>
              <p className={cn(
                "font-medium leading-relaxed opacity-80",
                item.size === 'large' ? "text-sm md:text-lg max-w-md" : "text-xs md:text-sm"
              )}>
                {item.desc}
              </p>
              {item.title === "Agréé Officiellement" && (
                <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-2">
                  <span className="text-xs font-semibold opacity-70">Code IATA:</span>
                  <span className="text-sm font-bold tracking-wider">58201021</span>
                </div>
              )}
              {item.title === "Hébergements bien situés" && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    "/chambre1.jpg",
                    "/chambre2.jpg",
                  ].map((image, imageIndex) => (
                    <div key={imageIndex} className="overflow-hidden rounded-2xl border border-white/20 shadow-lg bg-white/20">
                      <img
                        src={image}
                        alt={`Chambre AL-HIDAYA ${imageIndex + 1}`}
                        className="h-28 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          </div>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex md:hidden justify-center gap-2 mt-4 mb-4">
          {items.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-emerald/30" />
          ))}
        </div>

        {/* TRUST PARTNERS BAR - Marquee Effect */}
        <div className="mt-24 pt-12 border-t border-brand-gold/10 overflow-hidden">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 mb-10">Nos Partenaires de Confiance</p>
          <div className="relative flex overflow-hidden">
            <div className="flex gap-12 md:gap-24 animate-marquee whitespace-nowrap py-4">
              {[
                "OFFICE DU HADJ NIGER", "COHO", "MINISTÈRE DE L'ÉLEVAGE", "MINISTÈRE DE L'INTÉRIEUR",
                "HILTON MECCA", "PULLMAN ZAMZAM", "ETHIOPIAN AIRLINES", "SAUDI AIRLINES", "SAUDI VISION 2030", "INSTITUTIONS PUBLIQUES PARTENAIRES"
              ].map((partner, i) => (
                <div key={i} className="flex items-center gap-3 text-brand-emerald/20 font-display font-black text-2xl md:text-3xl uppercase tracking-tighter">
                  <div className="w-2 h-2 rounded-full bg-brand-gold/30" />
                  {partner}
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {[
                "OFFICE DU HADJ NIGER", "COHO", "MINISTÈRE DE L'ÉLEVAGE",
                "HILTON MECCA", "ETHIOPIAN AIRLINES", "SAUDI VISION 2030", "INSTITUTIONS PUBLIQUES PARTENAIRES"
              ].map((partner, i) => (
                <div key={i + 10} className="flex items-center gap-3 text-brand-emerald/20 font-display font-black text-2xl md:text-3xl uppercase tracking-tighter">
                  <div className="w-2 h-2 rounded-full bg-brand-gold/30" />
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
