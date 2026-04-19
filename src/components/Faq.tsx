import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, HelpCircle, ShieldCheck, Wallet, Calendar, Users, Plane, MousePointer2 } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    icon: <Calendar className="w-6 h-6" />,
    q: "Quelles sont les dates exactes pour le Hadj 2026 ?",
    a: "Les dates définitives sont fixées par le calendrier lunaire saoudien. Nous prévoyons un départ vers début juin 2026 pour un retour fin juin/début juillet. Un calendrier précis vous sera remis dès l'ouverture officielle des visas.",
    category: "Logistique"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    q: "Quelles sont les garanties de réservation ?",
    a: "Votre réservation est protégée par un contrat légal d'agrément. Nous sécurisons vos places de vols et vos hébergements immédiatement après le premier versement, vous garantissant aucun changement de tarif.",
    category: "Confiance"
  },
  {
    icon: <Plane className="w-6 h-6" />,
    q: "Le visa est-il inclus dans le prix ?",
    a: "Oui, tous nos forfaits incluent les frais de visa, l'assurance médicale obligatoire saoudienne ainsi que l'accompagnement administratif complet au Niger. Pas de frais cachés.",
    category: "Logistique"
  },
  {
    icon: <Users className="w-6 h-6" />,
    q: "Quel type d'accompagnement religieux ?",
    a: "Chaque groupe est placé sous la supervision d'un encadrant religieux expérimenté. Des sessions de formation et des rappels quotidiens sont organisés pour que chaque rite soit accompli avec science et sérénité.",
    category: "Spiritualité"
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    q: "Puis-je payer en plusieurs fois ?",
    a: "Absolument. Nous proposons des facilités de paiement échelonnées jusqu'au départ. Un premier acompte valide votre dossier, puis nous établissons ensemble un plan de versement flexible et transparent.",
    category: "Paiement"
  }
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-brand-sand relative overflow-hidden">
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
                          
                          <div className="flex items-center gap-4 mb-6">
                            <div className="flex -space-x-3">
                              {[1, 2, 3].map(item => (
                                <div key={item} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-brand-sand">
                                  <img src={`https://picsum.photos/seed/${item + 10}/100/100`} alt="user" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] font-bold text-gray-400">
                              +150 pèlerins ont déjà consulté cette réponse.
                            </p>
                          </div>

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
                    
                    <div className="flex items-center gap-6">
                      <div className="flex -space-x-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-brand-sand">
                            <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="user" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs font-bold text-gray-400 max-w-[150px]">
                        +150 pèlerins ont déjà posé cette question.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#contact" 
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand-emerald text-white rounded-full font-bold text-xs md:text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform whitespace-nowrap"
                  >
                    Besoin de plus d'infos ?
                  </a>
                  <button className="flex-1 flex items-center justify-center gap-2 py-4 border border-brand-gold/20 text-brand-gold rounded-full font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-brand-gold/5 transition-colors whitespace-nowrap">
                    Télécharger le guide
                  </button>
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
