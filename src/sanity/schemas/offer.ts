import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'offer',
  title: 'Offre',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'type', title: 'Type', type: 'string', options: { list: ['Hadj', 'Oumra'] } }),
    defineField({ name: 'price', title: 'Prix', type: 'string' }),
    defineField({ name: 'badge', title: 'Badge (ex: SOLDOUT, Acompte...)', type: 'string' }),
    defineField({ name: 'isPopular', title: 'Populaire / Mis en avant', type: 'boolean' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'features', title: 'Services inclus', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'fullDetails', title: 'Détails complets', type: 'text' }),
    defineField({ name: 'order', title: 'Ordre d\'affichage', type: 'number' }),
  ],
});
