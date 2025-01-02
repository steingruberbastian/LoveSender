import db from "$lib/db.js";

export async function load() {
    const credit = await db.getCredit();
    return {
        credits: JSON.parse(JSON.stringify(credit))
    };
}