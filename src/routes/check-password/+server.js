import { json } from '@sveltejs/kit';
import { WEBSITE_PASSWORD } from '$env/static/private';

export async function POST({ request }) {
  const { password } = await request.json();

  if (password === WEBSITE_PASSWORD) {
    return json({ success: true });
  } else {
    return json({ success: false });
  }
}