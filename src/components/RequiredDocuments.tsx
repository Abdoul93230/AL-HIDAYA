import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { FileText, CheckCircle2, AlertCircle, ClipboardCheck } from 'lucide-react';
import { cn } from '../lib/utils';

function DocumentCard({ doc, index }: { doc: any, index: number, key?: React.Key }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-[40px] shadow-sleek border border-brand-gold/10 flex flex-col items-center text-center group cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="w-20 h-20 rounded-3xl bg-brand-sand flex items-center justify-center mb-6 group-hover:bg-brand-gold/10 transition-colors shadow-inner"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {doc.icon}
        </motion.div>
      </div>
      <h4 
        style={{ transform: "translateZ(40px)" }}
        className="text-xl font-black text-brand-emerald mb-4 tracking-tight"
      >
        {doc.title}
      </h4>
      <p 
        style={{ transform: "translateZ(30px)" }}
        className="text-gray-500 text-sm leading-relaxed font-medium"
      >
        {doc.desc}
      </p>
    </motion.div>
  );
}

export default function RequiredDocuments() {
  const documents = [
    {
      title: "Passeport",
      desc: "Original valide au moins 6 mois après la date du retour.",
      icon: <FileText className="text-brand-gold" size={32} />
    },
    {
      title: "Photos d'identité",
      desc: "4 photos récentes sur fond blanc (format 4x4).",
      icon: <FileText className="text-brand-gold" size={32} />
    },
    {
      title: "Carnet de Vaccination",
      desc: "Vaccin Meningite (ACYW135) et Fièvre Jaune à jour.",
      icon: <CheckCircle2 className="text-brand-gold" size={32} />
    },
    {
      title: "Identité Nationale",
      desc: "Copie légalisée de la Carte Nationale d'Identité.",
      icon: <ClipboardCheck className="text-brand-gold" size={32} />
    }
  ];

  return (
    <section id="documents" className="py-32 bg-brand-sand relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-emerald/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4 md:mb-6"
          >
            <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[10px]">
              S'inscrire en toute sérénité
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-black text-brand-emerald mb-6 md:mb-8 tracking-tighter"
          >
            Pièces à <span className="text-brand-gold">Fournir</span>
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1.5 bg-brand-gold mx-auto rounded-full"
          />
        </div>

        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 md:gap-10 pb-12 lg:pb-0 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 pt-6">
          {documents.map((doc, i) => (
            <div key={i} className="flex-none w-[280px] sm:w-1/2 lg:w-auto snap-center">
              <DocumentCard doc={doc} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
