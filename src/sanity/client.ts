import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'klvdkvay',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skZRgCoHjkrhbnSiWSqhClrtJkHOyQltZscY5TzjlOdZ4nOWGpDL3ugY4ZltVClxY36R6ZdgUOCtIXd9RPSjL56HHJ6tOZ9lymFtBW66HPDSeVJ0w4t2KUcl2UrEeVfScECmPmIThqY45KdxJo4t2UjM0uHnPny3CqTQYhwFZbG9pZ8FJUWm',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
