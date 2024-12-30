import db from "$lib/db.js"

export async function load() {
    return {
        categories: await db.getCategories()
    }
}