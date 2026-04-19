import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ousmane S.",
    role: "Pèlerin Hadj 2025",
    content: "Une organisation impeccable. L'agence AL-HIDAYA a su nous rassurer tout au long du voyage. Les hôtels étaient magnifiques et l'encadrement religieux très présent.",
    rating: 5,
  },
  {
    name: "Fatoumata B.",
    role: "Oumra Ramadan 2025",
    content: "Un rêve devenu réalité. J'appréhendais de partir seule, mais l'équipe m'a accompagnée comme si j'étais de leur famille. Je recommande vivement !",
    rating: 5,
  },
  {
    name: "Ibrahim K.",
    role: "Pèlerin Hadj 2024",
    content: "Le professionnalisme et l'humanité de cette agence font la différence. On sent que leur priorité est notre confort spirituel.",
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-brand-sand">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:flex-1 grid grid-cols-1 gap-6">
          {testimonials.slice(0, 2).map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-2xl border-l-4 border-brand-gold shadow-sm flex flex-col justify-between"
            >
              <p className="text-gray-700 italic text-sm mb-4 leading-relaxed">
                "{t.content}"
              </p>
              <div className="font-bold text-brand-emerald text-sm">
                — {t.name}, {t.role}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="w-full lg:w-auto grid grid-cols-3 lg:flex shrink-0 gap-6 md:gap-12 items-center justify-center">
          <div className="text-center">
            <span className="block text-2xl md:text-3xl font-extrabold text-brand-gold">2024</span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 font-bold">Lancement</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl md:text-3xl font-extrabold text-brand-gold">5000+</span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 font-bold">Pèlerins</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl md:text-3xl font-extrabold text-brand-gold">100%</span>
            <span className="text-[10px] md:text-[11px] uppercase tracking-wider text-gray-500 font-bold">Agrément</span>
          </div>
        </div>
      </div>
    </section>
  );
}
