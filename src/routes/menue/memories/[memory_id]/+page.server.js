import db from "$lib/db.js";

export async function load({ params }) {
    console.log(params.memory_id);

    return {
        memory: await db.getMemory(params.memory_id)
    }
}