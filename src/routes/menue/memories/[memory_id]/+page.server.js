import db from "$lib/db.js";

export async function load({ params }) {
    return {
        memory: await db.getMemory(params.memory_id)
    }
}