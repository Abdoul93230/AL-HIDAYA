import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Article / Actualité',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', title: 'Résumé', type: 'text' }),
    defineField({ name: 'content', title: 'Contenu', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'category', title: 'Catégorie', type: 'string', options: { list: ['Spiritualité', 'Conseils', 'Voyages', 'Actualités'] } }),
    defineField({ name: 'date', title: 'Date de publication', type: 'date' }),
    defineField({ name: 'image', title: 'Image principale', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'author', title: 'Auteur', type: 'string' }),
  ],
});
