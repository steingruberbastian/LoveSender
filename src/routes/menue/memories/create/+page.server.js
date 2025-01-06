import db from '$lib/db.js';

export async function load() {
  const categories = await db.getCategories();
  return { categories };
}

export const actions = {
    create: async ({ request }) => {
        let data = await request.formData();

        let memory = {
            title: data.get('title'),
            location: data.get('location'),
            year: parseInt(data.get('year')),
            category_id: parseInt(data.get('category'))
        };

        await db.createMemory(memory);
    }
}