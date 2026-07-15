import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre principal', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Sous-titre', type: 'string' }),
    defineField({ name: 'backgroundImage', title: 'Image de fond', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaText', title: 'Texte bouton CTA', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'Lien du CTA', type: 'string' }),
  ],
});
