import db from '$lib/db.js';

export async function load() {
    const categories = await db.getCategories();
    return { categories };
}

export const actions = {
    create: async ({ request }) => {
        try {
            const data = await request.formData();
            const imageFile = data.get('image');
            let setMemory = false;
            if (data.get('memory') === 'on') {
                setMemory = true;
            }
    
            let imagePath = '/images/placeholder.jpg';
    
            if (imageFile && imageFile.size > 0) {
                const buffer = Buffer.from(await imageFile.arrayBuffer());
                imagePath = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
            }
    
            let memory = {
                title: data.get('title'),
                location: data.get('location'),
                year: parseInt(data.get('year')),
                image: imagePath,
                memory: setMemory,
                category_id: parseInt(data.get('category'))
            };
    
            await db.createMemory(memory);
        } catch(err) {
            console.error(err);
        }
    }
}