import { motion, useScroll, useSpring, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OffersSection from './components/Offers';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import RequiredDocuments from './components/RequiredDocuments';
import WhatsAppButton from './components/WhatsAppButton';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Faq from './components/Faq';
import Newsletter from './components/Newsletter';
import { Star, MapPin, Clock, BadgeCheck, Camera, Heart, ShieldCheck, Phone, X, Mail } from 'lucide-react';
import { cn } from './lib/utils';
import { useEffect, useMemo, useState } from 'react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse), (max-width: 900px)');
    const updateDeviceClass = () => setIsCoarsePointer(mediaQuery.matches);
    updateDeviceClass();

    mediaQuery.addEventListener('change', updateDeviceClass);
    return () => mediaQuery.removeEventListener('change', updateDeviceClass);
  }, []);

  const lowPerfMode = isCoarsePointer || prefersReducedMotion;

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundBlobs = useMemo(
    () =>
      [...Array(6)].map((_, i) => ({
        id: i,
        width: 400 + Math.random() * 300,
        height: 400 + Math.random() * 300,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 15 + Math.random() * 10,
        xOffset: Math.random() * 200 - 100,
        yOffset: Math.random() * 200 - 100,
      })),
    [],
  );

  const galleryImages = [
    "/624700658_876937178464558_4558521500937380253_n.jpg",
    "/526965774_732816946209916_5096855490665871705_n.jpg", 
    "/527191524_732816866209924_5571990788218110380_n.jpg", 
    "/499703444_674677528690525_2367499767595363538_n.jpg", 
    "/498179141_674677565357188_1164557361268280119_n.jpg", 
    "/487241754_638227569002188_7422085376426020883_n.jpg", 
    "/672672775_939493652208910_2045622064777589843_n.jpg", 
    "/495377121_665431132948498_7565671843195843296_n.jpg"
  ];

  return (
    <MotionConfig reducedMotion={lowPerfMode ? 'always' : 'never'}>
      <div className="relative font-sans selection:bg-brand-gold selection:text-brand-emerald bg-white overflow-x-hidden">
      {/* 3D Background Decorative Elements */}
      {!lowPerfMode && (
        <div className="fixed inset-0 pointer-events-none z-0 hidden md:block">
        {backgroundBlobs.map((blob) => (
          <motion.div
            key={blob.id}
            className={cn(
              "absolute rounded-full blur-[120px]",
              blob.id % 2 === 0 ? "bg-brand-gold/10" : "bg-brand-emerald/5"
            )}
            animate={{
              x: [0, blob.xOffset, 0],
              y: [0, blob.yOffset, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: blob.width,
              height: blob.height,
              top: blob.top,
              left: blob.left,
            }}
          />
        ))}
        </div>
      )}

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />
      <WhatsAppButton />

      <main>
        {/* HERO SECTION */}
        <Hero />

        {/* OFFERS SECTION - Now overlapping Hero via its own -mt-20 */}
        <OffersSection />

        {/* WHY US - BENTO GRID */}
        <WhyUs />

        {/* PROCESS TIMELINE */}
        <Process />

        {/* TESTIMONIALS & TRUST (BOTTOM SHELF) */}
        <Testimonials />

        {/* FAQ SECTION */}
        <Faq />

        {/* NEWSLETTER */}
        <Newsletter />

        <section id="apropos" className="py-24 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, ease: "circOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[30px] overflow-hidden shadow-2xl">
                <img 
                  src="/497789535_673582708800007_4054103397318917882_n.jpg" 
                  alt="Formation AL-HIDAYA" 
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -left-10 w-40 h-40 border-2 border-brand-gold/20 rounded-full border-dashed"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-0.5 bg-brand-gold" />
                <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[10px]">Notre Histoire</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-brand-emerald mb-6 md:mb-8 leading-[1.1] tracking-tighter text-center md:text-left">
                L'Excellence <br className="hidden sm:block"/> <span className="text-brand-gold">au Service</span> du pèlerin
              </h2>
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 font-bold text-center md:text-left">
                AL-HIDAYA est le fruit d'une passion pour le service sacré. Depuis 2024, nous mettons tout en œuvre pour que chaque pèlerin puisse accomplir ses rites dans la paix et la sérénité.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-12">
                {[
                  { icon: <ShieldCheck size={28} />, title: "Agréments", desc: "Reconnus officiellement par l'État du Niger." },
                  { icon: <Star size={28} />, title: "Prestige", desc: "Hôtels 5 étoiles à la Mecque et Médine." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex gap-4 md:gap-5 p-5 md:p-6 rounded-[25px] md:rounded-[30px] bg-brand-sand border border-brand-gold/10 shadow-sm"
                  >
                    <div className="shrink-0 text-brand-gold bg-white w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner">{item.icon}</div>
                    <div>
                      <h4 className="font-black text-brand-emerald text-base md:text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-bold">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center md:justify-start">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto text-center px-12 py-5 bg-brand-emerald text-white font-black rounded-full shadow-[0_20px_40px_rgba(10,74,52,0.2)] uppercase tracking-widest text-sm"
                >
                  Notre Mission
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* OFFERS SECTION - Replaced above */}

        {/* GALLERY SECTION */}
        <section id="galerie" className="py-24 bg-brand-sand">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-emerald mb-4 uppercase tracking-widest">Galerie</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Revivez les moments forts de nos pèlerinages.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  onClick={() => setSelectedGalleryImg(img)}
                  transition={{ 
                    duration: 0.6, 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  className={cn(
                    "relative overflow-hidden group rounded-[30px] shadow-lg cursor-pointer",
                    i % 3 === 0 ? "md:row-span-2 md:col-span-2" : ""
                  )}
                >
                  <img 
                    src={img} 
                    alt={`AL-HIDAYA Gallery ${i}`} 
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-emerald/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Camera className="text-white scale-0 group-hover:scale-125 transition-transform" size={40} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS - Replaced above */}

        {/* DOCUMENTS SECTION */}
        <RequiredDocuments />

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 relative bg-white">
          <div className="max-w-7xl mx-auto px-6">
             <div className="bg-brand-sand rounded-[40px] shadow-sleek overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white">
                <div className="p-12 lg:p-20 bg-brand-emerald text-white relative">
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                    Prêt pour le Voyage ?
                  </h2>
                  <p className="text-white/70 text-lg mb-12">
                    Recevez un devis personnalisé sous 24h. Nos conseillers sont là pour vous accompagner.
                  </p>

                  <div className="space-y-8">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-gold border border-white/20"><Phone size={20} /></div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-white/50">Téléphone</p>
                          <p className="text-lg font-bold">+227 89 50 24 85</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-gold border border-white/20"><MapPin size={20} /></div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-white/50">Bureau</p>
                          <p className="text-lg font-bold">Niamey, Niger</p>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="p-12 lg:p-20">
                  <ContactForm />
                </div>
             </div>
          </div>
        </section>

        {/* SEO / FOOTER LINKS CTA */}
        <section className="py-12 bg-white text-center">
            <div className="max-w-4xl mx-auto px-6">
                <p className="text-gray-400 text-sm leading-relaxed">
                  AL-HIDAYA est agréée par le Ministère de l'Intérieur, de la Sécurité Publique et de l'Administration Territoriale du Niger. <br/>
                  Nous respectons strictement les directives de l'Office du Hadj de l'Arabie Saoudite.
                </p>
            </div>
        </section>
      </main>

      <Footer />

      {/* GALLERY LIGHTBOX */}
      <AnimatePresence>
        {selectedGalleryImg && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              className="relative max-w-5xl w-full aspect-video md:aspect-auto md:h-[80vh] overflow-hidden rounded-3xl shadow-2xl"
            >
              <button 
                onClick={() => setSelectedGalleryImg(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-brand-gold hover:text-brand-emerald transition-all"
              >
                <X size={24} />
              </button>
              <img src={selectedGalleryImg} className="w-full h-full object-contain" alt="Gallery View" decoding="async" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
