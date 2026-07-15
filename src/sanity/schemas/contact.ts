import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Informations de Contact',
  type: 'document',
  fields: [
    defineField({ name: 'mainPhone', title: 'Téléphone principal', type: 'string' }),
    defineField({ name: 'otherPhones', title: 'Autres téléphones', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Adresse', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'Numéro WhatsApp (avec indicatif)', type: 'string' }),
    defineField({ name: 'tontinePhone', title: 'Téléphone Tontine AmanaTa', type: 'string' }),
  ],
});
