import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomBytes, timingSafeEqual } from 'node:crypto';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const COOKIE = 'ps_google_oauth_state';

function page(res: VercelResponse, status: number, title: string, message: string) {
  res.status(status).setHeader('Content-Type', 'text/html; charset=utf-8').setHeader('Cache-Control', 'no-store').send(
    `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head><body style="font:16px system-ui;max-width:640px;margin:48px auto;padding:0 20px;color:#222"><h2>${title}</h2><p>${message}</p><p>You can close this tab and return to PrintStuff.</p></body></html>`
  );
}

function getCookie(req: VercelRequest, name: string): string {
  const header = req.headers.cookie || '';
  const entry = header.split(';').map(part => part.trim()).find(part => part.startsWith(name + '='));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return page(res, 405, 'Method not allowed', 'Please use the Google Drive connect link from PrintStuff.');
  }
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret || !supabaseUrl || !serviceKey) {
    return page(res, 503, 'Google Drive setup incomplete', 'The PrintStuff owner must add the Google OAuth client credentials and enable the secure token store before connecting Drive.');
  }

  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  const protocol = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI || `${protocol}://${host}/api/google-drive-auth`;
  const code = typeof req.query.code === 'string' ? req.query.code : '';
  const returnedState = typeof req.query.state === 'string' ? req.query.state : '';

  if (!code) {
    if (req.query.error) return page(res, 400, 'Google Drive not connected', 'Google authorization was cancelled or denied. You can return to PrintStuff and try again.');
    const state = randomBytes(24).toString('base64url');
    res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(state)}; Path=/api/google-drive-auth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/drive',
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: 'true',
      state
    });
    return res.redirect(302, `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  }

  const cookieState = getCookie(req, COOKIE);
  const a = Buffer.from(cookieState);
  const b = Buffer.from(returnedState);
  if (!cookieState || !returnedState || a.length !== b.length || !timingSafeEqual(a, b)) {
    return page(res, 400, 'Security check failed', 'The Google sign-in session expired or could not be verified. Start the connection again from the same Preview URL.');
  }
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/api/google-drive-auth; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });
    const token = await tokenResponse.json() as { refresh_token?: string; access_token?: string; error?: string };
    if (!tokenResponse.ok || !token.access_token) {
      console.error('Google OAuth code exchange failed', tokenResponse.status, token.error || '');
      return page(res, 502, 'Google authorization failed', 'Google could not finish authorization. Check the OAuth redirect URI and try connecting again.');
    }
    if (!token.refresh_token) {
      return page(res, 400, 'Reconnect Google Drive', 'Google did not return a refresh token. Revoke the previous PrintStuff authorization in your Google Account security settings, then connect again.');
    }

    const stored = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/google_oauth_tokens?on_conflict=provider`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify({ provider: 'google_drive', refresh_token: token.refresh_token, updated_at: new Date().toISOString() })
    });
    if (!stored.ok) {
      console.error('Could not store Google OAuth refresh token', stored.status, (await stored.text()).slice(0, 300));
      return page(res, 500, 'Secure token storage is not ready', 'Google authorization succeeded, but PrintStuff could not store the connection securely. Ask the owner to complete the Supabase token-table setup, then reconnect.');
    }
    return page(res, 200, 'Google Drive connected', 'PrintStuff is now authorized to save order artwork to your Google Drive folder. You can return to the PrintStuff Preview and place a test order.');
  } catch (error) {
    console.error('Google OAuth callback failed', error instanceof Error ? error.message : 'Unknown error');
    return page(res, 500, 'Could not connect Google Drive', 'An unexpected error occurred while connecting Drive. Please try again.');
  }
}
