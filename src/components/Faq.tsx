import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, HelpCircle, Wallet, Calendar, Users, Plane, MousePointer2, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSanity } from '../sanity/useSanity';
import { getFaqs } from '../sanity/queries';

const iconMap: Record<string, React.ReactNode> = {
  Documents: <FileText className="w-6 h-6" />,
  Logistique: <Calendar className="w-6 h-6" />,
  Spiritualité: <Users className="w-6 h-6" />,
  Paiement: <Wallet className="w-6 h-6" />,
};

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  const fallbackFaqs = [
    {
      icon: <FileText className="w-6 h-6" />,
      q: "Quel document faut-il fournir pour les démarches de voyage ?",
      a: "Le passeport original est requis. Il doit être valide au moins 6 mois après la date de retour. Il sert aux démarches administratives du voyage, notamment le visa et les réservations. Si vous n'avez pas encore de passeport ou qu'il n'est plus valide, l'agence Al-Hidaya peut vous accompagner dans les démarches d'obtention ou de renouvellement.",
      category: "Documents"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      q: "Comment sont définies les dates du Hajj ?",
      a: "Les dates du Hajj sont fixées selon le calendrier lunaire saoudien et peuvent légèrement évoluer après l'observation du croissant lunaire. Lors de l'inscription, Al-Hidaya communique une période prévisionnelle de départ et de retour. Les dates définitives sont confirmées dès validation officielle par les autorités saoudiennes et les compagnies aériennes.",
      category: "Logistique"
    },
    {
      icon: <Plane className="w-6 h-6" />,
      q: "Le visa est-il inclus dans le prix ?",
      a: "Oui. Le prix annoncé inclut le visa, le billet d'avion et l'hébergement.",
      category: "Logistique"
    },
    {
      icon: <Users className="w-6 h-6" />,
      q: "Quel accompagnement religieux est prévu ?",
      a: "Chaque groupe est encadré par des guides religieux expérimentés. Des séances de formation sont organisées chaque samedi et dimanche dès l'inscription, afin de permettre aux pèlerins d'accomplir leurs rites avec compréhension, sérénité et confiance.",
      category: "Spiritualité"
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      q: "Puis-je payer en plusieurs fois ?",
      a: "Oui. Un premier acompte permet de valider l'inscription, puis le reste peut être versé progressivement jusqu'au départ, selon vos possibilités. Le paiement doit toutefois être entièrement réglé avant le voyage.",
      category: "Paiement"
    }
  ];

  const { data: sanityFaqs } = useSanity(getFaqs, null);

  const faqs = sanityFaqs
    ? sanityFaqs.map((f: any) => ({
        icon: iconMap[f.category] || <HelpCircle className="w-6 h-6" />,
        q: f.question,
        a: f.answer,
        category: f.category,
      }))
    : fallbackFaqs;

  return (
    <section id="FAQ" className="py-24 md:py-32 bg-brand-sand relative overflow-hidden">
      {/* Background Ornament - Hidden on small mobile */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none hidden sm:block">
        <HelpCircle size={600} className="-mr-40 -mt-20 rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:items-start">
          
          {/* LEFT: Header and Question List */}
          <div className="lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold font-bold text-[10px] uppercase tracking-widest mb-6">
                Assistance AL-HIDAYA
              </div>
              <h2 className="text-4xl md:text-7xl font-serif font-light text-brand-emerald leading-[0.9] tracking-tighter mb-8">
                Questions <br/> <span className="italic">Fréquentes</span>
              </h2>
              <p className="text-gray-500 font-medium max-w-sm text-lg">
                Tout ce que vous devez savoir pour préparer votre voyage sacré en toute sérénité.
              </p>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="flex flex-col">
                  <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "w-full group relative flex items-center justify-between p-5 md:p-6 rounded-[24px] transition-all duration-500 text-left",
                      activeIndex === i 
                        ? "bg-brand-emerald text-white shadow-sleek lg:-translate-right" 
                        : "bg-white text-brand-emerald hover:bg-white/80 border border-brand-gold/10"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "transition-colors duration-500",
                        activeIndex === i ? "text-brand-gold" : "text-brand-gold/60"
                      )}>
                        {faq.icon}
                      </span>
                      <span className="font-bold tracking-tight text-sm md:text-base leading-snug">{faq.q}</span>
                    </div>
                    <ChevronRight size={18} className={cn(
                      "transition-transform duration-500 shrink-0",
                      activeIndex === i ? "rotate-90 translate-x-1" : "group-hover:translate-x-2"
                    )} />
                  </motion.button>

                  {/* MOBILE ANSWER REVEAL (Hidden on Desktop) */}
                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="p-6 pt-2 bg-white/50 rounded-b-[24px] mt-[-12px] border-x border-b border-brand-gold/10">
                          <p className="text-gray-700 font-serif italic leading-relaxed mb-6">
                            {faq.a}
                          </p>
                          
                          <div className="flex flex-col gap-3">
                            <a href="#contact" className="w-full py-3 bg-brand-emerald text-white rounded-full text-center text-[11px] font-black uppercase tracking-widest">
                              Besoin d'aide ?
                            </a>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Active Answer Display (DESKTOP ONLY) */}
          <div className="hidden lg:block lg:w-7/12 sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="bg-white rounded-[40px] p-12 md:p-16 shadow-sleek border border-brand-gold/10 relative overflow-hidden"
              >
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[100px]" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                      {faqs[activeIndex].icon}
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-brand-gold/60">
                      Catégorie {faqs[activeIndex].category}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-black text-brand-emerald mb-8 leading-tight uppercase tracking-tighter">
                    {faqs[activeIndex].q}
                  </h3>

                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed font-serif italic">
                      {faqs[activeIndex].a}
                    </p>
                    
                    <div className="h-px w-full bg-gradient-to-r from-brand-gold/30 via-brand-gold/5 to-transparent my-8" />
                    
                  </div>
                </div>

                <div className="mt-12">
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 py-4 bg-brand-emerald text-white rounded-full font-bold text-xs md:text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform whitespace-nowrap"
                  >
                    Besoin de plus d'infos ?
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="mt-8 flex items-center gap-3 justify-center text-gray-400"
            >
              <MousePointer2 size={16} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Sélectionnez une question pour voir la réponse</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
