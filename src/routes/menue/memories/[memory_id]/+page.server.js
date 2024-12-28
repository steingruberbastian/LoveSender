import db from "$lib/db.js";

export async function load({ params }) {
    return {
        memory: await db.getMemory(params.memory_id)
    }
}

export const actions = {
    removeMemory: async ( {request}) => {
        let data = await request.formData();
        let id = data.get("id")

        await db.deleteMemory(id)
    }
}