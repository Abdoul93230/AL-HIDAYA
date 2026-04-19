import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tripType: 'Hadj',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', tripType: 'Hadj', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-emerald/10 border-2 border-brand-emerald p-12 rounded-[2rem] text-center"
      >
        <CheckCircle size={64} className="text-brand-emerald mx-auto mb-6" />
        <h3 className="text-3xl font-serif font-bold text-brand-emerald mb-4">Message Envoyé !</h3>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          Merci pour votre confiance. Un conseiller AL-HIDAYA vous contactera dans les plus brefs délais.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-brand-emerald font-bold underline"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full bg-[#f1f1f1] border-none p-4 rounded-[10px] focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm"
          placeholder="Nom complet"
        />
        <input
          required
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full bg-[#f1f1f1] border-none p-4 rounded-[10px] focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm"
          placeholder="Téléphone"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full bg-[#f1f1f1] border-none p-4 rounded-[10px] focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm"
          placeholder="Email"
        />
        <select
          value={formData.tripType}
          onChange={(e) => setFormData({...formData, tripType: e.target.value})}
          className="w-full bg-[#f1f1f1] border-none p-4 rounded-[10px] focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm"
        >
          <option value="Hadj">Pèlerinage Hadj</option>
          <option value="Oumra">Oumra</option>
          <option value="Groupe">Voyage de Groupe</option>
        </select>
      </div>

      <textarea
        required
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        className="w-full bg-[#f1f1f1] border-none p-4 rounded-[10px] focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm"
        placeholder="Dites-nous comment nous pouvons vous aider..."
      />

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ y: -2 }}
        className="w-full py-4 bg-brand-gold text-brand-emerald rounded-full font-bold shadow-lg transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? (
          <div className="w-5 h-5 border-2 border-brand-emerald/30 border-t-brand-emerald rounded-full animate-spin mx-auto" />
        ) : (
          "Commander un devis"
        )}
      </motion.button>
    </form>
  );
}
