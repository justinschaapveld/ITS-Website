import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { exec } from 'node:child_process';
import path from 'node:path';

// Dev-only: watch data/products.xlsx and auto-run the import (+ image map) when
// it's saved, so editing the spreadsheet updates the local preview without
// running `npm run products:import` by hand. On a validation error the import
// writes nothing and the failure is logged; the running site is left untouched.
function productsSpreadsheetWatcher(): Plugin {
  return {
    name: 'products-spreadsheet-watcher',
    apply: 'serve',
    configureServer(server) {
      const xlsx = path.resolve(process.cwd(), 'data/products.xlsx');
      server.watcher.add(xlsx);
      let timer: ReturnType<typeof setTimeout> | null = null;
      const onChange = (file: string) => {
        if (path.resolve(file) !== xlsx) return; // ignore the ~$ lock file etc.
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          server.config.logger.info('[products] spreadsheet changed — importing…', { timestamp: true });
          exec(
            'node scripts/import-products.mjs && node scripts/generate-product-images.mjs',
            { cwd: process.cwd() },
            (err, stdout, stderr) => {
              if (err) {
                server.config.logger.error(
                  '[products] import failed — site NOT updated:\n' + (stderr || stdout),
                  { timestamp: true }
                );
              } else {
                server.config.logger.info('[products] imported — reloading', { timestamp: true });
                server.ws.send({ type: 'full-reload' });
              }
            }
          );
        }, 300);
      };
      server.watcher.on('change', onChange);
      server.watcher.on('add', onChange);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), productsSpreadsheetWatcher()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
