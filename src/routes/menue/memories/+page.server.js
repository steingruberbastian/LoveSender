import db from "$lib/db.js"
export async function load() {

    return {
        memories: await db.getMemories()
    }
}

export const actions = {
    addToMemories: async ( {request}) => {
        let data = await request.formData();
        let id = data.get("id")

        let memory = {
            _id: id,
            memory: true
        }

        await db.updateMemory(memory)
    },
    removeFromMemories: async ( {request}) => {
        let data = await request.formData();
        let id = data.get("id")

        let memory = {
            _id: id,
            memory: false
        }

        await db.updateMemory(memory)
    }
}