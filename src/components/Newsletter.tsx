import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section className="py-24 bg-brand-emerald relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
         <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] md:rounded-[60px] p-8 md:p-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-brand-gold rounded-2xl flex items-center justify-center text-brand-emerald mx-auto mb-8 shadow-lg">
              <Mail size={32} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-6 tracking-tighter">
              Restez <span className="italic">Informé</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 font-medium">
              Abonnez-vous pour recevoir les dernières mises à jour sur les dates de départ, les ouvertures de visas et nos offres exclusives pour le <span className="text-brand-gold">Hadj 2026</span>.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 py-4 px-8 bg-white/10 rounded-full border border-white/20 text-brand-gold font-bold"
              >
                <CheckCircle2 size={24} />
                <span>Merci ! Vous êtes maintenant inscrit.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
                <input
                  required
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full h-16 md:h-20 bg-white rounded-full px-8 md:px-10 text-brand-emerald font-bold focus:outline-none focus:ring-4 focus:ring-brand-gold/30 transition-all placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-8 bg-brand-emerald text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-emerald/90 transition-all flex items-center gap-2"
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">S'abonner</span>
                </button>
              </form>
            )}
            
            <p className="mt-8 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
              Zéro Spam. Désabonnez-vous à tout moment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
