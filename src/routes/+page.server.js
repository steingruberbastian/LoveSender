import { WEBSITE_PASSWORD } from "$env/static/private";

export async function POST({ request }) {
  const { password } = await request.json();

  if (password === WEBSITE_PASSWORD) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}