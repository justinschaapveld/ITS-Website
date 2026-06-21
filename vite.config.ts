import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { exec } from 'node:child_process';
import path from 'node:path';

// Dev-only: watch data/products.xlsx and auto-run the import (+ image map) when
// it's saved, so editing the spreadsheet updates the local preview without
// running `npm run products:import` by hand. The import publishes every valid row
// and reports any it had to skip; this watcher surfaces those skips (and any hard
// failure) in the browser error overlay so a bad row is never silently lost.
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
                // Hard failure (missing file/sheet, crash) — nothing was published.
                const detail = (stderr || stdout || 'unknown error').trim();
                server.config.logger.error('[products] import failed — site NOT updated:\n' + detail, { timestamp: true });
                server.ws.send({ type: 'error', err: { message: '[products] import failed — site NOT updated.\n\n' + detail, stack: '' } });
                return;
              }
              // Valid rows were published. Surface any skipped rows in the overlay so
              // the user can't miss them; otherwise reload with the changes.
              const m = stdout.match(/__IMPORT_SKIPPED__(.*)/);
              if (m) {
                let lines = [];
                try { lines = JSON.parse(m[1]); } catch { /* ignore */ }
                const message =
                  `⚠ ${lines.length} product row(s) skipped — invalid data in data/products.xlsx.\n` +
                  `The rest of the site WAS updated. Fix these rows and re-save:\n\n• ` + lines.join('\n• ');
                server.config.logger.warn('[products] ' + message, { timestamp: true });
                server.ws.send({ type: 'error', err: { message, stack: '' } });
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
