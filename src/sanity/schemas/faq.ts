import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string' }),
    defineField({ name: 'answer', title: 'Réponse', type: 'text' }),
    defineField({ name: 'category', title: 'Catégorie', type: 'string', options: { list: ['Documents', 'Logistique', 'Spiritualité', 'Paiement'] } }),
    defineField({ name: 'order', title: "Ordre d'affichage", type: 'number' }),
  ],
});
