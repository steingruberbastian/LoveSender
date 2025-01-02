import { sendEmail } from "@functions/emailSender.js";
import db from "$lib/db.js";

export async function POST() {
    try {
        await sendEmail();
        await db.decrementCredit()
        return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}