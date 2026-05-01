import React from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, PlaneTakeoff, HeartHandshake, Map } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      icon: <ClipboardCheck size={28} />,
      title: "Inscription",
      desc: "Étude de votre dossier et réservation des vols.",
      color: "bg-blue-500"
    },
    {
      icon: <Map size={28} />,
      title: "Préparation",
      desc: "Formation aux rites et formalités administratives.",
      color: "bg-brand-gold"
    },
    {
      icon: <PlaneTakeoff size={28} />,
      title: "Le Voyage",
      desc: "Décollage de Niamey et accueil VIP en Arabie Saoudite.",
      color: "bg-brand-emerald"
    },
    {
      icon: <HeartHandshake size={28} />,
      title: "Accompagnement",
      desc: "Réalisation des rites avec nos guides dévoués.",
      color: "bg-red-500"
    }
  ];

  return (
    <section className="py-6 md:py-8 bg-brand-emerald text-white overflow-hidden relative">
      {/* Decorative Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 blur-[150px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 blur-[150px] rounded-full -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <h4 className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-2">La Méthode AL-HIDAYA</h4>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tighter">
            Votre voyage <span className="italic">étape par étape</span>
          </h2>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-5 md:gap-6 pt-2 pb-3 md:pb-0 snap-x snap-mandatory hide-scrollbar relative -mx-6 px-6">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-brand-gold/20 -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex-none w-[280px] md:w-auto flex flex-col items-center text-center group snap-center"
            >
              <motion.div 
                whileHover={{ rotateY: 180 }}
                className={`w-24 h-24 md:w-28 md:h-28 rounded-[30px] md:rounded-[35px] flex items-center justify-center mb-3 md:mb-4 relative transition-all duration-500 ${step.color} shadow-2xl`}
              >
                <div className="text-white scale-90 md:scale-100">{step.icon}</div>
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white text-brand-emerald flex items-center justify-center text-[10px] md:text-xs font-black shadow-lg">
                  {i + 1}
                </div>
              </motion.div>
              <h3 className="text-lg md:text-xl font-display font-black mb-2 md:mb-3 tracking-tighter uppercase">{step.title}</h3>
              <p className="text-white/60 font-medium leading-relaxed max-w-[200px] text-xs md:text-sm px-3">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex md:hidden justify-center gap-2 mt-[-10px] mb-2">
          {steps.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 md:mt-6 text-center"
        >
          <a
            href="#contact"
            className="inline-flex px-8 py-3 bg-brand-gold text-brand-emerald font-black rounded-full shadow-2xl hover:scale-105 transition-all text-xs uppercase tracking-widest"
          >
            Commencer mon inscription
          </a>
        </motion.div>
      </div>
    </section>
  );
}
