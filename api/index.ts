import type { VercelRequest, VercelResponse } from '@vercel/node';
import { appPromise } from '../server';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await appPromise;
    return app(req, res);
  } catch (error) {
    console.error('PrintStuff API startup failed:', error);
    return res.status(500).json({
      error: 'PrintStuff API startup failed',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
