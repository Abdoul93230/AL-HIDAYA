import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#101820] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16 mb-10">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shadow-lg">
              <span className="text-brand-emerald font-bold text-xl font-serif">H</span>
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight">AL-HIDAYA</span>
          </div>
          <p className="text-white/60 mb-8 leading-relaxed">
            Votre agence de référence pour le Hadj et l'Oumra. Excellence, piété et accompagnement personnalisé pour votre voyage sacré.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-emerald transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-emerald transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-emerald transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-brand-gold">Liens Rapides</h4>
          <ul className="space-y-4 text-white/90">
            <li><a href="#" className="hover:text-brand-gold transition-colors font-medium">Accueil</a></li>
            <li><a href="#offres" className="hover:text-brand-gold transition-colors font-medium">Nos Offres</a></li>
            <li><a href="#apropos" className="hover:text-brand-gold transition-colors font-medium">À propos de l'agence</a></li>
            <li><a href="#galerie" className="hover:text-brand-gold transition-colors font-medium">Galerie Photos</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-brand-gold">Voyages</h4>
          <ul className="space-y-4 text-white/70">
            <li><a href="#" className="hover:text-white transition-colors">Hadj Prestige</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Oumra Ramadan</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Oumra Économique</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Voyages en Groupe</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Séjours Sur-Mesure</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-brand-gold">Contactez-nous</h4>
          <ul className="space-y-4 text-white/70">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-gold shrink-0 mt-1" />
              <span>Route Djogol Midi, Niamey, Niger</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-brand-gold shrink-0 mt-1" />
              <div className="flex flex-col gap-1">
                <span>+227 98 42 41 40</span>
                <span>+227 88 62 73 79</span>
                <span>+227 97 56 40 77</span>
                <span>+227 96 34 79 76</span>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-gold shrink-0" />
              <span>contact@alhidaya.ne</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
        <p>© {currentYear} AL-HIDAYA. Tous droits réservés.</p>
        <p>Réalisé par <span className="text-brand-gold font-bold">SmartLimb</span></p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
}
