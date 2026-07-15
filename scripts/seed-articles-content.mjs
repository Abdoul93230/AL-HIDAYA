import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'klvdkvay',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
});

function block(text, style = 'normal') {
  return { _type: 'block', _key: Math.random().toString(36).slice(2, 10), style, children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }], markDefs: [] };
}

function blockBold(text, style = 'normal') {
  const markKey = Math.random().toString(36).slice(2, 10);
  return { _type: 'block', _key: Math.random().toString(36).slice(2, 10), style, children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: ['strong'] }], markDefs: [] };
}

async function seed() {
  console.log('📝 Ajout du contenu complet des articles...\n');

  // Article 1 - Guide Hadj
  await client.patch('article-1').set({
    content: [
      block("Le Hadj n'est pas seulement un voyage physique vers la Mecque, c'est avant tout un voyage de l'âme. Pour que ce pilier de l'Islam soit pleinement accepté, la préparation doit commencer des mois à l'avance."),
      block("1. La Purification de l'Intention (An-Niyyah)", 'h3'),
      block("Assurez-vous que votre seule motivation est de plaire à Allah (SWT). Éloignez toute pensée d'ostentation ou de prestige social lié au titre de 'Hadj'."),
      block("2. L'Apprentissage des Rites", 'h3'),
      block("Apprenez les étapes du Hadj : de l'Ihram à Tawaf, en passant par Arafat et Mina. AL-HIDAYA organise des séances de formation dès l'inscription chaque samedi et dimanche pour tous ses inscrits et non inscrits."),
      block("\"Le Hadj est l'école de la patience et de l'humilité. Préparez votre esprit à accepter les défis avec sérénité.\"", 'blockquote'),
      block("Enfin, n'oubliez pas de régler toutes vos dettes et de demander pardon à votre entourage avant votre départ."),
    ]
  }).commit();
  console.log('✅ Article 1 - Guide Hadj (contenu complet)');

  // Article 2 - Tontine
  await client.patch('article-2').set({
    content: [
      block("Chez AL-HIDAYA, nous croyons que le manque de liquidité immédiate ne devrait pas être un frein à votre désir de visiter la Kaaba. C'est pourquoi nous avons lancé la Tontine Oumrah."),
      block("Comment ça marche ?", 'h3'),
      block("Grâce à notre partenaire AmanaTa, vous pouvez désormais verser des petites sommes mensuelles ou hebdomadaires selon vos capacités."),
      block("Accessibilité : Vous fixez vous-même le montant de votre épargne."),
      block("Sécurité : Vos fonds sont sécurisés et tracés via le réseau AmanaTa."),
      block("Sérénité : Une fois le montant atteint, votre place est garantie pour la saison choisie."),
      block("Pour le départ d'août 2026, commencez dès aujourd'hui votre épargne pour voyager l'esprit léger et sans dettes."),
    ]
  }).commit();
  console.log('✅ Article 2 - Tontine (contenu complet)');

  // Article 3 - Oumra Décembre
  await client.patch('article-3').set({
    content: [
      block("La fin d'année civile est une période très prisée pour l'Oumra. Partir de Niamey avec AL-HIDAYA offre des avantages inédits pour les familles et les professionnels."),
      block("Un Climat de Sérénité", 'h3'),
      block("En décembre, le climat en Arabie Saoudite est particulièrement clément, loin de la chaleur accablante de l'été, ce qui facilite grandement l'accomplissement des rites."),
      block("Logistique Simplifiée", 'h3'),
      block("Grâce à nos partenariats locaux, nous vous garantissons des transferts fluides depuis l'aéroport de Niamey et des hôtels situés à moins de 200m du Haram, même en période de forte affluence."),
      block("C'est l'occasion idéale pour les familles de voyager ensemble durant les congés, dans un cadre sécurisé et spirituellement enrichissant."),
    ]
  }).commit();
  console.log('✅ Article 3 - Oumra Décembre (contenu complet)');

  console.log('\n🎉 Contenu des 3 articles ajouté !');
}

seed().catch((err) => {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
});
