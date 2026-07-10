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
    <section className="py-14 bg-brand-sand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-center gap-10 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="block text-4xl md:text-5xl font-extrabold text-brand-gold">2019</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Lancement</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="block text-4xl md:text-5xl font-extrabold text-brand-gold">3000+</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Pèlerins</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="block text-4xl md:text-5xl font-extrabold text-brand-gold">100%</span>
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Agrément</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
