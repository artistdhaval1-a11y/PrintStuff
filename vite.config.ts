import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';

const brandAssetUploadPlugin = (): Plugin => {
  return {
    name: 'brand-asset-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-brand-asset', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const { type, base64Data } = data; // type: 'logo' | 'wordmark'
            if (!type || !base64Data) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing type or base64Data' }));
              return;
            }

            // Remove data:image/...;base64, prefix if present
            const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(cleanBase64, 'base64');

            const publicBrandDir = path.resolve(__dirname, 'public/brand');
            if (!fs.existsSync(publicBrandDir)) {
              fs.mkdirSync(publicBrandDir, { recursive: true });
            }

            if (type === 'logo') {
              fs.writeFileSync(path.join(publicBrandDir, 'printstuff-tag-logo.png'), buffer);
            } else if (type === 'wordmark') {
              fs.writeFileSync(path.join(publicBrandDir, 'printstuff-wordmark-white.png'), buffer);
              if (data.blackData) {
                const cleanBlack = data.blackData.replace(/^data:image\/\w+;base64,/, '');
                fs.writeFileSync(path.join(publicBrandDir, 'printstuff-wordmark-black.png'), Buffer.from(cleanBlack, 'base64'));
              }

              // Also sync to dist/ if dist build exists
              const distBrandDir = path.resolve(__dirname, 'dist/brand');
              if (fs.existsSync(distBrandDir)) {
                fs.writeFileSync(path.join(distBrandDir, 'printstuff-wordmark-white.png'), buffer);
                if (data.blackData) {
                  const cleanBlack = data.blackData.replace(/^data:image\/\w+;base64,/, '');
                  fs.writeFileSync(path.join(distBrandDir, 'printstuff-wordmark-black.png'), Buffer.from(cleanBlack, 'base64'));
                }
              }
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, type, timestamp: Date.now() }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
};

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), brandAssetUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
