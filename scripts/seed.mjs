import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'klvdkvay',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
});

async function seed() {
  console.log('🌱 Début du seeding Sanity (textes exacts des composants)...');

  // 1. Site Settings
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'AL-HIDAYA',
    seoDescription: "Votre agence de référence pour le Hadj et l'Oumra. Excellence, piété et accompagnement personnalisé pour votre voyage sacré.",
    showTestimonials: false,
    stats: [
      { _key: 'stat1', value: '2019', label: 'Lancement' },
      { _key: 'stat2', value: '3000+', label: 'Pèlerins' },
      { _key: 'stat3', value: '100%', label: 'Agrément' },
    ],
    footerText: "AL-HIDAYA est agréée par le Ministère de l'Intérieur, de la Sécurité Publique et de l'Administration Territoriale du Niger. Nous respectons strictement les directives de l'Office du Hadj de l'Arabie Saoudite.",
  });
  console.log('✅ Site Settings');

  // 2. Contact
  await client.createOrReplace({
    _id: 'contactInfo',
    _type: 'contact',
    mainPhone: '+227 88 62 73 79',
    otherPhones: ['98 42 41 40', '96 34 79 76'],
    email: 'contact@alhydayahadj.com',
    address: 'Route Djogol Midi, Niamey',
    whatsapp: '22788627379',
    tontinePhone: '89 97 17 64',
  });
  console.log('✅ Contact');

  // 3. Hero
  await client.createOrReplace({
    _id: 'heroSection',
    _type: 'hero',
    title: 'AL-HIDAYA',
    subtitle: "Le meilleur choix pour un meilleur encadrement",
    ctaText: 'Découvrir 2026',
    ctaLink: '#offres',
  });
  console.log('✅ Hero');

  // 4. About
  await client.createOrReplace({
    _id: 'aboutSection',
    _type: 'about',
    sectionTitle: 'Notre Histoire',
    heading: "L'Excellence au Service du pèlerin",
    description: "AL-HIDAYA est le fruit d'une passion pour le service sacré. Depuis 2019, nous mettons tout en œuvre pour que chaque pèlerin puisse accomplir ses rites dans la paix et la sérénité.",
    features: [
      { _key: 'f1', title: 'Agréments', description: "Reconnus officiellement par l'État du Niger." },
      { _key: 'f2', title: 'Prestige', description: 'Hôtels à la Mecque et Médine.' },
    ],
  });
  console.log('✅ About');

  // 5. Offres (exactement comme dans Offers.tsx)
  const offers = [
    {
      _id: 'offer-oumra-aout-2026',
      title: 'Oumra Août 2026',
      type: 'Oumra',
      price: '1 250 000',
      badge: 'SOLDOUT',
      isPopular: false,
      features: ['Transport, hébergement & visa', 'Séances de formation chaque samedi et dimanche', 'Accompagnement dédié'],
      fullDetails: "Du 5 au 20 août 2026. Voyage de 15 jours avec séances de formation chaque samedi et dimanche, transport, hébergement et visa inclus, ainsi qu'un encadrement dédié.",
      order: 1,
    },
    {
      _id: 'offer-oumra-dec-2026',
      title: 'Oumra Décembre 2026',
      type: 'Oumra',
      price: '1 250 000',
      badge: 'Acompte 150 000 FCFA',
      isPopular: false,
      features: ['Transport, hébergement & visa', 'Séjour organisé avec soin', 'Accompagnement dédié'],
      fullDetails: "Du 23 décembre 2026 au 2 janvier 2027. Planifiez votre fin d'année pour débuter 2027 dans la paix et la sérénité.",
      order: 2,
    },
    {
      _id: 'offer-oumra-ramadan-2026',
      title: 'Oumra Ramadan 2026',
      type: 'Oumra',
      price: 'Voir détails',
      badge: '2 formules',
      isPopular: false,
      features: ['Transport, hébergement & visa', 'Formule 1 900 000 FCFA : début du Ramadan', 'Formule 1 800 000 FCFA : à partir du 15e jour'],
      fullDetails: "Oumra Ramadan 2026 réunit deux formules : Formule 1 900 000 FCFA (départ au début du Ramadan à La Mecque, les pèlerins débutent le Ramadan à La Mecque) et Formule 1 800 000 FCFA (à partir du 15e jour du Ramadan à La Mecque). Chaque formule inclut transport, hébergement et visa, ainsi qu'un encadrement spirituel complet.",
      order: 3,
    },
    {
      _id: 'offer-hadj-2027',
      title: 'Hadj 2027',
      type: 'Hadj',
      price: '3 184 469',
      badge: '',
      isPopular: true,
      features: ['Transport, hébergement & visa', 'Encadrement religieux', 'Accompagnement médical'],
      fullDetails: "Dates selon le calendrier officiel. Pèlerinage complet avec transport, hébergement et visa inclus, ainsi qu'un encadrement médical et religieux. Acompte 150 000 FCFA pour valider. Délai d'inscription : 26 septembre 2026.",
      order: 4,
    },
  ];

  for (const offer of offers) {
    await client.createOrReplace({ ...offer, _type: 'offer' });
  }
  console.log('✅ Offres (4)');

  // 6. FAQ (exactement comme dans Faq.tsx)
  const faqs = [
    {
      _id: 'faq-1',
      question: "Quel document faut-il fournir pour les démarches de voyage ?",
      answer: "Le passeport original est requis. Il doit être valide au moins 6 mois après la date de retour. Il sert aux démarches administratives du voyage, notamment le visa et les réservations. Si vous n'avez pas encore de passeport ou qu'il n'est plus valide, l'agence Al-Hidaya peut vous accompagner dans les démarches d'obtention ou de renouvellement.",
      category: 'Documents',
      order: 1,
    },
    {
      _id: 'faq-2',
      question: 'Comment sont définies les dates du Hajj ?',
      answer: "Les dates du Hajj sont fixées selon le calendrier lunaire saoudien et peuvent légèrement évoluer après l'observation du croissant lunaire. Lors de l'inscription, Al-Hidaya communique une période prévisionnelle de départ et de retour. Les dates définitives sont confirmées dès validation officielle par les autorités saoudiennes et les compagnies aériennes.",
      category: 'Logistique',
      order: 2,
    },
    {
      _id: 'faq-3',
      question: 'Le visa est-il inclus dans le prix ?',
      answer: "Oui. Le prix annoncé inclut le visa, le billet d'avion et l'hébergement.",
      category: 'Logistique',
      order: 3,
    },
    {
      _id: 'faq-4',
      question: 'Quel accompagnement religieux est prévu ?',
      answer: "Chaque groupe est encadré par des guides religieux expérimentés. Des séances de formation sont organisées chaque samedi et dimanche dès l'inscription, afin de permettre aux pèlerins d'accomplir leurs rites avec compréhension, sérénité et confiance.",
      category: 'Spiritualité',
      order: 4,
    },
    {
      _id: 'faq-5',
      question: 'Puis-je payer en plusieurs fois ?',
      answer: "Oui. Un premier acompte permet de valider l'inscription, puis le reste peut être versé progressivement jusqu'au départ, selon vos possibilités. Le paiement doit toutefois être entièrement réglé avant le voyage.",
      category: 'Paiement',
      order: 5,
    },
  ];

  for (const faq of faqs) {
    await client.createOrReplace({ ...faq, _type: 'faq' });
  }
  console.log('✅ FAQ (5)');

  // 7. Articles (exactement comme dans Blog.tsx)
  const articles = [
    {
      _id: 'article-1',
      title: 'Guide 2026 : Se préparer spirituellement pour le Hadj',
      slug: { _type: 'slug', current: 'guide-2026-preparation-hadj' },
      excerpt: "Le pèlerinage commence bien avant le départ de Niamey. Découvrez comment préparer votre cœur et votre esprit pour ce voyage sacré.",
      category: 'Spiritualité',
      date: '2025-10-15',
      author: 'Imam Moussa',
    },
    {
      _id: 'article-2',
      title: "La Tontine Oumrah : Épargnez à votre rythme avec AmanaTa",
      slug: { _type: 'slug', current: 'tontine-oumrah-amanata' },
      excerpt: "Pourquoi choisir le paiement progressif ? Notre partenariat avec AmanaTa facilite l'accès aux lieux saints pour tous.",
      category: 'Conseils',
      date: '2025-10-12',
      author: 'Direction AL-HIDAYA',
    },
    {
      _id: 'article-3',
      title: 'Oumra Décembre : Pourquoi choisir Niamey comme point de départ ?',
      slug: { _type: 'slug', current: 'oumra-decembre-niamey' },
      excerpt: "Les avantages logistiques et le confort de notre accompagnement spécial pour les départs de la fin d'année.",
      category: 'Voyages',
      date: '2025-10-05',
      author: 'Service Client',
    },
  ];

  for (const a of articles) {
    await client.createOrReplace({ ...a, _type: 'article' });
  }
  console.log('✅ Articles (3)');

  console.log('\n🎉 Seeding terminé avec les textes exacts des composants !');
}

seed().catch((err) => {
  console.error('❌ Erreur lors du seeding:', err.message);
  process.exit(1);
});
