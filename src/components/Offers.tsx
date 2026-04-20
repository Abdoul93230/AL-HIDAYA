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
        isPopular ? "bg-white shadow-sleek scale-[1.02] md:scale-[1.05] border-brand-gold z-10" : "bg-white/90 backdrop-blur-md shadow-sleek border-white/20"
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

  const hadjOffers: Offer[] = [
    {
      title: "Hadj Prestige 2026",
      type: "Hadj",
      price: "3 500 000",
      image: "https://images.unsplash.com/photo-1758985776354-4df674930917?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isPopular: true,
      features: [
        "Vols directs réguliers",
        "Hôtel 5★ face au Haram (100m)",
        "Transferts en bus VIP climatisé",
        "Encadrement religieux H24",
        "Visites sacrées (Ziyarats)",
        "Assurance médicale Or",
        "Kit pèlerin complet SmartLimb"
      ],
      fullDetails: "Une expérience spirituelle sans compromis. Nous gérons chaque détail logistique pour que vous vous concentriez uniquement sur vos rites. Notre équipe dévouée vous accompagne de Niamey jusqu'à votre retour."
    },
    {
      title: "Hadj Standard Plus",
      type: "Hadj",
      price: "2 900 000",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format",
      features: [
        "Vols avec escale confortable",
        "Hôtel 4★ à proximité (500m)",
        "Transport bus climatisé moderne",
        "Guide religieux expérimenté",
        "Pension complète incluse",
        "Assistance visa et formalités",
        "Sac de voyage Al-Hidaya offert"
      ],
      fullDetails: "Le meilleur rapport qualité-prix pour votre pèlerinage. Profitez d'un confort optimal et d'un encadrement de qualité supérieure à un prix étudié."
    }
  ];

  const oumraOffers: Offer[] = [
    {
      title: "Oumra Ramadan 2026",
      type: "Oumra",
      price: "1 800 000",
      image: "https://images.unsplash.com/photo-1770786106021-52580470e31e?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isPopular: true,
      features: [
        "Derniers 10 jours sacrés",
        "Hôtel 5★ à Médine et La Mecque",
        "Visa et assurance inclus",
        "Ifthar et Suhoor haut de gamme",
        "Assistance bagages personnalisée",
        "I'tikaf assisté pour ceux qui le souhaitent"
      ],
      fullDetails: "Vivez la ferveur du Ramadan dans les lieux saints. Un voyage transformateur organisé pour votre confort spirituel maximal durant ces nuits bénies."
    },
    {
      title: "Oumra Économique",
      type: "Oumra",
      price: "1 200 000",
      image: "https://images.unsplash.com/photo-1627728734379-a5f8c099763e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      features: [
        "Hôtel 3★ de qualité",
        "Transport inter-villes moderne",
        "Guide spirituel dévoué",
        "Kit pèlerin offert",
        "Assistance visa rapide",
        "Vols réguliers confortables"
      ],
      fullDetails: "Accessible et sérieux. Idéal pour un premier voyage ou pour ceux qui souhaitent partir régulièrement sans sacrifier la qualité de l'encadrement."
    }
  ];

  return (
    <section id="offres" className="pb-2 md:pb-12 pt-0">
      <motion.div 
        initial={{ rotateX: 10, y: 100, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 -mt-16 md:-mt-32 relative z-30"
        style={{ perspective: "1000px" }}
      >
        <div className="text-center mb-12 md:mb-20 relative px-4 py-8 rounded-[40px] bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-brand-emerald text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 shadow-lg"
          >
            Nos Programmes Exclusifs
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-8xl font-serif font-light text-brand-emerald leading-[0.9] tracking-tighter"
          >
            Vivez l'Expansion <br/> <span className="text-brand-gold italic">Spirituelle</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="w-20 md:w-32 h-2 bg-brand-gold mx-auto mt-8 rounded-full shadow-sm"
          />
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 mb-12 md:mb-24 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 pt-4">
          <div className="flex-none w-[300px] md:w-auto snap-center">
            <OfferCard 
              title={hadjOffers[0].title}
              type={hadjOffers[0].type}
              price={hadjOffers[0].price}
              features={hadjOffers[0].features}
              image={hadjOffers[0].image}
              isPopular={hadjOffers[0].isPopular}
              fullDetails={hadjOffers[0].fullDetails}
              onOpenModal={setSelectedOffer} 
            />
          </div>
          <div className="flex-none w-[300px] md:w-auto snap-center">
            <OfferCard 
              title={oumraOffers[0].title}
              type={oumraOffers[0].type}
              price={oumraOffers[0].price}
              features={oumraOffers[0].features}
              image={oumraOffers[0].image}
              isPopular={oumraOffers[0].isPopular}
              fullDetails={oumraOffers[0].fullDetails}
              onOpenModal={setSelectedOffer} 
            />
          </div>
          <div className="flex-none w-[300px] md:w-auto snap-center">
            <OfferCard 
              title={oumraOffers[1].title}
              type={oumraOffers[1].type}
              price={oumraOffers[1].price}
              features={oumraOffers[1].features}
              image={oumraOffers[1].image}
              isPopular={oumraOffers[1].isPopular}
              fullDetails={oumraOffers[1].fullDetails}
              onOpenModal={setSelectedOffer} 
            />
          </div>
        </div>
        
        <div id="hadj" className="mb-12 md:mb-24 text-center">
          <h2 className="text-3xl font-bold text-brand-emerald mb-8 uppercase tracking-widest">Nos Offres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {hadjOffers.map((off, idx) => (
              <OfferCard 
                key={idx}
                title={off.title}
                type={off.type}
                price={off.price}
                features={off.features}
                image={off.image}
                isPopular={off.isPopular}
                fullDetails={off.fullDetails}
                onOpenModal={setSelectedOffer}
              />
            ))}
          </div>
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
