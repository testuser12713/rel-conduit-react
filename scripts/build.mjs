import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const configFile = fileURLToPath(new URL('../vite.config.mjs', import.meta.url));

await build({
  configFile,
  root: rootDir
});
