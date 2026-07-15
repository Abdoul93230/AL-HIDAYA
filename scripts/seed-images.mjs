import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { basename } from 'path';

const client = createClient({
  projectId: 'klvdkvay',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
});

async function uploadImage(filePath) {
  const buffer = readFileSync(filePath);
  const filename = basename(filePath);
  const asset = await client.assets.upload('image', buffer, { filename });
  console.log(`  📷 Uploadée: ${filename}`);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function seed() {
  console.log('🖼️  Upload des images vers Sanity...\n');

  // === GALERIE ===
  console.log('--- Galerie: Hajj & Ramadan ---');
  const hajjImages = ['1.jpeg','2.jpeg','3.jpeg','4.jpeg','5.jpeg','6.jpeg','7.jpeg','8.jpeg','9.jpeg','10.jpeg','11.jpeg'];
  for (let i = 0; i < hajjImages.length; i++) {
    const img = await uploadImage(`public/${hajjImages[i]}`);
    await client.createOrReplace({
      _id: `gallery-hajj-${i + 1}`,
      _type: 'galleryImage',
      image: img,
      alt: 'Hajj & Ramadan',
      category: 'Hajj & Ramadan',
      order: i + 1,
    });
  }

  console.log('--- Galerie: Formations ---');
  const formationImages = ['f1.jpeg','f2.jpeg','f3.jpeg','f4.jpeg','f5.jpeg','f6.jpeg'];
  for (let i = 0; i < formationImages.length; i++) {
    const img = await uploadImage(`public/${formationImages[i]}`);
    await client.createOrReplace({
      _id: `gallery-formation-${i + 1}`,
      _type: 'galleryImage',
      image: img,
      alt: 'Séance de formation AL-HIDAYA',
      category: 'Formations',
      order: i + 1,
    });
  }

  console.log('--- Galerie: Activités & Autres ---');
  const activitesImages = [
    { file: 'r1.jpeg', alt: 'Pèlerinage à La Mecque' },
    { file: 'r2.jpeg', alt: 'Hajj - moments sacrés' },
    { file: 'r3.jpeg', alt: 'Omra - les lieux saints' },
    { file: 'r4.jpeg', alt: 'Ramadan à La Mecque' },
    { file: '498179141_674677565357188_1164557361268280119_n.jpg', alt: 'Pèlerins AL-HIDAYA' },
    { file: '487241754_638227569002188_7422085376426020883_n.jpg', alt: 'Souvenirs des pèlerins' },
    { file: '495377121_665431132948498_7565671843195843296_n.jpg', alt: 'Activité AL-HIDAYA' },
    { file: '672672775_939493652208910_2045622064777589843_n.jpg', alt: 'Événement AL-HIDAYA' },
    { file: '526965774_732816946209916_5096855490665871705_n.jpg', alt: 'Rencontre AL-HIDAYA' },
    { file: '527191524_732816866209924_5571990788218110380_n.jpg', alt: 'Autres activités' },
    { file: '499703444_674677528690525_2367499767595363538_n.jpg', alt: 'Autres activités' },
  ];
  for (let i = 0; i < activitesImages.length; i++) {
    const img = await uploadImage(`public/${activitesImages[i].file}`);
    await client.createOrReplace({
      _id: `gallery-activites-${i + 1}`,
      _type: 'galleryImage',
      image: img,
      alt: activitesImages[i].alt,
      category: 'Activités & Autres',
      order: i + 1,
    });
  }
  console.log('✅ Galerie complète (28 images)\n');

  // === OFFRES (images) ===
  console.log('--- Images des Offres ---');
  const offerImg1 = await uploadImage('public/672672775_939493652208910_2045622064777589843_n.jpg');
  await client.patch('offer-oumra-aout-2026').set({ image: offerImg1 }).commit();
  console.log('  ✅ Oumra Août 2026');

  const offerImg2 = await uploadImage('public/alhidaya.jpg');
  await client.patch('offer-oumra-dec-2026').set({ image: offerImg2 }).commit();
  console.log('  ✅ Oumra Décembre 2026');

  const offerImg3 = await uploadImage('public/r1.jpeg');
  await client.patch('offer-oumra-ramadan-2026').set({ image: offerImg3 }).commit();
  console.log('  ✅ Oumra Ramadan 2026');

  const offerImg4 = await uploadImage('public/r2.jpeg');
  await client.patch('offer-hadj-2027').set({ image: offerImg4 }).commit();
  console.log('  ✅ Hadj 2027');

  // === HERO (image de fond) ===
  console.log('\n--- Image Hero ---');
  const heroImg = await uploadImage('public/r3.jpeg');
  await client.patch('heroSection').set({ backgroundImage: heroImg }).commit();
  console.log('  ✅ Hero background');

  // === ABOUT (image) ===
  console.log('\n--- Image À Propos ---');
  const aboutImg = await uploadImage('public/alhidaya.jpg');
  await client.patch('aboutSection').set({ image: aboutImg }).commit();
  console.log('  ✅ About image');

  // === ARTICLES (images) ===
  console.log('\n--- Images Articles ---');
  const articleImg1 = await uploadImage('public/r4.jpeg');
  await client.patch('article-1').set({ image: articleImg1 }).commit();
  console.log('  ✅ Article 1');

  const articleImg2 = await uploadImage('public/tontine.jpg');
  await client.patch('article-2').set({ image: articleImg2 }).commit();
  console.log('  ✅ Article 2');

  const articleImg3 = await uploadImage('public/alhidaya.jpg');
  await client.patch('article-3').set({ image: articleImg3 }).commit();
  console.log('  ✅ Article 3');

  console.log('\n🎉 Toutes les images ont été uploadées vers Sanity !');
  console.log('👉 Tu peux les changer via /admin à tout moment.');
}

seed().catch((err) => {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
});
