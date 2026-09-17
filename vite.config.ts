import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function videoUploadPlugin(): Plugin {
  return {
    name: 'video-upload-handler',
    configureServer(server) {
      server.middlewares.use('/api/upload-drone-video', (req, res) => {
        if (req.method === 'POST') {
          const publicPath = path.resolve(process.cwd(), 'public/eagle-view-farm.mp4');
          const fileStream = fs.createWriteStream(publicPath);
          req.pipe(fileStream);

          fileStream.on('finish', () => {
            // Also copy to dist if it exists
            const distPath = path.resolve(process.cwd(), 'dist/eagle-view-farm.mp4');
            try {
              if (fs.existsSync(path.dirname(distPath))) {
                fs.copyFileSync(publicPath, distPath);
              }
            } catch {
              // ignore
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, url: '/eagle-view-farm.mp4' }));
          });

          fileStream.on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          });
          return;
        }

        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), videoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
