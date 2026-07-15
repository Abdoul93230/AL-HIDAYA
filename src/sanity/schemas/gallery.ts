import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryImage',
  title: 'Image Galerie',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: { list: ['Hajj & Ramadan', 'Formations', 'Activités & Autres'] },
    }),
    defineField({ name: 'order', title: "Ordre d'affichage", type: 'number' }),
  ],
});
