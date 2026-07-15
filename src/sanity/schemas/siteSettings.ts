import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Nom du site', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'seoDescription', title: 'Description SEO', type: 'text' }),
    defineField({ name: 'showTestimonials', title: 'Afficher les témoignages', type: 'boolean', initialValue: false }),
    defineField({
      name: 'stats',
      title: 'Statistiques affichées',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Valeur', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'footerText', title: 'Texte légal (footer)', type: 'text' }),
  ],
});
