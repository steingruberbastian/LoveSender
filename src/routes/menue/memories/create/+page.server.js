import db from '$lib/db.js';

export async function load() {
  const categories = await db.getCategories();
  return { categories };
}

export const actions = {
    create: async ({ request }) => {
        let data = await request.formData();
        let categoryValue = data.get('category');
        let category;

        if (categoryValue === 'Ferien') {
            category = 1;
        } else if (categoryValue === 'Zuhause') {
            category = 2;
        } else {
            category = 3;
        }

        let memory = {
            title: data.get('title'),
            location: data.get('location'),
            year: data.get('year'),
            category_id: category
        };

        await db.createMemory(memory);
    }
}