import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '../lib/utils';
import { Check, Star, X, Phone } from 'lucide-react';

interface Offer {
  title: string;
  type: 'Hadj' | 'Oumra';
  price: string;
  features: string[];
  image: string;
  isPopular?: boolean;
  fullDetails?: string;
}

interface OfferProps extends Offer {
  onOpenModal: (offer: Offer) => void;
  key?: React.Key;
}

export function OfferCard({ title, type, price, features, image, isPopular, fullDetails, onOpenModal }: OfferProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal({ title, type, price, features, image, isPopular, fullDetails })}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-[25px] md:rounded-[30px] overflow-hidden transition-all duration-300 group h-full flex flex-col border cursor-pointer",
        isPopular ? "bg-white shadow-sleek scale-[1.02] md:scale-[1.05] border-brand-gold z-10" : "bg-white md:bg-white/90 md:backdrop-blur-md shadow-sleek border-white/20"
      )}
    >
      {isPopular && (
        <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-brand-gold text-brand-emerald text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg animate-pulse whitespace-nowrap">
          Places Limitées (12)
        </div>
      )}
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="p-6 md:p-10 flex-grow flex flex-col text-center"
      >
        <motion.div 
          style={{ transform: "translateZ(50px)" }}
          className={cn(
            "w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl mx-auto mb-4 md:mb-6 flex items-center justify-center text-white shadow-lg",
            isPopular ? "bg-brand-emerald" : "bg-brand-gold"
          )}
        >
           {type === 'Hadj' ? <Star size={24} className="md:w-8 md:h-8" fill="currentColor" /> : <Star size={24} className="md:w-8 md:h-8" />}
        </motion.div>
        
        <h3 
          style={{ transform: "translateZ(50px)" }}
          className="text-xl md:text-2xl font-black text-brand-emerald mb-2 md:mb-4 tracking-tight"
        >
          {title}
        </h3>
        
        <p 
          style={{ transform: "translateZ(30px)" }}
          className="text-[10px] md:text-sm text-gray-500 mb-6 md:mb-8 font-medium"
        >
          {features.slice(0, 3).join(' • ')}
        </p>

        <div 
          style={{ transform: "translateZ(60px)" }}
          className="text-4xl font-black text-brand-emerald mb-10"
        >
          {price} <span className="text-sm font-bold opacity-40">FCFA</span>
        </div>

        <motion.button
          style={{ transform: "translateZ(40px)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "mt-auto w-full py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl transition-all",
            isPopular ? "bg-brand-emerald text-white" : "border-2 border-brand-emerald text-brand-emerald hover:bg-brand-emerald hover:text-white"
          )}
        >
          {isPopular ? "S'inscrire Maintenant" : "Voir les Détails"}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function OffersSection() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [activeSeason, setActiveSeason] = useState<'2025-2026' | '2026-2027'>('2025-2026');

  const offers2526: Offer[] = [
    {
      title: "Oumra Decembre 2025",
      type: "Oumra",
      price: "1 100 000",
      image: "https://images.unsplash.com/photo-1565552134634-2f7555732dad?q=80&w=1200&auto=format",
      features: [
        "Du 23 dec. 2025 au 04 jan. 2026",
        "Visa et assurance inclus",
        "Hotel a proximite du Haram",
        "Encadrement personnalise",
        "Kit pelerin offert"
      ],
      fullDetails: "Celebrez la fin d'annee dans la serenite des lieux saints. Un sejour de 12 jours concu pour allier confort et spiritualite."
    },
    {
      title: "Oumra Ramadan (1er Gr.)",
      type: "Oumra",
      price: "1 900 000",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format",
      isPopular: true,
      features: [
        "Du 16 fev. 2026 au 23 mars 2026",
        "Mois complet de Ramadan",
        "Hotels 4 etoiles et 5 etoiles",
        "Derniere decade incluse",
        "Pension complete (Ifthar/Suhoor)"
      ],
      fullDetails: "Le voyage d'une vie. Vivez le mois de Ramadan en entier a La Mecque et Medine avec un encadrement H24."
    }
  ];

  const offers2627: Offer[] = [
    {
      title: "Oumra Aout 2026",
      type: "Oumra",
      price: "1 100 000",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format",
      features: [
        "Du 05 aout au 20 aout 2026",
        "Visa inclus",
        "Hotel premium",
        "Transport Medine et Mecque",
        "Kit pelerin offert"
      ],
      fullDetails: "Partez durant l'ete 2026. Un voyage de 15 jours tout inclus, ideal pour une experience spirituelle fluide."
    },
    {
      title: "Oumra Decembre 2026",
      type: "Oumra",
      price: "1 200 000",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1200&auto=format",
      features: [
        "Du 23 dec. 2026 au 02 jan. 2027",
        "Visa inclus",
        "Hotel Medine et Mecque",
        "Transport climatise",
        "Encadrement devoue"
      ],
      fullDetails: "Planifiez votre fin d'annee 2026 avec un sejour tout confort pour debuter 2027 sous les meilleurs auspices."
    },
    {
      title: "Hadj 2027 (Pre-inscription)",
      type: "Hadj",
      price: "3 146 149",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format",
      isPopular: true,
      features: [
        "Dates selon calendrier officiel",
        "Hotel prestige proche du Haram",
        "Bus climatises nouvelle generation",
        "Encadrement medical et religieux",
        "Kit complet AL-HIDAYA"
      ],
      fullDetails: "Anticipez votre pelerinage 2027. Prix provisoire sujet aux directives officielles. Acompte de 150 000 FCFA pour valider votre pre-inscription."
    }
  ];

  const currentOffers = activeSeason === '2025-2026' ? offers2526 : offers2627;
  const firstHadjIndex = currentOffers.findIndex((offer) => offer.type === 'Hadj');
  const firstOumraIndex = currentOffers.findIndex((offer) => offer.type === 'Oumra');

  return (
    <section id="offres" className="pb-12 md:pb-24 pt-0">
      <motion.div 
        initial={{ rotateX: 10, y: 100, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 -mt-16 md:-mt-32 relative z-30"
        style={{ perspective: "1000px" }}
      >
        <div className="text-center mb-8 md:mb-12 relative px-4 py-5 md:py-6 rounded-[40px] bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-emerald text-white text-[10px] font-black uppercase tracking-[0.35em] mb-4 shadow-lg"
          >
            Nos Programmes 2025 - 2027
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-serif font-light text-brand-emerald leading-[0.95] tracking-tighter"
          >
            Calendrier des <br/> <span className="text-brand-gold italic">Departs</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="w-16 md:w-24 h-1.5 bg-brand-gold mx-auto mt-5 rounded-full shadow-sm"
          />

          <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 mt-6 md:mt-7">
            <button
              onClick={() => setActiveSeason('2025-2026')}
              className={cn(
                "px-5 md:px-7 py-2.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-wider transition-all",
                activeSeason === '2025-2026'
                  ? "bg-brand-emerald text-white shadow-lg"
                  : "bg-white text-brand-emerald border-2 border-brand-emerald/10 hover:border-brand-emerald"
              )}
            >
              Saison 2025 - 2026
            </button>
            <button
              onClick={() => setActiveSeason('2026-2027')}
              className={cn(
                "px-5 md:px-7 py-2.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-wider transition-all",
                activeSeason === '2026-2027'
                  ? "bg-brand-emerald text-white shadow-lg"
                  : "bg-white text-brand-emerald border-2 border-brand-emerald/10 hover:border-brand-emerald"
              )}
            >
              Saison 2026 - 2027
            </button>
          </div>
        </div>

        <div
          className={cn(
            "flex overflow-x-auto md:grid gap-8 mb-12 md:mb-24 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 pt-4 md:mx-auto md:px-0",
            currentOffers.length <= 1
              ? "md:grid-cols-1 md:max-w-xl"
              : currentOffers.length === 2
                ? "md:grid-cols-2 md:max-w-5xl"
                : "md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {currentOffers.map((offer, idx) => (
            <div
              key={idx}
              id={idx === firstHadjIndex ? 'hadj' : idx === firstOumraIndex ? 'oumra' : undefined}
              className="flex-none w-[300px] md:w-auto snap-center"
            >
              <OfferCard
                {...offer}
                onOpenModal={setSelectedOffer}
              />
            </div>
          ))}
        </div>

        {activeSeason === '2026-2027' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-emerald p-8 md:p-12 rounded-[40px] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl mb-12"
          >
            <div className="w-20 h-20 rounded-2xl bg-brand-gold flex items-center justify-center shrink-0">
              <Phone size={40} className="text-brand-emerald" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-black mb-2">Tontine Oumrah 2026</h3>
              <p className="text-white/70 mb-4 font-medium">Preparation progressive pour vos departs d'aout et decembre 2026. Paiement via <span className="text-brand-gold font-bold">AmanaTa</span>.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">AmanaTa : 89 97 17 64</span>
              </div>
            </div>
            <motion.a
              href="https://wa.me/22789971764"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-brand-gold text-brand-emerald font-black rounded-full uppercase tracking-widest text-xs shadow-xl"
            >
              Infos Tontine
            </motion.a>
          </motion.div>
        )}

        <div className="bg-brand-sand/50 backdrop-blur-sm border border-brand-gold/10 p-8 rounded-[40px] text-center">
          <p className="text-brand-emerald font-bold text-sm">
            <span className="text-brand-gold uppercase tracking-widest mr-2">Conditions :</span>
            Acompte obligatoire de <span className="text-brand-emerald font-black underline decoration-brand-gold shadow-sm">150 000 FCFA</span> pour valider toute reservation.
          </p>
        </div>
      </motion.div>

      {/* MODAL OFFER DETAILS */}
      <AnimatePresence>
        {selectedOffer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOffer(null)}
              className="absolute inset-0 bg-brand-emerald/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50, rotateX: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedOffer(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-brand-gold hover:text-brand-emerald transition-all md:text-brand-emerald md:bg-brand-sand md:hover:bg-brand-gold md:hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="relative h-64 md:h-full">
                <img src={selectedOffer.image} className="w-full h-full object-cover" alt={selectedOffer.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-emerald/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                   <div className="text-brand-gold text-[10px] font-black uppercase tracking-[0.3em] mb-2">{selectedOffer.type}</div>
                   <h3 className="text-3xl font-black">{selectedOffer.title}</h3>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col">
                <div className="mb-8">
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Inclusions Premium</h4>
                   <div className="grid grid-cols-1 gap-4">
                      {selectedOffer.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-brand-emerald font-bold text-sm">
                           <div className="w-6 h-6 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold grow-0 shrink-0">
                              <Check size={14} strokeWidth={4} />
                           </div>
                           {f}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="mb-10">
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">À Propos du Voyage</h4>
                   <p className="text-gray-600 leading-relaxed font-medium">
                     {selectedOffer.fullDetails}
                   </p>
                </div>

                <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="text-3xl font-black text-brand-emerald">
                      {selectedOffer.price} <span className="text-xs uppercase opacity-40">FCFA</span>
                   </div>
                   <motion.a
                     href={`https://wa.me/22789502485?text=Bonjour, je souhaite réserver l'offre ${selectedOffer.title}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="w-full sm:w-auto px-10 py-4 bg-brand-gold text-brand-emerald font-black rounded-full shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest text-[12px]"
                   >
                     <Phone size={18} />
                     Réserver via WhatsApp
                   </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
