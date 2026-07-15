import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string' }),
    defineField({ name: 'role', title: 'Rôle (ex: Pèlerin Hadj 2025)', type: 'string' }),
    defineField({ name: 'content', title: 'Contenu', type: 'text' }),
    defineField({ name: 'rating', title: 'Note (1-5)', type: 'number' }),
    defineField({ name: 'visible', title: 'Visible sur le site', type: 'boolean', initialValue: false }),
  ],
});
