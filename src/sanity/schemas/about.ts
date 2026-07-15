import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'about',
  title: 'À Propos',
  type: 'document',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Titre section', type: 'string' }),
    defineField({ name: 'heading', title: 'Titre principal', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'features',
      title: 'Points forts',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'string' }),
        ],
      }],
    }),
  ],
});
