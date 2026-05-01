import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Send, CheckCircle2, ChevronDown } from 'lucide-react';

const countries = [
  { code: 'NE', name: 'Niger', dial: '+227', length: 8, format: 'XX XX XX XX' },
  { code: 'SN', name: 'Sénégal', dial: '+221', length: 9, format: 'XXX XX XX XX' },
  { code: 'ML', name: 'Mali', dial: '+223', length: 8, format: 'XX XX XX XX' },
  { code: 'BF', name: 'Burkina Faso', dial: '+226', length: 8, format: 'XX XX XX XX' },
  { code: 'TG', name: 'Togo', dial: '+228', length: 8, format: 'XX XX XX XX' },
  { code: 'BJ', name: 'Bénin', dial: '+229', length: 8, format: 'XX XX XX XX' },
  { code: 'CM', name: 'Cameroun', dial: '+237', length: 9, format: 'XXX XX XX XX' },
  { code: 'CI', name: 'Côte d\'Ivoire', dial: '+225', length: 8, format: 'XX XX XX XX' },
  { code: 'FR', name: 'France', dial: '+33', length: 9, format: 'X XX XX XX XX' },
  { code: 'GB', name: 'Royaume-Uni', dial: '+44', length: 10, format: 'XXXX XXXXXX' },
  { code: 'SA', name: 'Arabie Saoudite', dial: '+966', length: 9, format: 'X XXXX XXXX' },
];

const formatPhoneNumber = (value: string, countryDial: string): string => {
  const country = countries.find(c => c.dial === countryDial);
  if (!country) return value;

  // Garder seulement les chiffres
  const digits = value.replace(/\D/g, '');
  
  // Limiter à la longueur maximale
  if (digits.length > country.length) {
    return digits.slice(0, country.length);
  }

  // Appliquer le format
  let formatted = '';
  let digitIndex = 0;
  
  for (let i = 0; i < country.format.length; i++) {
    if (country.format[i] === 'X') {
      if (digitIndex < digits.length) {
        formatted += digits[digitIndex];
        digitIndex++;
      } else {
        break;
      }
    } else {
      formatted += country.format[i];
    }
  }
  
  return formatted;
};

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const [countryCode, setCountryCode] = useState('+227');
  const [phone, setPhone] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const currentCountry = countries.find(c => c.dial === countryCode);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value, countryCode);
    setPhone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (currentCountry && digits.length === currentCountry.length) {
      setSubscribed(true);
    }
  };

  const handleSelectCountry = (dial: string) => {
    setCountryCode(dial);
    setPhone('');
    setShowDropdown(false);
  };

  const isPhoneValid = currentCountry && phone.replace(/\D/g, '').length === currentCountry.length;

  return (
    <section className="py-12 md:py-14 bg-brand-emerald relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
         <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center text-brand-emerald mx-auto mb-4 shadow-lg">
              <Phone size={28} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-3 tracking-tighter">
              Restez <span className="italic">Informé</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-6 md:mb-6 font-medium">
              Inscrivez-vous pour recevoir les dernières mises à jour sur le <span className="text-brand-gold">Hadj 2026</span>.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 py-3 px-6 bg-white/10 rounded-full border border-white/20 text-brand-gold font-bold text-sm"
              >
                <CheckCircle2 size={20} />
                <span>Merci ! Vous êtes maintenant inscrit.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                {/* Mobile: 2 rows, Desktop: 1 row */}
                <div className="flex flex-col md:flex-row gap-2 w-full">
                  {/* First Row for Mobile: Country + Input */}
                  <div className="flex gap-2 w-full md:flex-1">
                    {/* Country Selector */}
                    <div className="relative flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="h-12 md:h-14 bg-white rounded-full px-3 md:px-5 text-brand-emerald font-bold text-xs md:text-sm flex items-center gap-1 hover:bg-gray-50 transition-all focus:outline-none focus:ring-4 focus:ring-brand-gold/30"
                      >
                        <span>{countryCode}</span>
                        <ChevronDown size={14} className="flex-shrink-0" />
                      </button>
                      
                      {showDropdown && (
                        <div className="fixed md:absolute bottom-0 left-0 right-0 md:bottom-auto md:top-full md:left-0 md:right-auto mt-0 md:mt-2 w-full md:w-56 bg-white rounded-t-3xl md:rounded-2xl shadow-xl border border-gray-100 z-50 max-h-64 overflow-y-auto md:max-h-64">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleSelectCountry(country.dial)}
                              className={`w-full px-4 py-3 text-left text-sm font-medium hover:bg-brand-gold/10 transition-colors ${
                                countryCode === country.dial ? 'bg-brand-gold/20 text-brand-emerald font-bold' : 'text-gray-700'
                              }`}
                            >
                              {country.dial} {country.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    <input
                      required
                      type="tel"
                      placeholder="Numéro"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={currentCountry ? currentCountry.format.length : 20}
                      className="flex-1 h-12 md:h-14 bg-white rounded-full px-4 md:px-6 text-brand-emerald font-bold focus:outline-none focus:ring-4 focus:ring-brand-gold/30 transition-all placeholder:text-gray-400 text-xs md:text-base tracking-wider"
                    />
                  </div>

                  {/* Submit Button - Full width on mobile */}
                  <button
                    type="submit"
                    disabled={!isPhoneValid}
                    className={`h-12 md:h-14 px-4 md:px-6 text-white rounded-full font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-1 md:gap-2 transition-all w-full md:w-auto ${
                      isPhoneValid 
                        ? 'bg-brand-emerald hover:bg-brand-emerald/90 cursor-pointer' 
                        : 'bg-brand-emerald/50 cursor-not-allowed'
                    }`}
                  >
                    <Send size={14} />
                    <span>S'abonner</span>
                  </button>
                </div>
              </form>
            )}
            
            <p className="mt-4 text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold">
              Zéro Spam. Désabonnez-vous à tout moment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
