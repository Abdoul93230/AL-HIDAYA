import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, Share2, MessageCircle, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: React.ReactNode;
  category: string;
  date: string;
  image: string;
  author: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Guide 2026 : Se préparer spirituellement pour le Hadj",
    excerpt: "Le pèlerinage commence bien avant le départ de Niamey. Découvrez comment préparer votre cœur et votre esprit pour ce voyage sacré.",
    category: "Spiritualité",
    date: "15 Octobre 2025",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format",
    author: "Imam Moussa",
    content: (
      <div className="space-y-6">
        <p>Le Hadj n'est pas seulement un voyage physique vers la Mecque, c'est avant tout un voyage de l'âme. Pour que ce pilier de l'Islam soit pleinement accepté, la préparation doit commencer des mois à l'avance.</p>
        <h3 className="text-2xl font-bold text-brand-emerald">1. La Purification de l'Intention (An-Niyyah)</h3>
        <p>Assurez-vous que votre seule motivation est de plaire à Allah (SWT). Éloignez toute pensée d'ostentation ou de prestige social lié au titre de 'Hadj'.</p>
        <h3 className="text-2xl font-bold text-brand-emerald">2. L'Apprentissage des Rites</h3>
        <p>Apprenez les étapes du Hadj : de l'Ihram à Tawaf, en passant par Arafat et Mina. AL-HIDAYA organise des séminaires de formation gratuits pour tous ses inscrits.</p>
        <blockquote className="border-l-4 border-brand-gold pl-6 py-2 italic text-gray-700 bg-brand-gold/5">
          "Le Hadj est l'école de la patience et de l'humilité. Préparez votre esprit à accepter les défis avec sérénité."
        </blockquote>
        <p>Enfin, n'oubliez pas de régler toutes vos dettes et de demander pardon à votre entourage avant votre départ.</p>
      </div>
    )
  },
  {
    id: 2,
    title: "La Tontine Oumrah : Épargnez à votre rythme avec AmanaTa",
    excerpt: "Pourquoi choisir le paiement progressif ? Notre nouveau partenariat avec AmanaTa facilite l'accès aux lieux saints pour tous.",
    category: "Conseils",
    date: "12 Octobre 2025",
    image: "https://images.unsplash.com/photo-1582213713416-2bf9e69f889c?q=80&w=1200&auto=format",
    author: "Direction AL-HIDAYA",
    content: (
      <div className="space-y-6">
        <p>Chez AL-HIDAYA, nous croyons que le manque de liquidité immédiate ne devrait pas être un frein à votre désir de visiter la Kaaba. C'est pourquoi nous avons lancé la Tontine Oumrah.</p>
        <h3 className="text-2xl font-bold text-brand-emerald">Comment ça marche ?</h3>
        <p>Grâce à notre partenaire <strong>AmanaTa</strong>, vous pouvez désormais verser des petites sommes mensuelles ou hebdomadaires selon vos capacités.</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Accessibilité :</strong> Vous fixez vous-même le montant de votre épargne.</li>
          <li><strong>Sécurité :</strong> Vos fonds sont sécurisés et tracés via le réseau AmanaTa.</li>
          <li><strong>Sérénité :</strong> Une fois le montant atteint, votre place est garantie pour la saison choisie.</li>
        </ul>
        <p>Pour le départ d'août 2026, commencez dès aujourd'hui votre épargne pour voyager l'esprit léger et sans dettes.</p>
      </div>
    )
  },
  {
    id: 3,
    title: "Oumra Décembre : Pourquoi choisir Niamey comme point de départ ?",
    excerpt: "Les avantages logistiques et le confort de notre accompagnement spécial pour les départs de la fin d'année.",
    category: "Voyages",
    date: "05 Octobre 2025",
    image: "https://images.unsplash.com/photo-1565552134634-2f7555732dad?q=80&w=1200&auto=format",
    author: "Service Client",
    content: (
      <div className="space-y-6">
        <p>La fin d'année civile est une période très prisée pour l'Oumra. Partir de Niamey avec AL-HIDAYA offre des avantages inédits pour les familles et les professionnels.</p>
        <h3 className="text-2xl font-bold text-brand-emerald">Un Climat de Sérénité</h3>
        <p>En décembre, le climat en Arabie Saoudite est particulièrement clément, loin de la chaleur accablante de l'été, ce qui facilite grandement l'accomplissement des rites.</p>
        <h3 className="text-2xl font-bold text-brand-emerald">Logistique Simplifiée</h3>
        <p>Grâce à nos partenariats locaux, nous vous garantissons des transferts fluides depuis l'aéroport de Niamey et des hôtels situés à moins de 200m du Haram, même en période de forte affluence.</p>
        <p>C'est l'occasion idéale pour les familles de voyager ensemble durant les congés, dans un cadre sécurisé et spirituellement enrichissant.</p>
      </div>
    )
  }
];

export default function Blog({ onBack }: { onBack: () => void }) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const selectedPost = posts.find(p => p.id === selectedPostId);

  return (
    <div className="bg-brand-sand min-h-screen pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!selectedPostId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="max-w-2xl">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex items-center gap-3 mb-6"
                  >
                     <button 
                       onClick={onBack}
                       className="text-brand-gold font-black uppercase tracking-widest text-[10px] hover:underline"
                     >
                       ← Retour à l'accueil
                     </button>
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-serif font-light text-brand-emerald leading-[0.9] tracking-tighter"
                  >
                    L'Écho <span className="text-brand-gold italic">d'Al-Hidaya</span>
                  </motion.h1>
                  <motion.p 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="text-gray-500 mt-6 text-lg font-medium"
                  >
                    Actualités, conseils spirituels et guides pratiques pour votre pèlerinage.
                  </motion.p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white rounded-[40px] overflow-hidden shadow-sleek border border-white hover:border-brand-gold/20 transition-all flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-6 left-6 px-4 py-2 bg-brand-emerald text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-10 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
                      </div>

                      <h2 className="text-2xl font-black text-brand-emerald mb-4 leading-tight group-hover:text-brand-gold transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                         <button 
                           onClick={() => setSelectedPostId(post.id)}
                           className="flex items-center gap-2 text-brand-emerald font-black uppercase tracking-widest text-[10px] group-hover:gap-4 transition-all"
                         >
                            Lire la suite <ArrowRight size={14} className="text-brand-gold" />
                         </button>
                         <div className="flex gap-4 text-gray-300">
                            <Share2 size={16} className="hover:text-brand-gold cursor-pointer" />
                            <MessageCircle size={16} className="hover:text-brand-gold cursor-pointer" />
                         </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setSelectedPostId(null)}
                className="flex items-center gap-2 text-brand-gold font-black uppercase tracking-widest text-[10px] mb-8 hover:gap-4 transition-all"
              >
                <ArrowLeft size={16} /> Retour aux articles
              </button>

              <div className="relative h-[25rem] md:h-[35rem] rounded-[40px] overflow-hidden mb-12 shadow-2xl">
                <img 
                  src={selectedPost?.image} 
                  alt={selectedPost?.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-emerald/80 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <div className="px-4 py-2 bg-brand-gold text-brand-emerald inline-block text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
                    {selectedPost?.category}
                  </div>
                  <h1 className="text-3xl md:text-6xl font-black leading-tight tracking-tight">
                    {selectedPost?.title}
                  </h1>
                </div>
              </div>

              <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-sleek border border-white">
                <div className="flex items-center gap-8 text-gray-400 text-[10px] font-black uppercase tracking-widest mb-12 pb-8 border-b">
                  <span className="flex items-center gap-2"><Calendar size={16} strokeWidth={3} className="text-brand-gold" /> {selectedPost?.date}</span>
                  <span className="flex items-center gap-2"><User size={16} strokeWidth={3} className="text-brand-gold" /> {selectedPost?.author}</span>
                </div>

                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
                  {selectedPost?.content}
                </div>

                <div className="mt-16 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Partager</span>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-emerald hover:bg-brand-gold hover:text-white cursor-pointer transition-all"><Share2 size={18} /></div>
                      <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-brand-emerald hover:bg-brand-gold hover:text-white cursor-pointer transition-all"><MessageCircle size={18} /></div>
                    </div>
                  </div>

                  <a 
                    href="#contact"
                    onClick={() => {
                        setSelectedPostId(null);
                        onBack();
                        setTimeout(() => {
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }, 500);
                    }}
                    className="px-8 py-4 bg-brand-emerald text-white rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:bg-brand-gold transition-all"
                  >
                    Une question ? Contactez-nous
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
