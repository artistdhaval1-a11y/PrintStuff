import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash, randomBytes, randomInt } from 'node:crypto';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const driveFolderId = process.env.PRINTSTUFF_DRIVE_FOLDER_ID || '16Ru_ebmFZ6KJBqN3i1LewbzmGbvy7hOv';
const wifAudience = process.env.GOOGLE_WIF_AUDIENCE ||
  '//iam.googleapis.com/projects/388807910315/locations/global/workloadIdentityPools/vercel-printstuff-preview/providers/vercel-printstuff-preview';
const serviceAccount = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT ||
  'printstuff-drive-uploader@printstuff.iam.gserviceaccount.com';

function respond(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(body);
}

function clean(value: unknown, max = 500): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function googleDriveToken(req: VercelRequest): Promise<string> {
  const raw = req.headers['x-vercel-oidc-token'];
  const oidcToken = Array.isArray(raw) ? raw[0] : raw;
  if (!oidcToken) throw new Error('Google Drive connection is not available in this Preview deployment.');

  const exchange = await fetch('https://sts.googleapis.com/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      audience: wifAudience,
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      requested_token_type: 'urn:ietf:params:oauth:token-type:access_token',
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
      subject_token: oidcToken
    })
  });
  const exchanged = await exchange.json() as { access_token?: string; error?: string; error_description?: string };
  if (!exchange.ok || !exchanged.access_token) {
    console.error('Google STS exchange failed', exchange.status, exchanged.error || '');
    throw new Error('Google Drive authentication failed. Please check the Preview identity configuration.');
  }

  const impersonated = await fetch(
    `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${encodeURIComponent(serviceAccount)}:generateAccessToken`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${exchanged.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope: ['https://www.googleapis.com/auth/drive'], lifetime: '3600s' })
    }
  );
  const credentials = await impersonated.json() as { accessToken?: string; error?: { message?: string } };
  if (!impersonated.ok || !credentials.accessToken) {
    console.error('Google service-account impersonation failed', impersonated.status, credentials.error?.message || '');
    throw new Error('Google Drive service account access is not configured for Preview.');
  }
  return credentials.accessToken;
}

async function uploadArtworkToDrive(
  token: string,
  orderNumber: string,
  items: any[]
): Promise<{ folderUrl: string; links: Map<string, string> }> {
  const images = items.flatMap((item, itemIndex) =>
    (Array.isArray(item.artworks) ? item.artworks : []).map((art: any, artworkIndex: number) => ({
      itemIndex, artworkIndex, name: clean(art.name, 160) || `artwork-${artworkIndex + 1}`,
      dataUrl: typeof art.dataUrl === 'string' ? art.dataUrl : ''
    })).filter((art: any) => art.dataUrl)
  );
  if (!images.length) return { folderUrl: '', links: new Map() };

  let totalBytes = 0;
  for (const image of images) {
    const match = image.dataUrl.match(/^data:(image\/(?:png|jpeg|webp|svg\+xml));base64,([A-Za-z0-9+/=\r\n]+)$/i);
    if (!match) throw new Error(`Artwork "${image.name}" is not a supported PNG, JPG, WEBP or SVG image.`);
    totalBytes += Buffer.from(match[2].replace(/\s/g, ''), 'base64').byteLength;
  }
  if (totalBytes > 3_000_000) {
    throw new Error('Your artwork files are too large to send in one order. Please use images under 3 MB total or contact us on WhatsApp.');
  }

  const folderResponse = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: orderNumber,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [driveFolderId]
    })
  });
  const folder = await folderResponse.json() as { id?: string; webViewLink?: string; error?: { message?: string } };
  if (!folderResponse.ok || !folder.id) {
    console.error('Google Drive order folder creation failed', folderResponse.status, folder.error?.message || '');
    throw new Error('Could not create the artwork folder in Google Drive. Please try again or contact PrintStuff.');
  }

  const links = new Map<string, string>();
  for (const image of images) {
    const match = image.dataUrl.match(/^data:(image\/(?:png|jpeg|webp|svg\+xml));base64,([A-Za-z0-9+/=\r\n]+)$/i);
    if (!match) continue;
    const mimeType = match[1].toLowerCase();
    const bytes = Buffer.from(match[2].replace(/\s/g, ''), 'base64');
    const safeName = image.name.replace(/[\\/:*?"<>|]/g, '_').slice(0, 120);
    const boundary = `printstuff-${randomBytes(12).toString('hex')}`;
    const metadata = JSON.stringify({
      name: `${String(image.itemIndex + 1).padStart(2, '0')}-${String(image.artworkIndex + 1).padStart(2, '0')}-${safeName}`,
      mimeType,
      parents: [folder.id]
    });
    const preamble = Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`);
    const ending = Buffer.from(`\r\n--${boundary}--`);
    const uploadResponse = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`
      },
      body: Buffer.concat([preamble, bytes, ending])
    });
    const uploaded = await uploadResponse.json() as { id?: string; webViewLink?: string; error?: { message?: string } };
    if (!uploadResponse.ok || !uploaded.id) {
      console.error('Google Drive artwork upload failed', uploadResponse.status, uploaded.error?.message || '');
      throw new Error('Google Drive could not save an artwork file. Please try again.');
    }
    links.set(`${image.itemIndex}:${image.artworkIndex}`, uploaded.webViewLink || `https://drive.google.com/file/d/${uploaded.id}/view`);
  }
  return { folderUrl: folder.webViewLink || `https://drive.google.com/drive/folders/${folder.id}`, links };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return respond(res, 405, { error: 'Method not allowed' });
  }
  if (!supabaseUrl || !serviceKey) {
    return respond(res, 503, { error: 'Order service is not configured yet.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const customer = body?.customer ?? {};
    const items = Array.isArray(body?.items) ? body.items : [];
    const name = clean(customer.name, 120);
    const phone = clean(customer.phone, 30).replace(/\D/g, '').slice(0, 15);
    const address = clean(customer.address, 500);
    const city = clean(customer.city, 100);
    const pincode = clean(customer.pincode, 12);
    const email = clean(customer.email, 180);
    const notes = clean(customer.notes, 1000);

    if (name.length < 2 || !/^[+()\d\s-]{7,30}$/.test(phone) || address.length < 5 || city.length < 2 || !/^[A-Za-z0-9 -]{4,12}$/.test(pincode)) {
      return respond(res, 400, { error: 'Please provide a valid name, phone, address, city and PIN code.' });
    }
    if (!items.length || items.length > 30) {
      return respond(res, 400, { error: 'Your order must contain between 1 and 30 items.' });
    }

    const safeItems = items.map((item: any) => {
      const qty = Number(item.totalQuantity);
      const price = Number(item.totalPrice);
      if (!Number.isInteger(qty) || qty < 1 || qty > 10000 || !Number.isFinite(price) || price < 0 || price > 10000000) {
        throw new Error('An item has an invalid quantity or price.');
      }
      return {
        productId: clean(item.productId, 100),
        productName: clean(item.productName, 160),
        selectedColor: clean(item.selectedColor?.name, 80),
        sizeBreakdown: item.sizeBreakdown && typeof item.sizeBreakdown === 'object' ? item.sizeBreakdown : {},
        totalQuantity: qty,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(price),
        appliedTierLabel: clean(item.appliedTierLabel, 80),
        artworks: Array.isArray(item.artworks) ? item.artworks.slice(0, 12).map((art: any) => ({
          name: clean(art.name, 160),
          view: art.view === 'back' ? 'back' : 'front',
          placementPreset: clean(art.placementPreset, 80),
          printSize: clean(art.printSize, 20),
          x: Number(art.x) || 0,
          y: Number(art.y) || 0,
          width: Number(art.width) || 0
        })) : []
      };
    });

    const totalQuantity = safeItems.reduce((sum: number, item: any) => sum + item.totalQuantity, 0);
    const subtotal = safeItems.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
    const orderNumber = `PS-${new Date().toISOString().slice(2,10).replace(/-/g, '')}-${randomInt(100000, 999999)}`;
    const trackingToken = randomBytes(24).toString('base64url');
    const trackingTokenHash = createHash('sha256').update(trackingToken).digest('hex');

    const hasArtworkData = items.some((item: any) => Array.isArray(item.artworks) && item.artworks.some((art: any) => typeof art.dataUrl === 'string' && art.dataUrl.startsWith('data:image/')));\n    const driveResult = hasArtworkData\n      ? await uploadArtworkToDrive(await googleDriveToken(req), orderNumber, items)\n      : { folderUrl: '', links: new Map<string, string>() };\n    const artworkFolderUrl = driveResult.folderUrl;\n    const artworkLinks = driveResult.links;
    safeItems.forEach((item: any, itemIndex: number) => {
      item.artworks.forEach((art: any, artworkIndex: number) => {
        const link = artworkLinks.get(`${itemIndex}:${artworkIndex}`);
        if (link) art.driveUrl = link;
      });
    });

    const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        order_number: orderNumber,
        tracking_token_hash: trackingTokenHash,
        customer_name: name,
        customer_phone: phone,
        customer_email: email || null,
        delivery_address: address,
        city,
        pincode,
        order_items: safeItems,
        total_quantity: totalQuantity,
        subtotal,
        customer_notes: notes || null
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Supabase order insert failed', response.status, detail.slice(0, 500));
      return respond(res, 502, { error: 'We could not save your order. Please try again in a moment.' });
    }

    return respond(res, 201, { orderNumber, trackingToken, status: 'received', artworkFolderUrl });
  } catch (error) {
    return respond(res, 400, { error: error instanceof Error ? error.message : 'Invalid order details.' });
  }
}
