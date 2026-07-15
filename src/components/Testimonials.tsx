import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { useSanity } from '../sanity/useSanity';
import { getSiteSettings } from '../sanity/queries';

const fallbackStats = [
  { value: '2019', label: 'Lancement' },
  { value: '3000+', label: 'Pèlerins' },
  { value: '100%', label: 'Agrément' },
];

export default function Testimonials() {
  const { data: settings } = useSanity(getSiteSettings, null);
  const stats = settings?.stats || fallbackStats;

  return (
    <section className="py-14 bg-brand-sand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-center gap-10 md:gap-20 items-center">
          {stats.map((stat: any, i: number) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="block text-4xl md:text-5xl font-extrabold text-brand-gold">{stat.value}</span>
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
