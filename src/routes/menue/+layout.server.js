import { redirect } from '@sveltejs/kit';
import * as cookie from 'cookie';

export async function load({ request }) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');

  if (!cookies.session || cookies.session !== 'authenticated') {
    throw redirect(302, '/');
  }

  return {};
}