import { client } from './client';

export async function getHero() {
  return client.fetch(`*[_type == "hero"][0]`);
}

export async function getAbout() {
  return client.fetch(`*[_type == "about"][0]`);
}

export async function getOffers() {
  return client.fetch(`*[_type == "offer"] | order(order asc)`);
}

export async function getFaqs() {
  return client.fetch(`*[_type == "faq"] | order(order asc)`);
}

export async function getGalleryImages(category?: string) {
  if (category) {
    return client.fetch(`*[_type == "galleryImage" && category == $category] | order(order asc)`, { category });
  }
  return client.fetch(`*[_type == "galleryImage"] | order(order asc)`);
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial" && visible == true]`);
}

export async function getArticles() {
  return client.fetch(`*[_type == "article"] | order(date desc) { ..., content[] }`);
}

export async function getArticleBySlug(slug: string) {
  return client.fetch(`*[_type == "article" && slug.current == $slug][0]`, { slug });
}

export async function getContact() {
  return client.fetch(`*[_type == "contact"][0]`);
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}
