import { sendEmail } from "$lib/emailSender.server.js";

export async function POST() {
    try {
        await sendEmail();
        return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
}