import { fileURLToPath } from 'node:url';
import { transformWithOxc } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const entryFile = fileURLToPath(new URL('index.html', import.meta.url));
const apiRoot = process.env.REACT_APP_API_ROOT;

const jsxInJs = () => ({
  name: 'conduit-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.includes('/src/') || !id.endsWith('.js') || id.includes('/node_modules/')) {
      return null;
    }
    const result = await transformWithOxc(code, `${id}x`, {
      jsx: { runtime: 'classic' },
      sourcemap: true
    });
    return { code: result.code, map: result.map };
  }
});

export default {
  root: rootDir,
  envPrefix: ['VITE_', 'REACT_APP_'],
  build: {
    rollupOptions: {
      input: entryFile
    }
  },
  plugins: [jsxInJs()],
  define: {
    global: 'globalThis',
    'process.env.REACT_APP_API_ROOT': JSON.stringify(apiRoot === undefined ? '' : apiRoot)
  },
  server: {
    port: 4100
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.js']
  }
};
