import db from "$lib/db.js";

export const actions = {
    create: async ( {request} ) => {
        let data =  await request.formData();
        let memory = {
            title: data.get('title'),
            location: data.get('location'),
            year: data.get('year'),
        }
        await db.createMemory(memory);
    }
}