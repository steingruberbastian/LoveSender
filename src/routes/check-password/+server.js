import { json } from '@sveltejs/kit';
import { WEBSITE_PASSWORD, TEMP_WEBSITE_PASSWORD } from '$env/static/private';
import * as cookie from 'cookie';

export async function POST({ request }) {
  const { password } = await request.json();

  if (password === WEBSITE_PASSWORD || password === TEMP_WEBSITE_PASSWORD) {
    const headers = new Headers();
    headers.append('Set-Cookie', cookie.serialize('session', 'authenticated', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    }));

    return new Response(JSON.stringify({ success: true }), { headers });
  } else {
    return json({ success: false });
  }
}